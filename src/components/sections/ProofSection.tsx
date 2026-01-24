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
                        <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-4 grid-rows-4 sm:grid-rows-3 gap-1 p-2">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "relative rounded-sm overflow-hidden flex items-center justify-center",
                                        "bg-zinc-900/80 border border-white/5",
                                        i >= 6 && "hidden sm:flex" // Show fewer cameras on very small mobile if needed, but 8 fits 2x4
                                    )}
                                >
                                    {/* Fake camera view */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50" />
                                    <span className="relative text-[8px] sm:text-[9px] text-zinc-600 font-mono">
                                        CAM-{String(i + 1).padStart(2, "0")}
                                    </span>
                                    {/* Status indicator */}
                                    <div className="absolute top-1 right-1 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-green-500/60" />
                                </div>
                            ))}
                        </div>

                        {/* "Existing System" Label */}
                        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-zinc-800/80 rounded text-[8px] sm:text-[10px] text-zinc-400 font-mono border border-white/10">
                            EXISTING VMS
                        </div>

                        {/* Scanning Line Animation */}
                        <div className="absolute inset-y-0 left-0 w-px bg-surveilens-blue/30 shadow-[0_0_15px_rgba(43,106,255,0.5)] z-10 animate-[scan_4s_linear_infinite]" />
                    </div>

                    {/* Surveilens Overlay Layer */}
                    <div className="absolute -inset-1 sm:-inset-2 rounded-2xl sm:rounded-3xl border sm:border-2 border-surveilens-blue/40 pointer-events-none animate-slow-pulse">
                        {/* Overlay Label */}
                        <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 sm:py-1.5 bg-surveilens-blue text-white text-[10px] sm:text-sm font-semibold rounded-full shadow-lg shadow-surveilens-blue/30 whitespace-nowrap">
                            + SURVEILENS OVERLAY
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-l border-t sm:border-l-2 sm:border-t-2 border-surveilens-blue rounded-tl-lg sm:rounded-tl-xl" />
                        <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-r border-t sm:border-r-2 sm:border-t-2 border-surveilens-blue rounded-tr-lg sm:rounded-tr-xl" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-l border-b sm:border-l-2 sm:border-b-2 border-surveilens-blue rounded-bl-lg sm:rounded-bl-xl" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-r border-b sm:border-r-2 sm:border-b-2 border-surveilens-blue rounded-br-lg sm:rounded-br-xl" />

                        {/* Detection Zone Highlight */}
                        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 border sm:border-2 border-dashed border-surveilens-blue/50 rounded-lg">
                            <div className="absolute -top-3 left-2 px-1 py-0.5 bg-surveilens-blue/20 text-surveilens-blue text-[7px] sm:text-[8px] font-bold rounded">
                                ZONE A
                            </div>
                        </div>

                        {/* Alert Indicator */}
                        <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-black/90 rounded-lg border border-surveilens-blue/30 shadow-xl">
                            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-surveilens-blue animate-ping" />
                            <span className="text-[10px] sm:text-xs text-white font-medium whitespace-nowrap">Signal Active</span>
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
