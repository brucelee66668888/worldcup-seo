// app/sitemap.ts
// Next.js App Router 会自动将此文件构建为 /sitemap.xml
// 文档：https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

import type { MetadataRoute } from "next";
import { readFileSync, existsSync } from "fs";
import path from "path";

// ─── 类型定义（与 scripts/fetch-matches.ts 保持一致）────────────
interface Match {
    id: number;
    slug: string; // e.g. "real-madrid-vs-barcelona-2026-04-26"
    utcDate: string;
    competition: { id: number; name: string };
}

interface Post {
    slug: string; // e.g. "champions-league-preview-2026-04-26"
    publishedAt: string;
}

// ─── 读取本地 JSON 缓存（由 scripts 生成）──────────────────────
function loadMatches(): Match[] {
    const filePath = path.join(process.cwd(), "data", "matches.json");
    if (!existsSync(filePath)) return [];
    try {
        return JSON.parse(readFileSync(filePath, "utf-8")) as Match[];
    } catch {
        return [];
    }
}

function loadPosts(): Post[] {
    const filePath = path.join(process.cwd(), "data", "posts.json");
    if (!existsSync(filePath)) return [];
    try {
        return JSON.parse(readFileSync(filePath, "utf-8")) as Post[];
    } catch {
        return [];
    }
}

// ─── Sitemap 主体 ────────────────────────────────────────────
export default function sitemap(): MetadataRoute.Sitemap {
    // const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com";
    const baseUrl = 'https://football2026tips.com'

    // 1. 静态页面
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "hourly",  // 首页比赛数据频繁更新
            priority: 1.0,
        },
        {
            url: `${baseUrl}/matches`,
            lastModified: new Date(),
            changeFrequency: "hourly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/standings`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/posts`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
    ];

    // 2. 比赛详情页（动态）
    const matches = loadMatches();
    const matchPages: MetadataRoute.Sitemap = matches.map((match) => ({
        url: `${baseUrl}/matches/${match.slug ?? match.id}`,
        lastModified: new Date(match.utcDate),
        changeFrequency: "daily" as const,
        priority: 0.7,
    }));

    // 3. AI 生成文章页（动态）
    const posts = loadPosts();
    const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${baseUrl}/posts/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "weekly" as const,
        priority: 0.6,
    }));

    return [...staticPages, ...matchPages, ...postPages];
}