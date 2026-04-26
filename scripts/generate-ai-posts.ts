import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { matches } from '@/data/matches';
import { buildKeywords } from '@/data/keywords';

function buildArticle(match: (typeof matches)[number]) {
    const keywords = buildKeywords(match.home, match.away);
    const mainKeyword = keywords[0];

    return `
${mainKeyword}是${match.league}期间中文球迷关注度较高的一场比赛。本文将从基本面、球队风格、比赛节奏和比分方向几个角度进行分析。

## 比赛信息

比赛：${match.home} vs ${match.away}  
赛事：${match.league}  
日期：${match.date}

## 关键词覆盖

${keywords.map((k) => `- ${k}`).join('\n')}

## 基本面分析

${match.home}在整体推进和中场组织方面具备一定优势，如果能够稳定控球，就有机会持续压制对手。${match.away}则更适合通过快速反击、边路推进和定位球制造威胁。

## 比赛节奏判断

这场比赛大概率不会一开始就完全开放。双方都会先观察对方阵型和压迫强度，因此上半场节奏可能偏谨慎。进入下半场后，如果比分仍然胶着，换人和体能变化会成为影响结果的重要因素。

## 比分参考

保守方向：1-1  
进取方向：2-1  
冷门方向：0-1

## 赛前结论

综合来看，${match.home}与${match.away}这场比赛适合重点关注中场控制、反击效率和下半场走势。本文仅作体育赛事分析参考，不构成投注建议。
`;
}

const posts = matches.map((m) => {
    const keywords = buildKeywords(m.home, m.away);
    const mainKeyword = keywords[0];

    return {
        slug: m.slug,
        title: `${mainKeyword}：${m.league}赛前分析与比分参考`,
        description: `${m.home}对${m.away}赛前分析，包含球队状态、比赛节奏、比分预测和赛前看点。`,
        keywords,
        home: m.home,
        away: m.away,
        date: m.date,
        content: buildArticle(m),
    };
});

const filePath = path.join(process.cwd(), 'src/data/posts.ts');

fs.writeFileSync(
    filePath,
    `export const posts = ${JSON.stringify(posts, null, 2)} as const;\n`,
);

console.log(`Generated ${posts.length} AI-style posts`);