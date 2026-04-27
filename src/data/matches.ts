export type Match = {
  home: string
  away: string
  date: string
  time: string
  league: string
  stage: string
  slug: string
  image: string
  prediction: string
  score: string
  heat: number
  risk: string
}

export const allMatches: Match[] = [
  // ── A 组 ──────────────────────────────
  {
    home: '卡塔尔', away: '厄瓜多尔',
    date: '2026-06-11', time: '21:00', league: '2026世界杯', stage: 'A组',
    slug: 'qatar-vs-ecuador-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '厄瓜多尔不败', score: '1-1 / 0-2', heat: 72, risk: '中',
  },
  {
    home: '塞内加尔', away: '荷兰',
    date: '2026-06-14', time: '17:00', league: '2026世界杯', stage: 'A组',
    slug: 'senegal-vs-netherlands-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '荷兰胜', score: '0-2 / 1-2', heat: 75, risk: '中',
  },
  {
    home: '卡塔尔', away: '塞内加尔',
    date: '2026-06-18', time: '17:00', league: '2026世界杯', stage: 'A组',
    slug: 'qatar-vs-senegal-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '塞内加尔胜', score: '0-2 / 1-1', heat: 68, risk: '中',
  },
  {
    home: '荷兰', away: '厄瓜多尔',
    date: '2026-06-18', time: '17:00', league: '2026世界杯', stage: 'A组',
    slug: 'netherlands-vs-ecuador-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '荷兰胜', score: '2-0 / 1-1', heat: 76, risk: '低中',
  },
  {
    home: '荷兰', away: '卡塔尔',
    date: '2026-06-22', time: '21:00', league: '2026世界杯', stage: 'A组',
    slug: 'netherlands-vs-qatar-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '荷兰大胜', score: '2-0 / 3-0', heat: 70, risk: '低',
  },
  {
    home: '厄瓜多尔', away: '塞内加尔',
    date: '2026-06-22', time: '21:00', league: '2026世界杯', stage: 'A组',
    slug: 'ecuador-vs-senegal-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '双方进球', score: '1-1 / 2-1', heat: 74, risk: '中',
  },

  // ── B 组 ──────────────────────────────
  {
    home: '英格兰', away: '伊朗',
    date: '2026-06-13', time: '19:00', league: '2026世界杯', stage: 'B组',
    slug: 'england-vs-iran-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '英格兰大胜', score: '3-0 / 2-0', heat: 82, risk: '低',
  },
  {
    home: '美国', away: '威尔士',
    date: '2026-06-13', time: '22:00', league: '2026世界杯', stage: 'B组',
    slug: 'usa-vs-wales-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '美国不败', score: '1-1 / 2-0', heat: 78, risk: '中',
  },
  {
    home: '威尔士', away: '伊朗',
    date: '2026-06-17', time: '13:00', league: '2026世界杯', stage: 'B组',
    slug: 'wales-vs-iran-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '威尔士胜', score: '2-0 / 2-1', heat: 71, risk: '中',
  },
  {
    home: '英格兰', away: '美国',
    date: '2026-06-17', time: '22:00', league: '2026世界杯', stage: 'B组',
    slug: 'england-vs-usa-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '英格兰不败', score: '1-1 / 2-0', heat: 85, risk: '中',
  },
  {
    home: '威尔士', away: '英格兰',
    date: '2026-06-21', time: '19:00', league: '2026世界杯', stage: 'B组 · 德比',
    slug: 'wales-vs-england-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '英格兰胜', score: '0-2 / 1-2', heat: 88, risk: '低中',
  },
  {
    home: '伊朗', away: '美国',
    date: '2026-06-21', time: '19:00', league: '2026世界杯', stage: 'B组',
    slug: 'iran-vs-usa-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '美国胜', score: '0-1 / 1-2', heat: 80, risk: '中',
  },

  // ── C 组 ──────────────────────────────
  {
    home: '阿根廷', away: '沙特阿拉伯',
    date: '2026-06-14', time: '13:00', league: '2026世界杯', stage: 'C组',
    slug: 'argentina-vs-saudi-arabia-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '阿根廷大胜', score: '3-0 / 2-0', heat: 86, risk: '低',
  },
  {
    home: '墨西哥', away: '波兰',
    date: '2026-06-14', time: '19:00', league: '2026世界杯', stage: 'C组',
    slug: 'mexico-vs-poland-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '墨西哥不败', score: '0-0 / 1-0', heat: 79, risk: '中',
  },
  {
    home: '波兰', away: '沙特阿拉伯',
    date: '2026-06-18', time: '13:00', league: '2026世界杯', stage: 'C组',
    slug: 'poland-vs-saudi-arabia-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '波兰胜', score: '2-0 / 1-0', heat: 72, risk: '低中',
  },
  {
    home: '阿根廷', away: '墨西哥',
    date: '2026-06-18', time: '22:00', league: '2026世界杯', stage: 'C组',
    slug: 'argentina-vs-mexico-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '阿根廷胜', score: '2-0 / 2-1', heat: 90, risk: '低中',
  },
  {
    home: '波兰', away: '阿根廷',
    date: '2026-06-22', time: '19:00', league: '2026世界杯', stage: 'C组',
    slug: 'poland-vs-argentina-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '阿根廷胜', score: '1-2 / 0-2', heat: 87, risk: '低中',
  },
  {
    home: '沙特阿拉伯', away: '墨西哥',
    date: '2026-06-22', time: '19:00', league: '2026世界杯', stage: 'C组',
    slug: 'saudi-arabia-vs-mexico-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '墨西哥胜', score: '0-2 / 1-2', heat: 75, risk: '中',
  },

  // ── D 组 ──────────────────────────────
  {
    home: '丹麦', away: '突尼斯',
    date: '2026-06-15', time: '13:00', league: '2026世界杯', stage: 'D组',
    slug: 'denmark-vs-tunisia-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '丹麦胜', score: '1-0 / 2-0', heat: 70, risk: '低中',
  },
  {
    home: '法国', away: '澳大利亚',
    date: '2026-06-15', time: '19:00', league: '2026世界杯', stage: 'D组',
    slug: 'france-vs-australia-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '法国大胜', score: '3-0 / 4-1', heat: 83, risk: '低',
  },
  {
    home: '突尼斯', away: '澳大利亚',
    date: '2026-06-19', time: '13:00', league: '2026世界杯', stage: 'D组',
    slug: 'tunisia-vs-australia-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '突尼斯不败', score: '1-0 / 1-1', heat: 65, risk: '中',
  },
  {
    home: '法国', away: '丹麦',
    date: '2026-06-19', time: '19:00', league: '2026世界杯', stage: 'D组',
    slug: 'france-vs-denmark-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '法国胜', score: '2-1 / 1-0', heat: 85, risk: '中',
  },
  {
    home: '澳大利亚', away: '丹麦',
    date: '2026-06-23', time: '19:00', league: '2026世界杯', stage: 'D组',
    slug: 'australia-vs-denmark-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '丹麦胜', score: '1-2 / 0-1', heat: 68, risk: '中',
  },
  {
    home: '突尼斯', away: '法国',
    date: '2026-06-23', time: '19:00', league: '2026世界杯', stage: 'D组',
    slug: 'tunisia-vs-france-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '法国胜', score: '0-1 / 1-2', heat: 80, risk: '低中',
  },

  // ── E 组 ──────────────────────────────
  {
    home: '西班牙', away: '哥斯达黎加',
    date: '2026-06-16', time: '19:00', league: '2026世界杯', stage: 'E组',
    slug: 'spain-vs-costa-rica-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '西班牙大胜', score: '3-0 / 7-0', heat: 80, risk: '低',
  },
  {
    home: '德国', away: '日本',
    date: '2026-06-16', time: '13:00', league: '2026世界杯', stage: 'E组',
    slug: 'germany-vs-japan-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '德国胜', score: '2-1 / 1-2', heat: 88, risk: '中高',
  },
  {
    home: '日本', away: '哥斯达黎加',
    date: '2026-06-20', time: '13:00', league: '2026世界杯', stage: 'E组',
    slug: 'japan-vs-costa-rica-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '日本胜', score: '1-0 / 2-1', heat: 74, risk: '中',
  },
  {
    home: '西班牙', away: '德国',
    date: '2026-06-20', time: '19:00', league: '2026世界杯', stage: 'E组 · 焦点战',
    slug: 'spain-vs-germany-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '大球方向', score: '1-1 / 2-1', heat: 95, risk: '中高',
  },
  {
    home: '日本', away: '西班牙',
    date: '2026-06-24', time: '19:00', league: '2026世界杯', stage: 'E组',
    slug: 'japan-vs-spain-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '西班牙胜', score: '1-2 / 0-1', heat: 85, risk: '中',
  },
  {
    home: '哥斯达黎加', away: '德国',
    date: '2026-06-24', time: '19:00', league: '2026世界杯', stage: 'E组',
    slug: 'costa-rica-vs-germany-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '德国大胜', score: '0-4 / 1-3', heat: 76, risk: '低',
  },

  // ── F 组 ──────────────────────────────
  {
    home: '比利时', away: '加拿大',
    date: '2026-06-17', time: '19:00', league: '2026世界杯', stage: 'F组',
    slug: 'belgium-vs-canada-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '比利时胜', score: '1-0 / 2-1', heat: 78, risk: '中',
  },
  {
    home: '摩洛哥', away: '克罗地亚',
    date: '2026-06-17', time: '13:00', league: '2026世界杯', stage: 'F组',
    slug: 'morocco-vs-croatia-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '摩洛哥不败', score: '0-0 / 1-0', heat: 80, risk: '中',
  },
  {
    home: '比利时', away: '摩洛哥',
    date: '2026-06-21', time: '13:00', league: '2026世界杯', stage: 'F组',
    slug: 'belgium-vs-morocco-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '比利时胜', score: '2-0 / 1-0', heat: 79, risk: '中',
  },
  {
    home: '克罗地亚', away: '加拿大',
    date: '2026-06-21', time: '19:00', league: '2026世界杯', stage: 'F组',
    slug: 'croatia-vs-canada-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '克罗地亚胜', score: '4-1 / 2-1', heat: 73, risk: '低中',
  },
  {
    home: '克罗地亚', away: '比利时',
    date: '2026-06-25', time: '19:00', league: '2026世界杯', stage: 'F组',
    slug: 'croatia-vs-belgium-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '双方进球', score: '1-1 / 0-1', heat: 82, risk: '中高',
  },
  {
    home: '加拿大', away: '摩洛哥',
    date: '2026-06-25', time: '19:00', league: '2026世界杯', stage: 'F组',
    slug: 'canada-vs-morocco-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '摩洛哥胜', score: '1-2 / 0-2', heat: 72, risk: '中',
  },

  // ── G 组 ──────────────────────────────
  {
    home: '巴西', away: '塞尔维亚',
    date: '2026-06-18', time: '19:00', league: '2026世界杯', stage: 'G组',
    slug: 'brazil-vs-serbia-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '巴西大胜', score: '2-0 / 3-0', heat: 88, risk: '低',
  },
  {
    home: '瑞士', away: '喀麦隆',
    date: '2026-06-18', time: '13:00', league: '2026世界杯', stage: 'G组',
    slug: 'switzerland-vs-cameroon-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '瑞士胜', score: '1-0 / 2-1', heat: 68, risk: '低中',
  },
  {
    home: '巴西', away: '瑞士',
    date: '2026-06-22', time: '19:00', league: '2026世界杯', stage: 'G组',
    slug: 'brazil-vs-switzerland-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '巴西胜', score: '1-0 / 2-0', heat: 84, risk: '低中',
  },
  {
    home: '塞尔维亚', away: '喀麦隆',
    date: '2026-06-22', time: '13:00', league: '2026世界杯', stage: 'G组',
    slug: 'serbia-vs-cameroon-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '塞尔维亚胜', score: '3-3 / 2-1', heat: 70, risk: '中',
  },
  {
    home: '喀麦隆', away: '巴西',
    date: '2026-06-26', time: '19:00', league: '2026世界杯', stage: 'G组',
    slug: 'cameroon-vs-brazil-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '巴西胜', score: '0-1 / 1-3', heat: 82, risk: '低中',
  },
  {
    home: '塞尔维亚', away: '瑞士',
    date: '2026-06-26', time: '19:00', league: '2026世界杯', stage: 'G组',
    slug: 'serbia-vs-switzerland-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '瑞士不败', score: '2-3 / 1-1', heat: 75, risk: '中高',
  },

  // ── H 组 ──────────────────────────────
  {
    home: '葡萄牙', away: '加纳',
    date: '2026-06-19', time: '19:00', league: '2026世界杯', stage: 'H组',
    slug: 'portugal-vs-ghana-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '葡萄牙大胜', score: '3-2 / 2-0', heat: 83, risk: '低中',
  },
  {
    home: '韩国', away: '乌拉圭',
    date: '2026-06-19', time: '13:00', league: '2026世界杯', stage: 'H组',
    slug: 'south-korea-vs-uruguay-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '乌拉圭不败', score: '0-0 / 0-2', heat: 77, risk: '中',
  },
  {
    home: '葡萄牙', away: '乌拉圭',
    date: '2026-06-23', time: '19:00', league: '2026世界杯', stage: 'H组',
    slug: 'portugal-vs-uruguay-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '葡萄牙胜', score: '2-0 / 1-0', heat: 82, risk: '低中',
  },
  {
    home: '加纳', away: '韩国',
    date: '2026-06-23', time: '13:00', league: '2026世界杯', stage: 'H组',
    slug: 'ghana-vs-south-korea-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '大球方向', score: '3-2 / 2-3', heat: 75, risk: '中高',
  },
  {
    home: '加纳', away: '乌拉圭',
    date: '2026-06-27', time: '19:00', league: '2026世界杯', stage: 'H组',
    slug: 'ghana-vs-uruguay-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '乌拉圭胜', score: '0-2 / 2-2', heat: 78, risk: '中',
  },
  {
    home: '韩国', away: '葡萄牙',
    date: '2026-06-27', time: '19:00', league: '2026世界杯', stage: 'H组',
    slug: 'south-korea-vs-portugal-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '葡萄牙胜', score: '2-1 / 1-3', heat: 85, risk: '中',
  },

  // ── 原有热门赛事（保留）──────────────
  {
    home: '阿根廷', away: '法国',
    date: '2026-06-12', time: '03:00', league: '2026世界杯', stage: '焦点战',
    slug: 'argentina-vs-france-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '阿根廷不败', score: '2-1 / 1-1', heat: 98, risk: '中',
  },
  {
    home: '巴西', away: '德国',
    date: '2026-06-13', time: '22:00', league: '2026世界杯', stage: '强强对话',
    slug: 'brazil-vs-germany-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '大球方向', score: '2-2 / 3-1', heat: 95, risk: '中高',
  },
  {
    home: '英格兰', away: '葡萄牙',
    date: '2026-06-14', time: '01:00', league: '2026世界杯', stage: '热门赛事',
    slug: 'england-vs-portugal-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '双方进球', score: '1-1 / 2-1', heat: 91, risk: '中',
  },
  {
    home: '西班牙', away: '荷兰',
    date: '2026-06-15', time: '03:00', league: '2026世界杯', stage: '技术流对决',
    slug: 'spain-vs-netherlands-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '西班牙控场', score: '2-0 / 2-1', heat: 88, risk: '中',
  },
  {
    home: '日本', away: '韩国',
    date: '2026-06-16', time: '20:00', league: '2026世界杯', stage: '亚洲德比',
    slug: 'japan-vs-korea-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '小球方向', score: '1-0 / 1-1', heat: 86, risk: '低中',
  },
  {
    home: '美国', away: '墨西哥',
    date: '2026-06-18', time: '09:00', league: '2026世界杯', stage: '北美德比',
    slug: 'usa-vs-mexico-prediction',
    image: '/images/stadium-night.jpg',
    prediction: '墨西哥不败', score: '1-1 / 1-2', heat: 84, risk: '中',
  },
]

const seen = new Set<string>()
export const matches = allMatches.filter(m => {
  if (seen.has(m.slug)) return false
  seen.add(m.slug)
  return true
})