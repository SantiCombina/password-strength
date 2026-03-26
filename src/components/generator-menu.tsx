import {Dispatch, SetStateAction, useEffect, useState} from "react";

import {Slider} from "./ui/slider";
import {Switch} from "./ui/switch";
import {Label} from "./ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover";

interface Props {
    children: React.ReactNode;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
}

export function GeneratorMenu({children, password, setPassword}: Props) {
    const [passwordChars, setPasswordChars] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
        passwordLength: 0,
    });

    useEffect(() => {
        if (passwordChars.passwordLength <= 0) return;

        const length = passwordChars.passwordLength;
        let charset = "";
        const guaranteedChars = [];

        if (passwordChars.uppercase) {
            charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            guaranteedChars.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 26)));
        }
        if (passwordChars.lowercase) {
            charset += "abcdefghijklmnopqrstuvwxyz";
            guaranteedChars.push("abcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 26)));
        }
        if (passwordChars.numbers) {
            charset += "0123456789";
            guaranteedChars.push("0123456789".charAt(Math.floor(Math.random() * 10)));
        }
        if (passwordChars.symbols) {
            charset += "!@#$%&*";
            guaranteedChars.push("!@#$%&*".charAt(Math.floor(Math.random() * 7)));
        }

        let password = guaranteedChars.join("");

        for (let i = guaranteedChars.length; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        setPassword(
            password
                .split("")
                .sort(() => 0.5 - Math.random())
                .join(""),
        );
    }, [passwordChars, setPassword]);

    const rowClass = "flex items-center justify-between py-1.5";
    const labelClass = "text-matrix-green/70 text-xs tracking-widest uppercase font-mono";

    return (
        <Popover onOpenChange={(e) => e && setPasswordChars({...passwordChars, passwordLength: 14})}>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent
                className="p-4 font-mono border rounded-none w-80 border-matrix-green bg-matrix-card text-matrix-green"
                style={{boxShadow: "0 0 20px rgba(0,255,65,0.25), 0 0 6px #00ff41"}}
            >
                <div className="flex flex-col gap-3">
                    <div className="pb-3 border-b border-matrix-green/30">
                        <h4 className="font-bold tracking-[0.2em] uppercase text-matrix-green text-sm">
                            [ GENERATOR ]
                        </h4>
                        <p className="text-matrix-green/40 text-xs tracking-wide mt-0.5">configure output parameters</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className={rowClass}>
                            <Label className={labelClass}>
                                Length <span className="font-bold text-matrix-green">[{password.length}]</span>
                            </Label>
                            <div className="w-32">
                                <Slider
                                    max={64}
                                    min={5}
                                    value={[password.length]}
                                    onValueChange={(e) => setPasswordChars({...passwordChars, passwordLength: e[0]})}
                                />
                            </div>
                        </div>

                        <div className={rowClass}>
                            <Label className={labelClass}>Uppercase A-Z</Label>
                            <Switch
                                checked={passwordChars.uppercase}
                                className="data-[state=checked]:bg-matrix-green data-[state=unchecked]:bg-matrix-green/20"
                                onCheckedChange={(val) => setPasswordChars({...passwordChars, uppercase: val})}
                            />
                        </div>

                        <div className={rowClass}>
                            <Label className={labelClass}>Lowercase a-z</Label>
                            <Switch
                                checked={passwordChars.lowercase}
                                className="data-[state=checked]:bg-matrix-green data-[state=unchecked]:bg-matrix-green/20"
                                onCheckedChange={(val) => setPasswordChars({...passwordChars, lowercase: val})}
                            />
                        </div>

                        <div className={rowClass}>
                            <Label className={labelClass}>Numbers 0-9</Label>
                            <Switch
                                checked={passwordChars.numbers}
                                className="data-[state=checked]:bg-matrix-green data-[state=unchecked]:bg-matrix-green/20"
                                onCheckedChange={(val) => setPasswordChars({...passwordChars, numbers: val})}
                            />
                        </div>

                        <div className={rowClass}>
                            <Label className={labelClass}>Symbols !@#$%&*</Label>
                            <Switch
                                checked={passwordChars.symbols}
                                className="data-[state=checked]:bg-matrix-green data-[state=unchecked]:bg-matrix-green/20"
                                onCheckedChange={(val) => setPasswordChars({...passwordChars, symbols: val})}
                            />
                        </div>
                    </div>

                    <div className="pt-3 border-t border-matrix-green/30">
                        <button
                            className="w-full py-2 font-mono text-xs tracking-widest uppercase transition-colors border text-matrix-green border-matrix-green/50 hover:bg-matrix-green/10"
                            onClick={() =>
                                setPasswordChars({
                                    ...passwordChars,
                                    passwordLength: password.length || 14,
                                })
                            }
                        >
                            [ REGENERATE ]
                        </button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
