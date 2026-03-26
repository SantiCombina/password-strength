import {useEffect, useRef} from "react";

export function MatrixBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const FONT_SIZE = 14;
        const CHARS =
            "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*<>[]{}|";

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        let columns = Math.floor(width / FONT_SIZE);
        let drops: number[] = Array.from({length: columns}, () => Math.floor(Math.random() * -(height / FONT_SIZE)));

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.floor(width / FONT_SIZE);
            drops = Array.from({length: columns}, () => Math.floor(Math.random() * -(height / FONT_SIZE)));
        };

        window.addEventListener("resize", handleResize);

        const draw = () => {
            ctx.fillStyle = "rgba(3, 13, 3, 0.08)";
            ctx.fillRect(0, 0, width, height);

            ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;

            for (let i = 0; i < drops.length; i++) {
                const x = i * FONT_SIZE;
                const y = drops[i] * FONT_SIZE;

                if (drops[i] > 0) {
                    ctx.fillStyle = "#55cc77";
                    ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y);
                }

                if (drops[i] > 1) {
                    ctx.fillStyle = "#1a7a35";
                    ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - FONT_SIZE);
                }

                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const intervalId = setInterval(draw, 160);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" style={{zIndex: 0, opacity: 0.28}} />;
}
