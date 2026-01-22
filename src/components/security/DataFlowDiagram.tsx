"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
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

export const DataFlowDiagram = () => {
    const [activeStep, setActiveStep] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const diagramRef = useRef<HTMLDivElement>(null);

    // Scroll Observer
    useEffect(() => {
        const handleScroll = () => {
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
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Animation Logic
    useEffect(() => {
        const state = STEPS[activeStep].state;

        // Reset all states first
        animate(".anim-state", {
            opacity: 0,
            scale: 0.8,
            duration: 600,
            easing: "easeOutQuad"
        });

        // Activate current state
        animate(`#state-${state}`, {
            opacity: 1,
            scale: 1,
            duration: 800,
            easing: "easeOutElastic(1, .8)"
        });

        // Specific State Animations
        if (state === "process") {
            animate("#ring-outer", {
                rotate: 360,
                duration: 8000,
                loop: true,
                easing: "linear"
            });
            animate("#ring-inner", {
                rotate: -360,
                duration: 12000,
                loop: true,
                easing: "linear"
            });
        }

        if (state === "scan") {
            animate(".scan-pulse", {
                scale: [1, 2],
                opacity: [0.8, 0],
                duration: 1500,
                loop: true,
                easing: "easeOutQuad",
                delay: (el, i) => i * 400
            });
        }

        if (state === "secure") {
            animate("#shield-icon", {
                strokeDashoffset: [0, 0], // Ensure visible
                scale: [0.9, 1],
                duration: 1000,
                direction: 'alternate',
                loop: true,
                easing: "easeInOutSine"
            });
        }

    }, [activeStep]);

    return (
        <section ref={containerRef} className="relative py-24 bg-black/50 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

                {/* Sticky Animation Stage */}
                <div className="lg:sticky lg:top-32 h-[400px] flex items-center justify-center bg-zinc-900/30 rounded-3xl border border-white/5 backdrop-blur-sm overflow-hidden" ref={diagramRef}>

                    {/* Central Animation Container */}
                    <div className="relative w-64 h-64 flex items-center justify-center">

                        {/* STATE 1: PROCESS (Spinning Rings) */}
                        <div id="state-process" className="anim-state absolute inset-0 flex items-center justify-center opacity-0">
                            <div id="ring-outer" className="absolute w-48 h-48 border-2 border-surveilens-blue/30 rounded-full border-t-surveilens-blue" />
                            <div id="ring-inner" className="absolute w-32 h-32 border-2 border-surveilens-blue/20 rounded-full border-b-surveilens-blue" />
                            <div className="absolute w-4 h-4 bg-surveilens-blue rounded-full blur-[10px] animate-pulse" />
                            <span className="mt-64 text-xs font-mono text-surveilens-blue tracking-widest absolute">PROCESSING</span>
                        </div>

                        {/* STATE 2: SCAN (Red Core + Pulse) */}
                        <div id="state-scan" className="anim-state absolute inset-0 flex items-center justify-center opacity-0">
                            <div className="scan-pulse absolute w-20 h-20 border border-red-500/50 rounded-full" />
                            <div className="scan-pulse absolute w-20 h-20 border border-red-500/50 rounded-full" />
                            <div className="w-24 h-24 bg-red-500/10 rounded-full border border-red-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                                <div className="w-3 h-3 bg-red-500 rounded-full" />
                            </div>
                            <span className="mt-64 text-xs font-mono text-red-400 tracking-widest absolute">THREAT DETECTED</span>
                        </div>

                        {/* STATE 3: SECURE (Shield + Lock) */}
                        <div id="state-secure" className="anim-state absolute inset-0 flex items-center justify-center opacity-0">
                            <Shield id="shield-icon" className="w-32 h-32 text-purple-500 fill-purple-500/10 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]" strokeWidth={1} />
                            <Lock className="absolute w-12 h-12 text-white drop-shadow-md" />
                            <span className="mt-64 text-xs font-mono text-purple-400 tracking-widest absolute">ENCRYPTED</span>
                        </div>

                        {/* STATE 4: DELIVER (Flowing Data) */}
                        <div id="state-deliver" className="anim-state absolute inset-0 flex items-center justify-center opacity-0">
                            <div className="flex flex-col items-center justify-center gap-4">
                                <CheckCircle2 className="w-16 h-16 text-green-400" />
                                <div className="space-y-2 w-48">
                                    <div className="h-2 w-full bg-white/10 rounded overflow-hidden">
                                        <div className="h-full bg-green-400 w-full animate-[shimmer_1s_infinite]" />
                                    </div>
                                    <div className="h-2 w-2/3 bg-white/10 rounded" />
                                </div>
                            </div>
                            <span className="mt-64 text-xs font-mono text-green-400 tracking-widest absolute">LOGGED & DELIVERED</span>
                        </div>

                    </div>

                </div>

                {/* Steps Column */}
                <div className="space-y-[40vh] py-[10vh]">
                    {STEPS.map((step, i) => (
                        <div
                            key={step.id}
                            className={cn(
                                "flow-step p-8 rounded-2xl border transition-all duration-500",
                                activeStep === i
                                    ? "bg-white/5 border-white/20 opacity-100 scale-100"
                                    : "bg-transparent border-transparent opacity-30 scale-95"
                            )}
                        >
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
                    ))}
                </div>

            </div>
        </section>
    );
};
