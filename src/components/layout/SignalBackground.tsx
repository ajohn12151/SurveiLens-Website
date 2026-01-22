"use client";

import React, { useEffect, useRef } from "react";

export const SignalBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const dots: { x: number; y: number; size: number; alpha: number }[] = [];
        const DOT_COUNT = 80;

        for (let i = 0; i < DOT_COUNT; i++) {
            dots.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5 + 0.1,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "#2B6AFF"; // Surveilens Blue shade basis

            // Draw Connection Lines First
            ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
            ctx.lineWidth = 0.5;

            // Update & Draw Dots
            dots.forEach((dot) => {
                // Simple drift animation if not reduced motion
                // We can pass a flag, but for now let's just draw static if we want full safety.
                // Actually, let's keep it subtle.

                ctx.globalAlpha = dot.alpha;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Connections O(N^2) but N=80 is fine
            for (let i = 0; i < dots.length; i++) {
                for (let j = i + 1; j < dots.length; j++) {
                    const dx = dots[i].x - dots[j].x;
                    const dy = dots[i].y - dots[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(dots[i].x, dots[i].y);
                        ctx.lineTo(dots[j].x, dots[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        // Initial Draw
        draw();

        // Resize Handler
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            draw();
        };

        window.addEventListener("resize", handleResize);

        // Animation Loop (Optional - if we want movement)
        // For "Static constellation", we don't loop requestAnimationFrame.
        // This matches the "reduced motion" as default behavior for this background 
        // to keep it performant and subtle as per design doc (constellation that slowly aligns... 
        // actually design doc said "faint field ... no cheesy particle storm").
        // Let's leave it static for V1 to ensure 90+ Lighthouse score as requested.

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 pointer-events-none opacity-40 bg-surveilens-bg"
        />
    );
};
