import Link from 'next/link';

export default function CTABox() {
    return (
        <div className="mt-10 rounded-xl border p-6">
            <h2 className="text-xl font-bold">世界杯赛事参考工具</h2>
            <p className="mt-2 text-gray-600">
                查看热门赛事、平台活动和赛前分析。请确认你所在地允许相关服务。
            </p>
            <Link
                href="/best-sites"
                className="mt-4 inline-block rounded-lg bg-black px-5 py-3 text-white"
            >
                查看推荐列表
            </Link>
        </div>
    );
}