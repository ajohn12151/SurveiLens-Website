import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
    return (
        <>
            <Navbar />
            <main className="flex min-h-screen flex-col pt-24 pb-20 px-6 bg-surveilens-bg text-zinc-300">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
                        <p>Surveilens ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">2. Data Collection</h2>
                        <p>We collect information you provide directly to us, such as when you fill out a form, request a demo, or communicate with us.</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Contact information (name, email, organization)</li>
                            <li>Usage data (how you interact with our services)</li>
                            <li>Technical data (IP address, browser type)</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">3. Video Data Processing</h2>
                        <p>Our service processes video streams from your cameras. By default, this processing occurs in real-time and we do not retain raw video footage unless explicitly configured for alert verification purposes. All data in transit is encrypted.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">4. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at privacy@surveilens.ai.</p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
