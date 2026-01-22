"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, createScope } from "animejs";
import { cn } from "@/lib/utils";

const STEPS = [
    {
        id: "step1",
        title: "After-hours Presence",
        description: "Person detected during restricted time windows. Motion + person confirmation helps reduce false positives.",
        badge: "Time Window",
        alertText: "After-hours presence detected",
        alertType: "warning",
    },
    {
        id: "step2",
        title: "Restricted Door Entry",
        description: "Entry signal detected in a restricted zone (wrong zone or after-hours).",
        badge: "Unauthorized Access",
        alertText: "Unauthorized access signal",
        alertType: "danger",
    },
    {
        id: "step3",
        title: "Aggression Cues",
        description: "Motion patterns like rushing/striking can trigger a review alert for staff.",
        badge: "Aggression",
        alertText: "Aggression pattern detected",
        alertType: "danger",
    },
    {
        id: "step4",
        title: "Crowd Anomaly",
        description: "Rapid dispersal, running toward exits, or sudden density changes can indicate a potential incident.",
        badge: "Crowd",
        alertText: "Crowd anomaly signal",
        alertType: "warning",
    },
    {
        id: "step5",
        title: "Review → Escalate",
        description: "Alerts surface in a clear queue. Staff review and escalate based on policy.",
        badge: "Workflow",
        alertText: "Ready for review",
        alertType: "info",
    },
];

// Custom hook for reduced motion preference
function useReducedMotion() {
    const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setShouldReduceMotion(mediaQuery.matches);
        const handleChange = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);
    return shouldReduceMotion;
}

export const ScrollStoryDemo = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const scopeRef = useRef<ReturnType<typeof createScope> | null>(null);
    const reduceMotion = useReducedMotion();

    // Initialize Anime.js scope for stage animations
    useEffect(() => {
        if (!stageRef.current || reduceMotion) return;

        scopeRef.current = createScope({ root: stageRef }).add((self) => {
            if (!self) return;

            // Define reusable animations
            self.add("showAlert", () => {
                animate(".alert-card", {
                    translateY: [20, 0],
                    opacity: [0, 1],
                    duration: 300,
                    easing: "easeOutQuad",
                });
            });

            self.add("pulseRegion", () => {
                animate(".highlight-region", {
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.6, 0.3],
                    duration: 800,
                    easing: "easeInOutQuad",
                });
            });

            self.add("updateProgress", (value: number) => {
                animate(".progress-fill", {
                    width: `${value}%`,
                    duration: 400,
                    easing: "easeOutQuad",
                });
            });
        });

        return () => scopeRef.current?.revert();
    }, [reduceMotion]);

    // Trigger animations when step changes
    useEffect(() => {
        if (!scopeRef.current || reduceMotion) return;

        scopeRef.current.methods.showAlert?.();
        scopeRef.current.methods.pulseRegion?.();
        scopeRef.current.methods.updateProgress?.((activeStep + 1) * 20);
    }, [activeStep, reduceMotion]);

    // Scroll tracking with IntersectionObserver
    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        STEPS.forEach((_, index) => {
            const el = stepRefs.current[index];
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        setActiveStep(index);
                    }
                },
                { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((obs) => obs.disconnect());
    }, []);

    // Track overall scroll progress
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const handleScroll = () => {
            const rect = section.getBoundingClientRect();
            const sectionHeight = section.offsetHeight - window.innerHeight;
            const scrolled = -rect.top;
            const prog = Math.max(0, Math.min(1, scrolled / sectionHeight));
            setProgress(prog * 100);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const currentStep = STEPS[activeStep];

    return (
        <section ref={sectionRef} id="story" className="relative bg-black/30">
            {/* Section Header */}
            <div className="text-center pt-24 pb-12 px-6">
                <span className="text-xs font-mono text-surveilens-blue uppercase tracking-widest">
                    Concept Demo (Pre-MVP)
                </span>
                <h2 className="text-3xl font-bold text-white mt-4">See it in action</h2>
            </div>

            {/* Scroll Story Container */}
            <div className="relative">
                {/* Left: Scrolling Step Content */}
                <div className="lg:w-1/2 px-6 lg:px-12">
                    <div className="space-y-[80vh] pb-[40vh]">
                        {STEPS.map((step, i) => (
                            <div
                                key={step.id}
                                ref={(el) => { stepRefs.current[i] = el; }}
                                className={cn(
                                    "min-h-[50vh] flex flex-col justify-center p-8 rounded-2xl border transition-all duration-500",
                                    activeStep === i
                                        ? "bg-black/80 border-surveilens-blue/50 shadow-[0_0_40px_rgba(43,106,255,0.15)] scale-100 opacity-100"
                                        : "bg-black/40 border-white/5 scale-95 opacity-40"
                                )}
                            >
                                {/* Step Number & Badge */}
                                <div className="flex items-center gap-4 mb-6">
                                    <span
                                        className={cn(
                                            "flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold transition-colors",
                                            activeStep === i
                                                ? "bg-surveilens-blue text-white"
                                                : "bg-white/10 text-zinc-500"
                                        )}
                                    >
                                        {i + 1}
                                    </span>
                                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest border border-white/10 px-3 py-1.5 rounded-full">
                                        {step.badge}
                                    </span>
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
                                <p className="text-xl text-zinc-300 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Sticky Stage */}
                <div className="hidden lg:block fixed top-1/2 right-12 -translate-y-1/2 w-[45%] max-w-2xl z-20">
                    <div
                        ref={stageRef}
                        className="relative aspect-[16/10] w-full rounded-2xl border border-white/10 bg-black/90 overflow-hidden shadow-2xl backdrop-blur-sm"
                    >
                        {/* Camera Grid (Base Layer - "Existing Fleet") */}
                        <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-1 p-2 opacity-30">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "bg-zinc-800 rounded-sm flex items-center justify-center text-[8px] text-zinc-600 font-mono",
                                        activeStep >= 0 && i === 5 && "ring-2 ring-surveilens-blue/50"
                                    )}
                                >
                                    CAM-{String(i + 1).padStart(2, "0")}
                                </div>
                            ))}
                        </div>

                        {/* Overlay Layer (Surveilens Detection) */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-between">
                            {/* Top: Status Bar */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs text-zinc-400 font-mono">SURVEILENS ACTIVE</span>
                                </div>
                                <span className="text-xs text-zinc-500 font-mono">
                                    Step {activeStep + 1}/{STEPS.length}
                                </span>
                            </div>

                            {/* Center: Highlight Region */}
                            <div className="flex-1 flex items-center justify-center relative">
                                <div
                                    className={cn(
                                        "highlight-region absolute w-32 h-32 rounded-lg border-2 transition-all duration-500",
                                        currentStep.alertType === "danger"
                                            ? "border-red-500/50 bg-red-500/10"
                                            : currentStep.alertType === "warning"
                                                ? "border-orange-500/50 bg-orange-500/10"
                                                : "border-surveilens-blue/50 bg-surveilens-blue/10"
                                    )}
                                >
                                    {activeStep === 2 && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 border border-red-500/30 rounded-full animate-ping" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Bottom: Alert Card */}
                            <div
                                className={cn(
                                    "alert-card bg-zinc-900/90 border rounded-lg p-4 flex items-center justify-between transition-colors",
                                    currentStep.alertType === "danger"
                                        ? "border-red-500/30"
                                        : currentStep.alertType === "warning"
                                            ? "border-orange-500/30"
                                            : "border-surveilens-blue/30"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={cn(
                                            "h-10 w-10 rounded-lg flex items-center justify-center font-bold",
                                            currentStep.alertType === "danger"
                                                ? "bg-red-500/20 text-red-500"
                                                : currentStep.alertType === "warning"
                                                    ? "bg-orange-500/20 text-orange-500"
                                                    : "bg-surveilens-blue/20 text-surveilens-blue"
                                        )}
                                    >
                                        !
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">{currentStep.alertText}</div>
                                        <div className="text-xs text-zinc-500">CAM-06 • Hallway A</div>
                                    </div>
                                </div>

                                {activeStep === 4 ? (
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1.5 text-xs bg-zinc-700 text-white rounded hover:bg-zinc-600 transition-colors">
                                            Acknowledge
                                        </button>
                                        <button className="px-3 py-1.5 text-xs bg-surveilens-blue text-white rounded hover:bg-blue-600 transition-colors">
                                            Escalate
                                        </button>
                                    </div>
                                ) : (
                                    <span className="text-xs text-zinc-500">Confidence: 94%</span>
                                )}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800">
                            <div
                                className="progress-fill h-full bg-surveilens-blue transition-all duration-300"
                                style={{ width: `${(activeStep + 1) * 20}%` }}
                            />
                        </div>
                    </div>

                    {/* Stepper Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {STEPS.map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "h-2 rounded-full transition-all duration-300",
                                    activeStep === i
                                        ? "w-8 bg-surveilens-blue"
                                        : "w-2 bg-white/20"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
