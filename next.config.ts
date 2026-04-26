import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── 静态导出 ───────────────────────────────────────────────
  // 构建后输出纯 HTML/CSS/JS 到 out/ 目录，可部署到任意静态托管
  // （Cloudflare Pages、GitHub Pages、Nginx 等）
  output: "export",

  // URL 末尾加斜杠：/matches/123 → /matches/123/
  // 同时输出 /matches/123/index.html 而非 /matches/123.html
  // 对 SEO 更友好，避免重复 URL 问题
  trailingSlash: true,

  // ─── 图片 ───────────────────────────────────────────────────
  // 静态导出模式下 next/image 的内置优化服务不可用，必须显式关闭
  // 球队 Logo 等图片建议使用 Cloudinary / imgproxy 等外部 CDN 处理
  images: {
    unoptimized: true,
    // 如果改用 Cloudflare Images 或 Cloudinary，替换为：
    // loader: "custom",
    // loaderFile: "./src/lib/image-loader.ts",

    // 声明允许加载的外部图片域名（football-data.org 的队徽 CDN）
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crests.football-data.org",
      },
      {
        protocol: "https",
        hostname: "media.api-sports.io",
      },
    ],
  },

  // ─── SEO & 安全 HTTP 响应头 ──────────────────────────────────
  // 注意：output: "export" 时 headers() 在静态文件中不生效，
  // 需要在托管平台（Cloudflare Pages、Vercel、Nginx）单独配置。
  // 此处保留配置，方便切换到 Node.js server 模式时直接生效。
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // 防止 MIME 类型嗅探攻击
          { key: "X-Content-Type-Options", value: "nosniff" },
          // 禁止在 iframe 中嵌入，防点击劫持
          { key: "X-Frame-Options", value: "DENY" },
          // 强制 HTTPS（部署上线后启用）
          // { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // 控制 Referer 信息传递
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // 静态资源长期缓存（哈希文件名保证更新时自动失效）
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // ─── 环境变量（构建时注入到客户端）────────────────────────────
  // NEXT_PUBLIC_ 前缀的变量会打包进前端代码，无需在此声明，
  // 但在此显式列出便于团队了解哪些变量是必须的。
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME ?? "World Cup SEO",
  },

  // ─── TypeScript & ESLint ────────────────────────────────────
  typescript: {
    // CI 构建时如遇 TS 错误不中断（可根据团队规范改为 false）
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // ─── 性能 ───────────────────────────────────────────────────
  // 压缩输出 HTML（减少传输体积）
  compress: true,

  // 开启 React 严格模式（帮助发现潜在问题）
  reactStrictMode: true,

  // ─── 重定向（示例：旧路由兼容）─────────────────────────────
  // 注意：output: "export" 下 redirects() 同样需要在托管平台配置
  async redirects() {
    return [
      // 示例：将旧的纯 ID 路由重定向到新的 slug 路由
      // {
      //   source: "/match/:id(\\d+)",
      //   destination: "/matches/:id",
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;