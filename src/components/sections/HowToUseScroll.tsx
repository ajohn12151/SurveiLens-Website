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

const HowToUseVisual = ({ activeIndex, totalSteps }: { activeIndex: number, totalSteps: number }) => {
    return (
        <div className="relative aspect-video w-full rounded-2xl border border-white/10 bg-black/90 overflow-hidden shadow-2xl">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-4 grid-rows-4 sm:grid-rows-3 gap-0.5 p-2">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            "rounded-sm flex items-center justify-center text-[8px] font-mono transition-all duration-500",
                            i === 5 || i === 6 ? "bg-surveilens-blue/20 text-surveilens-blue/60" : "bg-zinc-800/50 text-zinc-600/50",
                            i >= 6 && "hidden sm:flex"
                        )}
                        style={{ animationDelay: `${i * 50}ms` }}
                    >
                        CAM-{String(i + 1).padStart(2, "0")}
                    </div>
                ))}
            </div>

            {/* Scan Line Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-y-0 left-0 w-px bg-surveilens-blue/30 shadow-[0_0_15px_rgba(43,106,255,0.5)] z-10 animate-[scan_4s_linear_infinite]" />
            </div>

            {/* Step 1: Overlay Layer */}
            <div className={cn(
                "absolute inset-2 border-2 rounded-xl transition-all duration-700",
                activeIndex >= 0
                    ? "border-surveilens-blue/40 opacity-100 shadow-[inset_0_0_30px_rgba(43,106,255,0.1)]"
                    : "border-transparent opacity-0"
            )}>
                <div className={cn(
                    "absolute top-2 left-2 px-3 py-1 rounded-full text-[10px] font-mono transition-all duration-500",
                    activeIndex >= 0 ? "bg-surveilens-blue/20 text-surveilens-blue" : "opacity-0"
                )}>
                    ● SURVEILENS ACTIVE
                </div>
            </div>

            {/* Step 2: Zone Boxes */}
            <div className={cn(
                "absolute inset-0 transition-all duration-700",
                activeIndex >= 1 ? "opacity-100" : "opacity-0"
            )}>
                <div className={cn(
                    "absolute top-1/4 left-1/4 w-24 h-20 border-2 border-dashed rounded-lg transition-all duration-500",
                    activeIndex >= 1 ? "border-white/40 animate-pulse" : "border-transparent"
                )} />
                <div className={cn(
                    "absolute bottom-1/4 right-1/4 w-20 h-16 border-2 border-dashed rounded-lg transition-all duration-500",
                    activeIndex >= 1 ? "border-white/30" : "border-transparent"
                )} style={{ animationDelay: "0.5s" }} />
                <div className={cn(
                    "absolute top-1/4 left-1/4 -translate-y-6 px-2 py-0.5 rounded text-[9px] font-bold transition-all duration-500",
                    activeIndex >= 1 ? "bg-white/10 text-white/80 border border-white/20" : "opacity-0"
                )}>
                    ZONE A
                </div>
            </div>

            {/* Step 3: Toggle Panel */}
            <div className={cn(
                "absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/80 border rounded-lg sm:rounded-xl p-2 sm:p-3 space-y-1.5 sm:space-y-2 backdrop-blur-md transition-all duration-700",
                activeIndex >= 2 ? "border-white/20 opacity-100 translate-x-0" : "border-transparent opacity-0 translate-x-4"
            )}>
                {["After-hours", "Access", "Violence", "Crowd"].map((label, idx) => (
                    <div key={label} className="flex items-center justify-between gap-2 sm:gap-4">
                        <span className="text-[7px] sm:text-[9px] text-zinc-400">{label}</span>
                        <div className={cn(
                            "w-5 h-2.5 sm:w-7 sm:h-3.5 rounded-full relative transition-all duration-300",
                            activeIndex >= 2 ? "bg-surveilens-blue" : "bg-zinc-700"
                        )} style={{ transitionDelay: `${idx * 100}ms` }}>
                            <div className={cn(
                                "absolute top-0.5 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-white shadow-sm transition-all duration-300",
                                activeIndex >= 2 ? "left-3 sm:left-3.5" : "left-0.5"
                            )} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Step 4: Alert Card */}
            <div className={cn(
                "absolute bottom-10 sm:bottom-14 left-2 sm:left-3 right-2 sm:right-3 p-2 sm:p-4 rounded-lg sm:rounded-xl bg-black/90 border flex items-center gap-3 sm:gap-4 backdrop-blur-md transition-all duration-700",
                activeIndex >= 3
                    ? "border-surveilens-blue/40 opacity-100 translate-y-0 shadow-[0_0_30px_rgba(43,106,255,0.15)]"
                    : "border-transparent opacity-0 translate-y-3"
            )}>
                <div className="relative shrink-0">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 bg-surveilens-blue/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                        <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-surveilens-blue" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-2 sm:w-3 h-2 sm:h-3 bg-surveilens-blue rounded-full animate-ping" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-white text-xs sm:text-sm font-semibold truncate">After-hours Presence</div>
                    <div className="text-zinc-500 text-[9px] sm:text-[11px] truncate">CAM-06 • Hallway A • 94%</div>
                </div>
                <span className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 bg-surveilens-blue/20 rounded-full text-surveilens-blue font-mono animate-pulse shrink-0">● LIVE</span>
            </div>

            {/* Step 5: Action Buttons */}
            <div className={cn(
                "absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 flex gap-1.5 sm:gap-2 transition-all duration-700",
                activeIndex >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}>
                <button className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs bg-zinc-800 text-zinc-300 rounded-md sm:rounded-lg border border-white/10 hover:bg-zinc-700 transition-colors font-medium">
                    Dismiss
                </button>
                <button className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs bg-surveilens-blue text-white rounded-md sm:rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-surveilens-blue/30 font-medium">
                    Escalate →
                </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800/50">
                <div
                    className="h-full bg-gradient-to-r from-surveilens-blue to-blue-400 transition-all duration-500 shadow-[0_0_10px_rgba(43,106,255,0.5)]"
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
                            {/* Mobile Visual - always showing state up to this step */}
                            <HowToUseVisual activeIndex={i} totalSteps={STEPS.length} />

                            <div className="p-6 rounded-2xl bg-black/60 border border-white/10 mx-2 shadow-xl">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surveilens-blue text-white font-bold shadow-lg shadow-surveilens-blue/20">
                                        {step.number}
                                    </span>
                                    <step.icon className="h-6 w-6 text-surveilens-blue" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CSS for scan animation */}
            <style jsx>{`
                @keyframes scan {
                    0% { top: -2px; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
        </section>
    );
};
