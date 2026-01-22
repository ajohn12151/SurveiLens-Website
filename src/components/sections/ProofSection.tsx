"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const ProofSection = () => {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-surveilens-blue/5 to-black pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                        Keep your cameras.
                        <br />
                        <span className="text-zinc-400">Add clarity.</span>
                    </h2>
                    <p className="text-lg text-zinc-500 max-w-xl mx-auto">
                        No new cameras. No forklift upgrade. No vendor lock-in.
                    </p>
                </div>

                {/* Visual: Camera Mosaic + Overlay */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Camera Mosaic (Existing System) */}
                    <div className="relative aspect-video rounded-2xl border border-white/10 bg-black/80 overflow-hidden shadow-2xl">
                        {/* Grid of Camera Feeds */}
                        <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-1 p-2">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "relative rounded-sm overflow-hidden flex items-center justify-center",
                                        "bg-zinc-900/80 border border-white/5"
                                    )}
                                >
                                    {/* Fake camera view */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50" />
                                    <span className="relative text-[9px] text-zinc-600 font-mono">
                                        CAM-{String(i + 1).padStart(2, "0")}
                                    </span>
                                    {/* Status indicator */}
                                    <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-green-500/60" />
                                </div>
                            ))}
                        </div>

                        {/* "Existing System" Label */}
                        <div className="absolute bottom-3 left-3 px-2 py-1 bg-zinc-800/80 rounded text-[10px] text-zinc-400 font-mono border border-white/10">
                            EXISTING VMS SYSTEM
                        </div>
                    </div>

                    {/* Surveilens Overlay Layer */}
                    <div className="absolute -inset-2 rounded-3xl border-2 border-surveilens-blue/40 pointer-events-none animate-pulse" style={{ animationDuration: "3s" }}>
                        {/* Overlay Label */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-surveilens-blue text-white text-sm font-semibold rounded-full shadow-lg shadow-surveilens-blue/30">
                            + SURVEILENS OVERLAY
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-surveilens-blue rounded-tl-xl" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-surveilens-blue rounded-tr-xl" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-surveilens-blue rounded-bl-xl" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-surveilens-blue rounded-br-xl" />

                        {/* Detection Zone Highlight */}
                        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 border-2 border-dashed border-surveilens-blue/50 rounded-lg">
                            <div className="absolute -top-3 left-2 px-1.5 py-0.5 bg-surveilens-blue/20 text-surveilens-blue text-[8px] font-bold rounded">
                                ZONE A
                            </div>
                        </div>

                        {/* Alert Indicator */}
                        <div className="absolute bottom-8 right-8 flex items-center gap-2 px-3 py-2 bg-black/90 rounded-lg border border-surveilens-blue/30 shadow-xl">
                            <div className="w-2 h-2 rounded-full bg-surveilens-blue animate-ping" />
                            <span className="text-xs text-white font-medium">Signal Active</span>
                        </div>
                    </div>
                </div>

                {/* Benefits Row */}
                <div className="flex flex-wrap justify-center gap-8 mt-16 text-center">
                    {[
                        { label: "Setup Time", value: "< 1 hour" },
                        { label: "Hardware Change", value: "None" },
                        { label: "Integration", value: "VMS Overlay" },
                    ].map((item) => (
                        <div key={item.label} className="flex flex-col">
                            <span className="text-3xl font-bold text-white">{item.value}</span>
                            <span className="text-sm text-zinc-500 mt-1">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
