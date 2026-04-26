import Link from 'next/link';

export default function CTABox() {
    return (
        <div className="rounded-3xl bg-black p-6 text-white shadow-xl">
            <div className="text-sm text-gray-300">World Cup 2026</div>
            <h2 className="mt-2 text-2xl font-black">查看热门赛事活动</h2>
            <p className="mt-3 text-sm leading-6 text-gray-300">
                整理世界杯期间热门平台活动和赛事参考信息。请遵守所在地法律法规，理性参与。
            </p>
            <Link
                href="/best-sites"
                className="mt-5 inline-block rounded-xl bg-white px-5 py-3 font-bold text-black"
            >
                查看活动列表
            </Link>
        </div>
    );
}