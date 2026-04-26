// app/robots.ts
// Next.js App Router 自动构建为 /robots.txt
// 文档：https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com";

    return {
        rules: [
            {
                // 放行主流搜索引擎
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",       // API 路由（如果将来添加）
                    "/_next/",     // Next.js 内部资源（托管平台通常已处理）
                    "/admin/",     // 后台管理（如果将来添加）
                ],
            },
            {
                // 禁止 AI 训练爬虫（可选，根据运营策略调整）
                userAgent: ["GPTBot", "ChatGPT-User", "CCBot", "anthropic-ai"],
                disallow: "/",
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}