import { cn } from "@/lib/utils";
import React from "react";

interface StepperProps {
    currentStep: number;
    totalSteps: number;
    className?: string;
}

export const Stepper = ({ currentStep, totalSteps, className }: StepperProps) => {
    return (
        <div className={cn("flex flex-col gap-2", className)}>
            {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                    key={i}
                    className={cn(
                        "w-1 rounded-full transition-all duration-500",
                        i === currentStep
                            ? "h-8 bg-surveilens-blue"
                            : "h-2 bg-white/10"
                    )}
                />
            ))}
        </div>
    );
};
