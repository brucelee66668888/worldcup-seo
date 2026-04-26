export type Brand = {
  key: string
  name: string
  bonus: string
  url: string
  description: string   // ← SiteCard.tsx 第17行用了这个
  rating: number        // ← SiteCard.tsx 第18行用了这个
}

export const brands: Brand[] = [
  {
    key: 'site-a',
    name: '平台A',
    bonus: '新用户活动',
    url: 'https://example.com/?aff_id=YOUR_ID',
    description: '热门世界杯赛事平台，提供多种赛事参考。',
    rating: 4.5,
  },
  {
    key: 'site-b',
    name: '平台B',
    bonus: '世界杯专区',
    url: 'https://example.com/?aff_id=YOUR_ID',
    description: '专注世界杯赛事分析，覆盖全部小组赛。',
    rating: 4.2,
  },
]