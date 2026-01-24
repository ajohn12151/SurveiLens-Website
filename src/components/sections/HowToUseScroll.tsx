"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Server, MapPin, ToggleLeft, Bell, CheckCircle, LucideIcon } from "lucide-react";

// Data Structure
interface Step {
    id: string;
    number: number;
    title: string;
    description: string;
    icon: LucideIcon;
}

const STEPS: Step[] = [
    {
        id: "connect",
        number: 1,
        title: "Connect your VMS view",
        description: "Open your existing camera/VMS view. Surveilens overlays on top — no new cameras required.",
        icon: Server,
    },
    {
        id: "zones",
        number: 2,
        title: "Choose zones & schedules",
        description: "Define restricted zones and after-hours schedules for the building.",
        icon: MapPin,
    },
    {
        id: "modes",
        number: 3,
        title: "Enable detection modes",
        description: "Turn on the signals you care about: after-hours, access, aggression cues, crowd anomalies.",
        icon: ToggleLeft,
    },
    {
        id: "alerts",
        number: 4,
        title: "Live monitoring & alerts",
        description: "As signals appear, Surveilens generates an alert card with context.",
        icon: Bell,
    },
    {
        id: "review",
        number: 5,
        title: "Review → Escalate",
        description: "Staff review, acknowledge, and escalate based on policy.",
        icon: CheckCircle,
    },
];

const HowToUseVisual = ({ activeIndex, totalSteps, isMobile = false }: { activeIndex: number, totalSteps: number, isMobile?: boolean }) => {
    return (
        <div className={cn(
            "relative w-full rounded-2xl border border-white/10 bg-black/80 overflow-hidden shadow-2xl transition-all duration-700",
            isMobile ? "aspect-[4/3] sm:aspect-video" : "aspect-video"
        )}>
            {/* --- BASE: Camera Mosaic Grid (Matches ProofSection) --- */}
            <div className={cn(
                "absolute inset-0 grid gap-1 p-2 transition-opacity duration-1000",
                isMobile ? "grid-cols-2 grid-rows-4" : "grid-cols-2 sm:grid-cols-4 grid-rows-4 sm:grid-rows-3"
            )}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            "relative rounded-sm overflow-hidden flex items-center justify-center",
                            "bg-zinc-900/80 border border-white/5",
                            isMobile && i >= 6 && "hidden sm:flex"
                        )}
                    >
                        {/* Fake camera view */}
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50" />
                        <span className="relative text-[7px] sm:text-[9px] text-zinc-600 font-mono">
                            CAM-{String(i + 1).padStart(2, "0")}
                        </span>
                        {/* Status indicator */}
                        <div className="absolute top-1 right-1 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-green-500/60" />
                    </div>
                ))}
            </div>

            {/* Existing System Label */}
            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-zinc-800/80 rounded text-[7px] sm:text-[10px] text-zinc-400 font-mono border border-white/10 opacity-30">
                EXISTING VMS
            </div>

            {/* Scanning Line Animation */}
            <div className="absolute inset-y-0 left-0 w-px bg-surveilens-blue/30 shadow-[0_0_15px_rgba(43,106,255,0.5)] z-10 animate-[scan_4s_linear_infinite]" />

            {/* --- LAYER: Surveilens Overlay (Matches ProofSection) --- */}
            <div className={cn(
                "absolute -inset-1 sm:-inset-2 rounded-2xl sm:rounded-3xl border sm:border-2 border-surveilens-blue/40 pointer-events-none transition-all duration-700",
                activeIndex >= 0 ? "opacity-100 animate-slow-pulse" : "opacity-0"
            )}>
                {/* Overlay Badge Top */}
                <div className={cn(
                    "absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 sm:py-1.5 bg-surveilens-blue text-white text-[10px] sm:text-sm font-semibold rounded-full shadow-lg shadow-surveilens-blue/30 whitespace-nowrap transition-all duration-500",
                    activeIndex === 0 ? "scale-110 animate-[glitch_1s_infinite]" : "scale-100"
                )}>
                    + SURVEILENS OVERLAY
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-l border-t sm:border-l-2 sm:border-t-2 border-surveilens-blue rounded-tl-lg sm:rounded-tl-xl transition-all duration-500" />
                <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-r border-t sm:border-r-2 sm:border-t-2 border-surveilens-blue rounded-tr-lg sm:rounded-tr-xl transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-l border-b sm:border-l-2 sm:border-b-2 border-surveilens-blue rounded-bl-lg sm:rounded-bl-xl transition-all duration-500" />
                <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-r border-b sm:border-r-2 sm:border-b-2 border-surveilens-blue rounded-br-lg sm:rounded-br-xl transition-all duration-500" />

                {/* Detection Zone Highlight (Step 2 Activation) */}
                <div className={cn(
                    "absolute top-1/4 left-1/4 w-1/3 h-1/3 border sm:border-2 border-dashed border-surveilens-blue/50 rounded-lg transition-all duration-1000 overflow-hidden",
                    activeIndex >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-95"
                )}>
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path
                            d="M 0 0 L 100 0 L 100 100 L 0 100 Z"
                            fill="rgba(43,106,255,0.05)"
                            stroke="rgba(43,106,255,0.3)"
                            strokeWidth="4"
                            strokeDasharray="400"
                            className={cn(
                                "transition-all duration-[1500ms]",
                                activeIndex >= 1 ? "animate-[draw-path_2s_forwards]" : "stroke-dashoffset-400"
                            )}
                        />
                    </svg>
                    <div className="absolute -top-3 left-2 px-1 py-0.5 bg-surveilens-blue/20 text-surveilens-blue text-[7px] sm:text-[8px] font-bold rounded">
                        ZONE A
                    </div>
                </div>

                {/* Signal Active Indicator (Step 4 Activation) */}
                <div className={cn(
                    "absolute bottom-4 sm:bottom-8 right-4 sm:right-8 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-black/90 rounded-xl border transition-all duration-500",
                    activeIndex >= 3 ? "border-surveilens-blue/50 opacity-100 translate-y-0" : "border-white/10 opacity-0 translate-y-4 shadow-xl"
                )}>
                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-surveilens-blue animate-ping" />
                    <span className="text-[10px] sm:text-xs text-white font-medium whitespace-nowrap uppercase tracking-tight">Signal Active</span>
                    {/* Radar Bloom for Step 4 Pop */}
                    {activeIndex === 3 && (
                        <div className="absolute inset-x-0 h-full bg-surveilens-blue/20 animate-[bloom_1.5s_infinite] rounded-lg -z-10" />
                    )}
                </div>
            </div>

            {/* Step 3: Toggle Panel (Appears on top for specific step) */}
            <div className={cn(
                "absolute top-4 right-4 bg-black/95 border border-white/10 rounded-xl p-3 space-y-2 backdrop-blur-xl transition-all duration-700 z-20 shadow-2xl",
                activeIndex === 2 ? "opacity-100 translate-x-0" : (activeIndex > 2 ? "opacity-40 translate-x-0" : "opacity-0 translate-x-8")
            )}>
                <div className="text-[8px] text-zinc-500 font-mono mb-1 uppercase tracking-widest">Detection Settings</div>
                {["Violence", "Intrusion", "Access"].map((label, idx) => (
                    <div key={label} className="flex items-center justify-between gap-6">
                        <span className="text-[9px] text-zinc-300 font-medium tracking-tight">{label}</span>
                        <div className={cn(
                            "w-7 h-3.5 rounded-full relative transition-all duration-500",
                            activeIndex >= 2 ? "bg-surveilens-blue" : "bg-zinc-800"
                        )} style={{ transitionDelay: `${idx * 150}ms` }}>
                            <div className={cn(
                                "absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-all duration-500 shadow-sm",
                                activeIndex >= 2 ? "left-4" : "left-0.5"
                            )} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Step 5: Action Buttons */}
            <div className={cn(
                "absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-700 z-20",
                activeIndex >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
                <button className="flex-1 py-2 sm:py-3 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-zinc-900/80 text-zinc-400 rounded-lg border border-white/5 backdrop-blur-md">
                    DISMISS
                </button>
                <button className="flex-2 py-2 sm:py-3 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-surveilens-blue text-white rounded-lg shadow-lg shadow-surveilens-blue/40 border border-white/10">
                    ESCALATE →
                </button>
            </div>

            {/* Base Progress Indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-900/50">
                <div
                    className="h-full bg-surveilens-blue transition-all duration-700 shadow-[0_0_15px_rgba(43,106,255,1)]"
                    style={{ width: `${((activeIndex + 1) / totalSteps) * 100}%` }}
                />
            </div>
        </div>
    )
}

export const HowToUseScroll = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Scroll tracking
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth < 1024) return; // Disable scroll tracking on mobile

            const viewportCenter = window.innerHeight / 2;
            let closestIndex = 0;
            let closestDistance = Infinity;

            cardRefs.current.forEach((card, index) => {
                if (!card) return;
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.top + rect.height / 2;
                const distance = Math.abs(cardCenter - viewportCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            setActiveIndex(closestIndex);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section id="howToUse" className="relative py-16 min-h-screen bg-black/40">
            {/* Section Header */}
            <div className="text-center pb-8 px-6">
                <span className="text-xs font-mono text-surveilens-blue uppercase tracking-widest">
                    Getting Started
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Scrolling Cards */}
                    <div className="space-y-[50vh] py-[25vh]">
                        {STEPS.map((step, i) => (
                            <div
                                key={step.id}
                                ref={(el) => { cardRefs.current[i] = el; }}
                                className={cn(
                                    "min-h-[35vh] p-8 rounded-2xl border transition-all duration-500",
                                    activeIndex === i
                                        ? "bg-surveilens-blue/10 border-surveilens-blue/50 shadow-[0_0_50px_rgba(43,106,255,0.2)] scale-100 opacity-100"
                                        : "bg-black/40 border-white/5 opacity-40 scale-95"
                                )}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <span className={cn(
                                        "flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold transition-all duration-500",
                                        activeIndex === i
                                            ? "bg-surveilens-blue text-white shadow-lg shadow-surveilens-blue/30"
                                            : "bg-white/10 text-zinc-500"
                                    )}>
                                        {step.number}
                                    </span>
                                    <step.icon className={cn(
                                        "h-7 w-7 transition-colors duration-300",
                                        activeIndex === i ? "text-surveilens-blue" : "text-zinc-600"
                                    )} />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-lg text-zinc-300 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Right: Sticky Stage */}
                    <div className="sticky top-1/4 h-fit">
                        <HowToUseVisual activeIndex={activeIndex} totalSteps={STEPS.length} />

                        {/* Step Indicator */}
                        <div className="flex justify-center gap-2 mt-5">
                            {STEPS.map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "rounded-full transition-all duration-500",
                                        activeIndex === i
                                            ? "w-8 h-2 bg-surveilens-blue shadow-lg shadow-surveilens-blue/30"
                                            : "w-2 h-2 bg-white/20"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile: Simple Stack */}
                <div className="lg:hidden space-y-12">
                    {STEPS.map((step, i) => (
                        <div
                            key={step.id}
                            className="space-y-6 opacity-0 animate-[fade-in-up_0.7s_ease-out_forwards]"
                            style={{ animationDelay: `${i * 150}ms` }}
                        >
                            {/* Mobile Visual - focused view for this specific step */}
                            <HowToUseVisual activeIndex={i} totalSteps={STEPS.length} isMobile={true} />

                            <div className="p-6 rounded-2xl bg-black/60 border border-white/10 mx-2 shadow-xl backdrop-blur-md">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surveilens-blue text-white font-bold shadow-lg shadow-surveilens-blue/20">
                                        {step.number}
                                    </span>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                                        <step.icon className="h-5 w-5 text-surveilens-blue" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
