import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "ghost" | "glass";
    size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-surveilens-blue disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-surveilens-blue text-white hover:bg-blue-600 shadow-[0_0_20px_rgba(43,106,255,0.3)]":
                            variant === "primary",
                        "hover:bg-white/10 text-white": variant === "ghost",
                        "glass-panel text-white hover:bg-white/10 border-white/10":
                            variant === "glass",
                        "h-8 px-3 text-xs": size === "sm",
                        "h-10 px-6 py-2": size === "md",
                        "h-12 px-8 text-lg": size === "lg",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
