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

    return (
        <Popover onOpenChange={(e) => e && setPasswordChars({...passwordChars, passwordLength: 14})}>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Generator</h4>
                        <p className="text-sm text-muted-foreground">Set the options.</p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid items-center grid-cols-2 gap-4">
                            <Label>Length ({password.length})</Label>
                            <Slider
                                min={5}
                                value={[password.length]}
                                onValueChange={(e) => setPasswordChars({...passwordChars, passwordLength: e[0]})}
                            />
                        </div>
                        <div className="grid items-center grid-cols-2 gap-4">
                            <Label>A-Z</Label>
                            <Switch
                                checked={passwordChars.uppercase}
                                onCheckedChange={(val) => setPasswordChars({...passwordChars, uppercase: val})}
                            />
                        </div>
                        <div className="grid items-center grid-cols-2 gap-4">
                            <Label>a-z</Label>
                            <Switch
                                checked={passwordChars.lowercase}
                                onCheckedChange={(val) => setPasswordChars({...passwordChars, lowercase: val})}
                            />
                        </div>
                        <div className="grid items-center grid-cols-2 gap-4">
                            <Label>0-9</Label>
                            <Switch
                                checked={passwordChars.numbers}
                                onCheckedChange={(val) => setPasswordChars({...passwordChars, numbers: val})}
                            />
                        </div>
                        <div className="grid items-center grid-cols-2 gap-4">
                            <Label>!@#$%&*</Label>
                            <Switch
                                checked={passwordChars.symbols}
                                onCheckedChange={(val) => setPasswordChars({...passwordChars, symbols: val})}
                            />
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
