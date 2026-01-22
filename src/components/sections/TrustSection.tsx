"use client";

import React from "react";
import { ShieldCheck, Eye, MapPin } from "lucide-react";

const TRUST_ITEMS = [
    {
        icon: Eye,
        title: "No student profiling",
        description: "Detection focuses on behaviors and situations, not individuals. We don't track, identify, or build profiles.",
    },
    {
        icon: MapPin,
        title: "Configurable zones & schedules",
        description: "Define exactly where and when detection is active. You control the scope, not us.",
    },
    {
        icon: ShieldCheck,
        title: "Staff-first alerts",
        description: "Silent, controlled escalation to designated staff. No public announcements or student-facing interventions.",
    },
];

export const TrustSection = () => {
    return (
        <section className="relative py-24">
            {/* Calmer Background (less noise, serious tone) */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-sm font-mono text-surveilens-blue uppercase tracking-widest">
                        Our Safety Stance
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4 tracking-tight">
                        Not Surveillance.
                        <br />
                        <span className="text-zinc-400">Safety.</span>
                    </h2>
                    <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
                        We built Surveilens with one goal: help schools respond faster to real threats.
                        Not to watch students. Not to build databases. Just safety.
                    </p>
                </div>

                {/* Trust Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {TRUST_ITEMS.map((item) => (
                        <div
                            key={item.title}
                            className="group p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
                        >
                            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-surveilens-blue/10 border border-surveilens-blue/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <item.icon className="w-7 h-7 text-surveilens-blue" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom Assurance */}
                <div className="text-center mt-12">
                    <p className="text-sm text-zinc-600">
                        Questions about privacy? <span className="text-surveilens-blue hover:underline cursor-pointer">Read our full safety stance →</span>
                    </p>
                </div>
            </div>
        </section>
    );
};
