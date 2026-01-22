import React from "react";
import { Server, ScanEye, BellRing } from "lucide-react";

const STEPS = [
    {
        title: "Connect to Cloud",
        description: "Securely link your existing NVR/VMS to Surveilens via our lightweight edge connector.",
        icon: Server,
    },
    {
        title: "AI Analysis",
        description: "Our model processes video streams in real-time, identifying threats without storing footage.",
        icon: ScanEye,
    },
    {
        title: "Real-time Alerts",
        description: "Receive instant notifications for verified threats, filtering out harmless motion.",
        icon: BellRing,
    },
];

export const HowItWorks = () => {
    return (
        <section className="py-24 border-t border-white/5 bg-black/40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
                        How it works
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Three steps to transform your legacy cameras into active threat detectors.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {STEPS.map((step, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/5">
                            <div className="mb-6 p-4 rounded-full bg-surveilens-blue/10 text-surveilens-blue">
                                <step.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                            <p className="text-zinc-400">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
