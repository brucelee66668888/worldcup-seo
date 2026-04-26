import Link from "next/link";

export default function Header() {
  return (
      <header className="sticky top-0 z-50 bg-[#07111f] text-white shadow-lg">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-xl font-black text-black">
              W
            </div>
            <div>
              <div className="text-xl font-black">WorldCup Pro</div>
              <div className="text-xs text-gray-400">世界杯预测情报站</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-bold md:flex">
            <Link href="/">首页</Link>
            <Link href="#matches">赛事预测</Link>
            <Link href="/best-sites">热门活动</Link>
            <Link href="/best-sites">平台推荐</Link>
          </nav>

          <Link
              href="/best-sites"
              className="rounded-full bg-yellow-400 px-5 py-2 text-sm font-black text-black"
          >
            立即查看
          </Link>
        </div>
      </header>
  );
}
