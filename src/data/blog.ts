export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    type: 'internal' | 'external';
    slug: string; // Internal: /blog/slug, External: https://...
    image?: string;
    readTime?: string;
    sourceName?: string; // For external posts (e.g., "TechCrunch")
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: '1',
        title: "Why we don't use Facial Recognition",
        excerpt: "Our deep dive into ethical AI and why we chose behavioral analysis over identity profiling to protect student privacy.",
        date: "January 22, 2026",
        author: "Alan John, Co-Founder",
        type: 'internal',
        slug: 'no-facial-recognition',
        readTime: '5 min read',
    },
    {
        id: '2',
        title: "Surveilens plans MVP launch to modernize school security",
        excerpt: "TechCrunch discusses our upcoming MVP and how we're using existing infrastructure to detect threats without new hardware.",
        date: "January 20, 2026",
        author: "TechCrunch",
        type: 'external',
        slug: 'https://techcrunch.com', // Placeholder link
        sourceName: "TechCrunch",
    }
];
