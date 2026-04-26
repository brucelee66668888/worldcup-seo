import { brands } from '@/data/brands';
import Header from "@/components/Header";


export const metadata = {
    title: '2026世界杯热门平台活动整理',
    description: '整理世界杯期间的热门赛事活动、平台入口和用户参考信息。',
};

export default function BestSitesPage() {
    return (
        <main className="min-h-screen bg-[#070a12]">
            <Header />

            <section className="mx-auto max-w-7xl px-4 py-16">
                <div className="max-w-3xl">
                    <div className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-black text-black">
                        WORLD CUP OFFERS
                    </div>

                    <h1 className="mt-6 text-5xl font-black">世界杯热门活动整理</h1>

                    <p className="mt-5 text-lg leading-8 text-gray-300">
                        以下内容仅作赛事活动信息整理，请确认你所在地允许相关服务，并理性参与。
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {brands.map((brand, index) => (
                        <div
                            key={brand.key}
                            className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 transition hover:border-yellow-400/50"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-2xl font-black text-black">
                                {index + 1}
                            </div>

                            <h2 className="mt-6 text-2xl font-black">{brand.name}</h2>
                            <p className="mt-3 text-gray-400">{brand.bonus}</p>

                            <a
                                href={`/go/${brand.key}`}
                                rel="nofollow sponsored"
                                className="mt-6 inline-block w-full rounded-2xl bg-yellow-400 px-5 py-4 text-center font-black text-black"
                            >
                                查看活动
                            </a>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}