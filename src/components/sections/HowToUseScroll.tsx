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
            "relative w-full rounded-2xl border border-white/10 bg-black/90 overflow-hidden shadow-2xl",
            isMobile ? "aspect-[4/3] sm:aspect-video" : "aspect-video"
        )}>
            {/* Animated Grid Background - Subtler on mobile */}
            <div className={cn(
                "absolute inset-0 grid gap-0.5 p-2 transition-opacity duration-1000",
                isMobile ? "grid-cols-2 grid-rows-2 opacity-10" : "grid-cols-4 grid-rows-3 opacity-20"
            )}>
                {Array.from({ length: isMobile ? 4 : 12 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-zinc-800/50 rounded-sm flex items-center justify-center text-[7px] text-zinc-600 font-mono"
                    >
                        CAM-{String(i + 1).padStart(2, "0")}
                    </div>
                ))}
            </div>

            {/* Scan Line Effect - Global definition */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                <div className="absolute inset-y-0 left-0 w-px bg-surveilens-blue/40 shadow-[0_0_15px_rgba(43,106,255,0.6)] animate-[scan_4s_linear_infinite]" />
            </div>

            {/* Step 1: System Boot-up / Overlay Layer */}
            <div className={cn(
                "absolute inset-0 transition-all duration-700 flex items-center justify-center",
                activeIndex >= 0 ? "opacity-100" : "opacity-0"
            )}>
                <div className={cn(
                    "absolute inset-4 border border-surveilens-blue/30 rounded-xl transition-all duration-1000",
                    activeIndex === 0 && "animate-[glitch_2s_infinite]"
                )}>
                    {/* Corners */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-surveilens-blue/60 rounded-tl-lg" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-surveilens-blue/60 rounded-br-lg" />
                </div>

                <div className={cn(
                    "px-4 py-2 bg-surveilens-blue/10 border border-surveilens-blue/30 rounded-lg backdrop-blur-md transition-all duration-500",
                    activeIndex === 0 ? "scale-100 shadow-[0_0_30px_rgba(43,106,255,0.2)]" : "scale-90"
                )}>
                    <span className="text-[10px] sm:text-xs font-mono text-surveilens-blue font-bold tracking-tighter">
                        SYSTEM STATUS: ACTIVE
                    </span>
                    <div className="h-0.5 w-full bg-surveilens-blue/20 mt-1 overflow-hidden">
                        <div className="h-full bg-surveilens-blue animate-[scan_2s_linear_infinite]" style={{ width: '30%' }} />
                    </div>
                </div>
            </div>

            {/* Step 2: SVG Path Drawing for Zones */}
            <div className={cn(
                "absolute inset-0 transition-all duration-700 pointer-events-none",
                activeIndex >= 1 ? "opacity-100" : "opacity-0"
            )}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 225">
                    {/* Zone A path drawing */}
                    <path
                        d="M 100 60 L 250 60 L 250 140 L 100 140 Z"
                        fill="rgba(43,106,255,0.05)"
                        stroke="rgba(43,106,255,0.5)"
                        strokeWidth="2"
                        strokeDasharray="1000"
                        className={cn(
                            "transition-all duration-[2000ms] ease-in-out",
                            activeIndex >= 1 ? "animate-[draw-path_3s_forwards]" : "stroke-dashoffset-1000"
                        )}
                    />
                    {/* Text tag positioned at the path start */}
                    <foreignObject x="105" y="65" width="60" height="20">
                        <div className="text-[8px] font-bold text-white bg-surveilens-blue/40 px-1.5 py-0.5 rounded border border-white/20">
                            ZONE A
                        </div>
                    </foreignObject>
                </svg>
            </div>

            {/* Step 3: Toggles with Light Sweep */}
            <div className={cn(
                "absolute top-4 right-4 bg-black/60 border border-white/10 rounded-xl p-3 space-y-2 backdrop-blur-xl transition-all duration-700",
                activeIndex === 2 ? "translate-x-0 opacity-100 shadow-[0_0_40px_rgba(43,106,255,0.1)]" : (activeIndex > 2 ? "opacity-40 translate-x-0" : "translate-x-8 opacity-0")
            )}>
                {["Intrusion", "Violence", "Loitering"].map((label, idx) => (
                    <div key={label} className="flex items-center justify-between gap-6">
                        <span className="text-[9px] text-zinc-400 font-medium uppercase tracking-wider">{label}</span>
                        <div className={cn(
                            "w-8 h-4 rounded-full relative transition-all duration-500",
                            activeIndex >= 2 ? "bg-surveilens-blue" : "bg-zinc-800"
                        )} style={{ transitionDelay: `${idx * 150}ms` }}>
                            <div className={cn(
                                "absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-500 shadow-md",
                                activeIndex >= 2 ? "left-4.5" : "left-0.5"
                            )} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Step 4: Radar Ping Alert Entrance */}
            <div className={cn(
                "absolute bottom-6 sm:bottom-10 left-4 sm:left-6 right-4 sm:right-6 p-3 sm:p-5 rounded-xl bg-black/80 border transition-all duration-700 flex items-center gap-4 backdrop-blur-2xl overflow-hidden",
                activeIndex >= 3
                    ? "border-surveilens-blue/50 opacity-100 translate-y-0 shadow-[0_20px_40px_-15px_rgba(43,106,255,0.3)]"
                    : "border-transparent opacity-0 translate-y-8"
            )}>
                {/* Radar Bloom Background */}
                {activeIndex === 3 && (
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-surveilens-blue/20 rounded-full animate-[bloom_1.5s_infinite]" />
                )}

                <div className="relative shrink-0">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 bg-surveilens-blue/20 rounded-xl flex items-center justify-center border border-surveilens-blue/30">
                        <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-surveilens-blue" />
                    </div>
                    {/* Live blip */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-surveilens-blue rounded-full border-2 border-black" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-white text-sm sm:text-base font-bold tracking-tight truncate">HIGH THREAT SIGNAL</div>
                    <div className="text-zinc-500 text-[9px] sm:text-xs font-mono uppercase truncate tracking-widest mt-0.5">Hallway C • Cam-09 • 10:24 PM</div>
                </div>
                <div className="hidden sm:flex flex-col items-end shrink-0">
                    <span className="text-[10px] px-2 py-0.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full font-bold animate-pulse">CRITICAL</span>
                </div>
            </div>

            {/* Step 5: High-Impact Action Buttons */}
            <div className={cn(
                "absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-700",
                activeIndex >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
                <button className="flex-1 py-3 text-[10px] font-bold uppercase tracking-widest bg-zinc-900 text-zinc-400 rounded-lg border border-white/5 hover:bg-zinc-800 transition-all">
                    ACKNOWLEDGE
                </button>
                <button className="flex-2 py-3 text-[10px] font-bold uppercase tracking-widest bg-surveilens-blue text-white rounded-lg shadow-lg shadow-surveilens-blue/30 hover:bg-blue-600 transition-all border border-white/10">
                    ESCAlATE TO SECURITY →
                </button>
            </div>

            {/* Progress Bar - Thicker & Glowing */}
            <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-zinc-900">
                <div
                    className="h-full bg-gradient-to-r from-surveilens-blue to-blue-400 transition-all duration-700 shadow-[0_0_20px_rgba(43,106,255,0.8)]"
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
