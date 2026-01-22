"use client";

import React from "react";
import { notFound, useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/data/blog";
import { ArrowLeft, Calendar, Clock, Share2, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function BlogPostPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Post not found</h1>
                    <Link href="/blog" className="text-surveilens-blue hover:underline">
                        &larr; Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <main className="min-h-screen pt-32 pb-24 bg-black text-white">

                {/* Progress Bar (Simulated) */}
                <div className="fixed top-0 left-0 w-full h-1 z-50">
                    <div className="h-full bg-gradient-to-r from-surveilens-blue to-purple-500 w-[30%]" />
                </div>

                <article className="max-w-3xl mx-auto px-6">
                    {/* Back Link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-sm text-zinc-500 hover:text-white transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to all posts
                    </Link>

                    {/* Header */}
                    <header className="mb-12">
                        <div className="flex flex-wrap gap-4 text-sm text-zinc-400 font-mono mb-6">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {post.date}
                            </span>
                            {post.readTime && (
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime}
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-8 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-between border-y border-white/10 py-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-surveilens-blue/20 flex items-center justify-center">
                                    <User className="w-5 h-5 text-surveilens-blue" />
                                </div>
                                <div>
                                    <div className="font-medium text-white">{post.author}</div>
                                    <div className="text-xs text-zinc-500">Author</div>
                                </div>
                            </div>

                            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </header>

                    {/* Content Placeholder */}
                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="lead text-xl text-zinc-300 mb-8">
                            {post.excerpt}
                        </p>

                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center my-12">
                            <p className="text-zinc-500 italic">
                                [Full article content would be rendered here from Markdown]
                            </p>
                            <p className="text-zinc-600 text-sm mt-2">
                                Editor note: This is a placeholder for the demo.
                            </p>
                        </div>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>

                        <h3>The Path Forward</h3>
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>

                </article>
            </main>

            <Footer />
        </>
    );
}
