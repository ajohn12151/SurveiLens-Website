"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Calendar, ArrowRight } from "lucide-react";

export const ConversionSection = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        organization: "",
        role: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSubmitted(true);
            }
        } catch (error) {
            console.error("Failed to submit:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative py-32">
            {/* Glow Bloom Background */}
            <div className="absolute inset-0 bg-black pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-surveilens-blue/10 blur-[200px] rounded-full animate-pulse" style={{ animationDuration: "4s" }} />
            </div>

            <div className="relative max-w-4xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                        Ready to see it in action?
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-xl mx-auto">
                        Join our early access list for priority onboarding and help shape detection priorities.
                    </p>
                </div>

                {isSubmitted ? (
                    <div className="text-center py-12 px-8 rounded-2xl border border-surveilens-blue/30 bg-surveilens-blue/10">
                        <div className="text-4xl mb-4">🎉</div>
                        <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
                        <p className="text-zinc-400">We'll be in touch soon with next steps.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Name</label>
                                <Input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Email</label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="you@school.edu"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Organization</label>
                                <Input
                                    type="text"
                                    value={formData.organization}
                                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                    placeholder="School or district name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Role</label>
                                <Input
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    placeholder="e.g., Safety Director"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">Message (optional)</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="What challenges are you hoping Surveilens can help with?"
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-surveilens-blue/50 focus:border-surveilens-blue/50 transition-colors resize-none"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                type="submit"
                                size="lg"
                                className="flex-1 shadow-[0_0_40px_rgba(43,106,255,0.4)] hover:shadow-[0_0_60px_rgba(43,106,255,0.6)] transition-shadow duration-500"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Join Early Access"}
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <Button
                                type="button"
                                variant="glass"
                                size="lg"
                                className="flex-1"
                            >
                                <Calendar className="mr-2 w-4 h-4" />
                                Schedule Walkthrough
                            </Button>
                        </div>
                    </form>
                )}

                {/* Honest Pre-MVP Note */}
                <p className="text-center text-xs text-zinc-600 mt-6">
                    Pre-MVP · Early partners shape detection priorities
                </p>
            </div>
        </section>
    );
};
