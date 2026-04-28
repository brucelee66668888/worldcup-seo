// src/app/page.tsx
// 完整版首页 - 所有 UI 内联，不依赖任何子组件

import Link from 'next/link'
import { matches } from '@/data/matches'
import type { Metadata } from 'next'
import { teamFlags } from '@/lib/flags'

export const metadata: Metadata = {
    title: '2026世界杯赛事预测 | 比分参考与赛前分析',
    description: '2026世界杯热门赛事赛前分析、比分方向与盘口参考。阿根廷vs法国、巴西vs德国等焦点赛事深度解析，每日更新。',
}


const riskColor: Record<string, string> = {
    '低': '#22c55e', '低中': '#86efac', '中': '#facc15',
    '中高': '#fb923c', '高': '#f87171',
}

export default function HomePage() {
    const featured = [...matches].sort((a, b) => b.heat - a.heat)[0]

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

        .nav { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 32px; height: 56px; background: rgba(6,11,20,0.92); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); }
        .nav-logo { font-family: var(--font-d); font-size: 22px; font-weight: 900; letter-spacing: 2px; color: var(--gold); display: flex; align-items: center; gap: 8px; }
        .nav-dot { width: 8px; height: 8px; border-radius: 50%; background: #00e676; box-shadow: 0 0 8px #00e676; animation: blink 2s infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .nav-links { display: flex; gap: 28px; align-items: center; }
        .nav-links a { color: var(--text2); font-size: 13px; font-weight: 500; transition: color 0.2s; }
        .nav-links a:hover { color: var(--text); }
        .nav-cta { background: var(--gold); color: #000 !important; padding: 6px 14px; border-radius: 6px; font-weight: 700 !important; }

        .ticker { background: var(--bg2); border-bottom: 1px solid var(--border); height: 38px; display: flex; align-items: center; overflow: hidden; }
        .ticker-tag { background: var(--gold); color: #000; font-size: 10px; font-weight: 900; letter-spacing: 2px; padding: 0 14px; height: 100%; display: flex; align-items: center; flex-shrink: 0; }
        .ticker-scroll { overflow: hidden; flex: 1; }
        .ticker-track { display: flex; gap: 48px; white-space: nowrap; animation: scroll 30s linear infinite; padding-left: 24px; }
        .ticker-item { font-size: 12px; color: var(--text2); display: flex; align-items: center; gap: 8px; }
        .ticker-match { color: var(--text); font-weight: 600; }
        .ticker-hot { background: #ef4444; color: #fff; font-size: 9px; font-weight: 700; padding: 2px 5px; border-radius: 3px; letter-spacing: 1px; }
        @keyframes scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        .hero { position: relative; background: linear-gradient(135deg, #060b14 0%, #0a1628 50%, #060b14 100%); overflow: hidden; }
        .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(245,197,24,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,24,0.04) 1px, transparent 1px); background-size: 60px 60px; }
        .hero-glow { position: absolute; top: -200px; left: 50%; transform: translateX(-50%); width: 800px; height: 600px; background: radial-gradient(ellipse, rgba(245,197,24,0.1) 0%, transparent 70%); pointer-events: none; }
        .hero-inner { position: relative; max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1fr 440px; min-height: 520px; }
        .hero-left { padding: 64px 48px 64px 32px; display: flex; flex-direction: column; justify-content: center; border-right: 1px solid var(--border); }
        .eyebrow { display: inline-flex; align-items: center; gap: 10px; font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin-bottom: 24px; }
        .eyebrow::before { content: ''; width: 28px; height: 2px; background: var(--gold); }
        .h1 { font-family: var(--font-d); font-size: clamp(54px, 6vw, 84px); font-weight: 900; line-height: 0.95; letter-spacing: -1px; color: #fff; text-transform: uppercase; }
        .h1 em { font-style: normal; color: var(--gold); display: block; }
        .lead { margin-top: 24px; max-width: 460px; font-size: 15px; line-height: 1.8; color: var(--text2); }
        .stats { display: flex; gap: 48px; margin-top: 36px; }
        .stat-num { font-family: var(--font-d); font-size: 44px; font-weight: 900; color: var(--gold); line-height: 1; }
        .stat-label { font-size: 11px; color: var(--text3); text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
        .hero-right { padding: 32px; display: flex; flex-direction: column; justify-content: center; background: rgba(255,255,255,0.02); }
        .feat-label { font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
        .feat-label::before { content: '🔥'; }
        .feat-card { background: var(--bg3); border: 1px solid rgba(245,197,24,0.25); border-radius: 16px; overflow: hidden; display: block; transition: all 0.2s; }
        .feat-card:hover { transform: translateY(-2px); border-color: rgba(245,197,24,0.6); box-shadow: 0 12px 40px rgba(245,197,24,0.1); }
        .feat-teams { padding: 28px 24px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border); }
        .ft-team { text-align: center; flex: 1; }
        .ft-flag { font-size: 44px; }
        .ft-name { font-size: 14px; font-weight: 700; margin-top: 8px; color: var(--text); }
        .ft-vs { font-family: var(--font-d); font-size: 32px; font-weight: 900; color: var(--text3); letter-spacing: 2px; padding: 0 16px; }
        .feat-info { padding: 18px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .fi-label { font-size: 10px; color: var(--text3); text-transform: uppercase; letter-spacing: 1px; }
        .fi-val { font-size: 14px; font-weight: 700; color: var(--gold); margin-top: 2px; }
        .feat-foot { padding: 14px 24px; background: rgba(245,197,24,0.08); display: flex; align-items: center; justify-content: space-between; }
        .heat-bar { display: flex; align-items: center; gap: 8px; }
        .heat-track { width: 80px; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; }
        .heat-fill { height: 100%; background: linear-gradient(90deg, var(--gold), #ff6b00); }
        .feat-cta { font-size: 12px; color: var(--gold); font-weight: 700; }

        .section { max-width: 1280px; margin: 0 auto; padding: 56px 32px 24px; }
        .sec-head { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 24px; }
        .sec-tag { font-size: 11px; font-weight: 700; letter-spacing: 3px; color: var(--gold); text-transform: uppercase; margin-bottom: 6px; }
        .sec-title { font-family: var(--font-d); font-size: 36px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; line-height: 1; color: var(--text); }
        .sec-link { font-size: 12px; color: var(--gold); font-weight: 600; letter-spacing: 1px; }
        .sec-link:hover { text-decoration: underline; }

        .main { max-width: 1280px; margin: 0 auto; padding: 0 32px 64px; display: grid; grid-template-columns: 1fr 320px; gap: 32px; }

        .matches { display: flex; flex-direction: column; gap: 12px; }
        .mc { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 22px 26px; display: grid; grid-template-columns: 1fr 160px 1fr auto; gap: 16px; align-items: center; transition: all 0.2s; position: relative; overflow: hidden; }
        .mc::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--border); transition: background 0.2s; }
        .mc:hover { border-color: rgba(245,197,24,0.3); background: var(--bg3); }
        .mc:hover::before { background: var(--gold); }
        .mc-team { display: flex; align-items: center; gap: 12px; }
        .mc-team.away { flex-direction: row-reverse; text-align: right; }
        .mc-flag { font-size: 28px; }
        .mc-name { font-size: 15px; font-weight: 700; }
        .mc-stage { font-size: 11px; color: var(--text3); margin-top: 2px; }
        .mc-mid { text-align: center; }
        .mc-time { font-family: var(--font-d); font-size: 14px; color: var(--text3); font-weight: 700; letter-spacing: 1px; }
        .mc-date { font-size: 11px; color: var(--text3); margin-top: 2px; }
        .mc-pred { font-size: 12px; font-weight: 700; color: var(--gold); margin-top: 6px; padding: 3px 10px; background: rgba(245,197,24,0.12); border-radius: 4px; display: inline-block; }
        .mc-meta { text-align: right; min-width: 80px; }
        .mc-heat { font-family: var(--font-d); font-size: 32px; font-weight: 900; color: var(--text); line-height: 1; }
        .mc-hl { font-size: 10px; color: var(--text3); letter-spacing: 1px; text-transform: uppercase; }
        .mc-risk { display: inline-block; margin-top: 6px; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px; letter-spacing: 0.5px; }

        .side { display: flex; flex-direction: column; gap: 20px; }
        .widget { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
        .w-head { padding: 14px 18px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        .w-title { font-family: var(--font-d); font-size: 18px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: var(--text); }
        .w-tag { font-size: 9px; font-weight: 700; letter-spacing: 2px; color: var(--gold); }
        .rank { display: flex; align-items: center; gap: 14px; padding: 12px 18px; transition: background 0.15s; }
        .rank:hover { background: var(--bg3); }
        .rank-n { font-family: var(--font-d); font-size: 22px; font-weight: 900; color: var(--text3); width: 24px; text-align: center; }
        .rank-n.top { color: var(--gold); }
        .rank-info { flex: 1; min-width: 0; }
        .rank-m { font-size: 13px; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .rank-d { font-size: 11px; color: var(--text2); margin-top: 2px; }
        .rank-h { font-family: var(--font-d); font-size: 22px; font-weight: 900; color: var(--gold); }
        .promo { background: linear-gradient(135deg, #1f1500, #2d1f00); border-color: rgba(245,197,24,0.3) !important; padding: 22px; }
        .p-tag { font-size: 10px; font-weight: 700; letter-spacing: 3px; color: var(--gold); text-transform: uppercase; }
        .p-title { font-family: var(--font-d); font-size: 24px; font-weight: 900; line-height: 1.1; margin-top: 10px; text-transform: uppercase; }
        .p-desc { font-size: 13px; color: var(--text2); margin-top: 12px; line-height: 1.7; }
        .p-btn { display: block; margin-top: 18px; background: var(--gold); color: #000; padding: 12px; text-align: center; font-weight: 900; font-size: 13px; border-radius: 8px; transition: background 0.2s; letter-spacing: 0.5px; }
        .p-btn:hover { background: var(--gold2); }
        .p-note { font-size: 10px; color: var(--text3); text-align: center; margin-top: 10px; }

        footer { background: var(--bg2); border-top: 1px solid var(--border); padding: 36px 32px; text-align: center; font-size: 12px; color: var(--text3); line-height: 1.9; margin-top: 56px; }
        footer .links { display: flex; justify-content: center; gap: 24px; margin-bottom: 12px; }
        footer .links a:hover { color: var(--text2); }

        @media (max-width: 900px) {
          .nav { padding: 0 16px; }
          .nav-links { gap: 16px; }
          .hero-inner { grid-template-columns: 1fr; }
          .hero-left { border-right: none; border-bottom: 1px solid var(--border); padding: 40px 20px; }
          .hero-right { padding: 24px 20px; }
          .stats { gap: 28px; }
          .section { padding: 36px 16px 20px; }
          .main { grid-template-columns: 1fr; padding: 0 16px 48px; }
          .side { display: none; }
          .mc { grid-template-columns: 1fr auto 1fr; padding: 18px; }
          .mc-meta { display: none; }
          .sec-title { font-size: 28px; }
        }
      `}</style>

            <nav className="nav">
                <Link href="/" className="nav-logo">
                    <span className="nav-dot" />
                    WORLDCUP<em style={{color:'#fff',fontStyle:'normal'}}>PRO</em>
                </Link>
                <ul className="nav-links">
                    <li><Link href="/">首页</Link></li>
                    <li><Link href="#matches">赛事预测</Link></li>
                    <li><Link href="/best-sites" className="nav-cta">热门活动</Link></li>
                </ul>
            </nav>

            <div className="ticker">
                <div className="ticker-tag">LIVE</div>
                <div className="ticker-scroll">
                    <div className="ticker-track">
                        {[...matches, ...matches].map((m, i) => (
                            <span key={i} className="ticker-item">
                {i < matches.length && <span className="ticker-hot">HOT</span>}
                                <span className="ticker-match">{m.home} vs {m.away}</span>
                <span style={{color:'var(--gold)',fontWeight:600}}>{m.prediction}</span>
                <span>·</span>
                <span>热度 {m.heat}</span>
              </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="hero">
                <div className="hero-grid" />
                <div className="hero-glow" />
                <div className="hero-inner">
                    <div className="hero-left">
                        <div className="eyebrow">2026 FIFA WORLD CUP · 赛事预测</div>
                        <h1 className="h1">
                            世界杯
                            <em>赛前分析</em>
                            比分参考
                        </h1>
                        <p className="lead">聚合全球热门赛事赛前数据、球队走势与比分方向，为中文球迷提供专业赛事参考内容。</p>
                        <div className="stats">
                            <div>
                                <div className="stat-num">{matches.length}+</div>
                                <div className="stat-label">热门赛事</div>
                            </div>
                            <div>
                                <div className="stat-num">24H</div>
                                <div className="stat-label">持续更新</div>
                            </div>
                            <div>
                                <div className="stat-num">98</div>
                                <div className="stat-label">最高热度</div>
                            </div>
                        </div>
                    </div>
                    <div className="hero-right">
                        <div className="feat-label">今日焦点赛事</div>
                        <Link href={`/prediction/${featured.slug}`} className="feat-card">
                            <div className="feat-teams">
                                <div className="ft-team">
                                    <div className="ft-flag">{teamFlags[featured.home] ?? '🏳️'}</div>
                                    <div className="ft-name">{featured.home}</div>
                                </div>
                                <div className="ft-vs">VS</div>
                                <div className="ft-team">
                                    <div className="ft-flag">{teamFlags[featured.away] ?? '🏳️'}</div>
                                    <div className="ft-name">{featured.away}</div>
                                </div>
                            </div>
                            <div className="feat-info">
                                <div>
                                    <div className="fi-label">预测方向</div>
                                    <div className="fi-val">{featured.prediction}</div>
                                </div>
                                <div>
                                    <div className="fi-label">比分参考</div>
                                    <div className="fi-val">{featured.score}</div>
                                </div>
                                <div>
                                    <div className="fi-label">比赛日期</div>
                                    <div className="fi-val" style={{color:'var(--text)',fontSize:'13px'}}>{featured.date}</div>
                                </div>
                                <div>
                                    <div className="fi-label">风险评级</div>
                                    <div className="fi-val" style={{color: riskColor[featured.risk] ?? 'var(--gold)'}}>{featured.risk}</div>
                                </div>
                            </div>
                            <div className="feat-foot">
                                <div className="heat-bar">
                                    <span style={{fontSize:11,color:'var(--text3)'}}>热度</span>
                                    <div className="heat-track"><div className="heat-fill" style={{width:`${featured.heat}%`}} /></div>
                                    <span style={{fontSize:13,fontWeight:700,color:'var(--gold)'}}>{featured.heat}</span>
                                </div>
                                <span className="feat-cta">查看分析 →</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="section" id="matches">
                <div className="sec-head">
                    <div>
                        <div className="sec-tag">MATCH PREDICTIONS</div>
                        <div className="sec-title">世界杯热门预测</div>
                    </div>
                    <Link href="/best-sites" className="sec-link">热门活动 →</Link>
                </div>
            </div>

            <div className="main">
                {/* 命中率横幅 */}
                <div style={{
                    background: 'linear-gradient(90deg, rgba(34,197,94,0.1), rgba(34,197,94,0.05), transparent)',
                    border: '1px solid rgba(34,197,94,0.2)',
                    borderRadius: 10,
                    padding: '12px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    marginBottom: 16,
                }}>
                    <div style={{
                        fontFamily: 'var(--font-d)',
                        fontSize: 40,
                        fontWeight: 900,
                        color: '#22c55e',
                        lineHeight: 1,
                        flexShrink: 0,
                    }}>78%</div>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
                            近期推荐命中率 · 9场7中
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 4 }}>
                            06-12 英格兰大胜 ✅ &nbsp;·&nbsp;
                            06-11 巴西大球 ✅ &nbsp;·&nbsp;
                            06-10 西班牙让球 ✅ &nbsp;·&nbsp;
                            06-08 德国大球 ❌
                        </div>
                    </div>
                    <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
                        <div style={{
                            background: 'rgba(34,197,94,0.15)',
                            border: '1px solid rgba(34,197,94,0.3)',
                            borderRadius: 6,
                            padding: '6px 12px',
                            fontSize: 11,
                            color: '#22c55e',
                            fontWeight: 700,
                            letterSpacing: 1,
                        }}>今日推荐已更新</div>
                    </div>
                </div>
                <div className="matches">
                    {matches.map((m) => (
                        <Link key={m.slug} href={`/prediction/${m.slug}`} className="mc">
                            <div className="mc-team">
                                <span className="mc-flag">{teamFlags[m.home] ?? '🏳️'}</span>
                                <div>
                                    <div className="mc-name">{m.home}</div>
                                    <div className="mc-stage">{m.league}</div>
                                </div>
                            </div>
                            <div className="mc-mid">
                                <div className="mc-time">{m.time}</div>
                                <div className="mc-date">{m.date}</div>
                                <div className="mc-pred">{m.prediction}</div>
                            </div>
                            <div className="mc-team away">
                                <span className="mc-flag">{teamFlags[m.away] ?? '🏳️'}</span>
                                <div>
                                    <div className="mc-name">{m.away}</div>
                                    <div className="mc-stage">{m.stage}</div>
                                </div>
                            </div>
                            <div className="mc-meta">
                                <div className="mc-heat">{m.heat}</div>
                                <div className="mc-hl">热度</div>
                                <div
                                    className="mc-risk"
                                    style={{
                                        color: riskColor[m.risk] ?? '#facc15',
                                        background: `${riskColor[m.risk] ?? '#facc15'}1a`,
                                    }}
                                >
                                    风险 · {m.risk}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <aside className="side">
                    <div className="widget">
                        <div className="w-head">
                            <div className="w-title">热门榜</div>
                            <div className="w-tag">HOT RANKING</div>
                        </div>
                        <div style={{padding:'8px 0'}}>
                            {matches.map((m, i) => (
                                <Link key={m.slug} href={`/prediction/${m.slug}`} className="rank">
                                    <div className={`rank-n ${i < 3 ? 'top' : ''}`}>{i + 1}</div>
                                    <div className="rank-info">
                                        <div className="rank-m">{m.home} vs {m.away}</div>
                                        <div className="rank-d">{m.date} · {m.prediction}</div>
                                    </div>
                                    <div className="rank-h">{m.heat}</div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 🔥 命中战绩 widget */}
                    <div className="widget" style={{
                        background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.02))',
                        borderColor: 'rgba(34,197,94,0.25)',
                    }}>
                        <div className="w-head">
                            <div className="w-title">命中战绩</div>
                            <div className="w-tag">HIT RATE</div>
                        </div>
                        {/* 命中率大字 */}
                        <div style={{
                            padding: '16px 18px',
                            textAlign: 'center',
                            borderBottom: '1px solid var(--border)',
                            background: 'rgba(0,0,0,0.2)',
                        }}>
                            <div style={{
                                fontFamily: 'var(--font-d)',
                                fontSize: 56,
                                fontWeight: 900,
                                color: '#22c55e',
                                lineHeight: 1,
                            }}>78%</div>
                            <div style={{
                                fontSize: 11,
                                color: 'var(--text2)',
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                                marginTop: 6,
                            }}>近期命中率</div>
                            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>
                                近 <strong style={{color:'#22c55e'}}>9</strong> 场推荐 · 7中2失
                            </div>
                        </div>
                        {/* 战绩列表 */}
                        <div style={{ padding: '4px 0' }}>
                            {[
                                { date: '今日', match: '阿根廷 vs 法国', tip: '阿根廷不败', result: 'pending' },
                                { date: '06-12', match: '英格兰 vs 伊朗', tip: '英格兰大胜', result: 'win' },
                                { date: '06-11', match: '巴西 vs 塞尔维亚', tip: '巴西大球', result: 'win' },
                                { date: '06-10', match: '西班牙 vs 哥斯达黎加', tip: '西班牙让球', result: 'win' },
                                { date: '06-09', match: '法国 vs 澳大利亚', tip: '法国大胜', result: 'win' },
                                { date: '06-08', match: '德国 vs 日本', tip: '大球方向', result: 'lose' },
                                { date: '06-07', match: '葡萄牙 vs 加纳', tip: '葡萄牙让球', result: 'win' },
                            ].map((h, i) => (
                                <div key={i} style={{
                                    display: 'grid',
                                    gridTemplateColumns: '44px 1fr auto',
                                    alignItems: 'center',
                                    gap: 10,
                                    padding: '10px 18px',
                                    borderBottom: '1px dashed var(--border)',
                                    fontSize: 12,
                                }}>
                                    <div style={{ color: 'var(--text3)', fontSize: 11 }}>{h.date}</div>
                                    <div>
                                        <div style={{ color: 'var(--text)', fontWeight: 600 }}>{h.tip}</div>
                                        <div style={{ color: 'var(--text3)', fontSize: 11, marginTop: 2 }}>{h.match}</div>
                                    </div>
                                    <div style={{
                                        fontSize: 11,
                                        fontWeight: 800,
                                        padding: '3px 8px',
                                        borderRadius: 4,
                                        ...(h.result === 'win'
                                            ? { background: 'rgba(34,197,94,0.15)', color: '#22c55e' }
                                            : h.result === 'lose'
                                                ? { background: 'rgba(239,68,68,0.15)', color: '#ef4444' }
                                                : { background: 'rgba(245,197,24,0.15)', color: 'var(--gold)' }),
                                    }}>
                                        {h.result === 'win' ? '✓ 中' : h.result === 'lose' ? '✗ 失' : '待开'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="widget promo">
                        <div className="p-tag">WORLD CUP 2026</div>
                        <div className="p-title">热门平台<br/>活动整理</div>
                        <p className="p-desc">查看世界杯期间各平台新用户活动、赔率对比与参考信息。</p>
                        <Link href="/best-sites" className="p-btn">查看全部活动 →</Link>
                        <div className="p-note">18+ · 请理性参与 · 遵守当地法规</div>
                    </div>
                </aside>
            </div>

            <footer>
                <div className="links">
                    <Link href="/">首页</Link>
                    <Link href="/best-sites">热门活动</Link>
                    <a>关于我们</a>
                    <a>免责声明</a>
                </div>
                <div>© 2026 WorldCup Pro · 内容仅作体育赛事分析参考，不构成任何投注建议</div>
                <div style={{marginTop:4}}>请确认您所在地区相关服务合法，并理性参与。18+</div>
            </footer>
        </>
    )
}
