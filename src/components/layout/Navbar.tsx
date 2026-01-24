"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: "/product", label: "Product" },
        { href: "/security", label: "Security" },
        { href: "/blog", label: "Blog" },
    ];

    return (
        <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-surveilens-bg/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/Surveilens Logo.png"
                                alt="Surveilens"
                                width={480}
                                height={120}
                                className="h-40 w-auto object-contain drop-shadow-md scale-150"
                                priority
                            />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <Link href="/early-access">
                            <Button size="sm">Join Early Access</Button>
                        </Link>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-white/10 hover:text-white focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={cn("md:hidden", isOpen ? "block" : "hidden")}>
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 bg-zinc-900/90 backdrop-blur-xl border-b border-white/5 animate-fade-in">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="block rounded-md px-3 py-2 text-base font-medium text-zinc-300 hover:bg-white/10 hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-4 pb-2">
                        <Link href="/early-access" onClick={() => setIsOpen(false)}>
                            <Button className="w-full">Join Early Access</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
