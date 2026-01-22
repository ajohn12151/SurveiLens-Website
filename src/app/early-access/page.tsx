import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SignalBackground } from "@/components/layout/SignalBackground";
import { LeadForm } from "@/components/sections/LeadForm";

export const metadata = {
    title: "Join Early Access | Surveilens",
    description: "Get priority access to the Surveilens threat detection platform.",
};

export default function EarlyAccessPage() {
    return (
        <>
            <SignalBackground />
            <Navbar />
            <main className="flex min-h-screen flex-col items-center justify-center pt-24 pb-20 px-4">

                <div className="w-full max-w-2xl space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            Upgrade your security posture.
                        </h1>
                        <p className="text-xl text-zinc-400">
                            Join the waitlist for priority onboarding. <br />
                            Deployment takes less than 24 hours.
                        </p>
                    </div>

                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
                        <LeadForm />
                    </div>
                </div>

            </main>
            <Footer />
        </>
    );
}
