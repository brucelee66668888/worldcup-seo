import { posts } from '@/data/posts';
import CTABox from '@/components/CTABox';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);

    if (!post) return {};

    return {
        title: post.title,
        description: post.description,
        keywords: [...post.keywords],
        alternates: {
            canonical: `/prediction/${post.slug}`,
        },
    };
}

export default async function PredictionPage({ params }: Props) {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);

    if (!post) notFound();

    return (
        <main className="mx-auto max-w-3xl px-4 py-8">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="mt-3 text-gray-500">{post.date}</p>

            <article className="prose mt-8 whitespace-pre-line">
                {post.content}
            </article>

            <CTABox />
        </main>
    );
}