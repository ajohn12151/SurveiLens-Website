"use client";

import React, { useState } from "react";
import { Card } from "../ui/Card";
import { cn } from "@/lib/utils";
import { Scan, ShieldAlert, Users, Clock, Lock } from "lucide-react";

const SCENARIOS = [
    {
        id: "aggression",
        title: "Aggression & Violence",
        icon: ShieldAlert,
        signals: ["Fighting motion", "Rushing patterns", "Striking gestures"],
        description: "Detects high-velocity movements indicative of physical conflict.",
        gradient: "from-red-500/20 to-orange-500/20",
    },
    {
        id: "access",
        title: "Unauthorized Access",
        icon: Lock,
        signals: ["Restricted zone entry", "Tailgating", "Wrong-way direction"],
        description: "Monitors secure entry points for policy violations.",
        gradient: "from-blue-500/20 to-indigo-500/20",
    },
    {
        id: "afterhours",
        title: "After-hours Presence",
        icon: Clock,
        signals: ["Human detection", "Motion in quiet hours", "Loitering"],
        description: "Identifies presence when facilities should be empty.",
        gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
        id: "crowd",
        title: "Crowd Anomalies",
        icon: Users,
        signals: ["Sudden dispersal", "Rapid density increase", "Panic running"],
        description: "Analyzes crowd dynamics for signs of emergency.",
        gradient: "from-emerald-500/20 to-teal-500/20",
    },
];

export const SignalsAtlas = () => {
    const [activeId, setActiveId] = useState(SCENARIOS[0].id);
    const activeScenario = SCENARIOS.find(s => s.id === activeId) || SCENARIOS[0];

    return (
        <section className="py-24 relative">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                        Safety Signals Atlas
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl">
                        Surveilens maps discrete visual cues into actionable safety signals using your existing camera feeds.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Interactive List */}
                    <div className="flex flex-col gap-4">
                        {SCENARIOS.map((scenario) => (
                            <div
                                key={scenario.id}
                                onMouseEnter={() => setActiveId(scenario.id)}
                                className={cn(
                                    "group cursor-pointer rounded-xl border p-6 transition-all duration-300",
                                    activeId === scenario.id
                                        ? "bg-white/5 border-surveilens-blue/50 shadow-[0_0_30px_rgba(43,106,255,0.1)]"
                                        : "bg-transparent border-white/5 hover:bg-white/5 hover:border-white/10"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "p-3 rounded-lg bg-black/50 ring-1 ring-white/10 transition-colors",
                                        activeId === scenario.id ? "text-surveilens-blue" : "text-zinc-400 group-hover:text-white"
                                    )}>
                                        <scenario.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className={cn(
                                            "text-lg font-semibold transition-colors",
                                            activeId === scenario.id ? "text-white" : "text-zinc-300 group-hover:text-white"
                                        )}>
                                            {scenario.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {scenario.signals.map(s => (
                                                <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-zinc-500 group-hover:text-zinc-400">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Preview Card */}
                    <div className="sticky top-24">
                        <Card className="min-h-[400px] flex flex-col justify-between border-white/10 relative overflow-hidden group">
                            {/* Gradient Background */}
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-br opacity-20 transition-all duration-500",
                                activeScenario.gradient
                            )} />

                            {/* Content */}
                            <div className="relative z-10">
                                <Scan className="w-12 h-12 text-white/20 mb-6" />
                                <h3 className="text-2xl font-bold text-white mb-2">{activeScenario.title}</h3>
                                <p className="text-lg text-zinc-300">{activeScenario.description}</p>
                            </div>

                            {/* Abstract Visual - Just a placeholder animation */}
                            <div className="relative h-48 w-full mt-8 rounded-lg bg-black/40 border border-white/5 overflow-hidden flex items-center justify-center">
                                <div className="text-zinc-600 text-sm">Signal Visualization Preview</div>

                                {/* Animated pulse based near center representing the 'detection' */}
                                <div className={cn(
                                    "absolute w-24 h-24 rounded-full bg-white/5 animate-ping opacity-20",
                                )} />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};
