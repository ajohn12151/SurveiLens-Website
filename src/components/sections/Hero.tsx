"use client";

import React from "react";
import { Button } from "../ui/Button";
import Link from "next/link";
import { ChevronDown, Camera, BellRing, ShieldCheck } from "lucide-react";

export const Hero = () => {
    return (
        <section className="relative flex min-h-[95vh] flex-col items-center justify-center pt-20 text-center">
            {/* Background Radar Animation (Desktop Only) */}
            <div className="hidden sm:block absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-[1400px] sm:h-[1400px] pointer-events-none opacity-30">
                {/* Multiple pulsing rings */}
                <div className="absolute inset-0 border-4 border-surveilens-blue/50 rounded-full animate-radar-ping" />
                <div className="absolute inset-[100px] border-2 border-surveilens-blue/40 rounded-full animate-radar-ping-delayed" />
                <div className="absolute inset-[200px] border border-surveilens-blue/30 rounded-full animate-radar-ping" style={{ animationDelay: '0.75s' }} />

                {/* Static guide rings */}
                <div className="absolute inset-[300px] border border-surveilens-blue/10 rounded-full" />
                <div className="absolute inset-[400px] border border-surveilens-blue/10 rounded-full" />
                <div className="absolute inset-[500px] border border-surveilens-blue/10 rounded-full" />

                {/* Spinning radar beam */}
                <div className="absolute inset-0 rounded-full animate-radar-spin">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-1/2 bg-gradient-to-b from-surveilens-blue/60 via-surveilens-blue/20 to-transparent rounded-full" />
                </div>
            </div>

            {/* Enhanced Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[700px] sm:h-[700px] bg-surveilens-blue/20 blur-[80px] sm:blur-[180px] rounded-full pointer-events-none" />

            {/* Mobile Digital Scope (Visible Tech Layer) */}
            <div className="block sm:hidden absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] pointer-events-none opacity-40">
                {/* Rotating Dashed Ring - The Core Scope */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-surveilens-blue/40 animate-[spin_30s_linear_infinite]">
                    {/* Orbiting blip */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-surveilens-blue rounded-full shadow-[0_0_8px_rgba(43,106,255,0.8)]" />
                </div>

                {/* Static Inner Hairline Ring */}
                <div className="absolute inset-6 rounded-full border border-surveilens-blue/20" />

                {/* Static Crosshairs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-[1px] h-6 bg-surveilens-blue/40" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-[1px] h-6 bg-surveilens-blue/40" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 h-[1px] w-6 bg-surveilens-blue/40" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 h-[1px] w-6 bg-surveilens-blue/40" />
            </div>

            <div className="relative z-10 px-4 max-w-5xl mx-auto flex flex-col items-center gap-8">
                {/* Market Position Pill */}


                {/* Product-First Headline */}
                <h1 className="text-4xl xs:text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl leading-[1.1]">
                    Targeted threat detection.
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-surveilens-blue via-blue-400 to-surveilens-blue animate-gradient-x">
                        Zero new hardware.
                    </span>
                </h1>

                {/* Subhead */}
                <p className="max-w-2xl text-lg sm:text-xl text-zinc-400 leading-relaxed">
                    Surveilens overlays on existing camera systems to surface high-impact safety signals—without adding cameras or changing your stack.
                </p>

                {/* Proof Bullets (Hidden on Mobile) */}
                <div className="hidden sm:flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
                    <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-surveilens-blue" />
                        <span>Works with existing camera/VMS feeds</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BellRing className="w-4 h-4 text-surveilens-blue" />
                        <span>Silent alerts to designated staff</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-surveilens-blue" />
                        <span>Designed to avoid student profiling</span>
                    </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-6">
                    <Link href="/early-access" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full sm:w-auto shadow-[0_0_40px_rgba(43,106,255,0.4)] hover:shadow-[0_0_60px_rgba(43,106,255,0.6)] transition-shadow duration-500">
                            Join Early Access
                        </Button>
                    </Link>
                    <Button variant="glass" size="lg" className="w-full sm:w-auto">
                        Schedule Walkthrough
                    </Button>
                </div>



            </div>



        </section>
    );
};
