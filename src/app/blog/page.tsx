"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SignalBackground } from "@/components/layout/SignalBackground";
import { BlogCard } from "@/components/blog/BlogCard";
import { BLOG_POSTS } from "@/data/blog";
import { Sparkles } from "lucide-react";

export default function BlogPage() {
    return (
        <>
            <SignalBackground />
            <Navbar />

            <main className="min-h-screen pt-32 pb-24 text-white">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Hero Section */}
                    <div className="max-w-2xl mb-24">
                        <div className="inline-flex items-center rounded-full border border-surveilens-blue/30 bg-surveilens-blue/10 px-4 py-1.5 text-sm font-medium text-surveilens-blue mb-8 backdrop-blur-sm">
                            <Sparkles className="w-3 h-3 mr-2" />
                            <span>Insights & Updates</span>
                        </div>

                        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-6">
                            The Signal.
                        </h1>
                        <p className="text-xl text-zinc-400 leading-relaxed">
                            News, technical deep dives, and thoughts on the future of ethical security.
                        </p>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {BLOG_POSTS.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>

                </div>
            </main>

            <Footer />
        </>
    );
}
