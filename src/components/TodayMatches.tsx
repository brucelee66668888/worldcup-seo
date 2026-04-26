import Link from 'next/link';

type Match = {
    home: string;
    away: string;
    date: string;
    time: string;
    slug: string;
    prediction: string;
    score: string;
    heat: number;
};

export default function TodayMatches({ matches }: { matches: Match[] }) {
    return (
        <section className="rounded-[2rem] bg-[#081526] p-6 text-white shadow-xl">
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <div className="text-sm font-black text-yellow-400">TODAY FOCUS</div>
                    <h2 className="mt-1 text-2xl font-black">今日重点比赛</h2>
                </div>
                <div className="rounded-full bg-white/10 px-4 py-2 text-sm">
                    实时更新
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {matches.slice(0, 3).map((m) => (
                    <Link
                        key={m.slug}
                        href={`/prediction/${m.slug}`}
                        className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 transition hover:border-yellow-400/60 hover:bg-white/[0.1]"
                    >
                        <div className="flex items-center justify-between text-sm text-gray-400">
                            <span>{m.date}</span>
                            <span>{m.time}</span>
                        </div>

                        <div className="mt-5 flex items-center justify-between gap-3">
                            <div className="flex-1 text-center">
                                <div className="text-lg font-black">{m.home}</div>
                            </div>
                            <div className="rounded-full bg-yellow-400 px-3 py-1 text-sm font-black text-black">
                                VS
                            </div>
                            <div className="flex-1 text-center">
                                <div className="text-lg font-black">{m.away}</div>
                            </div>
                        </div>

                        <div className="mt-5 rounded-2xl bg-black/20 p-4">
                            <div className="text-xs text-gray-400">预测方向</div>
                            <div className="mt-1 font-black text-yellow-400">{m.prediction}</div>
                            <div className="mt-2 text-sm text-gray-300">比分：{m.score}</div>
                        </div>

                        <div className="mt-4 flex justify-between text-sm">
                            <span className="text-gray-400">热度指数</span>
                            <b className="text-red-400">{m.heat}</b>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}