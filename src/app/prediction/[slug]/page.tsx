// src/app/prediction/[slug]/page.tsx
// 单文件完整版本，无外部组件依赖

import { posts } from '@/data/posts'
import { matches } from '@/data/matches'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

type Props = { params: Promise<{ slug: string }> }

const teamFlags: Record<string, string> = {
    '阿根廷': '🇦🇷', '法国': '🇫🇷', '巴西': '🇧🇷', '德国': '🇩🇪',
    '英格兰': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', '葡萄牙': '🇵🇹', '西班牙': '🇪🇸', '荷兰': '🇳🇱',
    '日本': '🇯🇵', '韩国': '🇰🇷', '美国': '🇺🇸', '墨西哥': '🇲🇽',
}

const riskColor: Record<string, string> = {
    '低': '#22c55e', '低中': '#86efac', '中': '#facc15', '中高': '#fb923c', '高': '#f87171',
}

// 模拟球队数据（视觉化用，可后续接 API）
function getTeamStats(team: string) {
    // 用 team 字符串生成稳定但看似随机的数据
    let hash = 0
    for (let i = 0; i < team.length; i++) hash = (hash * 31 + team.charCodeAt(i)) | 0
    const r = (offset: number) => ((Math.abs(hash + offset) % 100))
    return {
        attack: 60 + (r(1) % 35),
        defense: 55 + (r(2) % 40),
        midfield: 60 + (r(3) % 35),
        form: 50 + (r(4) % 45),
        recent: ['W', 'W', 'D', 'L', 'W'].sort(() => (r(5) % 3 - 1)),
    }
}

export async function generateStaticParams() {
    return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = posts.find((p) => p.slug === slug)
    if (!post) return {}
    return {
        title: post.title,
        description: post.description,
        keywords: [...post.keywords],
        alternates: { canonical: `/prediction/${post.slug}` },
        openGraph: { title: post.title, description: post.description, type: 'article' },
    }
}

function getMatchData(slug: string) {
    return (matches as readonly { slug: string; heat: number; risk: string; score: string; prediction: string; time: string; league: string; stage: string }[])
        .find((m) => m.slug === slug)
}

export default async function PredictionPage({ params }: Props) {
    const { slug } = await params
    const post = posts.find((p) => p.slug === slug)
    if (!post) notFound()

    const md = getMatchData(slug)
    const homeStats = getTeamStats(post.home)
    const awayStats = getTeamStats(post.away)

    // 解析章节
    const sections = post.content
        .split(/\n##\s+/)
        .filter((s) => s.trim())
        .map((block) => {
            const lines = block.trim().split('\n')
            // 第一段如果不是 ## 标题开头（介绍段落），跳过标题处理
            const isFirstParagraph = !block.includes('比赛信息') && lines[0].length > 30
            if (isFirstParagraph && block.indexOf('\n') === -1) {
                return { title: '', body: block.trim(), isIntro: true }
            }
            const title = lines[0].replace(/^##\s*/, '').trim()
            const body = lines.slice(1).join('\n').trim()
            return { title, body, isIntro: false }
        })
        .filter((s) => s.title || s.body)

    // 章节图标映射
    const sectionIcons: Record<string, string> = {
        '比赛信息': '📋', '关键词覆盖': '🔍', '基本面分析': '⚽',
        '比赛节奏判断': '⏱️', '比分参考': '🎯', '赛前结论': '💡',
    }

    // 相关赛事
    const related = posts.filter((p) => p.slug !== slug).slice(0, 4)

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Noto+Sans+SC:wght@400;500;700&display=swap');

        :root {
          --bg: #060b14; --bg2: #0c1525; --bg3: #111d30;
          --border: rgba(255,255,255,0.08);
          --gold: #f5c518; --gold2: #e6b800;
          --text: #e8edf5; --text2: #8899aa; --text3: #556677;
          --font-d: 'Barlow Condensed', sans-serif;
          --font-b: 'Noto Sans SC', sans-serif;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--bg); color: var(--text); font-family: var(--font-b); overflow-x: hidden; }
        a { text-decoration: none; color: inherit; }
        ul { list-style: none; }

        /* NAV */
        .nav { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 32px; height: 56px; background: rgba(6,11,20,0.92); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); }
        .nav-logo { font-family: var(--font-d); font-size: 22px; font-weight: 900; letter-spacing: 2px; color: var(--gold); display: flex; align-items: center; gap: 8px; }
        .nav-dot { width: 8px; height: 8px; border-radius: 50%; background: #00e676; box-shadow: 0 0 8px #00e676; animation: blink 2s infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .nav-links { display: flex; gap: 28px; align-items: center; }
        .nav-links a { color: var(--text2); font-size: 13px; font-weight: 500; transition: color 0.2s; }
        .nav-links a:hover { color: var(--text); }
        .nav-cta { background: var(--gold); color: #000 !important; padding: 6px 14px; border-radius: 6px; font-weight: 700 !important; }

        /* COMPACT HERO */
        .hero {
          position: relative;
          background: linear-gradient(180deg, #0a1628 0%, #060b14 100%);
          border-bottom: 1px solid var(--border);
          padding: 24px 32px;
        }
        .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(245,197,24,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,24,0.03) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; }
        .hero-inner { position: relative; max-width: 1280px; margin: 0 auto; }
        .crumb { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text3); margin-bottom: 16px; }
        .crumb a:hover { color: var(--text); }
        .crumb .sep { color: var(--text3); }
        .crumb .now { color: var(--gold); }

        .badges { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
        .badge { font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 6px; letter-spacing: 0.5px; }
        .b-comp { background: rgba(245,197,24,0.15); color: var(--gold); border: 1px solid rgba(245,197,24,0.3); }
        .b-stage { background: rgba(255,255,255,0.05); color: var(--text2); border: 1px solid var(--border); }
        .b-heat { background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); }

        .h1 { font-family: var(--font-d); font-size: clamp(28px, 4vw, 42px); font-weight: 900; line-height: 1.1; color: #fff; }
        .lead { margin-top: 8px; font-size: 14px; color: var(--text2); max-width: 700px; line-height: 1.7; }

        /* MATCH HEADER CARD */
        .match-card {
          background: var(--bg2);
          border: 1px solid rgba(245,197,24,0.2);
          border-radius: 16px;
          margin: -1px 32px 0;
          max-width: 1280px;
          margin-left: auto; margin-right: auto;
          overflow: hidden;
          margin-top: 24px;
          position: relative;
        }
        .mh-top {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 32px 28px 24px;
          gap: 24px;
        }
        .mh-team { text-align: center; }
        .mh-flag { font-size: 64px; line-height: 1; }
        .mh-team-name { font-family: var(--font-d); font-size: 28px; font-weight: 800; margin-top: 12px; letter-spacing: 0.5px; }
        .mh-team-side { font-size: 11px; color: var(--text3); letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; }
        .mh-vs {
          font-family: var(--font-d); font-size: 36px; font-weight: 900;
          color: var(--gold); padding: 0 8px;
        }
        .mh-mid { text-align: center; }
        .mh-time-badge {
          display: inline-block;
          background: rgba(245,197,24,0.1);
          border: 1px solid rgba(245,197,24,0.3);
          padding: 8px 16px; border-radius: 8px;
          font-family: var(--font-d);
          font-size: 18px; font-weight: 700;
          color: var(--gold); letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .mh-date { font-size: 12px; color: var(--text2); }

        /* PREDICTION STRIP */
        .pred-strip {
          display: grid; grid-template-columns: repeat(4, 1fr);
          background: var(--bg);
          border-top: 1px solid var(--border);
        }
        .ps-cell {
          padding: 16px; text-align: center;
          border-right: 1px solid var(--border);
        }
        .ps-cell:last-child { border-right: none; }
        .ps-label { font-size: 10px; color: var(--text3); letter-spacing: 2px; text-transform: uppercase; }
        .ps-value { font-family: var(--font-d); font-size: 22px; font-weight: 900; margin-top: 6px; letter-spacing: 0.5px; }

        /* MAIN CONTENT */
        .main {
          max-width: 1280px;
          margin: 32px auto 0;
          padding: 0 32px 64px;
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 32px;
        }

        /* TEAM COMPARISON */
        .compare {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
        }
        .compare-title {
          font-family: var(--font-d); font-size: 22px; font-weight: 900;
          text-transform: uppercase; letter-spacing: 1px;
          margin-bottom: 4px;
        }
        .compare-tag { font-size: 10px; color: var(--gold); letter-spacing: 2px; }
        .compare-rows { margin-top: 20px; display: flex; flex-direction: column; gap: 14px; }
        .crow { display: grid; grid-template-columns: 1fr 100px 1fr; align-items: center; gap: 12px; }
        .crow-label { text-align: center; font-size: 11px; color: var(--text3); letter-spacing: 2px; text-transform: uppercase; font-weight: 600; }
        .bar-wrap-l, .bar-wrap-r { height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden; position: relative; }
        .bar-wrap-l { display: flex; justify-content: flex-end; }
        .bar-l { height: 100%; background: linear-gradient(90deg, transparent, #4f46e5); border-radius: 4px; }
        .bar-r { height: 100%; background: linear-gradient(90deg, #f59e0b, transparent); border-radius: 4px; }
        .crow-val { display: flex; align-items: center; gap: 8px; }
        .crow-val.left { justify-content: flex-end; }
        .crow-num { font-family: var(--font-d); font-size: 18px; font-weight: 800; min-width: 32px; text-align: center; }
        .num-l { color: #818cf8; }
        .num-r { color: #fbbf24; }

        /* RECENT FORM */
        .form-row { display: flex; gap: 4px; }
        .form-dot {
          width: 22px; height: 22px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 4px; font-size: 11px; font-weight: 800; color: #fff;
        }
        .fd-W { background: #16a34a; }
        .fd-D { background: #6b7280; }
        .fd-L { background: #dc2626; }

        /* CONTENT SECTIONS */
        .sections { display: flex; flex-direction: column; gap: 16px; }
        .sect {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px 28px;
          transition: border-color 0.2s;
        }
        .sect:hover { border-color: rgba(245,197,24,0.2); }
        .sect-head {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border);
        }
        .sect-icon {
          width: 36px; height: 36px;
          background: rgba(245,197,24,0.12);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }
        .sect-title {
          font-family: var(--font-d);
          font-size: 22px; font-weight: 800;
          letter-spacing: 0.5px;
        }
        .sect-body {
          font-size: 14px; line-height: 1.85; color: var(--text);
        }
        .sect-body p { margin-bottom: 8px; }
        .sect-body p.bullet { padding-left: 20px; position: relative; color: var(--text2); }
        .sect-body p.bullet::before { content: '•'; position: absolute; left: 6px; color: var(--gold); font-weight: 800; }

        /* INTRO BLOCK */
        .intro {
          background: linear-gradient(135deg, rgba(245,197,24,0.06), rgba(245,197,24,0.02));
          border-left: 3px solid var(--gold);
          border-radius: 0 12px 12px 0;
          padding: 20px 28px;
          font-size: 15px;
          line-height: 1.85;
          color: var(--text);
        }

        /* SCORE PREDICTION HIGHLIGHT */
        .scores-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 12px;
        }
        .sg-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 16px;
          text-align: center;
        }
        .sg-card.recommend {
          background: rgba(245,197,24,0.1);
          border-color: rgba(245,197,24,0.4);
        }
        .sg-label { font-size: 10px; color: var(--text3); letter-spacing: 2px; text-transform: uppercase; }
        .sg-value { font-family: var(--font-d); font-size: 28px; font-weight: 900; color: var(--gold); margin-top: 4px; }
        .sg-card:not(.recommend) .sg-value { color: var(--text); }

        .disclaimer {
          margin-top: 24px;
          padding: 14px 18px;
          background: rgba(255,255,255,0.02);
          border-left: 2px solid var(--text3);
          border-radius: 4px;
          font-size: 12px;
          color: var(--text3);
          line-height: 1.7;
        }

        /* SIDEBAR */
        .side { display: flex; flex-direction: column; gap: 20px; position: sticky; top: 80px; align-self: flex-start; max-height: calc(100vh - 100px); overflow-y: auto; }
        .side::-webkit-scrollbar { width: 4px; }
        .side::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

        .widget { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
        .w-head { padding: 14px 18px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .w-title { font-family: var(--font-d); font-size: 17px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
        .w-tag { font-size: 9px; color: var(--gold); letter-spacing: 2px; font-weight: 700; }

        .info-list { padding: 14px 18px; }
        .info-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 8px 0;
          border-bottom: 1px dashed var(--border);
          font-size: 13px;
        }
        .info-row:last-child { border-bottom: none; }
        .info-l { color: var(--text2); }
        .info-r { color: var(--text); font-weight: 600; }

        .promo {
          background: linear-gradient(135deg, #1f1500, #2d1f00);
          border-color: rgba(245,197,24,0.3) !important;
          padding: 22px;
        }
        .p-tag { font-size: 10px; font-weight: 700; letter-spacing: 3px; color: var(--gold); text-transform: uppercase; }
        .p-title { font-family: var(--font-d); font-size: 22px; font-weight: 900; margin-top: 8px; line-height: 1.1; text-transform: uppercase; }
        .p-desc { font-size: 13px; color: var(--text2); margin-top: 12px; line-height: 1.7; }
        .p-btn { display: block; margin-top: 16px; background: var(--gold); color: #000; padding: 12px; text-align: center; font-weight: 900; font-size: 13px; border-radius: 8px; transition: background 0.2s; }
        .p-btn:hover { background: var(--gold2); }
        .p-note { font-size: 10px; color: var(--text3); text-align: center; margin-top: 10px; }

        .all-list { padding: 8px 0; }
        .ali { display: block; padding: 10px 18px; transition: background 0.15s; border-left: 2px solid transparent; }
        .ali:hover { background: var(--bg3); }
        .ali.active { border-left-color: var(--gold); background: rgba(245,197,24,0.05); }
        .ali-m { font-size: 13px; font-weight: 600; color: var(--text); }
        .ali.active .ali-m { color: var(--gold); }
        .ali-d { font-size: 11px; color: var(--text3); margin-top: 2px; }

        /* RELATED */
        .related-section { margin-top: 32px; }
        .related-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 16px; }
        .rel-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 14px 16px;
          transition: all 0.2s;
        }
        .rel-card:hover { border-color: rgba(245,197,24,0.3); transform: translateY(-2px); }
        .rel-date { font-size: 11px; color: var(--text3); }
        .rel-match { font-size: 13px; font-weight: 700; margin-top: 6px; line-height: 1.4; }
        .rel-cta { font-size: 11px; color: var(--gold); margin-top: 10px; font-weight: 600; }

        footer { background: var(--bg2); border-top: 1px solid var(--border); padding: 32px; text-align: center; font-size: 12px; color: var(--text3); line-height: 1.9; margin-top: 48px; }

        @media (max-width: 900px) {
          .nav { padding: 0 16px; }
          .nav-links { gap: 12px; }
          .hero { padding: 16px; }
          .match-card { margin: 16px; }
          .mh-top { padding: 24px 20px 18px; gap: 12px; }
          .mh-flag { font-size: 44px; }
          .mh-team-name { font-size: 18px; }
          .mh-vs { font-size: 24px; }
          .pred-strip { grid-template-columns: 1fr 1fr; }
          .ps-cell:nth-child(2) { border-right: none; }
          .ps-cell:nth-child(3), .ps-cell:nth-child(4) { border-top: 1px solid var(--border); }
          .main { grid-template-columns: 1fr; padding: 0 16px 48px; gap: 20px; }
          .side { display: none; }
          .crow { grid-template-columns: 1fr 80px 1fr; gap: 8px; }
          .related-grid { grid-template-columns: 1fr 1fr; }
          .sect { padding: 18px; }
        }
      `}</style>

            {/* NAV */}
            <nav className="nav">
                <Link href="/" className="nav-logo">
                    <span className="nav-dot" />
                    WORLDCUP<em style={{color:'#fff',fontStyle:'normal'}}>PRO</em>
                </Link>
                <ul className="nav-links">
                    <li><Link href="/">首页</Link></li>
                    <li><Link href="/#matches">赛事预测</Link></li>
                    <li><Link href="/best-sites" className="nav-cta">热门活动</Link></li>
                </ul>
            </nav>

            {/* COMPACT HERO */}
            <section className="hero">
                <div className="hero-grid" />
                <div className="hero-inner">
                    <div className="crumb">
                        <Link href="/">首页</Link>
                        <span className="sep">/</span>
                        <Link href="/#matches">赛事预测</Link>
                        <span className="sep">/</span>
                        <span className="now">{post.home} vs {post.away}</span>
                    </div>
                    <div className="badges">
                        <span className="badge b-comp">2026世界杯</span>
                        {md && <span className="badge b-stage">{md.stage}</span>}
                        {md && <span className="badge b-heat">🔥 热度 {md.heat}</span>}
                    </div>
                    <h1 className="h1">{post.title}</h1>
                    <p className="lead">{post.description}</p>
                </div>
            </section>

            {/* MATCH HEADER CARD */}
            <div className="match-card">
                <div className="mh-top">
                    <div className="mh-team">
                        <div className="mh-flag">{teamFlags[post.home] ?? '🏳️'}</div>
                        <div className="mh-team-name">{post.home}</div>
                        <div className="mh-team-side">主队 · HOME</div>
                    </div>
                    <div className="mh-mid">
                        <div className="mh-time-badge">{md?.time ?? '20:00'}</div>
                        <div className="mh-date">📅 {post.date}</div>
                        <div className="mh-vs" style={{display:'block', marginTop:8, fontSize:32}}>VS</div>
                    </div>
                    <div className="mh-team">
                        <div className="mh-flag">{teamFlags[post.away] ?? '🏳️'}</div>
                        <div className="mh-team-name">{post.away}</div>
                        <div className="mh-team-side">客队 · AWAY</div>
                    </div>
                </div>
                <div className="pred-strip">
                    <div className="ps-cell">
                        <div className="ps-label">预测方向</div>
                        <div className="ps-value" style={{color:'var(--gold)'}}>{md?.prediction ?? '分析中'}</div>
                    </div>
                    <div className="ps-cell">
                        <div className="ps-label">比分参考</div>
                        <div className="ps-value">{md?.score ?? 'TBD'}</div>
                    </div>
                    <div className="ps-cell">
                        <div className="ps-label">风险评级</div>
                        <div className="ps-value" style={{color: riskColor[md?.risk ?? '中']}}>{md?.risk ?? '中'}</div>
                    </div>
                    <div className="ps-cell">
                        <div className="ps-label">热度指数</div>
                        <div className="ps-value" style={{color:'#f87171'}}>{md?.heat ?? 80}</div>
                    </div>
                </div>
            </div>

            {/* MAIN */}
            <div className="main">
                {/* CONTENT */}
                <article>
                    {/* TEAM COMPARISON */}
                    <div className="compare">
                        <div className="compare-tag">TEAM COMPARISON</div>
                        <div className="compare-title">两队实力对比</div>

                        {/* Team header */}
                        <div style={{display:'grid',gridTemplateColumns:'1fr 100px 1fr',gap:12,alignItems:'center',marginTop:16,marginBottom:8}}>
                            <div style={{textAlign:'right',display:'flex',justifyContent:'flex-end',alignItems:'center',gap:10}}>
                                <span style={{fontWeight:700,fontSize:14}}>{post.home}</span>
                                <span style={{fontSize:24}}>{teamFlags[post.home]}</span>
                            </div>
                            <div style={{textAlign:'center',fontSize:11,color:'var(--text3)',letterSpacing:2}}>OBJ</div>
                            <div style={{textAlign:'left',display:'flex',alignItems:'center',gap:10}}>
                                <span style={{fontSize:24}}>{teamFlags[post.away]}</span>
                                <span style={{fontWeight:700,fontSize:14}}>{post.away}</span>
                            </div>
                        </div>

                        <div className="compare-rows">
                            {[
                                { key: 'attack', label: '进攻' },
                                { key: 'defense', label: '防守' },
                                { key: 'midfield', label: '中场' },
                                { key: 'form', label: '近况' },
                            ].map(({ key, label }) => (
                                <div key={key} className="crow">
                                    <div className="crow-val left">
                                        <div className="bar-wrap-l" style={{flex:1}}>
                                            <div className="bar-l" style={{width:`${homeStats[key as keyof typeof homeStats]}%`}} />
                                        </div>
                                        <span className="crow-num num-l">{homeStats[key as keyof typeof homeStats]}</span>
                                    </div>
                                    <div className="crow-label">{label}</div>
                                    <div className="crow-val">
                                        <span className="crow-num num-r">{awayStats[key as keyof typeof awayStats]}</span>
                                        <div className="bar-wrap-r" style={{flex:1}}>
                                            <div className="bar-r" style={{width:`${awayStats[key as keyof typeof awayStats]}%`}} />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Recent form */}
                            <div className="crow" style={{marginTop:8,paddingTop:14,borderTop:'1px solid var(--border)'}}>
                                <div className="crow-val left">
                                    <div className="form-row">
                                        {(homeStats.recent as string[]).map((r, i) => (
                                            <div key={i} className={`form-dot fd-${r}`}>{r}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className="crow-label">近 5 场</div>
                                <div className="crow-val">
                                    <div className="form-row">
                                        {(awayStats.recent as string[]).map((r, i) => (
                                            <div key={i} className={`form-dot fd-${r}`}>{r}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop:14,fontSize:11,color:'var(--text3)',textAlign:'center'}}>
                            * 数据基于公开赛事整理，仅供赛前参考
                        </div>
                    </div>

                    {/* CONTENT SECTIONS */}
                    <div className="sections">
                        {sections.map((s, i) => {
                            if (s.isIntro || !s.title) {
                                return <div key={i} className="intro">{s.body || s.title}</div>
                            }

                            // 比分参考节用特殊样式
                            if (s.title === '比分参考') {
                                const lines = s.body.split('\n').map((l) => l.trim()).filter(Boolean)
                                const scores = lines.map((line) => {
                                    const [label, val] = line.split(/[:：]/)
                                    return { label: label?.trim() || '', val: val?.trim() || '' }
                                })
                                return (
                                    <div key={i} className="sect">
                                        <div className="sect-head">
                                            <div className="sect-icon">🎯</div>
                                            <div className="sect-title">{s.title}</div>
                                        </div>
                                        <div className="scores-grid">
                                            {scores.map((sc, j) => (
                                                <div key={j} className={`sg-card ${j === 0 ? 'recommend' : ''}`}>
                                                    <div className="sg-label">{sc.label}</div>
                                                    <div className="sg-value">{sc.val}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            }

                            return (
                                <div key={i} className="sect">
                                    <div className="sect-head">
                                        <div className="sect-icon">{sectionIcons[s.title] ?? '📊'}</div>
                                        <div className="sect-title">{s.title}</div>
                                    </div>
                                    <div className="sect-body">
                                        {s.body.split('\n').filter(Boolean).map((line, j) => {
                                            const isBullet = line.trim().startsWith('-') || line.trim().startsWith('•')
                                            const text = line.replace(/^[-•]\s*/, '').trim()
                                            return <p key={j} className={isBullet ? 'bullet' : ''}>{text}</p>
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="disclaimer">
                        ⚠️ 本文内容仅作体育赛事分析参考，不构成任何投注建议。请理性看待赛事，并遵守所在地法律法规。
                    </div>

                    {/* RELATED */}
                    <div className="related-section">
                        <div style={{fontSize:11,color:'var(--gold)',letterSpacing:2,fontWeight:700}}>RELATED MATCHES</div>
                        <div style={{fontFamily:'var(--font-d)',fontSize:24,fontWeight:900,marginTop:6,textTransform:'uppercase'}}>相关赛事预测</div>
                        <div className="related-grid">
                            {related.map((p) => (
                                <Link key={p.slug} href={`/prediction/${p.slug}`} className="rel-card">
                                    <div className="rel-date">{p.date}</div>
                                    <div className="rel-match">{p.home} vs {p.away}</div>
                                    <div className="rel-cta">查看分析 →</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </article>

                {/* SIDEBAR */}
                <aside className="side">
                    <div className="widget">
                        <div className="w-head">
                            <div className="w-title">赛事信息</div>
                            <div className="w-tag">MATCH INFO</div>
                        </div>
                        <div className="info-list">
                            <div className="info-row"><span className="info-l">主队</span><span className="info-r">{post.home}</span></div>
                            <div className="info-row"><span className="info-l">客队</span><span className="info-r">{post.away}</span></div>
                            <div className="info-row"><span className="info-l">比赛日期</span><span className="info-r">{post.date}</span></div>
                            <div className="info-row"><span className="info-l">比赛时间</span><span className="info-r">{md?.time ?? 'TBD'}</span></div>
                            <div className="info-row"><span className="info-l">赛事阶段</span><span className="info-r">{md?.stage ?? '小组赛'}</span></div>
                            <div className="info-row"><span className="info-l">预测方向</span><span className="info-r" style={{color:'var(--gold)'}}>{md?.prediction ?? 'TBD'}</span></div>
                            <div className="info-row"><span className="info-l">比分参考</span><span className="info-r">{md?.score ?? 'TBD'}</span></div>
                            <div className="info-row"><span className="info-l">风险评级</span><span className="info-r" style={{color: riskColor[md?.risk ?? '中']}}>{md?.risk ?? '中'}</span></div>
                        </div>
                    </div>

                    <div className="widget promo">
                        <div className="p-tag">WORLD CUP 2026</div>
                        <div className="p-title">热门平台<br/>活动整理</div>
                        <p className="p-desc">查看世界杯期间各平台新用户活动、赔率对比与参考信息。</p>
                        <Link href="/best-sites" className="p-btn">查看全部活动 →</Link>
                        <div className="p-note">18+ · 理性参与 · 仅供参考</div>
                    </div>

                    <div className="widget">
                        <div className="w-head">
                            <div className="w-title">全部赛事</div>
                            <div className="w-tag">ALL MATCHES</div>
                        </div>
                        <div className="all-list">
                            {posts.map((p) => (
                                <Link key={p.slug} href={`/prediction/${p.slug}`} className={`ali ${p.slug === slug ? 'active' : ''}`}>
                                    <div className="ali-m">{p.home} vs {p.away}</div>
                                    <div className="ali-d">{p.date}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            <footer>
                <div>© 2026 WorldCup Pro · 内容仅作赛事分析参考，不构成投注建议</div>
            </footer>
        </>
    )
}
