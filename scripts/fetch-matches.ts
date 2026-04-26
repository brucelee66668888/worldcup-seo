import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

for (const envFile of ['.env']) {
    dotenv.config({ path: path.join(process.cwd(), envFile), override: false });
}

type FootballDataMatch = {
    utcDate: string;
    homeTeam: { name: string };
    awayTeam: { name: string };
    competition: { name: string };
    stage: string;
};

function slugify(input: string) {
    return input
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// 根据赛事阶段生成中文预测文案（演示用，实际可接 AI 生成）
function getPrediction(stage: string): string {
    const map: Record<string, string> = {
        'GROUP_STAGE': '小组赛激烈角逐',
        'LAST_16': '淘汰赛首轮对决',
        'QUARTER_FINALS': '八强争夺战',
        'SEMI_FINALS': '半决赛巅峰对决',
        'FINAL': '世界杯决赛',
    };
    return map[stage] ?? '焦点赛事';
}

async function main() {
    const token = process.env.FOOTBALL_DATA_TOKEN?.trim();

    if (!token) {
        throw new Error('缺少 FOOTBALL_DATA_TOKEN，请检查 .env.local');
    }

    // ✅ 修复：使用正确的 API URL（原来的 URL 是错的）
    const url = 'https://api.football-data.org/v4/competitions/WC/matches?season=2026';

    console.log('正在请求 football-data.org API...');

    const res = await fetch(url, {
        headers: {
            'X-Auth-Token': token,
        },
    });

    // ✅ 修复：API 返回非 200 时给出详细错误信息
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`football-data 请求失败：${res.status}\n${body}`);
    }

    const data = await res.json() as { matches: FootballDataMatch[] };

    // ✅ 修复：防止 data.matches 为 undefined 导致 map 报错
    if (!Array.isArray(data.matches)) {
        throw new Error(`API 返回数据格式异常：${JSON.stringify(data).slice(0, 200)}`);
    }

    const matches = data.matches.map((m: FootballDataMatch) => ({
        home: m.homeTeam.name,
        away: m.awayTeam.name,
        date: m.utcDate.slice(0, 10),
        time: m.utcDate.slice(11, 16),
        league: m.competition.name,
        stage: getPrediction(m.stage),
        slug: slugify(`${m.homeTeam.name}-vs-${m.awayTeam.name}-prediction`),
        image: '/images/stadium-night.jpg',
        prediction: getPrediction(m.stage),
        score: 'TBD',
        heat: Math.floor(Math.random() * 20) + 80, // 80-99
        risk: '中',
    }));

    const filePath = path.join(process.cwd(), 'src/data/matches.ts');

    // ✅ 修复：同时导出 Match 类型，避免其他文件 import type 报错
    const content = `export type Match = {
  home: string;
  away: string;
  date: string;
  time: string;
  league: string;
  stage: string;
  slug: string;
  image: string;
  prediction: string;
  score: string;
  heat: number;
  risk: string;
};

export const matches: Match[] = ${JSON.stringify(matches, null, 2)};
`;

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ 成功写入 ${matches.length} 场比赛数据到 src/data/matches.ts`);
}

main().catch((err) => {
    console.error('❌ fetch-matches 失败：', err.message);
    process.exit(1);
});