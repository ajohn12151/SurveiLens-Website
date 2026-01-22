"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SignalBackground } from "@/components/layout/SignalBackground";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Shield, Lock, Eye, FileText, Server, AlertTriangle, CheckCircle2, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { DataFlowDiagram } from "@/components/security/DataFlowDiagram";

export default function SecurityPage() {
    return (
        <>
            <SignalBackground />
            <Navbar />
            <main className="flex min-h-screen flex-col pt-24 text-white">

                {/* 1. Hero: Privacy by Design */}
                <section className="relative px-6 py-20 text-center max-w-4xl mx-auto z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-surveilens-blue/10 blur-[150px] rounded-full pointer-events-none opacity-50" />

                    <div className="animate-fade-in-up">
                        <div className="inline-flex items-center rounded-full border border-surveilens-blue/30 bg-surveilens-blue/10 px-4 py-1.5 text-sm font-medium text-surveilens-blue mb-8 backdrop-blur-sm">
                            <Shield className="w-3 h-3 mr-2" />
                            <span>Trust Center</span>
                        </div>

                        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-6">
                            Privacy by Design.
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                            We process video to surface safety signals—not to harvest data.
                            Your footage stays yours by default.
                        </p>
                    </div>
                </section>

                {/* 2. Security at a Glance Strip */}
                <section className="border-y border-white/5 bg-white/[0.02] backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-white/5">
                            {[
                                { label: "Data Retention", val: "Process-Only" },
                                { label: "Video Storage", val: "On Customer VMS" },
                                { label: "Encryption", val: "In-Transit / At-Rest" },
                                { label: "Access Control", val: "RBAC Gated" },
                                { label: "Auditability", val: "100% Logged" },
                            ].map((stat, i) => (
                                <div key={i} className={cn("pt-4 md:pt-0 md:pl-6 first:pl-0", i > 1 ? "hidden sm:block" : "")}>
                                    <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider mb-1">{stat.label}</div>
                                    <div className="text-lg font-bold text-white">{stat.val}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. Interactive Data Flow Diagram (The Wow Factor) */}
                <DataFlowDiagram />

                {/* 4. Controls & Roadmap */}
                <section className="py-24 px-6 bg-zinc-950">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-white mb-4">Enterprise Controls</h2>
                            <p className="text-zinc-400">Built for IT teams that require granular control and visibility.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Card 1 */}
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                                <Lock className="w-8 h-8 text-surveilens-blue mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold text-white mb-3">Access & Tenancy</h3>
                                <ul className="space-y-3 text-sm text-zinc-400">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Tenant isolation enforcement</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Role-Based Access (RBAC)</li>
                                    <li className="flex items-center gap-2 opacity-60"><Terminal className="w-4 h-4" /> SSO / SAML (Roadmap)</li>
                                </ul>
                            </div>

                            {/* Card 2 */}
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                                <FileText className="w-8 h-8 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold text-white mb-3">Compliance Support</h3>
                                <ul className="space-y-3 text-sm text-zinc-400">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> FERPA-aligned data handling</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Data deletion workflows</li>
                                    <li className="flex items-center gap-2 opacity-60"><Terminal className="w-4 h-4" /> SOC 2 Type II (Planned 2025)</li>
                                </ul>
                            </div>

                            {/* Card 3 (OpSec) */}
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                                <Server className="w-8 h-8 text-green-400 mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold text-white mb-3">Operational Security</h3>
                                <ul className="space-y-3 text-sm text-zinc-400">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Automated dependency scanning</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Admin action audit logs</li>
                                    <li className="flex items-center gap-2 opacity-60"><Terminal className="w-4 h-4" /> 3rd Party Pen Test (Roadmap)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Privacy Guardrails (Hero Style) */}
                <section className="py-24 px-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-surveilens-blue/5 pointer-events-none" />
                    <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                        <Eye className="w-12 h-12 text-surveilens-blue mb-8 opacity-80" />
                        <h2 className="text-4xl font-bold text-white mb-8">School-Specific Privacy Stance</h2>

                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 text-left max-w-3xl">
                            <div className="flex gap-4">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-surveilens-blue shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white">No Identity Profiling.</h4>
                                    <p className="text-zinc-400 text-sm">We detect generic behaviors (running, fighting), not specific individuals.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-surveilens-blue shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white">No Attendance Tracking.</h4>
                                    <p className="text-zinc-400 text-sm">We are a safety tool, not atruancy tool. We do not count heads for roll call.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-surveilens-blue shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white">Configurable Zones.</h4>
                                    <p className="text-zinc-400 text-sm">Exclude bathrooms, locker rooms, and sensitive areas entirely from analysis.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-surveilens-blue shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white">Silent Alerts.</h4>
                                    <p className="text-zinc-400 text-sm">Notifications are discreet to prevent panic and protect student dignity.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. FAQ Accordion (Simple) */}
                <section className="py-24 px-6 border-t border-white/5">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-12 text-center">Security FAQ</h2>
                        <div className="space-y-4">
                            {[
                                { q: "Do you store our video footage?", a: "No. By default, Surveilens processes video in memory and discards it immediately after analysis. Your raw footage remains on your existing VMS/NVR infrastructure." },
                                { q: "Is the data encrypted?", a: "Yes. All metadata and system communication is encrypted in transit via TLS 1.3 and at rest using AES-256." },
                                { q: "Can we control who sees alerts?", a: "Yes. We support Role-Based Access Control (RBAC), allowing you to define Admin, Operator, and Viewer roles to limit access." },
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors">
                                    <h3 className="font-bold text-white mb-2">{item.q}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. CTA: Contact Security */}
                <section className="py-24 text-center relative group">
                    <div className="absolute inset-0 bg-black pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-surveilens-blue/5 blur-[100px] rounded-full group-hover:bg-surveilens-blue/10 transition-colors duration-1000" />
                    </div>

                    <div className="relative z-10 max-w-2xl mx-auto px-6">
                        <h2 className="text-3xl font-bold mb-6 text-white">Have specific security questions?</h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/early-access">
                                <Button size="lg" className="w-full sm:w-auto shadow-[0_0_20px_rgba(43,106,255,0.3)] hover:shadow-[0_0_40px_rgba(43,106,255,0.5)] transition-shadow">
                                    Contact Security Team
                                </Button>
                            </Link>
                            <Link href="/legal/whitepaper">
                                <Button variant="glass" size="lg" className="w-full sm:w-auto">
                                    Read Architecture Whitepaper
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
