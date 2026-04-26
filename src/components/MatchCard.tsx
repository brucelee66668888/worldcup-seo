import Image from 'next/image';
import Link from 'next/link';

type Match = {
    home: string;
    away: string;
    date: string;
    time: string;
    league: string;
    stage: string;
    slug: string;
    image: string;
    prediction: string;
    score: string;
    heat: number;
    risk: string;
};

export default function MatchCard({ match }: { match: Match }) {
    return (
        <Link
            href={`/prediction/${match.slug}`}
            className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl"
        >
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={match.image}
                    alt={`${match.home} vs ${match.away}`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                <div className="absolute left-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-black">
                    {match.stage}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-sm text-gray-200">{match.league}</div>
                    <div className="mt-1 text-2xl font-black">
                        {match.home} vs {match.away}
                    </div>
                </div>
            </div>

            <div className="p-5 text-slate-900">
                <div className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3">
                    <div>
                        <div className="text-xs text-slate-500">比赛时间</div>
                        <div className="font-black">
                            {match.date} {match.time}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-slate-500">热度</div>
                        <div className="font-black text-red-500">{match.heat}</div>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-emerald-50 p-3">
                        <div className="text-xs text-emerald-600">预测方向</div>
                        <div className="mt-1 font-black">{match.prediction}</div>
                    </div>
                    <div className="rounded-2xl bg-blue-50 p-3">
                        <div className="text-xs text-blue-600">比分参考</div>
                        <div className="mt-1 font-black">{match.score}</div>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
            风险：{match.risk}
          </span>
                    <span className="font-black text-yellow-600">查看分析 →</span>
                </div>
            </div>
        </Link>
    );
}