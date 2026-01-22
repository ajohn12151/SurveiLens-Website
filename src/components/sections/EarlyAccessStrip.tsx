"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";

export const EarlyAccessStrip = () => {
    return (
        <section className="relative py-32 z-10">
            {/* Smooth Blue Transition Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surveilens-blue/20 to-black/80 pointer-events-none" />

            {/* Additional bottom fade to ensure seamless exit to next section */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center z-10">
                <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
                    Be the first to see the future of safety
                </h2>
                <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                    We're opening up spots on our early access list for forward-thinking schools and organizations.
                    Get priority onboarding and help shape the platform.
                </p>
                <Link href="/early-access">
                    <Button size="lg" className="shadow-[0_0_30px_rgba(43,106,255,0.4)] hover:shadow-[0_0_50px_rgba(43,106,255,0.6)] transition-shadow duration-500">
                        Join Early Access List
                    </Button>
                </Link>
            </div>
        </section>
    );
};
