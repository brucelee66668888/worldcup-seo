export type Brand = {
  key: string
  name: string
  bonus: string
  url: string
  description: string
  rating: number
  tag: string
  features: string[]
}

export const brands: Brand[] = [
  {
    key: 'site-a',
    name: '188BET',
    bonus: '首存100%奖金，最高888元',
    url: 'https://example.com/?aff_id=YOUR_ID',
    description: '亚洲领先体育竞猜平台，世界杯专属赔率更新，支持支付宝、微信入款。',
    rating: 4.8,
    tag: '编辑推荐',
    features: ['世界杯特别赔率', '支付宝/微信入款', '24小时中文客服', '手机APP可用'],
  },
  {
    key: 'site-b',
    name: 'Bet365',
    bonus: '新用户首存奖金最高200元',
    url: 'https://example.com/?aff_id=YOUR_ID',
    description: '全球用户量最大的体育平台之一，赛事覆盖广，赔率有竞争力。',
    rating: 4.6,
    tag: '赔率最优',
    features: ['超低让球差价', '现场直播配套', '快速提款', '多语言支持'],
  },
  {
    key: 'site-c',
    name: 'Pinnacle',
    bonus: '无欢迎奖金，行业最高赔率',
    url: 'https://example.com/?aff_id=YOUR_ID',
    description: '专业玩家首选，行业内赔率上限最高，不限制赢家账户。',
    rating: 4.5,
    tag: '专业之选',
    features: ['行业最高赔率', '不封账号', '无上限赔率', '亚盘欧盘齐全'],
  },
]