"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ShieldAlert, Lock, Clock, Users, LucideIcon } from "lucide-react";

// Data Structure
interface Chapter {
    id: string;
    title: string;
    icon: LucideIcon;
    bullets: string[];
}

const CHAPTERS: Chapter[] = [
    {
        id: "aggression",
        title: "Violence & Aggression",
        icon: ShieldAlert,
        bullets: [
            "Fight detection (high-velocity motion)",
            "Aggressive rushing patterns",
            "Striking gestures & group swarms",
        ],
    },
    {
        id: "access",
        title: "Unauthorized Access",
        icon: Lock,
        bullets: [
            "Entry through restricted doors",
            "After-hours zone violations",
            "Tailgating indicators",
        ],
    },
    {
        id: "afterhours",
        title: "After-hours Presence",
        icon: Clock,
        bullets: [
            "Person detected in restricted time windows",
            "Motion + person confirmation",
            "Schedule-aware detection",
        ],
    },
    {
        id: "crowd",
        title: "Crowd Anomalies",
        icon: Users,
        bullets: [
            "Rapid dispersal / panic movement",
            "Running toward exits",
            "Sudden density changes",
        ],
    },
];

const SignalDemonstration = ({ activeIndex }: { activeIndex: number }) => {
    const chapter = CHAPTERS[activeIndex];

    return (
        <div className="relative aspect-video w-full rounded-2xl border border-white/10 bg-black/90 overflow-hidden shadow-2xl">
            {/* Camera Grid Background */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-0.5 p-2 opacity-20">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="bg-zinc-800 rounded-sm flex items-center justify-center text-[8px] text-zinc-600 font-mono">
                        CAM-{String(i + 1).padStart(2, "0")}
                    </div>
                ))}
            </div>

            {/* Status Bar */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-surveilens-blue animate-pulse" />
                    <span className="text-[10px] text-zinc-400 font-mono">SURVEILENS ACTIVE</span>
                </div>
                <span className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-zinc-300 border border-white/10">
                    {chapter.title}
                </span>
            </div>

            {/* Center Visualization Zone */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-44 h-44 rounded-xl border border-white/20 bg-white/5">

                    {/* Violence: Motion Lines */}
                    <div className={cn(
                        "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
                        activeIndex === 0 ? "opacity-100" : "opacity-0"
                    )}>
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                            <line x1="20" y1="80" x2="80" y2="20" stroke="currentColor" strokeWidth="1" className="text-white/40 animate-pulse" />
                            <line x1="30" y1="70" x2="70" y2="30" stroke="currentColor" strokeWidth="1.5" className="text-white/60 animate-pulse" style={{ animationDelay: "0.2s" }} />
                            <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="1" className="text-white/30 animate-pulse" style={{ animationDelay: "0.4s" }} />
                        </svg>
                        <div className="w-12 h-12 rounded-full border border-white/30 animate-ping" />
                        <div className="absolute w-8 h-8 rounded-full bg-white/10 animate-pulse" />
                    </div>

                    {/* Access: Zone Boundary */}
                    <div className={cn(
                        "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
                        activeIndex === 1 ? "opacity-100" : "opacity-0"
                    )}>
                        <div className="absolute inset-3 border-2 border-dashed border-white/30 rounded-lg animate-pulse" />
                        <div className="absolute inset-6 border border-white/20 rounded" />
                        <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-bold rounded border border-white/20">
                            RESTRICTED
                        </span>
                    </div>

                    {/* After-hours: Time Ring */}
                    <div className={cn(
                        "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
                        activeIndex === 2 ? "opacity-100" : "opacity-0"
                    )}>
                        <div className="w-28 h-28 border-2 border-dashed border-white/20 rounded-full animate-spin" style={{ animationDuration: "10s" }} />
                        <div className="absolute w-20 h-20 border border-white/10 rounded-full" />
                        <span className="absolute text-white/80 font-mono text-lg font-bold tracking-wider">22:47</span>
                    </div>

                    {/* Crowd: Scatter Dots */}
                    <div className={cn(
                        "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
                        activeIndex === 3 ? "opacity-100" : "opacity-0"
                    )}>
                        {Array.from({ length: 15 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 rounded-full bg-white/60 animate-ping"
                                style={{
                                    left: `${20 + Math.random() * 60}%`,
                                    top: `${20 + Math.random() * 60}%`,
                                    animationDelay: `${i * 0.1}s`,
                                    animationDuration: "1.8s",
                                }}
                            />
                        ))}
                        <div className="w-16 h-16 rounded-full border border-white/20 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Bottom Alert */}
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg border border-white/10 bg-black/60 backdrop-blur-sm flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <chapter.icon className="h-4 w-4 text-white/70" />
                </div>
                <div className="flex-1">
                    <div className="text-white text-sm font-medium">{chapter.title} detected</div>
                    <div className="text-zinc-500 text-[10px]">CAM-06 • Hallway A • 98% confidence</div>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 bg-surveilens-blue/20 rounded text-surveilens-blue font-mono">LIVE</span>
            </div>
        </div>
    );
};

export const SignalsAtlasScroll = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Scroll tracking
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth < 1024) return; // Disable scroll tracking on mobile to avoid jumping

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
        <section id="signalsAtlas" className="relative py-16 min-h-screen bg-black/40">
            {/* Section Header */}
            <div className="text-center pb-8 px-6">
                <span className="text-xs font-mono text-surveilens-blue uppercase tracking-widest">
                    Threat Detection Capabilities
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-[1fr_40px_1fr] gap-8 items-start">
                    {/* Left: Sticky Stage */}
                    <div className="sticky top-1/4 h-fit">
                        <SignalDemonstration activeIndex={activeIndex} />
                    </div>

                    {/* Center: Marker Rail */}
                    <div className="hidden lg:flex flex-col items-center py-[25vh] gap-0">
                        <div className="relative h-full w-px bg-white/10">
                            {/* Rail Line */}
                            <div className="absolute inset-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

                            {/* Moving Marker */}
                            <div
                                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-surveilens-blue shadow-[0_0_10px_rgba(43,106,255,0.5)] transition-all duration-500"
                                style={{ top: `${(activeIndex / (CHAPTERS.length - 1)) * 100}%` }}
                            />

                            {/* Checkpoints */}
                            {CHAPTERS.map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-300",
                                        activeIndex >= i
                                            ? "bg-surveilens-blue/50 scale-100"
                                            : "bg-white/20 scale-75"
                                    )}
                                    style={{ top: `${(i / (CHAPTERS.length - 1)) * 100}%` }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right: Scrolling Cards */}
                    <div className="space-y-[50vh] py-[25vh]">
                        {CHAPTERS.map((ch, i) => (
                            <div
                                key={ch.id}
                                ref={(el) => { cardRefs.current[i] = el; }}
                                className={cn(
                                    "min-h-[40vh] p-8 rounded-2xl border transition-all duration-500",
                                    activeIndex === i
                                        ? "bg-white/5 border-white/20 shadow-2xl scale-100 opacity-100"
                                        : "bg-transparent border-transparent opacity-30 scale-95"
                                )}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 rounded-xl bg-white/10">
                                        <ch.icon className="h-7 w-7 text-white/80" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">{ch.title}</h3>
                                </div>

                                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Signal Examples</p>
                                <ul className="space-y-3">
                                    {ch.bullets.map((bullet, j) => (
                                        <li key={j} className="flex items-start gap-3 text-zinc-300">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0 bg-surveilens-blue" />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile: Enhanced Stack */}
                <div className="lg:hidden space-y-12">
                    {CHAPTERS.map((ch, i) => (
                        <div key={ch.id} className="space-y-6">
                            <SignalDemonstration activeIndex={i} />

                            <div className="p-6 rounded-2xl border border-white/10 bg-white/5 mx-2">
                                <div className="flex items-center gap-3 mb-4">
                                    <ch.icon className="h-6 w-6 text-white/70" />
                                    <h3 className="text-lg font-bold text-white">{ch.title}</h3>
                                </div>
                                <ul className="space-y-2">
                                    {ch.bullets.map((b, j) => (
                                        <li key={j} className="text-zinc-400 text-sm flex gap-2">
                                            <span className="text-surveilens-blue mt-1">•</span>
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
