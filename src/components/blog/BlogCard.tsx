import React from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, Newspaper } from "lucide-react";
import { BlogPost } from "@/data/blog";
import { cn } from "@/lib/utils";

interface BlogCardProps {
    post: BlogPost;
    className?: string;
}

export const BlogCard = ({ post, className }: BlogCardProps) => {
    const isExternal = post.type === 'external';
    const href = isExternal ? post.slug : `/blog/${post.slug}`;

    return (
        <Link
            href={href}
            target={isExternal ? "_blank" : undefined}
            className={cn(
                "group relative flex flex-col p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]",
                className
            )}
        >
            {/* Type Badge */}
            <div className="absolute top-6 right-6">
                {isExternal ? (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">
                        <Newspaper className="w-3 h-3" />
                        <span>{post.sourceName || "PRESS"}</span>
                        <ArrowUpRight className="w-3 h-3 ml-1 opacity-50" />
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surveilens-blue/10 border border-surveilens-blue/20 text-xs font-mono text-surveilens-blue">
                        <span>ARTICLE</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 mt-8">
                <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4 font-mono">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                    </div>
                    {post.readTime && (
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-surveilens-blue transition-colors">
                    {post.title}
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                </p>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    {post.author}
                </span>

                {!isExternal && (
                    <span className="text-xs font-bold text-surveilens-blue opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        Read Article &rarr;
                    </span>
                )}
            </div>
        </Link>
    );
};
