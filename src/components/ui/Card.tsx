import { cn } from "@/lib/utils";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "glass";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = "glass", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-xl p-6",
                    {
                        "glass-panel": variant === "glass",
                        "bg-zinc-900 border border-zinc-800": variant === "default",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";
