import React from "react";
import { Play } from "lucide-react";
import { Card } from "../ui/Card";

export const DeepDiveVideoSlot = () => {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-white">See it in depth</h2>
                </div>

                <Card className="max-w-4xl mx-auto aspect-video flex items-center justify-center bg-zinc-900/50 border-zinc-800 group cursor-pointer hover:border-surveilens-blue/50 transition-colors relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-surveilens-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="h-20 w-20 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                            <Play className="h-8 w-8 text-white ml-1 fill-white" />
                        </div>
                        <p className="text-zinc-400 font-medium">In-depth walkthrough coming soon</p>
                    </div>
                </Card>
            </div>
        </section>
    );
};
