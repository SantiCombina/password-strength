import {useEffect, useMemo, useState} from "react";
import {Check, Copy, Eye, EyeOff, RefreshCw} from "lucide-react";
import zxcvbn from "zxcvbn";

import {Slider} from "./components/ui/slider";
import {MatrixBackground} from "./components/matrix-background";
import {cn} from "./lib/utils";
import {useCopyToClipboard} from "./hooks/useCopyToClipboard";

const SEGMENTS = [0, 1, 2, 3, 4];

const STRENGTH_CONFIG = {
    [-1]: {label: "—", segColor: "bg-matrix-green/10", textColor: "text-matrix-green/30"},
    [0]: {label: "Very Weak", segColor: "bg-red-500", textColor: "text-red-400"},
    [1]: {label: "Weak", segColor: "bg-orange-500", textColor: "text-orange-400"},
    [2]: {label: "Fair", segColor: "bg-yellow-500", textColor: "text-yellow-400"},
    [3]: {label: "Good", segColor: "bg-blue-500", textColor: "text-blue-400"},
    [4]: {label: "Strong", segColor: "bg-green-500", textColor: "text-green-400"},
} as const;

function generatePassword(opts: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
    length: number;
}): string {
    const pool: string[] = [];
    const guaranteed: string[] = [];

    if (opts.uppercase) {
        const s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        pool.push(...s);
        guaranteed.push(s[Math.floor(Math.random() * s.length)]);
    }
    if (opts.lowercase) {
        const s = "abcdefghijklmnopqrstuvwxyz";

        pool.push(...s);
        guaranteed.push(s[Math.floor(Math.random() * s.length)]);
    }
    if (opts.numbers) {
        const s = "0123456789";

        pool.push(...s);
        guaranteed.push(s[Math.floor(Math.random() * s.length)]);
    }
    if (opts.symbols) {
        const s = "!@#$%&*";

        pool.push(...s);
        guaranteed.push(s[Math.floor(Math.random() * s.length)]);
    }

    if (pool.length === 0) return "";

    const result = [...guaranteed];

    for (let i = result.length; i < opts.length; i++) {
        result.push(pool[Math.floor(Math.random() * pool.length)]);
    }

    return result.sort(() => 0.5 - Math.random()).join("");
}

function App() {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(16);
    const [opts, setOpts] = useState({uppercase: true, lowercase: true, numbers: true, symbols: true});

    const {isCopied, copyToClipboard} = useCopyToClipboard();

    const handleGenerate = () => {
        setPassword(generatePassword({...opts, length}));
    };

    useEffect(() => {
        handleGenerate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const strength = useMemo(() => {
        if (password.length === 0) return {score: -1 as const, litCount: 0};
        const score = zxcvbn(password).score as 0 | 1 | 2 | 3 | 4;

        return {score, litCount: score + 1};
    }, [password]);

    const cfg = STRENGTH_CONFIG[strength.score];

    const toggle = (key: keyof typeof opts) => setOpts((prev) => ({...prev, [key]: !prev[key]}));

    return (
        <>
            <MatrixBackground />

            <div className="relative z-10 min-h-[100dvh] flex flex-col justify-center items-center p-6 font-mono">
                <div
                    className="flex flex-col w-full max-w-sm gap-5 p-6 border rounded-lg border-matrix-green/40 bg-matrix-card/90 backdrop-blur-sm"
                    style={{boxShadow: "0 0 0 1px rgba(93,186,120,0.08), 0 8px 32px rgba(0,0,0,0.6)"}}
                >
                    <div>
                        <h1 className="text-lg font-bold tracking-wide text-matrix-green">Password Generator</h1>
                        <p className="text-matrix-green/45 text-xs mt-0.5">Generate secure, random passwords</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="relative flex items-center border rounded bg-matrix-dark border-matrix-green/25">
                            <input
                                className="flex-1 px-3 py-3 font-mono text-sm tracking-wider bg-transparent outline-none text-matrix-green placeholder:text-matrix-green/25 caret-matrix-green"
                                placeholder="Type or generate a password..."
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                className="px-3 transition-colors text-matrix-green/40 hover:text-matrix-green shrink-0"
                                onClick={() => setShowPassword((v) => !v)}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>

                        <div className="flex gap-2">
                            {SEGMENTS.map((seg) => (
                                <div
                                    key={seg}
                                    className={cn(
                                        "h-1.5 flex-1 rounded-full transition-all duration-400",
                                        seg < strength.litCount ? cfg.segColor : "bg-matrix-green/10",
                                    )}
                                />
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <span className={cn("text-xs font-medium", cfg.textColor)}>{cfg.label}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 pt-4 border-t border-matrix-green/15">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between text-xs text-matrix-green/60">
                                <span>Length</span>
                                <span className="font-bold text-matrix-green">{length}</span>
                            </div>
                            <Slider max={64} min={5} value={[length]} onValueChange={([v]) => setLength(v)} />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {(
                                [
                                    {key: "uppercase", label: "Uppercase", hint: "A-Z"},
                                    {key: "lowercase", label: "Lowercase", hint: "a-z"},
                                    {key: "numbers", label: "Numbers", hint: "0-9"},
                                    {key: "symbols", label: "Symbols", hint: "!@#$%"},
                                ] as const
                            ).map(({key, label, hint}) => (
                                <button
                                    key={key}
                                    className={cn(
                                        "flex items-center justify-between px-3 py-2 rounded border text-left transition-colors",
                                        opts[key]
                                            ? "border-matrix-green/50 bg-matrix-green/8 text-matrix-green"
                                            : "border-matrix-green/15 bg-transparent text-matrix-green/35",
                                    )}
                                    onClick={() => toggle(key)}
                                >
                                    <div className="flex flex-col">
                                        <span className="text-xs font-medium">{label}</span>
                                        <span className="text-[10px] opacity-60 font-mono">{hint}</span>
                                    </div>
                                    <div
                                        className={cn(
                                            "w-4 h-4 rounded-sm border flex items-center justify-center transition-colors",
                                            opts[key]
                                                ? "border-matrix-green bg-matrix-green/20"
                                                : "border-matrix-green/25 bg-transparent",
                                        )}
                                    >
                                        {opts[key] && <Check className="w-2.5 h-2.5 text-matrix-green" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                        <button
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded border border-matrix-green/40 text-matrix-green/80 hover:bg-matrix-green/8 hover:text-matrix-green hover:border-matrix-green/60 transition-colors text-sm font-medium"
                            onClick={handleGenerate}
                        >
                            <RefreshCw className="w-4 h-4" />
                            Generate
                        </button>
                        <button
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded border transition-colors text-sm font-medium relative copy-button",
                                isCopied
                                    ? "animate border-green-500/60 bg-green-500/10 text-green-400"
                                    : "border-matrix-green/70 bg-matrix-green/10 text-matrix-green hover:bg-matrix-green/20 hover:border-matrix-green",
                            )}
                            onClick={() => copyToClipboard(password)}
                        >
                            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {isCopied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
