import { posts } from '@/data/posts'
import { matches } from '@/data/matches'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
    return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = posts.find((p) => p.slug === slug)
    if (!post) return {}
    return {
        title: post.title,
        description: post.description,
        keywords: [...post.keywords],
        alternates: { canonical: `/prediction/${post.slug}` },
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
        },
    }
}

// 根据比赛找对应的 match 数据（热度、风险等）
function getMatchData(slug: string) {
    return (matches as readonly { slug: string; heat: number; risk: string; score: string; prediction: string; time: string }[])
        .find((m) => m.slug === slug)
}

export default async function PredictionPage({ params }: Props) {
    const { slug } = await params
    const post = posts.find((p) => p.slug === slug)
    if (!post) notFound()

    const matchData = getMatchData(slug)

    // 把 content 里的 ## 标题解析成段落展示
    const sections = post.content
        .split(/\n## /)
        .filter(Boolean)
        .map((block) => {
            const lines = block.trim().split('\n')
            const title = lines[0].replace(/^## /, '')
            const body = lines.slice(1).join('\n').trim()
            return { title, body }
        })

    // 相关比赛（排除自身）
    const relatedPosts = posts.filter((p) => p.slug !== slug).slice(0, 3)

    return (
        <main className="min-h-screen bg-[#070a12] text-white">
            <Header />

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/stadium-night.jpg"
                        alt={post.title}
                        fill
                        priority
                        className="object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#070a12]/40 via-[#070a12]/70 to-[#070a12]" />
                </div>
                <div className="relative mx-auto max-w-5xl px-4 py-16 md:py-24">
                    <div className="flex flex-wrap items-center gap-3">
                        <Link href="/" className="text-sm text-gray-400 hover:text-white transition">
                            首页
                        </Link>
                        <span className="text-gray-600">/</span>
                        <span className="text-sm text-gray-400">赛事预测</span>
                        <span className="text-gray-600">/</span>
                        <span className="text-sm text-yellow-400">{post.home} vs {post.away}</span>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1.5 text-sm font-bold text-yellow-300">
              2026世界杯
            </span>
                        <span className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-gray-300">
              📅 {post.date}
            </span>
                        {matchData && (
                            <span className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-gray-300">
                🔥 热度 {matchData.heat}
              </span>
                        )}
                    </div>
                    <h1 className="mt-6 text-3xl font-black leading-tight md:text-5xl">
                        {post.title}
                    </h1>
                    <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-400">
                        {post.description}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 lg:grid-cols-[1fr_340px]">

                {/* Article */}
                <article>
                    {/* Match Info Card */}
                    <div className="mb-8 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:grid-cols-4">
                        <div className="text-center">
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-500">主队</div>
                            <div className="mt-2 text-xl font-black">{post.home}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-500">客队</div>
                            <div className="mt-2 text-xl font-black">{post.away}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-500">预测方向</div>
                            <div className="mt-2 text-sm font-bold text-yellow-400">
                                {matchData?.prediction ?? '分析中'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-500">比分参考</div>
                            <div className="mt-2 text-sm font-bold text-white">
                                {matchData?.score ?? 'TBD'}
                            </div>
                        </div>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-6">
                        {sections.map((section, i) => (
                            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                                <h2 className="mb-4 flex items-center gap-3 text-xl font-black">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400/20 text-sm font-bold text-yellow-400">
                    {i + 1}
                  </span>
                                    {section.title}
                                </h2>
                                <div className="whitespace-pre-line leading-8 text-gray-300 text-sm md:text-base">
                                    {section.body
                                        .replace(/^- /gm, '• ')
                                        .split('\n')
                                        .map((line, j) => (
                                            <p key={j} className={line.startsWith('•') ? 'ml-4' : ''}>
                                                {line}
                                            </p>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs leading-6 text-gray-600">
                        ⚠️ 本文内容仅作体育赛事分析参考，不构成任何投注建议。请理性看待赛事，并遵守所在地法律法规。
                    </div>

                    {/* Related Posts */}
                    <div className="mt-10">
                        <div className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-500">相关赛事预测</div>
                        <div className="grid gap-4 md:grid-cols-3">
                            {relatedPosts.map((p) => (
                                <Link
                                    key={p.slug}
                                    href={`/prediction/${p.slug}`}
                                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-yellow-400/30"
                                >
                                    <div className="text-xs text-gray-500">{p.date}</div>
                                    <div className="mt-1 font-bold text-sm leading-snug">{p.home} vs {p.away}</div>
                                    <div className="mt-2 text-xs text-yellow-400">查看分析 →</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </article>

                {/* Sidebar */}
                <aside className="space-y-6">
                    {/* Score Prediction Box */}
                    <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/5 p-6">
                        <div className="text-xs font-bold uppercase tracking-widest text-yellow-400">赛事预测</div>
                        <h3 className="mt-3 text-2xl font-black">{post.home} vs {post.away}</h3>
                        <div className="mt-6 space-y-3">
                            {[
                                { label: '预测方向', value: matchData?.prediction ?? '待分析' },
                                { label: '比分参考', value: matchData?.score ?? 'TBD' },
                                { label: '风险评级', value: matchData?.risk ?? '中' },
                                { label: '比赛日期', value: post.date },
                            ].map(({ label, value }) => (
                                <div key={label} className="flex items-center justify-between border-b border-white/10 pb-3 text-sm">
                                    <span className="text-gray-400">{label}</span>
                                    <span className="font-bold text-white">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Box */}
                    <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-6 border border-white/10">
                        <div className="text-xs font-bold uppercase tracking-widest text-yellow-400">世界杯活动</div>
                        <h3 className="mt-3 text-xl font-black">热门平台整理</h3>
                        <p className="mt-3 text-sm leading-6 text-gray-400">
                            查看世界杯期间各平台新用户活动与赔率对比信息。
                        </p>
                        <Link
                            href="/best-sites"
                            className="mt-5 inline-block w-full rounded-xl bg-yellow-400 px-5 py-3 text-center text-sm font-black text-black transition hover:bg-yellow-300"
                        >
                            查看平台列表 →
                        </Link>
                        <p className="mt-3 text-center text-xs text-gray-600">18+ · 理性参与 · 仅供参考</p>
                    </div>

                    {/* All Matches */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                        <div className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">全部赛事</div>
                        <div className="space-y-2">
                            {posts.map((p) => (
                                <Link
                                    key={p.slug}
                                    href={`/prediction/${p.slug}`}
                                    className={`block rounded-xl px-3 py-2.5 text-sm transition ${
                                        p.slug === slug
                                            ? 'bg-yellow-400/10 text-yellow-400 font-bold'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    {p.home} vs {p.away}
                                    <span className="ml-2 text-xs text-gray-600">{p.date}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>
            </section>

            <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-600">
                © 2026 WorldCup Pro · 内容仅作赛事分析参考，不构成投注建议
            </footer>
        </main>
    )
}
