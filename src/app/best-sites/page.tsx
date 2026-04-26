import { brands } from '@/data/brands';

export const metadata = {
    title: '2026世界杯热门平台活动整理',
    description: '整理世界杯期间的热门赛事活动、平台入口和用户参考信息。',
};

export default function BestSitesPage() {
    return (
        <main className="mx-auto max-w-4xl px-4 py-8">
            <h1 className="text-3xl font-bold">2026世界杯热门平台活动整理</h1>
            <p className="mt-3 text-gray-600">
                以下内容仅作信息整理，请遵守所在地法律法规，并理性参与。
            </p>

            <div className="mt-8 grid gap-4">
                {brands.map((brand) => (
                    <div key={brand.key} className="rounded-xl border p-5">
                        <h2 className="text-xl font-bold">{brand.name}</h2>
                        <p className="mt-2 text-gray-600">{brand.bonus}</p>
                        <a
                            href={`/go/${brand.key}`}
                            rel="nofollow sponsored"
                            className="mt-4 inline-block rounded-lg bg-black px-5 py-3 text-white"
                        >
                            查看活动
                        </a>
                    </div>
                ))}
            </div>
        </main>
    );
}