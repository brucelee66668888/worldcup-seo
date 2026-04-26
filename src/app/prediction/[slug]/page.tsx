import {posts} from '@/data/posts';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Image from 'next/image';
import Header from "@/components/Header";

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
        <main className="min-h-screen bg-[#070a12]">
            <Header />

            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/worldcup-hero.jpg"
                        alt={post.title}
                        fill
                        priority
                        className="object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#070a12]/60 via-[#070a12]/80 to-[#070a12]" />
                </div>

                <div className="relative mx-auto max-w-5xl px-4 py-20">
                    <div className="inline-flex rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-sm font-black text-yellow-300">
                        {post.date} · {post.home} vs {post.away}
                    </div>

                    <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
                        {post.title}
                    </h1>

                    <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
                        {post.description}
                    </p>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_360px]">
                <article className="rounded-[2rem] bg-white p-6 text-black shadow-2xl md:p-10">
                    <div className="prose max-w-none whitespace-pre-line leading-8">
                        {post.content}
                    </div>
                </article>

                <aside className="space-y-6">
                    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
                        <div className="text-sm font-black text-yellow-400">MATCH INFO</div>
                        <h2 className="mt-2 text-2xl font-black">赛事信息</h2>

                        <div className="mt-6 space-y-4 text-sm">
                            <div className="flex justify-between border-b border-white/10 pb-3">
                                <span className="text-gray-400">主队</span>
                                <b>{post.home}</b>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-3">
                                <span className="text-gray-400">客队</span>
                                <b>{post.away}</b>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-3">
                                <span className="text-gray-400">日期</span>
                                <b>{post.date}</b>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[2rem] bg-yellow-400 p-6 text-black">
                        <div className="text-sm font-black">WORLD CUP 2026</div>
                        <h2 className="mt-2 text-2xl font-black">热门赛事活动</h2>
                        <p className="mt-3 text-sm leading-6">
                            查看世界杯期间热门活动与赛事信息整理。
                        </p>
                        <a
                            href="/best-sites"
                            className="mt-5 inline-block rounded-2xl bg-black px-5 py-3 font-black text-white"
                        >
                            查看活动列表
                        </a>
                    </div>
                </aside>
            </section>
        </main>
    );
}