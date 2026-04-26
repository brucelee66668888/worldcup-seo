// app/layout.tsx
// 全局 metadata 基础配置 —— 各子页面通过 generateMetadata() 覆盖具体字段

import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "World Cup SEO";

// ─── 全局默认 Metadata ──────────────────────────────────────
// 子页面的 generateMetadata() 会自动合并并覆盖这里的字段
export const metadata: Metadata = {
  // metadataBase 是所有相对路径 URL 的基础，必须设置
  metadataBase: new URL(siteUrl),

  // 模板格式：子页面 title 会变成 "页面标题 | World Cup SEO"
  title: {
    default: `${siteName} — 世界杯赛程、比分与数据分析`,
    template: `%s | ${siteName}`,
  },

  description:
      "专业世界杯足球资讯平台，提供实时比分、赛程预测、球队数据分析与 AI 赛事复盘，覆盖全球主要联赛。",

  // ─── Open Graph（微信、微博分享卡片）─────────────────────
  openGraph: {
    type: "website",
    siteName,
    locale: "zh_CN",
    url: siteUrl,
    title: `${siteName} — 世界杯赛程、比分与数据分析`,
    description: "实时比分、赛程预测、AI 赛事复盘，一站式足球情报平台。",
    images: [
      {
        url: "/og-default.jpg", // 放在 public/og-default.jpg，建议 1200×630px
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },

  // ─── Twitter / X 卡片 ────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — 世界杯赛程、比分与数据分析`,
    description: "实时比分、赛程预测、AI 赛事复盘。",
    images: ["/og-default.jpg"],
  },

  // ─── 搜索引擎指令 ────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ─── 其他 ───────────────────────────────────────────────
  alternates: {
    canonical: siteUrl,
    // 如果将来支持多语言，在此添加 hreflang
    // languages: { "en-US": `${siteUrl}/en`, "zh-CN": siteUrl },
  },

  // 禁用 Next.js 默认注入的 viewport meta（Next.js 15 已分离）
  // viewport 配置请移至 export const viewport: Viewport = { ... }
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="zh-CN">
      <head>
        {/* 结构化数据：网站整体 Schema */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: siteName,
                url: siteUrl,
                description: "世界杯足球赛程、实时比分与数据分析平台",
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: `${siteUrl}/search?q={search_term_string}`,
                  },
                  "query-input": "required name=search_term_string",
                },
              }),
            }}
        />
      </head>
      <body>{children}</body>
      </html>
  );
}
