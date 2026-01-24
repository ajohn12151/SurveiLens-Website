"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Server, MapPin, ToggleLeft, Bell, CheckCircle, LucideIcon, ShieldAlert } from "lucide-react";

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

const HowToUseVisual = ({ activeIndex, currentStep, sectionInView, isMobile = false }: { activeIndex: number, currentStep: number, sectionInView: boolean, isMobile?: boolean }) => {
    // Cinematic Step 1 logic: Show black for 1000ms, then reveal grid
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        // Trigger reveal only when section is in view and we are on the relevant step
        if (sectionInView && activeIndex === currentStep) {
            const timer = setTimeout(() => setIsRevealed(true), 1000);
            return () => clearTimeout(timer);
        } else if (activeIndex > currentStep) {
            // If we've already passed this step, keep it revealed
            setIsRevealed(true);
        } else if (!sectionInView && activeIndex === 0) {
            // Reset Step 1 if scrolled completely away
            setIsRevealed(false);
        }
    }, [activeIndex, currentStep, sectionInView]);

    return (
        <div className={cn(
            "relative w-full rounded-2xl border border-white/10 bg-black overflow-hidden shadow-2xl transition-all duration-700 mx-auto",
            isMobile ? "aspect-[16/10]" : "aspect-video"
        )}>
            {/* --- BASE: Camera Mosaic Grid (Cinematic Reveal) --- */}
            <div className={cn(
                "absolute inset-0 grid gap-1 p-2 transition-all duration-1000 ease-out",
                isRevealed ? "opacity-100 scale-100" : "opacity-0 scale-110",
                "grid-cols-4 grid-rows-2"
            )}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            "relative rounded-sm overflow-hidden flex items-center justify-center transition-all duration-1000",
                            "bg-zinc-900 border border-white/5"
                        )}
                        style={{ transitionDelay: isRevealed ? `${i * 50}ms` : "0ms" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black/80" />
                        <span className="relative text-[7px] sm:text-[8px] text-zinc-700 font-mono">
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-green-500/20" />
                    </div>
                ))}
            </div>

            {/* Existing System Label */}
            <div className={cn(
                "absolute bottom-2 left-2 px-1.5 py-0.5 bg-zinc-800/80 rounded text-[7px] sm:text-[9px] text-zinc-500 font-mono border border-white/5 transition-opacity duration-1000",
                isRevealed ? "opacity-40" : "opacity-0"
            )}>
                VMS_ACTIVE
            </div>

            {/* Scanning Line Animation */}
            <div className={cn(
                "absolute inset-y-0 left-0 w-px bg-surveilens-blue/40 shadow-[0_0_15px_rgba(43,106,255,0.6)] z-10 animate-[scan_4s_linear_infinite] transition-opacity duration-1000",
                isRevealed ? "opacity-100" : "opacity-0"
            )} />

            {/* --- LAYER: Surveilens Overlay --- */}
            <div className={cn(
                "absolute -inset-1 sm:-inset-1.5 rounded-2xl sm:rounded-3xl border sm:border-2 border-surveilens-blue/40 pointer-events-none transition-all duration-700 z-20",
                isRevealed ? "opacity-100 animate-slow-pulse" : "opacity-0"
            )}>
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 sm:w-8 sm:h-8 border-l border-t sm:border-l-2 sm:border-t-2 border-surveilens-blue rounded-tl-lg sm:rounded-tl-xl transition-all duration-500" />
                <div className="absolute top-0 right-0 w-4 h-4 sm:w-8 sm:h-8 border-r border-t sm:border-r-2 sm:border-t-2 border-surveilens-blue rounded-tr-lg sm:rounded-tr-xl transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-8 sm:h-8 border-l border-b sm:border-l-2 sm:border-b-2 border-surveilens-blue rounded-bl-lg sm:rounded-bl-xl transition-all duration-500" />
                <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-8 sm:h-8 border-r border-b sm:border-r-2 sm:border-b-2 border-surveilens-blue rounded-br-lg sm:rounded-br-xl transition-all duration-500" />

                {/* --- Step 2: SVG Zone Drawing --- */}
                <div className={cn(
                    "absolute inset-0 transition-all duration-700",
                    activeIndex >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                )}>
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path
                            d="M 15 25 L 45 25 L 45 55 L 15 55 Z"
                            fill="rgba(43,106,255,0.05)"
                            stroke="rgba(43,106,255,0.5)"
                            strokeWidth="1"
                            strokeDasharray="200"
                            className={cn(
                                "transition-all duration-[2000ms]",
                                activeIndex >= 1 ? "animate-[draw-path_2.5s_forwards]" : "stroke-dashoffset-200"
                            )}
                        />
                    </svg>
                    <div className={cn(
                        "absolute top-[26%] left-[16%] px-1.5 py-0.5 bg-surveilens-blue text-white text-[7px] font-black rounded border border-white/20 shadow-lg backdrop-blur-sm transition-all duration-1000 delay-500",
                        activeIndex >= 1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                    )}>
                        ZONE_01
                    </div>
                </div>

                {/* --- Step 3: Precise Toggles --- */}
                <div className={cn(
                    "absolute top-3 right-3 bg-black/95 border border-white/10 rounded-xl p-2.5 space-y-1.5 backdrop-blur-xl transition-all duration-700 z-30 shadow-2xl",
                    activeIndex === 2 ? "opacity-100 translate-x-0" : (activeIndex > 2 ? "opacity-40 translate-x-0 scale-95" : "opacity-0 translate-x-4")
                )}>
                    <div className="text-[7px] text-zinc-500 font-mono mb-1 uppercase tracking-tight">Detection_Signals</div>
                    {["Aggression", "Intrusion", "Crowds"].map((label, idx) => (
                        <div key={label} className="flex items-center justify-between gap-4">
                            <span className="text-[8px] text-zinc-400 font-bold">{label}</span>
                            <div className={cn(
                                "w-6 h-3 rounded-full relative transition-all duration-500",
                                activeIndex >= 2 ? "bg-surveilens-blue" : "bg-zinc-800"
                            )} style={{ transitionDelay: `${idx * 150}ms` }}>
                                <div className={cn(
                                    "absolute top-0.5 w-2 h-2 rounded-full bg-white transition-all duration-500 shadow-md",
                                    activeIndex >= 2 ? "left-[14px]" : "left-0.5"
                                )} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Step 4: THREAT Alert (Smaller and Lower) --- */}
                <div className={cn(
                    "absolute left-1/2 -translate-x-1/2 w-[75%] max-w-[240px] transition-all duration-700 z-40",
                    isMobile ? "bottom-8" : "bottom-12",
                    activeIndex === 3 ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4"
                )}>
                    <div className="bg-black/95 border border-surveilens-blue/40 rounded-xl p-3 shadow-[0_0_40px_rgba(43,106,255,0.3)] backdrop-blur-2xl">
                        <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 bg-surveilens-blue/20 rounded-lg flex items-center justify-center shrink-0 border border-surveilens-blue/30 relative">
                                <ShieldAlert className="h-4 w-4 text-surveilens-blue" />
                                <div className="absolute inset-0 bg-surveilens-blue/20 animate-ping rounded-lg" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-white text-xs font-black tracking-tight uppercase leading-none">Signal_Alarm</div>
                                <div className="text-zinc-500 text-[7px] font-mono mt-0.5 uppercase">CAM-02 • ZONE-1 • 98%</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Step 5: High-Impact Review Actions --- */}
                <div className={cn(
                    "absolute inset-x-3 bottom-3 flex flex-col gap-2 transition-all duration-700 z-50",
                    activeIndex >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}>
                    <div className="flex gap-1.5">
                        <button className="flex-1 py-3 text-[8px] font-bold uppercase tracking-tight bg-zinc-900 text-zinc-500 rounded-lg border border-white/5 transition-colors hover:text-white">
                            DISMISS
                        </button>
                        <button className="flex-[2] py-3 text-[8px] font-bold uppercase tracking-tight bg-surveilens-blue text-white rounded-lg shadow-lg border border-white/10 transition-all hover:bg-blue-600">
                            ESCALATE_NOW →
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Initialization Overlay (Cinematic Step 1) --- */}
            {activeIndex === 0 && !isRevealed && (
                <div className="absolute inset-0 bg-black z-[25] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative h-1 w-32 sm:w-48 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-surveilens-blue animate-[scan_1s_linear_infinite]" style={{ width: '40%' }} />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-surveilens-blue rounded-full animate-ping" />
                            <span className="text-[8px] sm:text-[10px] font-mono text-surveilens-blue/80 tracking-[0.2em] font-bold uppercase">
                                Initializing_System_Core...
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export const HowToUseScroll = () => {
    // Restore default to 0 to prevent faint visuals on load
    const [activeIndex, setActiveIndex] = useState(0);
    const [sectionInView, setSectionInView] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Desktop scroll and global section visibility logic
        const observer = new IntersectionObserver(
            ([entry]) => {
                setSectionInView(entry.isIntersecting);
            },
            { threshold: 0.2 } // Section is partially visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        const handleScroll = () => {
            if (window.innerWidth < 1024) return;

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

            if (closestIndex !== activeIndex) {
                setActiveIndex(closestIndex);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, [activeIndex]);

    return (
        <section
            id="howToUse"
            ref={sectionRef}
            className="relative py-24 min-h-screen bg-black/40"
        >
            {/* Section Header */}
            <div className="text-center pb-12 px-6">
                <span className="text-xs font-mono text-surveilens-blue uppercase tracking-widest mb-4 block">
                    Protocol: Deployment
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Scrolling Cards */}
                    <div className="space-y-[50vh] py-[25vh]">
                        {STEPS.map((step, i) => (
                            <div
                                key={step.id}
                                ref={(el) => { cardRefs.current[i] = el; }}
                                className={cn(
                                    "min-h-[35vh] p-10 rounded-2xl border transition-all duration-500",
                                    activeIndex === i
                                        ? "bg-surveilens-blue/10 border-surveilens-blue/40 shadow-[0_30px_60px_-15px_rgba(43,106,255,0.15)] scale-105 opacity-100 translate-x-4"
                                        : "bg-black/40 border-white/5 opacity-30 scale-95"
                                )}
                            >
                                <div className="flex items-center gap-5 mb-8">
                                    <span className={cn(
                                        "flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-black transition-all duration-500",
                                        activeIndex === i
                                            ? "bg-surveilens-blue text-white shadow-[0_10px_20px_rgba(43,106,255,0.3)] rotate-3"
                                            : "bg-white/5 text-zinc-500 -rotate-3"
                                    )}>
                                        0{step.number}
                                    </span>
                                    <div className={cn(
                                        "p-3 rounded-xl border transition-all duration-500",
                                        activeIndex === i ? "bg-white/5 border-surveilens-blue/30" : "bg-transparent border-transparent"
                                    )}>
                                        <step.icon className={cn(
                                            "h-8 w-8 transition-colors duration-300",
                                            activeIndex === i ? "text-surveilens-blue" : "text-zinc-700"
                                        )} />
                                    </div>
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
                                <p className="text-lg text-zinc-400 leading-relaxed max-w-md">{step.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Right: Sticky Stage */}
                    <div className="sticky top-[20vh] h-[60vh] flex items-center">
                        <div className="w-full">
                            <HowToUseVisual
                                activeIndex={activeIndex}
                                currentStep={activeIndex}
                                sectionInView={sectionInView}
                                totalSteps={STEPS.length}
                            />

                            {/* Step Indicator */}
                            <div className="flex justify-center gap-3 mt-10">
                                {STEPS.map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "rounded-full transition-all duration-700",
                                            activeIndex === i
                                                ? "w-12 h-1.5 bg-surveilens-blue shadow-[0_0_10px_rgba(43,106,255,0.8)]"
                                                : "w-1.5 h-1.5 bg-white/20"
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile: Focused Stack */}
                <div className="lg:hidden space-y-20">
                    {STEPS.map((step, i) => (
                        <div
                            key={step.id}
                            className="space-y-8 opacity-0 animate-[fade-in-up_1s_ease-out_forwards]"
                            style={{ animationDelay: `${i * 150}ms` }}
                        >
                            {/* Mobile Visual - each card has its own local reveal state */}
                            <div className="px-2">
                                <HowToUseVisual
                                    activeIndex={i}
                                    currentStep={i}
                                    sectionInView={sectionInView}
                                    totalSteps={STEPS.length}
                                    isMobile={true}
                                />
                            </div>

                            <div className="p-8 rounded-3xl bg-zinc-900/60 border border-white/10 mx-2 shadow-2xl backdrop-blur-md relative overflow-hidden group">
                                {/* Number accent */}
                                <div className="absolute -top-4 -right-4 text-7xl font-black text-white/5 select-none transition-transform duration-700 group-hover:-translate-x-2 group-hover:translate-y-2">
                                    0{step.number}
                                </div>

                                <div className="flex items-center gap-5 mb-6">
                                    <div className="p-3 bg-surveilens-blue/20 rounded-2xl border border-surveilens-blue/30 shadow-inner">
                                        <step.icon className="h-7 w-7 text-surveilens-blue" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">{step.title}</h3>
                                </div>
                                <p className="text-zinc-400 text-base leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
