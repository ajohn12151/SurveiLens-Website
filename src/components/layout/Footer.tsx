import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Instagram, Github } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-black py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/Surveilens Logo.png"
                                alt="Surveilens"
                                width={280}
                                height={70}
                                className="h-28 w-auto object-contain mb-2 scale-150"
                            />
                        </Link>
                        <p className="text-sm text-zinc-500">
                            © {new Date().getFullYear()} Surveilens. All rights reserved.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-4">
                        <div className="flex gap-8 text-sm text-zinc-400">
                            <Link href="/legal/privacy" className="hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/legal/terms" className="hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <a href="mailto:hello@surveilens.ai" className="hover:text-white transition-colors">
                                Contact
                            </a>
                        </div>

                        <div className="flex gap-4">
                            <Link href="#" className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
                                <Github className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
