import {useMemo, useState} from "react";
import {Copy, Eye, EyeOff, RefreshCw} from "lucide-react";
import zxcvbn from "zxcvbn";

import {Input} from "./components/ui/input";
import {Button} from "./components/ui/button";
import {TooltipComponent} from "./components/tooltip-component";
import {GeneratorMenu} from "./components/generator-menu";
import {cn} from "./lib/utils";
import {useCopyToClipboard} from "./hooks/useCopyToClipboard";

function App() {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

    const {isCopied, copyToClipboard} = useCopyToClipboard();

    const passwordStrength = useMemo(() => {
        if (password.length === 0) {
            return {message: "No password", color: "bg-gray-500"};
        }

        const result = zxcvbn(password);
        const score = result.score;

        const status = {
            0: {message: "Very Weak", color: "bg-red-500"},
            1: {message: "Weak", color: "bg-orange-500"},
            2: {message: "Fair", color: "bg-yellow-500"},
            3: {message: "Good", color: "bg-blue-500"},
            4: {message: "Strong", color: "bg-green-500"},
        };

        return status[score] || status[0];
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
                                className={cn(
                                    "text-gray-800 bg-white rounded-none hover:bg-white/90 relative copy-button",
                                    isCopied && "animate",
                                )}
                                size={"icon"}
                                onClick={() => copyToClipboard(password)}
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
