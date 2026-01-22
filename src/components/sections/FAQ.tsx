"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
    {
        q: "Does this require replacing my current cameras?",
        a: "No. Surveilens connects to your existing NVR or VMS. We process the streams you already have.",
    },
    {
        q: "Is my video footage stored in the cloud?",
        a: "No. By default, we process video in real-time and only store metadata and short clips of verified alerts. You retain full control over data retention.",
    },
    {
        q: "Does it work with analog cameras?",
        a: "Yes, as long as they are connected to a networked DVR/encoder that provides an RTSP stream.",
    },
    {
        q: "What types of threats can it detect?",
        a: "In V1, we focus on aggression (fighting), unauthorized access (after-hours/zones), and crowd anomalies (panic/dispersal).",
    },
];

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 border-t border-white/5">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-white text-center mb-12">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {FAQS.map((faq, i) => (
                        <div key={i} className="border border-white/5 rounded-lg bg-white/5 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="flex w-full items-center justify-between p-6 text-left"
                            >
                                <span className="font-medium text-white">{faq.q}</span>
                                {openIndex === i ? <Minus className="h-5 w-5 text-zinc-400" /> : <Plus className="h-5 w-5 text-zinc-400" />}
                            </button>
                            <div className={cn(
                                "px-6 text-zinc-400 transition-all duration-300 ease-in-out overflow-hidden",
                                openIndex === i ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0"
                            )}>
                                {faq.a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
