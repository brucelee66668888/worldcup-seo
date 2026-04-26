import { brands } from '@/data/brands'
import Header from '@/components/Header'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: '2026世界杯最佳平台推荐 | 赔率对比与新人活动整理',
    description: '2026世界杯最值得关注的平台整理，包含赔率对比、新用户活动和主要特点分析。内容仅供参考，请遵守所在地法律法规。',
}

const stars = (rating: number) => {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5
    return { full, half, empty: 5 - full - (half ? 1 : 0) }
}

export default function BestSitesPage() {
    return (
        <main className="min-h-screen bg-[#070a12] text-white">
            <Header />

            {/* Hero */}
            <section className="border-b border-white/10 bg-gradient-to-b from-[#0d1829] to-[#070a12] px-4 py-16">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-bold text-yellow-300">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
                        2026 WORLD CUP · 平台参考整理
                    </div>
                    <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
                        世界杯热门平台
                        <span className="block text-yellow-400">活动与赔率整理</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
                        以下内容仅作信息整理与参考，不构成投注建议。请确认您所在地区相关服务合法，并理性参与。
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-gray-500">
                        <span className="rounded-full bg-white/5 px-3 py-1">✓ 信息仅供参考</span>
                        <span className="rounded-full bg-white/5 px-3 py-1">✓ 请理性参与</span>
                        <span className="rounded-full bg-white/5 px-3 py-1">✓ 遵守当地法规</span>
                    </div>
                </div>
            </section>

            {/* Platform Cards */}
            <section className="mx-auto max-w-5xl px-4 py-16">
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <div className="text-sm font-bold text-yellow-400 tracking-widest">PLATFORM REVIEW</div>
                        <h2 className="mt-2 text-3xl font-black">平台信息对比</h2>
                    </div>
                    <Link href="/" className="text-sm text-gray-400 hover:text-white transition">
                        ← 返回赛事预测
                    </Link>
                </div>

                <div className="space-y-6">
                    {brands.map((brand, index) => {
                        const s = stars(brand.rating)
                        return (
                            <div
                                key={brand.key}
                                className={`relative overflow-hidden rounded-2xl border p-6 transition hover:border-yellow-400/40 md:p-8 ${
                                    index === 0
                                        ? 'border-yellow-400/40 bg-gradient-to-r from-yellow-400/10 to-transparent'
                                        : 'border-white/10 bg-white/[0.03]'
                                }`}
                            >
                                {/* Tag */}
                                {brand.tag && (
                                    <div className={`absolute right-6 top-6 rounded-full px-3 py-1 text-xs font-bold ${
                                        index === 0 ? 'bg-yellow-400 text-black' : 'bg-white/10 text-gray-300'
                                    }`}>
                                        {brand.tag}
                                    </div>
                                )}

                                <div className="grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
                                    {/* Rank + Name */}
                                    <div className="flex items-center gap-4">
                                        <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-2xl font-black ${
                                            index === 0 ? 'bg-yellow-400 text-black' : 'bg-white/10 text-white'
                                        }`}>
                                            {index + 1}
                                        </div>
                                        <div>
                                            <div className="text-xl font-black">{brand.name}</div>
                                            {/* Stars */}
                                            <div className="mt-1 flex items-center gap-1">
                                                {Array.from({ length: s.full }).map((_, i) => (
                                                    <span key={`f${i}`} className="text-yellow-400">★</span>
                                                ))}
                                                {s.half && <span className="text-yellow-400">½</span>}
                                                {Array.from({ length: s.empty }).map((_, i) => (
                                                    <span key={`e${i}`} className="text-gray-600">★</span>
                                                ))}
                                                <span className="ml-1 text-sm text-gray-400">{brand.rating}/5</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div>
                                        <div className="mb-1 text-sm font-bold text-yellow-300">{brand.bonus}</div>
                                        <p className="text-sm leading-6 text-gray-400">{brand.description}</p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {brand.features.map((f) => (
                                                <span key={f} className="rounded-lg bg-white/5 px-2 py-1 text-xs text-gray-400">
                          ✓ {f}
                        </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="flex flex-col gap-2">
                                        <a
                                            href={`/go/${brand.key}`}
                                            rel="nofollow sponsored noopener"
                                            target="_blank"
                                            className={`whitespace-nowrap rounded-xl px-6 py-3 text-center text-sm font-black transition ${
                                                index === 0
                                                    ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                                                    : 'border border-yellow-400/40 text-yellow-400 hover:bg-yellow-400/10'
                                            }`}
                                        >
                                            查看活动 →
                                        </a>
                                        <div className="text-center text-xs text-gray-600">
                                            18+ · 理性参与
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Disclaimer */}
                <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm leading-7 text-gray-500">
                    <div className="mb-2 font-bold text-gray-400">免责声明</div>
                    本页面所有内容仅作信息整理与参考用途，不构成任何投注建议或推荐。请在参与前确认您所在地区的相关法律法规，并对自身行为负责。如您有赌博相关问题，请寻求专业帮助。
                </div>
            </section>

            {/* Back to matches */}
            <section className="border-t border-white/10 py-10 text-center">
                <Link
                    href="/"
                    className="inline-block rounded-2xl border border-white/20 px-8 py-4 text-sm font-bold text-white transition hover:border-yellow-400/40 hover:text-yellow-400"
                >
                    ← 返回世界杯赛事预测
                </Link>
            </section>

            <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-600">
                © 2026 WorldCup Pro · 内容仅供参考 · 请遵守所在地法律法规
            </footer>
        </main>
    )
}
