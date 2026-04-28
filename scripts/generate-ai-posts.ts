/**
 * scripts/generate-ai-posts.ts
 *
 * 使用 Claude API 为每场比赛生成真正差异化的分析文章
 * 包含：近期战绩、历史交锋、关键球员、主客场胜率、让球盘走势
 *
 * 运行方式：pnpm generate
 * 需要环境变量：ANTHROPIC_API_KEY
 */

import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
dotenv.config({ path: path.resolve(process.cwd(), '.env') })
import fs from 'fs'
import { matches } from '@/data/matches'
import { buildKeywords } from '@/data/keywords'

// ─── 球队数据库（近期战绩 + 关键球员）────────────────────────────
// 这里存储真实/半真实的球队数据，作为 AI 生成的上下文
const teamData: Record<string, {
    recentForm: string[]        // 近5场 W/D/L
    keyPlayers: string[]        // 关键球员
    homeWinRate: number         // 主场胜率 %
    awayWinRate: number         // 客场胜率 %
    avgGoalsScored: number      // 近10场场均进球
    avgGoalsConceded: number    // 近10场场均失球
    style: string               // 打法风格
    weakness: string            // 主要弱点
}> = {
    '阿根廷': {
        recentForm: ['W', 'W', 'W', 'D', 'W'],
        keyPlayers: ['梅西（10号，攻击核心）', '阿尔瓦雷斯（9号，中锋）', '麦卡利斯特（中场组织）', 'de Paul（防守中场）'],
        homeWinRate: 78, awayWinRate: 65,
        avgGoalsScored: 2.4, avgGoalsConceded: 0.8,
        style: '控球+快速反击，梅西串联，两翼强力冲击',
        weakness: '边后卫防守宽度不足，高中锋压制时有被动',
    },
    '法国': {
        recentForm: ['W', 'D', 'W', 'W', 'L'],
        keyPlayers: ['姆巴佩（10号，速度突破）', '格列兹曼（组织）', '图拉姆（前锋）', '坎特（防守中场）'],
        homeWinRate: 80, awayWinRate: 62,
        avgGoalsScored: 2.6, avgGoalsConceded: 1.0,
        style: '姆巴佩速度突破为主，格列兹曼阵地战组织',
        weakness: '防守中场覆盖面不足，定位球防守有隐患',
    },
    '巴西': {
        recentForm: ['W', 'W', 'D', 'W', 'W'],
        keyPlayers: ['维尼修斯（左路进攻）', '罗德里戈（右路）', '罗德里（中场核心）', '恩德里克（前锋）'],
        homeWinRate: 82, awayWinRate: 68,
        avgGoalsScored: 2.8, avgGoalsConceded: 0.7,
        style: '桑巴式边路突破+中路渗透，速度极快',
        weakness: '中场过于依赖罗德里，铁腰受伤影响大',
    },
    '德国': {
        recentForm: ['W', 'W', 'L', 'W', 'D'],
        keyPlayers: ['穆西亚拉（10号，技术核心）', '维尔茨（进攻组织）', '哈弗茨（前锋）', '吕迪格（中后卫）'],
        homeWinRate: 74, awayWinRate: 60,
        avgGoalsScored: 2.2, avgGoalsConceded: 1.1,
        style: '高位压迫，快速传递，阵地战与反击结合',
        weakness: '门将位置竞争激烈，右后卫防守稳定性不足',
    },
    '西班牙': {
        recentForm: ['W', 'W', 'W', 'D', 'W'],
        keyPlayers: ['亚马尔（右路天才）', '莫拉塔（9号前锋）', '佩德里（中场）', '罗德里（防守支柱）'],
        homeWinRate: 82, awayWinRate: 70,
        avgGoalsScored: 2.5, avgGoalsConceded: 0.6,
        style: 'Tiki-taka传控，高位压迫，边路+中路结合',
        weakness: '莫拉塔状态不稳，中路渗透有时过于追求传球',
    },
    '英格兰': {
        recentForm: ['W', 'W', 'D', 'W', 'W'],
        keyPlayers: ['贝林厄姆（10号，攻防核心）', '沙卡（右路）', '福登（左路）', '凯恩（9号前锋）'],
        homeWinRate: 76, awayWinRate: 62,
        avgGoalsScored: 2.3, avgGoalsConceded: 0.9,
        style: '边路快速推进，凯恩支点，贝林厄姆插上',
        weakness: '中场保护不足，右后卫沃克年龄偏大',
    },
    '葡萄牙': {
        recentForm: ['W', 'W', 'W', 'D', 'W'],
        keyPlayers: ['B费（中场大脑）', 'C罗（9号前锋）', '拉法·席尔瓦（右路）', '鲁本·迪亚斯（中后卫）'],
        homeWinRate: 75, awayWinRate: 63,
        avgGoalsScored: 2.7, avgGoalsConceded: 0.9,
        style: 'B费中场调度，边路强力冲击，定位球威胁大',
        weakness: 'C罗年龄问题，主力中场奥塔维乌稳定性待考',
    },
    '荷兰': {
        recentForm: ['W', 'D', 'W', 'W', 'L'],
        keyPlayers: ['德佩（技术核心）', '加克波（左路速度）', '维纳尔杜姆（中场）', '范戴克（中后卫）'],
        homeWinRate: 72, awayWinRate: 58,
        avgGoalsScored: 2.0, avgGoalsConceded: 1.0,
        style: '边路强攻，德佩创造，快速转换攻防',
        weakness: '右路边锋深度不足，门将选择有争议',
    },
    '日本': {
        recentForm: ['W', 'D', 'W', 'L', 'W'],
        keyPlayers: ['久保建英（攻击核心）', '堂安律（右路）', '遠藤航（防守中场）', '前田大然（前锋速度）'],
        homeWinRate: 65, awayWinRate: 48,
        avgGoalsScored: 1.6, avgGoalsConceded: 1.0,
        style: '高压逼抢，快速转换，边路突破+中路跑位',
        weakness: '身体对抗劣势，长时间落后时战术变化不足',
    },
    '韩国': {
        recentForm: ['W', 'L', 'D', 'W', 'D'],
        keyPlayers: ['孙兴慜（绝对核心）', '黄喜灿（右路）', '金玟哉（中后卫）', '李康仁（中场）'],
        homeWinRate: 62, awayWinRate: 45,
        avgGoalsScored: 1.5, avgGoalsConceded: 1.2,
        style: '依赖孙兴慜个人突破，整体阵地战能力偏弱',
        weakness: '过度依赖孙兴慜，中场创造力不足',
    },
    '摩洛哥': {
        recentForm: ['W', 'W', 'D', 'W', 'D'],
        keyPlayers: ['波诺（门将）', '哈基米（右路）', '齐耶赫（进攻组织）', '恩内斯里（前锋）'],
        homeWinRate: 70, awayWinRate: 55,
        avgGoalsScored: 1.4, avgGoalsConceded: 0.6,
        style: '铁桶防守+快速反击，哈基米边路是最大威胁',
        weakness: '进攻创造力有限，攻坚能力不足',
    },
    '克罗地亚': {
        recentForm: ['D', 'W', 'D', 'W', 'D'],
        keyPlayers: ['莫德里奇（中场灵魂）', '科瓦契奇（中场）', '佩里西奇（边路）', '格瓦迪奥尔（中后卫）'],
        homeWinRate: 65, awayWinRate: 55,
        avgGoalsScored: 1.5, avgGoalsConceded: 0.8,
        style: '莫德里奇中场控制，稳健防守，效率反击',
        weakness: '锋线老化，进攻效率偏低',
    },
    '比利时': {
        recentForm: ['W', 'W', 'D', 'L', 'W'],
        keyPlayers: ['德布劳内（中场天才）', '卢卡库（9号前锋）', '卡拉斯科（左路）', '蒂尔曼斯（中场）'],
        homeWinRate: 73, awayWinRate: 60,
        avgGoalsScored: 2.1, avgGoalsConceded: 1.0,
        style: '德布劳内创造+卢卡库支点，快速直塞为主',
        weakness: '整体年龄偏大，体能下半场下滑明显',
    },
    '墨西哥': {
        recentForm: ['W', 'D', 'W', 'D', 'W'],
        keyPlayers: ['洛萨诺（右路速度）', '吉拉尔多（中场）', '马丁（前锋）', '门多萨（边路）'],
        homeWinRate: 75, awayWinRate: 52,
        avgGoalsScored: 1.8, avgGoalsConceded: 0.9,
        style: '快速边路冲击，主场优势巨大，拼抢积极',
        weakness: '客场表现欠佳，面对顶级球队攻击力下滑',
    },
    '美国': {
        recentForm: ['W', 'D', 'W', 'L', 'W'],
        keyPlayers: ['普利西奇（进攻核心）', '麦肯尼（中场）', '韦阿（边路速度）', '特纳（门将）'],
        homeWinRate: 68, awayWinRate: 50,
        avgGoalsScored: 1.7, avgGoalsConceded: 1.1,
        style: '积极跑动，速度冲击，整体拼劲十足',
        weakness: '中场技术粗糙，阵地战能力不足',
    },
    '塞内加尔': {
        recentForm: ['W', 'W', 'D', 'W', 'L'],
        keyPlayers: ['马内（进攻核心）', '迪亚（前锋速度）', '萨尔（中后卫）', '古耶（防守中场）'],
        homeWinRate: 68, awayWinRate: 52,
        avgGoalsScored: 1.8, avgGoalsConceded: 0.9,
        style: '马内个人能力突出，身体对抗强，整体高压',
        weakness: '中场创造力依赖马内，进攻套路单一',
    },
    '波兰': {
        recentForm: ['W', 'D', 'L', 'W', 'D'],
        keyPlayers: ['莱万多夫斯基（世界级前锋）', '济耶林斯基（中场）', '格罗西基（边路）', '格利克（中后卫）'],
        homeWinRate: 65, awayWinRate: 48,
        avgGoalsScored: 1.9, avgGoalsConceded: 1.3,
        style: '高球打莱万，中场保护+快速上球，防守反击',
        weakness: '中场整体偏弱，过度依赖莱万',
    },
    '乌拉圭': {
        recentForm: ['W', 'W', 'D', 'W', 'L'],
        keyPlayers: ['努涅斯（前锋）', '比塞卡（进攻）', '瓦尔韦德（中场）', '戈丁（中后卫）'],
        homeWinRate: 68, awayWinRate: 55,
        avgGoalsScored: 1.7, avgGoalsConceded: 0.9,
        style: '强悍防守+高效反击，南美硬派风格',
        weakness: '年龄结构偏老，体能下半场下滑',
    },
}

// 获取球队数据，没有的返回通用数据
function getTeamData(team: string) {
    return teamData[team] ?? {
        recentForm: ['W', 'D', 'W', 'L', 'D'],
        keyPlayers: [`${team}核心球员`, `${team}中场组织者`, `${team}防守支柱`],
        homeWinRate: 55, awayWinRate: 42,
        avgGoalsScored: 1.5, avgGoalsConceded: 1.2,
        style: '整体均衡，注重防守',
        weakness: '进攻创造力有限',
    }
}

// 生成历史交锋数据（基于球队名生成稳定的模拟数据）
function getH2H(home: string, away: string) {
    let hash = 0
    for (const c of (home + away)) hash = (hash * 31 + c.charCodeAt(0)) | 0
    const r = (n: number) => Math.abs(hash + n) % 10

    const homeWins = 2 + r(1) % 4
    const awayWins = 1 + r(2) % 3
    const draws = r(3) % 3
    const total = homeWins + awayWins + draws

    // 近5次交锋结果
    const results = ['W', 'D', 'L', 'W', 'D'].sort(() => (r(4) % 3 - 1))

    return {
        total,
        homeWins,
        awayWins,
        draws,
        recentResults: results, // 主队视角
        lastScore: `${1 + r(5) % 2}-${r(6) % 2}`,
        lastYear: 2022 - r(7) % 4,
    }
}

// 生成让球盘历史走势
function getHandicapHistory(home: string, away: string, prediction: string) {
    let hash = 0
    for (const c of home) hash = (hash * 31 + c.charCodeAt(0)) | 0

    const handicapValues = ['-0.5', '0/-0.5', '-1', '+0.5', '0/+0.5']
    const handicap = handicapValues[Math.abs(hash) % handicapValues.length]
    const coverRate = 45 + Math.abs(hash) % 35

    return {
        handicap,
        coverRate,
        recommendation: coverRate > 60 ? '推荐让球方' : coverRate > 50 ? '小注让球方' : '谨慎，建议观望',
        trend: prediction.includes('胜') || prediction.includes('大') ? '看好主动进攻方' : '防守稳健，小球偏向',
    }
}

// ─── 调用 Claude API 生成文章 ────────────────────────────────────
async function generateArticleWithAI(
    home: string,
    away: string,
    matchData: {
        date: string
        league: string
        stage: string
        prediction: string
        score: string
        heat: number
        risk: string
    },
    keywords: string[]
): Promise<string> {

    const homeInfo = getTeamData(home)
    const awayInfo = getTeamData(away)
    const h2h = getH2H(home, away)
    const handicap = getHandicapHistory(home, away, matchData.prediction)

    const prompt = `你是一位专业的足球赛事分析师，专门为中文足球迷写世界杯赛前分析文章。

请为以下比赛写一篇专业的赛前分析文章，要求：
1. 内容真实、具体、有说服力，不能是模板套话
2. 针对这两支球队的具体特点分析，不能和其他文章雷同
3. 语气像专业球评，要有自己的判断和观点
4. 文章要让赌球用户觉得"这个分析有价值，值得参考"
5. 使用 Markdown 格式，章节用 ## 开头

比赛信息：
- 主队：${home}
- 客队：${away}
- 日期：${matchData.date}
- 赛事：${matchData.league} ${matchData.stage}
- 热度：${matchData.heat}/100

主队 ${home} 数据：
- 近5场战绩：${homeInfo.recentForm.join(' ')}
- 关键球员：${homeInfo.keyPlayers.join('、')}
- 主场胜率：${homeInfo.homeWinRate}%
- 场均进球：${homeInfo.avgGoalsScored}
- 场均失球：${homeInfo.avgGoalsConceded}
- 打法风格：${homeInfo.style}
- 主要弱点：${homeInfo.weakness}

客队 ${away} 数据：
- 近5场战绩：${awayInfo.recentForm.join(' ')}
- 关键球员：${awayInfo.keyPlayers.join('、')}
- 客场胜率：${awayInfo.awayWinRate}%
- 场均进球：${awayInfo.avgGoalsScored}
- 场均失球：${awayInfo.avgGoalsConceded}
- 打法风格：${awayInfo.style}
- 主要弱点：${awayInfo.weakness}

历史交锋：
- 历史总计 ${h2h.total} 次交锋
- ${home}赢 ${h2h.homeWins} 次，${away}赢 ${h2h.awayWins} 次，平局 ${h2h.draws} 次
- 近5次交锋结果（主队视角）：${h2h.recentResults.join(' ')}
- 最近一次比分：${h2h.lastScore}（${h2h.lastYear}年）

让球盘参考：
- 当前让球：${handicap.handicap}
- 历史让球命中率：${handicap.coverRate}%
- 趋势分析：${handicap.trend}

SEO关键词（请自然融入文章）：${keywords.slice(0, 3).join('、')}

请按以下章节结构写作，每章节200-300字，内容要针对这场具体比赛：

## 赛前形势分析
（分析两队近期状态、世界杯前的热身赛表现、主客场优势）

## 球队风格与战术对比
（具体分析两队的打法特点、关键球员的作用、战术上的克制关系）

## 历史交锋与心理因素
（历史交锋数据分析、是否有德比情结、球员伤停情况）

## 让球盘与大小球分析
（结合历史数据分析盘口方向、进球数预测、风险提示）

## 比分参考与投注建议
（给出3个比分方向：保守/主流/冷门，以及具体的投注建议）

## 总结
（一句话核心推荐，风险等级说明）

注意：
- 每章节内容必须针对${home}和${away}这两支球队写，不能写通用内容
- 比分参考格式：保守方向：X-X / 主流方向：X-X / 冷门方向：X-X
- 结尾加免责声明：本文内容仅作体育赛事分析参考，不构成任何投注建议，请理性参与。`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY ?? '',
            'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2000,
            messages: [{ role: 'user', content: prompt }],
        }),
    })

    if (!response.ok) {
        const body = await response.text()
        throw new Error(`API 请求失败: ${response.status} - ${body}`)
    }

    const data = await response.json() as {
        content: Array<{ type: string; text: string }>
    }

    return data.content
        .filter((c) => c.type === 'text')
        .map((c) => c.text)
        .join('')
}

// ─── 限制并发（避免超速率限制）──────────────────────────────────
async function pLimit<T>(
    tasks: (() => Promise<T>)[],
    concurrency: number
): Promise<T[]> {
    const results: T[] = []
    let index = 0

    async function worker() {
        while (index < tasks.length) {
            const i = index++
            results[i] = await tasks[i]()
        }
    }

    const workers = Array.from({ length: Math.min(concurrency, tasks.length) }, worker)
    await Promise.all(workers)
    return results
}

// ─── 主函数 ──────────────────────────────────────────────────────
async function main() {
    if (!process.env.ANTHROPIC_API_KEY) {
        throw new Error('缺少 ANTHROPIC_API_KEY，请在 .env.local 中配置')
    }

    console.log(`开始为 ${matches.length} 场比赛生成 AI 分析文章...`)
    console.log('并发数：3，预计需要约', Math.ceil(matches.length / 3) * 15, '秒\n')

    const tasks = matches.map((match, i) => async () => {
        const keywords = buildKeywords(match.home, match.away)
        console.log(`[${i + 1}/${matches.length}] 正在生成：${match.home} vs ${match.away}...`)

        let content: string
        let attempts = 0

        // 失败自动重试（最多3次）
        while (attempts < 3) {
            try {
                content = await generateArticleWithAI(
                    match.home,
                    match.away,
                    {
                        date: match.date,
                        league: match.league,
                        stage: match.stage,
                        prediction: match.prediction,
                        score: match.score,
                        heat: match.heat,
                        risk: match.risk,
                    },
                    keywords
                )
                console.log(`  ✅ ${match.home} vs ${match.away} 生成成功（${content!.length} 字）`)
                break
            } catch (err) {
                attempts++
                // 打印完整错误
                if (err instanceof Error) {
                    console.error(`  详细错误：${err.message}`)
                } else {
                    console.error(`  详细错误：`, JSON.stringify(err))
                }
                if (attempts >= 3) {
                    console.error(`  ❌ ${match.home} vs ${match.away} 生成失败，使用备用模板`)
                    // 失败时使用简化模板
                    content = `## 赛前形势分析\n${match.home}与${match.away}的${match.league}赛事即将展开。\n\n## 比分参考\n保守方向：1-1 / 主流方向：${match.score} / 冷门方向：0-1\n\n## 总结\n推荐关注：${match.prediction}。本文内容仅作体育赛事分析参考，不构成任何投注建议。`
                } else {
                    console.log(`  ⚠️ 第${attempts}次失败，5秒后重试...`)
                    await new Promise(r => setTimeout(r, 5000))
                }
            }
        }

        return {
            slug: match.slug,
            title: `${match.home} vs ${match.away} 赛前预测 | ${match.league} ${match.stage}`,
            description: `${match.date} ${match.league}：${match.home}对阵${match.away}赛前深度分析，近期战绩对比、关键球员状态、让球盘口推荐与比分参考。`,
            keywords,
            home: match.home,
            away: match.away,
            date: match.date,
            content: content!,
        }
    })

    // 并发数3，避免触发 API 速率限制
    const posts = await pLimit(tasks, 3)

    // 写入文件
    const filePath = path.join(process.cwd(), 'src/data/posts.ts')
    const fileContent = `// 此文件由 scripts/generate-ai-posts.ts 自动生成
// 生成时间：${new Date().toISOString()}
// 共 ${posts.length} 篇文章

export type Post = {
  slug: string
  title: string
  description: string
  keywords: string[]
  home: string
  away: string
  date: string
  content: string
}

export const posts: Post[] = ${JSON.stringify(posts, null, 2)}
`

    fs.writeFileSync(filePath, fileContent, 'utf-8')
    console.log(`\n✅ 全部完成！共生成 ${posts.length} 篇差异化分析文章`)
    console.log(`📁 已写入：${filePath}`)
}

main().catch((err) => {
    console.error('❌ 生成失败：', err.message)
    process.exit(1)
})