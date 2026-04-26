import Link from 'next/link';

type Match = {
    home: string;
    away: string;
    date: string;
    slug: string;
    heat: number;
    prediction: string;
};

export default function RankingSidebar({ matches }: { matches: Match[] }) {
    const sorted = [...matches].sort((a, b) => b.heat - a.heat).slice(0, 6);

    return (
        <aside className="rounded-[2rem] bg-white p-6 text-slate-900 shadow-sm ring-1 ring-slate-200">
            <div className="text-sm font-black text-yellow-600">HOT RANKING</div>
            <h2 className="mt-1 text-2xl font-black">热门预测榜</h2>

            <div className="mt-6 space-y-4">
                {sorted.map((m, index) => (
                    <Link
                        key={m.slug}
                        href={`/prediction/${m.slug}`}
                        className="flex gap-4 rounded-2xl p-3 transition hover:bg-slate-100"
                    >
                        <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-lg font-black ${
                                index < 3
                                    ? 'bg-yellow-400 text-black'
                                    : 'bg-slate-100 text-slate-500'
                            }`}
                        >
                            {index + 1}
                        </div>

                        <div className="min-w-0">
                            <div className="line-clamp-1 font-black">
                                {m.home} vs {m.away}
                            </div>
                            <div className="mt-1 text-xs text-slate-500">{m.date}</div>
                            <div className="mt-2 text-sm font-bold text-yellow-600">
                                {m.prediction}
                            </div>
                        </div>

                        <div className="ml-auto text-sm font-black text-red-500">
                            {m.heat}
                        </div>
                    </Link>
                ))}
            </div>
        </aside>
    );
}