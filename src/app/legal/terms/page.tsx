import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
    return (
        <>
            <Navbar />
            <main className="flex min-h-screen flex-col pt-24 pb-20 px-6 bg-surveilens-bg text-zinc-300">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">1. Acceptance of Terms</h2>
                        <p>By accessing or using the Surveilens website and services, you agree to be bound by these Terms of Service.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">2. Use License</h2>
                        <p>Permission is granted to temporarily access the materials (information or software) on Surveilens' website for personal, non-commercial transitory viewing only.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">3. Disclaimer</h2>
                        <p>The materials on Surveilens' website are provided on an 'as is' basis. Surveilens makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">4. Limitations</h2>
                        <p>In no event shall Surveilens or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Surveilens' website.</p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
