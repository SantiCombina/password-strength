import {useState, useEffect, useRef} from "react";

export function useCopyToClipboard() {
    const [isCopied, setIsCopied] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const copyToClipboard = (text: string) => {
        setIsCopied(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        navigator.clipboard
            .writeText(text)
            .then(() => {
                setIsCopied(true);
                timeoutRef.current = setTimeout(() => setIsCopied(false), 2000);
            })
            .catch(() => {
                alert("Failed to copy to clipboard");
            });
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return {isCopied, copyToClipboard};
}
