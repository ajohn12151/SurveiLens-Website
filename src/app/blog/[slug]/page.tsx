"use client";

import React from "react";
import { notFound, useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/data/blog";
import { ArrowLeft, Calendar, Clock, Share2, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Simple Markdown parser for the blog content
function parseMarkdown(content: string): React.ReactNode[] {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Skip empty lines
        if (!line.trim()) {
            continue;
        }

        // Horizontal rule
        if (line.trim() === '---') {
            elements.push(<hr key={key++} className="my-8 border-white/20" />);
            continue;
        }

        // H2 headers
        if (line.startsWith('## ')) {
            elements.push(
                <h2 key={key++} className="text-2xl font-bold mt-12 mb-6 text-white">
                    {parseInlineStyles(line.substring(3))}
                </h2>
            );
            continue;
        }

        // H3 headers
        if (line.startsWith('### ')) {
            elements.push(
                <h3 key={key++} className="text-xl font-bold mt-8 mb-4 text-white">
                    {parseInlineStyles(line.substring(4))}
                </h3>
            );
            continue;
        }

        // Numbered lists (simple detection)
        if (/^\d+\.\s/.test(line)) {
            const listItems: string[] = [];
            let j = i;
            while (j < lines.length && /^\d+\.\s/.test(lines[j])) {
                listItems.push(lines[j].replace(/^\d+\.\s/, ''));
                j++;
            }
            elements.push(
                <ol key={key++} className="list-decimal list-inside space-y-2 mb-6 text-zinc-300">
                    {listItems.map((item, idx) => (
                        <li key={idx}>{parseInlineStyles(item)}</li>
                    ))}
                </ol>
            );
            i = j - 1;
            continue;
        }

        // Bulleted lists
        if (line.startsWith('- ')) {
            const listItems: string[] = [];
            let j = i;
            while (j < lines.length && lines[j].startsWith('- ')) {
                listItems.push(lines[j].substring(2));
                j++;
            }
            elements.push(
                <ul key={key++} className="list-disc list-inside space-y-2 mb-6 text-zinc-300">
                    {listItems.map((item, idx) => (
                        <li key={idx}>{parseInlineStyles(item)}</li>
                    ))}
                </ul>
            );
            i = j - 1;
            continue;
        }

        // Regular paragraph
        elements.push(
            <p key={key++} className="mb-6 text-zinc-300 leading-relaxed">
                {parseInlineStyles(line)}
            </p>
        );
    }

    return elements;
}

// Parse inline formatting (bold, italic)
function parseInlineStyles(text: string): React.ReactNode {
    const parts: React.ReactNode[] = [];
    let current = '';
    let i = 0;
    let key = 0;

    while (i < text.length) {
        // Bold: **text**
        if (text.substring(i, i + 2) === '**' && text.substring(i + 2).includes('**')) {
            if (current) {
                parts.push(<span key={key++}>{current}</span>);
                current = '';
            }
            const endIdx = text.indexOf('**', i + 2);
            const boldText = text.substring(i + 2, endIdx);
            parts.push(<strong key={key++} className="text-white font-semibold">{boldText}</strong>);
            i = endIdx + 2;
            continue;
        }

        // Italic: *text* (but not ** which is bold)
        if (text[i] === '*' && text.substring(i, i + 2) !== '**' && text.substring(i + 1).includes('*')) {
            if (current) {
                parts.push(<span key={key++}>{current}</span>);
                current = '';
            }
            const endIdx = text.indexOf('*', i + 1);
            const italicText = text.substring(i + 1, endIdx);
            parts.push(<em key={key++} className="italic">{italicText}</em>);
            i = endIdx + 1;
            continue;
        }

        current += text[i];
        i++;
    }

    if (current) {
        parts.push(<span key={key++}>{current}</span>);
    }

    return parts.length === 1 ? parts[0] : <>{parts}</>;
}

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

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="lead text-xl text-zinc-300 mb-8">
                            {post.excerpt}
                        </p>

                        {post.content ? (
                            <div className="article-content">
                                {parseMarkdown(post.content)}
                            </div>
                        ) : (
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center my-12">
                                <p className="text-zinc-500 italic">
                                    Full article coming soon.
                                </p>
                            </div>
                        )}
                    </div>

                </article>
            </main>

            <Footer />
        </>
    );
}
