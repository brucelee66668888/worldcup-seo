import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://football2026tips.com'),

  // 加这一行 ↓（把 xxxxxx 替换成 Google 给你的那串字符）
  verification: {
    google: '3jJqFelg6kSQ4B_6sBXADOyjZglUcaEoyZR4wo2A6s0',
  },

  title: {
    default: '2026世界杯赛事预测 | 比分参考与赛前分析',
    template: '%s | WorldCup Pro 世界杯预测站',
  },
  description: '2026世界杯赛事预测平台，提供阿根廷、巴西、法国、德国等热门球队赛前分析、比分参考和盘口方向，覆盖全部热门赛事。',
  keywords: ['2026世界杯预测', '世界杯比分参考', '世界杯赛前分析', '世界杯大小球', '世界杯盘口'],
  authors: [{ name: 'WorldCup Pro' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    siteName: 'WorldCup Pro',
    locale: 'zh_CN',
    title: '2026世界杯赛事预测 | 比分参考与赛前分析',
    description: '世界杯热门赛事赛前分析、比分方向与盘口参考，每日更新。',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="zh-CN">
      <body className="antialiased">{children}</body>
      </html>
  )
}
