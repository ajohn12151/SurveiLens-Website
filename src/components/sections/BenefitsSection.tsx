"use client";

import React from "react";
import { Swords, Shield, BellRing } from "lucide-react";
import { cn } from "@/lib/utils";

const BENEFITS = [
    {
        icon: Swords,
        title: "Conflict Detection",
        description: "High-velocity motion patterns, aggressive posturing, and crowd swarm behaviors trigger instant alerts.",
        featured: true,
    },
    {
        icon: Shield,
        title: "Perimeter Control",
        description: "Restricted zone violations and after-hours presence are flagged before they escalate.",
        featured: false,
    },
    {
        icon: BellRing,
        title: "Silent Alerts",
        description: "Designated staff receive discreet notifications. No PA announcements, no student-facing noise.",
        featured: false,
    },
];

export const BenefitsSection = () => {
    return (
        <section className="relative py-24">
            {/* Spotlight Vignette Background */}
            <div className="absolute inset-0 bg-black pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-surveilens-blue/5 blur-[150px] rounded-full" />
            </div>

            <div className="relative max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-sm font-mono text-surveilens-blue uppercase tracking-widest">
                        What You Get
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 tracking-tight">
                        Real-time safety intelligence
                    </h2>
                </div>

                {/* Benefits Cards - Asymmetrical Layout */}
                <div className="grid md:grid-cols-3 gap-6">
                    {BENEFITS.map((benefit) => (
                        <div
                            key={benefit.title}
                            className={cn(
                                "group relative p-8 rounded-2xl border transition-all duration-500",
                                benefit.featured
                                    ? "bg-surveilens-blue/10 border-surveilens-blue/30 shadow-[0_0_40px_rgba(43,106,255,0.15)] md:scale-105 md:-mt-4 md:mb-4"
                                    : "bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20"
                            )}
                        >
                            {/* Featured Badge */}
                            {benefit.featured && (
                                <div className="absolute -top-3 left-6 px-3 py-1 bg-surveilens-blue text-white text-xs font-semibold rounded-full">
                                    Most Requested
                                </div>
                            )}

                            <div className={cn(
                                "flex items-center justify-center w-14 h-14 rounded-xl mb-6 transition-all duration-300",
                                benefit.featured
                                    ? "bg-surveilens-blue/20 border border-surveilens-blue/30"
                                    : "bg-white/5 border border-white/10 group-hover:bg-white/10"
                            )}>
                                <benefit.icon className={cn(
                                    "w-7 h-7",
                                    benefit.featured ? "text-surveilens-blue" : "text-zinc-400 group-hover:text-white"
                                )} />
                            </div>

                            <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
