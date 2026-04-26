import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import MatchCard from '@/components/MatchCard';
import TodayMatches from '@/components/TodayMatches';
import RankingSidebar from '@/components/RankingSidebar';
import { matches } from '@/data/matches';

export default function HomePage() {
    const hero = matches[0];

    return (
        <main className="min-h-screen bg-[#eef2f7] text-slate-900">
            <Header />

            <section className="relative overflow-hidden bg-[#07111f] text-white">
                <div className="absolute inset-0">
                    <Image
                        src="/images/stadium-night.jpg"
                        alt="世界杯赛场"
                        fill
                        priority
                        className="object-cover opacity-35"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#07111f] via-[#07111f]/85 to-[#07111f]/40" />
                </div>

                <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="flex flex-col justify-center">
                        <div className="inline-flex w-fit rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-sm font-black text-yellow-300">
                            2026 WORLD CUP · 中文赛事预测站
                        </div>

                        <h1 className="mt-7 max-w-4xl text-5xl font-black leading-tight md:text-7xl">
                            世界杯赛前预测
                            <span className="block text-yellow-400">
                比分参考 · 热门赛事
              </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
                            聚合世界杯热门比赛、球队状态、赛前走势、比分方向和中文用户关注的赛事信息。
                        </p>

                        <div className="mt-9 flex flex-wrap gap-4">
                            <Link
                                href="#today"
                                className="rounded-2xl bg-yellow-400 px-7 py-4 font-black text-black shadow-[0_0_30px_rgba(250,204,21,0.35)]"
                            >
                                今日重点比赛
                            </Link>

                            <Link
                                href="#matches"
                                className="rounded-2xl border border-white/20 bg-white/10 px-7 py-4 font-black text-white backdrop-blur"
                            >
                                查看全部预测
                            </Link>
                        </div>

                        <div className="mt-12 grid max-w-2xl grid-cols-3 gap-4">
                            {[
                                ['98', '最高热度'],
                                ['6+', '预测赛事'],
                                ['24H', '持续更新'],
                            ].map(([num, label]) => (
                                <div
                                    key={label}
                                    className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                                >
                                    <div className="text-3xl font-black text-yellow-400">
                                        {num}
                                    </div>
                                    <div className="mt-1 text-sm text-gray-400">{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Link
                        href={`/prediction/${hero.slug}`}
                        className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur transition hover:-translate-y-1"
                    >
                        <div className="relative h-80 overflow-hidden rounded-[1.5rem]">
                            <Image
                                src={hero.image}
                                alt={`${hero.home} vs ${hero.away}`}
                                fill
                                className="object-cover transition duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                            <div className="absolute left-5 top-5 rounded-full bg-yellow-400 px-4 py-2 text-sm font-black text-black">
                                今日焦点
                            </div>

                            <div className="absolute bottom-5 left-5 right-5">
                                <div className="text-sm text-gray-300">
                                    {hero.date} {hero.time}
                                </div>
                                <h2 className="mt-2 text-3xl font-black">
                                    {hero.home} vs {hero.away}
                                </h2>
                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    <div className="rounded-2xl bg-white/15 p-3">
                                        <div className="text-xs text-gray-300">预测方向</div>
                                        <div className="font-black text-yellow-400">
                                            {hero.prediction}
                                        </div>
                                    </div>
                                    <div className="rounded-2xl bg-white/15 p-3">
                                        <div className="text-xs text-gray-300">比分参考</div>
                                        <div className="font-black">{hero.score}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            <section id="today" className="mx-auto max-w-7xl px-4 py-10">
                <TodayMatches matches={matches} />
            </section>

            <section id="matches" className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[1fr_360px]">
                <div>
                    <div className="mb-8 flex items-end justify-between">
                        <div>
                            <div className="text-sm font-black text-yellow-600">
                                MATCH PREDICTIONS
                            </div>
                            <h2 className="mt-2 text-4xl font-black">世界杯热门预测</h2>
                            <p className="mt-2 text-slate-500">
                                按热度、关注度和比赛话题度整理
                            </p>
                        </div>

                        <Link href="/best-sites" className="hidden font-black text-yellow-600 md:block">
                            热门活动 →
                        </Link>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {matches.map((match) => (
                            <MatchCard key={match.slug} match={match} />
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <RankingSidebar matches={matches} />

                    <div className="rounded-[2rem] bg-[#07111f] p-6 text-white shadow-sm">
                        <div className="text-sm font-black text-yellow-400">
                            WORLD CUP 2026
                        </div>
                        <h2 className="mt-2 text-2xl font-black">赛事活动整理</h2>
                        <p className="mt-3 text-sm leading-6 text-gray-300">
                            查看世界杯期间热门赛事活动、平台信息和用户参考内容。
                        </p>
                        <Link
                            href="/best-sites"
                            className="mt-5 inline-block rounded-2xl bg-yellow-400 px-5 py-3 font-black text-black"
                        >
                            查看活动列表
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="mt-12 bg-[#07111f] py-10 text-white">
                <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 text-sm text-gray-400 md:flex-row">
                    <div>© 2026 WorldCup Pro</div>
                    <div>内容仅作体育赛事分析参考，请遵守所在地法律法规。</div>
                </div>
            </footer>
        </main>
    );
}