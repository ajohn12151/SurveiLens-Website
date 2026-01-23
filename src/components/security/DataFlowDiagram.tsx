"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Shield, Lock, CheckCircle2 } from "lucide-react";

// Types
interface FlowStep {
    id: string;
    title: string;
    description: string;
    state: "process" | "scan" | "secure" | "deliver";
}

const STEPS: FlowStep[] = [
    {
        id: "process",
        title: "Process-Only (Default)",
        description: "Video streams from your VMS are processed in real-time RAM. Raw footage stays on your NVR/Cloud. We almost never store video.",
        state: "process"

    },
    {
        id: "alert",
        title: "Alert Generation",
        description: "When a threat is detected, we generate a metadata packet (timestamp, location, type) and a momentary clip ONLY if configured.",
        state: "scan"
    },
    {
        id: "access",
        title: "Access Control Gate",
        description: "Data is encrypted at rest. Access is strictly gated by RBAC roles (Admin vs Viewer). Tenant isolation ensures data separation.",
        state: "secure"
    },
    {
        id: "delivery",
        title: "Secure Delivery",
        description: "Alerts are delivered to designated staff devices via secure push notifications. Every view is logged for auditability.",
        state: "deliver"
    },
];

const DataFlowVisual = ({ state }: { state: "process" | "scan" | "secure" | "deliver" }) => {
    return (
        <div className="relative w-full h-[250px] sm:h-[400px] flex items-center justify-center bg-zinc-900/30 rounded-3xl border border-white/5 backdrop-blur-sm overflow-hidden mb-6 lg:mb-0">
            {/* Central Animation Container */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">

                {/* STATE 1: PROCESS (Spinning Rings) */}
                <div className={cn(
                    "absolute inset-0 flex items-center justify-center transition-all duration-700 transform",
                    state === "process" ? "opacity-100 scale-100" : "opacity-0 scale-75"
                )}>
                    <div className="absolute w-32 h-32 sm:w-48 sm:h-48 border-2 border-surveilens-blue/30 rounded-full border-t-surveilens-blue animate-spin" style={{ animationDuration: '3s' }} />
                    <div className="absolute w-24 h-24 sm:w-32 sm:h-32 border-2 border-surveilens-blue/20 rounded-full border-b-surveilens-blue animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }} />
                    <div className="absolute w-4 h-4 bg-surveilens-blue rounded-full blur-[10px] animate-pulse" />
                    <span className="mt-48 sm:mt-64 text-xs font-mono text-surveilens-blue tracking-widest absolute">PROCESSING</span>
                </div>

                {/* STATE 2: SCAN (Red Core + Pulse) */}
                <div className={cn(
                    "absolute inset-0 flex items-center justify-center transition-all duration-700 transform",
                    state === "scan" ? "opacity-100 scale-100" : "opacity-0 scale-75"
                )}>
                    <div className="absolute w-20 h-20 border border-red-500/50 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                    <div className="absolute w-20 h-20 border border-red-500/50 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
                    <div className="w-24 h-24 bg-red-500/10 rounded-full border border-red-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-pulse">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                    </div>
                    <span className="mt-48 sm:mt-64 text-xs font-mono text-red-400 tracking-widest absolute">THREAT DETECTED</span>
                </div>

                {/* STATE 3: SECURE (Shield + Lock) */}
                <div className={cn(
                    "absolute inset-0 flex items-center justify-center transition-all duration-700 transform",
                    state === "secure" ? "opacity-100 scale-100" : "opacity-0 scale-75"
                )}>
                    <div className="relative">
                        <Shield className="w-32 h-32 text-purple-500 fill-purple-500/10 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] animate-pulse" strokeWidth={1} style={{ animationDuration: '3s' }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Lock className="w-12 h-12 text-white drop-shadow-md" />
                        </div>
                    </div>
                    <span className="mt-48 sm:mt-64 text-xs font-mono text-purple-400 tracking-widest absolute">ENCRYPTED</span>
                </div>

                {/* STATE 4: DELIVER (Flowing Data) */}
                <div className={cn(
                    "absolute inset-0 flex items-center justify-center transition-all duration-700 transform",
                    state === "deliver" ? "opacity-100 scale-100" : "opacity-0 scale-75"
                )}>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <CheckCircle2 className="w-16 h-16 text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.4)]" />
                        <div className="space-y-2 w-48">
                            <div className="h-2 w-full bg-white/10 rounded overflow-hidden">
                                <div className="h-full bg-green-400 w-full animate-pulse" />
                            </div>
                            <div className="h-2 w-2/3 bg-white/10 rounded" />
                        </div>
                    </div>
                    <span className="mt-48 sm:mt-64 text-xs font-mono text-green-400 tracking-widest absolute">LOGGED & DELIVERED</span>
                </div>

            </div>
        </div>
    );
}

export const DataFlowDiagram = () => {
    const [activeStep, setActiveStep] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll Observer (Desktop Only basically, but benign on mobile)
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth < 1024) return; // Only track on desktop
            if (!containerRef.current) return;

            const steps = containerRef.current.querySelectorAll(".flow-step");
            const viewportCenter = window.innerHeight / 2;

            steps.forEach((step, index) => {
                const rect = step.getBoundingClientRect();
                if (rect.top < viewportCenter && rect.bottom > viewportCenter) {
                    setActiveStep(index);
                }
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section ref={containerRef} className="relative py-24 bg-black/50 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

                {/* Sticky Animation Stage (Desktop Only) */}
                <div className="hidden lg:block lg:sticky lg:top-32 h-fit">
                    <DataFlowVisual state={STEPS[activeStep].state} />
                </div>

                {/* Steps Column */}
                <div className="space-y-12 lg:space-y-[40vh] py-0 lg:py-[10vh]">
                    {STEPS.map((step, i) => (
                        <div
                            key={step.id}
                            className={cn(
                                "flow-step transition-all duration-500",
                                // Desktop styles for inactive steps
                                "lg:p-8 lg:rounded-2xl lg:border",
                                activeStep === i
                                    ? "lg:bg-white/5 lg:border-white/20 lg:opacity-100 lg:scale-100"
                                    : "lg:bg-transparent lg:border-transparent lg:opacity-30 lg:scale-95"
                            )}
                        >
                            {/* Mobile Visual (Embedded) */}
                            <div className="block lg:hidden mb-6">
                                <DataFlowVisual state={step.state} />
                            </div>

                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 lg:p-0 lg:bg-transparent lg:border-none">
                                <span className="text-xs font-mono text-surveilens-blue mb-2 block">STEP 0{i + 1}</span>
                                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                                <p className="text-zinc-400 leading-relaxed text-lg">{step.description}</p>

                                {i === 2 && (
                                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs font-mono">
                                        <Lock className="w-3 h-3" />
                                        ENCRYPTED AT REST (AES-256)
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};
