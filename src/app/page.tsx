import Link from 'next/link';
import { posts } from '@/data/posts';

export default function HomePage() {
    return (
        <main className="mx-auto max-w-5xl px-4 py-8">
            <h1 className="text-4xl font-bold">世界杯赛前预测与分析</h1>
            <p className="mt-3 text-gray-600">
                提供世界杯热门比赛前瞻、比分参考、球队状态和中文用户赛事资讯。
            </p>

            <div className="mt-8 grid gap-4">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/prediction/${post.slug}`}
                        className="rounded-xl border p-5 hover:bg-gray-50"
                    >
                        <h2 className="text-xl font-bold">{post.title}</h2>
                        <p className="mt-2 text-gray-600">{post.description}</p>
                    </Link>
                ))}
            </div>
        </main>
    );
}