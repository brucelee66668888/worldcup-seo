// app/matches/[slug]/page.tsx
// 示例：每个比赛页面独立的 SEO metadata + SportsEvent 结构化数据

import type { Metadata } from "next";

// ─── 类型 ────────────────────────────────────────────────────
interface Match {
    slug: string;
    homeTeam: { name: string; crest: string };
    awayTeam: { name: string; crest: string };
    competition: { name: string };
    utcDate: string;
    venue?: string;
    score?: { fullTime: { home: number | null; away: number | null } };
    status: "SCHEDULED" | "LIVE" | "FINISHED";
}

// ─── 数据获取（从本地 JSON 或 API）──────────────────────────
async function getMatch(slug: string): Promise<Match | null> {
    // 生产环境：从构建时生成的 JSON 文件读取
    const { readFileSync, existsSync } = await import("fs");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "data", "matches", `${slug}.json`);
    if (!existsSync(filePath)) return null;
    return JSON.parse(readFileSync(filePath, "utf-8")) as Match;
}

// ─── generateStaticParams（SSG 必须）────────────────────────
// Next.js 在构建时调用此函数，枚举所有需要生成的页面
export async function generateStaticParams() {
    const { readFileSync, existsSync } = await import("fs");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "data", "matches.json");
    if (!existsSync(filePath)) return [];
    const matches = JSON.parse(readFileSync(filePath, "utf-8")) as Match[];
    return matches.map((m) => ({ slug: m.slug }));
}

// ─── generateMetadata（每页独立 SEO）────────────────────────
export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const match = await getMatch(slug);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com";

    if (!match) {
        return { title: "比赛未找到" };
    }

    const { homeTeam, awayTeam, competition, utcDate, score, status } = match;

    // 构造标题：根据比赛状态动态调整
    const dateStr = new Date(utcDate).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    let title: string;
    let description: string;

    if (status === "FINISHED" && score?.fullTime.home !== null) {
        // 已结束：包含比分（用户搜索"皇马 3-1 巴萨"时能命中）
        title = `${homeTeam.name} ${score.fullTime.home} - ${score.fullTime.away} ${awayTeam.name} | ${competition.name} ${dateStr}`;
        description = `${dateStr} ${competition.name}：${homeTeam.name} vs ${awayTeam.name} 完整赛事数据、比分复盘与数据分析。`;
    } else if (status === "LIVE") {
        title = `🔴 直播 | ${homeTeam.name} vs ${awayTeam.name} — ${competition.name}`;
        description = `${homeTeam.name} vs ${awayTeam.name} 正在直播，实时比分与赛事数据更新。`;
    } else {
        // 未开赛：侧重预测关键词
        title = `${homeTeam.name} vs ${awayTeam.name} 赛事预测 | ${competition.name} ${dateStr}`;
        description = `${dateStr} ${competition.name}：${homeTeam.name} vs ${awayTeam.name} 赛前分析、历史交锋与胜负预测。`;
    }

    const canonicalUrl = `${siteUrl}/matches/${slug}`;
    const ogImage = match.homeTeam.crest || "/og-default.jpg";

    return {
        title,
        description,
        alternates: { canonical: canonicalUrl },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            type: "article",
            images: [{ url: ogImage, width: 400, height: 400, alt: `${homeTeam.name} 队徽` }],
        },
        twitter: { card: "summary", title, description, images: [ogImage] },
    };
}

// ─── 页面组件 ────────────────────────────────────────────────
export default async function MatchPage({
                                            params,
                                        }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const match = await getMatch(slug);
    if (!match) return <div>比赛数据不存在</div>;

    const { homeTeam, awayTeam, competition, utcDate, score, status, venue } = match;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com";

    // ─── SportsEvent 结构化数据 ──────────────────────────────
    // Google 可读取此数据，在搜索结果展示比分、时间等富媒体摘要
    const sportsEventSchema = {
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        name: `${homeTeam.name} vs ${awayTeam.name}`,
        startDate: utcDate,
        sport: "Football",
        description: `${competition.name} 赛事：${homeTeam.name} vs ${awayTeam.name}`,
        url: `${siteUrl}/matches/${slug}`,
        ...(venue ? { location: { "@type": "Place", name: venue } } : {}),
        competitor: [
            { "@type": "SportsTeam", name: homeTeam.name, image: homeTeam.crest },
            { "@type": "SportsTeam", name: awayTeam.name, image: awayTeam.crest },
        ],
        ...(status === "FINISHED" && score?.fullTime.home !== null
            ? {
                // 比赛已结束，填入比分
                subEvent: [],
                eventStatus: "https://schema.org/EventScheduled",
                // 自定义比分字段（非标准但 Google 可识别）
                homeTeamScore: score?.fullTime.home,
                awayTeamScore: score?.fullTime.away,
            }
            : {}),
        superEvent: {
            "@type": "SportsEvent",
            name: competition.name,
        },
    };

    return (
        <>
            {/* 结构化数据注入 */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsEventSchema) }}
            />

            {/* 页面内容（根据你的实际 UI 替换） */}
            <main>
                <h1>
                    {homeTeam.name} vs {awayTeam.name}
                </h1>
                <p>{competition.name}</p>
                {status === "FINISHED" && (
                    <p>
                        比分：{score?.fullTime.home} - {score?.fullTime.away}
                    </p>
                )}
            </main>
        </>
    );
}
