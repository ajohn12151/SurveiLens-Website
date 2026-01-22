"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SignalBackground } from "@/components/layout/SignalBackground";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Shield, Lock, Clock, Users, CheckCircle2, ArrowRight, GraduationCap, School, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const CAPABILITIES = [
    {
        category: "Violence & Aggression",
        icon: Shield,
        description: "Detects physical altercations and pre-fight indicators instantly.",
        gradient: "from-red-500/20 to-orange-500/5",
        items: [
            "Fight detection (high velocity motion)",
            "Aggressive rushing patterns",
            "Striking gestures",
            "Group swarming indicators",
        ],
    },
    {
        category: "Unauthorized Access",
        icon: Lock,
        description: "Secures restricted zones and monitors perimeter integrity.",
        gradient: "from-orange-500/20 to-yellow-500/5",
        items: [
            "Entry through restricted doors",
            "Wrong-way direction flow",
            "Tailgating detection (Beta)",
            "Propped door alerting",
        ],
    },
    {
        category: "After-hours Presence",
        icon: Clock,
        description: "Monitors activity when the building should be empty.",
        gradient: "from-blue-500/20 to-cyan-500/5",
        items: [
            "Person detection in closed zones",
            "Loitering in hallways",
            "Unexpected motion confirmation",
            "Schedule-based masking",
        ],
    },
    {
        category: "Crowd Anomalies",
        icon: Users,
        description: "Identifies dangerous crowd dynamics and potential panic.",
        gradient: "from-purple-500/20 to-pink-500/5",
        items: [
            "Sudden crowd panic/dispersal",
            "Rapid density formation",
            "Running in corridors",
            "Slip and fall indicators",
        ],
    },
];

export const ProductContent = () => {
    return (
        <>
            <SignalBackground />
            <Navbar />
            <main className="flex min-h-screen flex-col pt-24 text-white overflow-hidden">

                {/* Header Section */}
                <section className="relative px-6 py-20 text-center max-w-5xl mx-auto z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-surveilens-blue/20 blur-[150px] rounded-full pointer-events-none opacity-50" />

                    <div className="animate-fade-in-up">
                        <div className="inline-flex items-center rounded-full border border-surveilens-blue/30 bg-surveilens-blue/10 px-4 py-1.5 text-sm font-medium text-surveilens-blue mb-8 backdrop-blur-sm shadow-[0_0_20px_rgba(43,106,255,0.2)]">
                            <span className="flex h-2 w-2 rounded-full bg-surveilens-blue mr-2 animate-pulse" />
                            <span>Capabilities V1.3</span>
                        </div>

                        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-8 leading-[1.1]">
                            Targeted threat detection.
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
                                Zero new hardware.
                            </span>
                        </h1>

                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                            Surveilens isn't general purpose surveillance. It's a purpose-built safety layer
                            that sits on top of your VMS to detect the 4 signals that actually matter.
                        </p>
                    </div>
                </section>

                {/* Smooth Gradient Transition 1 */}
                <div className="h-32 bg-gradient-to-b from-transparent to-zinc-950/80 pointer-events-none" />

                {/* Capabilities Grid */}
                <section className="relative px-6 py-20 bg-zinc-950/80">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {CAPABILITIES.map((cap, idx) => (
                                <div
                                    key={cap.category}
                                    className="group relative p-8 rounded-3xl border border-white/10 bg-black/40 hover:bg-black/60 transition-all duration-500 overflow-hidden hover:scale-[1.01] hover:shadow-2xl animate-fade-in-up"
                                    style={{ animationDelay: `${idx * 150}ms` }}
                                >
                                    {/* Card Gradient Background */}
                                    <div className={cn(
                                        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500",
                                        cap.gradient
                                    )} />

                                    <div className="relative flex items-start gap-6">
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors shrink-0">
                                            <cap.icon className="w-8 h-8 text-white/80 group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2">{cap.category}</h3>
                                            <p className="text-zinc-400 mb-6 leading-relaxed">{cap.description}</p>

                                            <ul className="grid sm:grid-cols-2 gap-3">
                                                {cap.items.map((item) => (
                                                    <li key={item} className="flex items-center gap-2 text-zinc-500 text-sm group-hover:text-zinc-300 transition-colors">
                                                        <CheckCircle2 className="w-4 h-4 text-surveilens-blue shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Smooth Gradient Transition 2 */}
                <div className="h-32 bg-gradient-to-b from-zinc-950/80 to-surveilens-blue/5 pointer-events-none" />

                {/* Campus Safety Deep Dive Section (Higher Ed Expansion) */}
                <section className="relative py-24 px-6 bg-surveilens-blue/5">
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-surveilens-blue/10 blur-[200px] rounded-full opacity-30 animate-pulse" style={{ animationDuration: '8s' }} />
                    </div>

                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest">
                                    <School className="w-3 h-3" />
                                    <span>K-12 & Higher Ed</span>
                                </div>
                                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                                    Trusted by <span className="text-surveilens-blue">School Districts</span> & <span className="text-purple-400">Universities</span>.
                                </h2>
                                <p className="text-lg text-zinc-400 leading-relaxed">
                                    From elementary hallways to sprawling university campuses, Surveilens adapts to your environment.
                                    We protect open campuses without stifling student life.
                                </p>

                                <div className="space-y-6">
                                    {[
                                        {
                                            title: "Privacy First",
                                            desc: "We analyze motion vectors and pixel changes, not faces. No PII is stored. No student profiles are built.",
                                            icon: Lock,
                                            color: "text-surveilens-blue"
                                        },
                                        {
                                            title: "Silent Intervention",
                                            desc: "Alerts go to staff phones or campus security HQ, not PA systems. De-escalate situations quietly.",
                                            icon: Bell,
                                            color: "text-purple-400"
                                        },
                                        {
                                            title: "Campus-Wide Scale",
                                            desc: "Seamlessly monitors classrooms, dorm entries, stadiums, and parking lots on a single pane of glass.",
                                            icon: GraduationCap,
                                            color: "text-green-400"
                                        }
                                    ].map((feature, i) => (
                                        <div key={i} className="group flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5 hover:translate-x-2">
                                            <div className={cn("shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center transition-colors group-hover:bg-white/10", feature.color)}>
                                                <feature.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-lg group-hover:text-surveilens-blue transition-colors">{feature.title}</h4>
                                                <p className="text-zinc-400 text-sm mt-1">{feature.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Visual Timeline / Process */}
                            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                <div className="absolute inset-0 bg-gradient-to-tr from-surveilens-blue/20 to-purple-500/20 blur-3xl rounded-full opacity-40 animate-pulse" style={{ animationDuration: '6s' }} />
                                <div className="relative rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl p-8 shadow-2xl overflow-hidden group">
                                    {/* Shimmer Effect */}
                                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine" />

                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-zinc-400" />
                                        Campus Safety Lifecycle
                                    </h3>

                                    <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10">
                                        {[
                                            { time: "Day", label: "Academic Hours", status: "Crowd & Aggression Scan", active: true, loc: "Classrooms & Quad" },
                                            { time: "Eve", label: "Events & Sports", status: "Perimeter Alerting", active: true, loc: "Stadium & Parking" },
                                            { time: "Night", label: "Dorm Security", status: "Unauthorized Access Mode", active: true, loc: "Residence Halls" },
                                            { time: "24/7", label: "Critical Infra", status: "Intrusion Detection", active: true, loc: "Labs & Server Rooms" },
                                        ].map((slot, i) => (
                                            <div key={i} className="relative flex items-center gap-4 group/item hover:translate-x-1 transition-transform duration-300">
                                                <div className="w-10 h-10 rounded-full border-4 border-black bg-zinc-800 flex items-center justify-center shrink-0 z-10 group-hover/item:bg-surveilens-blue group-hover/item:text-white transition-colors text-zinc-500 text-[10px] font-bold shadow-lg shadow-black">
                                                    {i + 1}
                                                </div>
                                                <div className="flex-1 p-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-sm font-bold text-white">{slot.label}</span>
                                                        <span className="text-xs font-mono text-zinc-500 bg-black/30 px-1.5 py-0.5 rounded">{slot.time}</span>
                                                    </div>
                                                    <div className="text-xs text-zinc-400 mb-1 flex items-center gap-1">
                                                        <ArrowRight className="w-3 h-3 text-zinc-600" />
                                                        {slot.loc}
                                                    </div>
                                                    <div className="text-xs text-surveilens-blue flex items-center gap-1.5 font-medium">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-surveilens-blue animate-pulse" />
                                                        {slot.status}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Transition to Dark */}
                <div className="h-32 bg-gradient-to-b from-surveilens-blue/5 to-black pointer-events-none" />

                {/* CTA Section */}
                <section className="relative py-24 text-center">
                    <div className="absolute inset-0 bg-black pointer-events-none">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-surveilens-blue/10 blur-[150px] rounded-t-full pointer-events-none" />
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto px-6">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white tracking-tight">
                            Ready to modernize your security?
                        </h2>
                        <p className="text-xl text-zinc-400 mb-10">
                            Join the schools using Surveilens to detect threats without disrupting the learning environment.
                        </p>
                        <Link href="/early-access">
                            <Button size="lg" className="shadow-[0_0_40px_rgba(43,106,255,0.4)] hover:shadow-[0_0_60px_rgba(43,106,255,0.6)] transition-shadow duration-500">
                                Request Access
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </section>

            </main >
            <Footer />
        </>
    );
};
