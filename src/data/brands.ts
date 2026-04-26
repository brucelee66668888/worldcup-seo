// 加上 Brand 类型定义并导出
export type Brand = {
  key: string
  name: string
  bonus: string
  url: string
}

export const brands: Brand[] = [
  {
    key: 'site-a',
    name: '平台A',
    bonus: '新用户活动',
    url: 'https://example.com/?aff_id=YOUR_ID',
  },
  {
    key: 'site-b',
    name: '平台B',
    bonus: '世界杯专区',
    url: 'https://example.com/?aff_id=YOUR_ID',
  },
]