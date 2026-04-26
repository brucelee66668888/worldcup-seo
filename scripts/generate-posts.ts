import fs from 'fs';
import path from 'path';
import { matches } from '@/data/matches';
import { buildKeywords } from '@/data/keywords';

const posts = matches.map((m) => {
  const keywords = buildKeywords(m.home, m.away);
  const mainKeyword = keywords[0];

  return {
    slug: m.slug,
    title: `${mainKeyword}：${m.league}赛前分析与比分参考`,
    description: `${m.home}对${m.away}赛前分析，包含球队状态、历史交锋、比分预测、盘口参考和比赛看点。`,
    keywords,
    home: m.home,
    away: m.away,
    date: m.date,
    content: `
${mainKeyword}是中文球迷在${m.league}期间非常关注的话题。本篇将从球队状态、比赛节奏、攻防特点和比分方向几个角度进行分析。

## 核心关键词

${keywords.map((k) => `- ${k}`).join('\n')}

## 比赛基本面

${m.home}在整体控球和进攻组织方面更具连续性，适合在中前场持续施压。${m.away}则更依赖转换速度、边路推进和关键球员的个人能力。

## 赛前看点

1. ${m.home}能否控制中场节奏
2. ${m.away}是否会采用防守反击
3. 上半场是否会出现早期进球
4. 双方核心球员状态是否稳定

## 比分参考

保守方向：1-1  
进取方向：2-1  
冷门方向：0-1

## 赛前结论

综合来看，${m.home}与${m.away}这场比赛更适合关注上半场节奏和双方进攻效率。本文仅作体育赛事分析参考，不构成投注建议。
`,
  };
});

const filePath = path.join(process.cwd(), 'src/data/posts.ts');

fs.writeFileSync(
    filePath,
    `export const posts = ${JSON.stringify(posts, null, 2)} as const;\n`,
);

console.log(`Generated ${posts.length} posts`);