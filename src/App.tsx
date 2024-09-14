import {useMemo, useState} from "react";
import {Copy, Eye, EyeOff, RefreshCw} from "lucide-react";

import {Input} from "./components/ui/input";
import {Button} from "./components/ui/button";
import {TooltipComponent} from "./components/tooltip-component";
import {GeneratorMenu} from "./components/generator-menu";
import {cn} from "./lib/utils";

function App() {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(password)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 3000);
            })
            .catch(() => {
                alert("Failed to copy to clipboard");
            });
    };

    const passwordStrength = useMemo(() => {
        const status = {
            0: {message: "No password", color: "bg-gray-500"},
            1: {message: "Very weak", color: "bg-red-500"},
            2: {message: "Weak", color: "bg-orange-500"},
            3: {message: "Medium", color: "bg-yellow-500"},
            4: {message: "Strong", color: "bg-blue-500"},
            5: {message: "Very strong", color: "bg-green-500"},
        };

        return status[
            password.length === 0
                ? 0
                : password.length < 4
                ? 1
                : password.length < 8
                ? 2
                : password.length < 12
                ? 3
                : password.length < 16
                ? 4
                : 5
        ];
    }, [password]);

    return (
        <div className="bg-slate-100 min-h-[100dvh] flex flex-col justify-center text-white items-center p-6 font-inter">
            <div
                className="flex flex-col items-center border-2 border-white/20 bg-transparent p-6 rounded-2xl gap-2 backdrop-blur-[25px]"
                style={{boxShadow: "0 0 10px rgba(0, 0, 0, .2)"}}
            >
                <span className="text-2xl font-extrabold text-slate-800">Test your password</span>
                <div className={cn("flex flex-col items-center p-1 rounded-md", passwordStrength.color)}>
                    <div className="flex">
                        <Input
                            className="bg-white border-r-0 rounded-r-none text-slate-800"
                            placeholder="Password"
                            size={40}
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TooltipComponent text="Copy">
                            <Button
                                className={`text-gray-800 bg-white rounded-none hover:bg-white/90 relative copy-button ${
                                    isCopied ? "animate" : ""
                                }`}
                                size={"icon"}
                                onClick={copyToClipboard}
                            >
                                <Copy />
                            </Button>
                        </TooltipComponent>
                        <TooltipComponent text="Toggle visibility">
                            <Button
                                className="bg-white rounded-none text-slate-800 hover:bg-white/90"
                                size={"icon"}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </Button>
                        </TooltipComponent>
                        <GeneratorMenu password={password} setPassword={setPassword}>
                            <div>
                                <TooltipComponent text="Generate random">
                                    <Button
                                        className="bg-white rounded-l-none text-slate-800 hover:bg-white/90"
                                        size={"icon"}
                                    >
                                        <RefreshCw />
                                    </Button>
                                </TooltipComponent>
                            </div>
                        </GeneratorMenu>
                    </div>
                    <span className="p-1 font-medium">{passwordStrength.message}</span>
                </div>
            </div>
        </div>
    );
}

export default App;
