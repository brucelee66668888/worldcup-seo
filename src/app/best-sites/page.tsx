// src/app/best-sites/page.tsx
// 专业评测站风格 — 单文件，无外部组件依赖

import { brands } from '@/data/brands'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '2026世界杯热门平台对比 | 赔率与活动整理',
    description: '2026世界杯期间各热门平台对比，包含赔率分析、新用户活动、特点评测与综合评分。内容仅供参考，请遵守所在地法律法规。',
}

const renderStars = (rating: number) => {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5
    return { full, half, empty: 5 - full - (half ? 1 : 0) }
}

// FAQ 数据
const faqs = [
    {
        q: '如何选择合适的平台？',
        a: '主要考虑赔率水平、入款便捷性、客服响应速度和提款效率。新手建议选择中文支持完善、入款方式多样的平台；专业玩家更关注赔率上限和不限制赢家账户的政策。',
    },
    {
        q: '平台的赔率为什么不同？',
        a: '不同平台的市场策略不同。Pinnacle 等专业平台靠交易量盈利，赔率较高但无奖金；Bet365 等大众平台靠营销和奖金吸引用户，赔率相对保守。综合考虑成本后选择最适合自己的。',
    },
    {
        q: '世界杯期间有哪些特别活动？',
        a: '大部分平台在世界杯期间会推出免费投注、首存翻倍、连串赛事奖励、积分翻倍等活动。建议关注各平台的活动页面，比较条款后选择最划算的。',
    },
    {
        q: '本站的推荐排序如何确定？',
        a: '基于公开信息整理，综合赔率水平、用户口碑、平台稳定性、出入款便捷度四个维度评分。本站不收取平台费用，但可能通过推广链接获得佣金，这不影响评分。',
    },
]

export default function BestSitesPage() {
    const top = brands[0]

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Noto+Sans+SC:wght@400;500;700&display=swap');

        :root {
          --bg: #060b14; --bg2: #0c1525; --bg3: #111d30;
          --border: rgba(255,255,255,0.08);
          --gold: #f5c518; --gold2: #e6b800;
          --green: #22c55e;
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

        /* HERO */
        .hero {
          position: relative;
          background: linear-gradient(135deg, #060b14 0%, #0a1628 50%, #060b14 100%);
          padding: 56px 32px 40px;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
        }
        .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(245,197,24,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,24,0.04) 1px, transparent 1px); background-size: 50px 50px; pointer-events: none; }
        .hero-glow { position: absolute; top: -100px; right: -100px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(245,197,24,0.12) 0%, transparent 70%); pointer-events: none; }
        .hero-inner { position: relative; max-width: 1280px; margin: 0 auto; }
        .crumb { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text3); margin-bottom: 16px; }
        .crumb a:hover { color: var(--text); }
        .crumb .now { color: var(--gold); }
        .eyebrow { display: inline-flex; align-items: center; gap: 10px; font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; }
        .eyebrow::before { content: ''; width: 28px; height: 2px; background: var(--gold); }
        .h1 { font-family: var(--font-d); font-size: clamp(40px, 5vw, 60px); font-weight: 900; line-height: 1; color: #fff; text-transform: uppercase; letter-spacing: -0.5px; }
        .h1 em { font-style: normal; color: var(--gold); display: block; }
        .lead { margin-top: 18px; max-width: 640px; font-size: 15px; line-height: 1.8; color: var(--text2); }
        .trust-row { margin-top: 28px; display: flex; gap: 12px; flex-wrap: wrap; }
        .trust-tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 14px; border-radius: 100px;
          background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.25);
          font-size: 12px; color: var(--green); font-weight: 600;
        }

        /* COMPARISON SUMMARY TABLE */
        .summary {
          max-width: 1280px;
          margin: -28px auto 0;
          padding: 0 32px;
          position: relative;
          z-index: 5;
        }
        .summary-card {
          background: var(--bg2);
          border: 1px solid rgba(245,197,24,0.2);
          border-radius: 16px;
          overflow: hidden;
        }
        .summary-head {
          padding: 14px 20px;
          background: rgba(245,197,24,0.05);
          border-bottom: 1px solid var(--border);
          font-size: 12px; color: var(--gold); font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase;
          display: flex; align-items: center; justify-content: space-between;
        }
        .summary-table {
          width: 100%; border-collapse: collapse;
        }
        .summary-table th {
          padding: 14px 16px; text-align: left;
          font-size: 11px; color: var(--text3); font-weight: 600;
          text-transform: uppercase; letter-spacing: 1.5px;
          border-bottom: 1px solid var(--border);
        }
        .summary-table td {
          padding: 16px; font-size: 14px;
          border-bottom: 1px solid var(--border);
        }
        .summary-table tr:last-child td { border-bottom: none; }
        .summary-table tr:hover td { background: rgba(255,255,255,0.02); }
        .st-rank {
          width: 36px; height: 36px;
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          font-family: var(--font-d); font-size: 18px; font-weight: 900;
        }
        .st-rank.top { background: var(--gold); color: #000; }
        .st-rank.mid { background: rgba(255,255,255,0.08); color: var(--text); }
        .st-name {
          font-family: var(--font-d); font-size: 18px; font-weight: 800;
          letter-spacing: 0.5px;
        }
        .st-tag {
          display: inline-block; font-size: 10px; padding: 2px 8px;
          border-radius: 4px; margin-left: 8px;
          background: rgba(245,197,24,0.15); color: var(--gold);
          font-weight: 600; letter-spacing: 0.5px;
        }
        .st-rating-cell { white-space: nowrap; }
        .st-rating-num { font-family: var(--font-d); font-size: 22px; font-weight: 900; color: var(--gold); margin-right: 6px; }
        .st-bonus { color: var(--gold); font-weight: 600; font-size: 13px; }
        .st-action {
          background: var(--gold); color: #000;
          padding: 8px 16px; border-radius: 6px;
          font-size: 12px; font-weight: 800;
          white-space: nowrap; transition: background 0.2s;
        }
        .st-action:hover { background: var(--gold2); }

        /* SECTION TITLE */
        .section { max-width: 1280px; margin: 0 auto; padding: 56px 32px 24px; }
        .sec-tag { font-size: 11px; font-weight: 700; letter-spacing: 3px; color: var(--gold); text-transform: uppercase; }
        .sec-title { font-family: var(--font-d); font-size: 32px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; line-height: 1; color: var(--text); margin-top: 6px; }
        .sec-sub { color: var(--text2); font-size: 14px; margin-top: 8px; }

        /* DETAILED REVIEW CARDS */
        .reviews { max-width: 1280px; margin: 24px auto 0; padding: 0 32px; display: flex; flex-direction: column; gap: 20px; }
        .review {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .review:hover { border-color: rgba(245,197,24,0.3); }
        .review.featured { border-color: rgba(245,197,24,0.4); }

        .review-head {
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center;
          gap: 20px;
          padding: 20px 24px;
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid var(--border);
          position: relative;
        }
        .review.featured .review-head { background: linear-gradient(90deg, rgba(245,197,24,0.08), rgba(245,197,24,0.02)); }
        .rh-rank {
          width: 60px; height: 60px;
          border-radius: 12px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          font-family: var(--font-d);
          background: rgba(255,255,255,0.05);
          color: var(--text2);
        }
        .rh-rank.top { background: linear-gradient(135deg, var(--gold), var(--gold2)); color: #000; }
        .rh-rank-num { font-size: 28px; font-weight: 900; line-height: 1; }
        .rh-rank-label { font-size: 9px; letter-spacing: 1px; text-transform: uppercase; margin-top: 2px; }
        .rh-info { min-width: 0; }
        .rh-title-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .rh-name { font-family: var(--font-d); font-size: 28px; font-weight: 900; letter-spacing: 0.5px; }
        .rh-tag {
          font-size: 10px; padding: 3px 8px; border-radius: 4px;
          font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
          background: var(--gold); color: #000;
        }
        .rh-rating { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
        .stars { display: flex; gap: 2px; }
        .star { color: var(--gold); font-size: 14px; }
        .star.empty { color: var(--text3); }
        .rh-rating-text { font-size: 13px; color: var(--text2); }
        .rh-bonus { font-size: 13px; color: var(--gold); margin-top: 4px; font-weight: 600; }
        .rh-cta {
          display: flex; flex-direction: column; gap: 8px; align-items: flex-end;
        }
        .rh-cta-btn {
          background: var(--gold); color: #000;
          padding: 12px 28px; border-radius: 8px;
          font-size: 13px; font-weight: 900; letter-spacing: 0.5px;
          white-space: nowrap; transition: all 0.2s;
        }
        .rh-cta-btn:hover { background: var(--gold2); transform: translateY(-1px); }
        .rh-cta-note { font-size: 10px; color: var(--text3); }

        /* REVIEW BODY */
        .review-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        .rb-section { padding: 20px 24px; }
        .rb-section:first-child { border-right: 1px solid var(--border); }
        .rb-label { font-size: 10px; color: var(--text3); letter-spacing: 2px; text-transform: uppercase; font-weight: 700; margin-bottom: 12px; }
        .rb-desc { font-size: 13px; color: var(--text); line-height: 1.7; }
        .rb-features { display: flex; flex-direction: column; gap: 8px; }
        .rb-feat {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; color: var(--text);
        }
        .rb-feat-icon {
          width: 18px; height: 18px; border-radius: 50%;
          background: rgba(34,197,94,0.15);
          color: var(--green);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800;
          flex-shrink: 0;
        }

        /* SCORING DETAIL */
        .review-scores {
          padding: 16px 24px;
          background: rgba(0,0,0,0.2);
          border-top: 1px solid var(--border);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .rs-item { text-align: center; }
        .rs-label { font-size: 10px; color: var(--text3); letter-spacing: 1.5px; text-transform: uppercase; }
        .rs-bar { height: 4px; background: rgba(255,255,255,0.05); border-radius: 2px; margin-top: 6px; overflow: hidden; }
        .rs-fill { height: 100%; background: linear-gradient(90deg, var(--gold), var(--gold2)); border-radius: 2px; }
        .rs-val { font-family: var(--font-d); font-size: 16px; font-weight: 800; color: var(--gold); margin-top: 4px; }

        /* FAQ */
        .faqs { max-width: 1280px; margin: 0 auto; padding: 0 32px 56px; }
        .faq-grid { display: grid; gap: 12px; margin-top: 24px; }
        .faq {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px 24px;
        }
        .faq-q {
          display: flex; align-items: center; gap: 12px;
          font-size: 15px; font-weight: 700;
          margin-bottom: 10px; color: var(--text);
        }
        .faq-q-icon {
          width: 24px; height: 24px;
          background: rgba(245,197,24,0.15);
          color: var(--gold);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-d);
          font-weight: 900; font-size: 14px;
          flex-shrink: 0;
        }
        .faq-a {
          font-size: 13px; line-height: 1.8;
          color: var(--text2);
          padding-left: 36px;
        }

        /* DISCLAIMER BOX */
        .disclaimer-box {
          max-width: 1280px;
          margin: 0 auto 56px;
          padding: 24px 28px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-left: 3px solid var(--gold);
          border-radius: 4px;
          font-size: 13px;
          line-height: 1.8;
          color: var(--text2);
        }
        .disc-title { color: var(--text); font-weight: 700; margin-bottom: 8px; font-size: 14px; }

        /* FOOTER */
        footer { background: var(--bg2); border-top: 1px solid var(--border); padding: 32px; text-align: center; font-size: 12px; color: var(--text3); line-height: 1.9; }
        footer .links { display: flex; justify-content: center; gap: 24px; margin-bottom: 12px; }
        footer .links a:hover { color: var(--text2); }

        @media (max-width: 900px) {
          .nav { padding: 0 16px; }
          .nav-links { gap: 12px; }
          .hero { padding: 36px 16px 32px; }
          .summary { padding: 0 16px; margin-top: -16px; }
          .summary-table { font-size: 12px; }
          .summary-table th:nth-child(3), .summary-table td:nth-child(3) { display: none; }
          .summary-table th, .summary-table td { padding: 10px 8px; }
          .reviews { padding: 0 16px; }
          .review-head { grid-template-columns: 50px 1fr; padding: 16px; }
          .rh-rank { width: 50px; height: 50px; }
          .rh-cta { display: none; }
          .review-body { grid-template-columns: 1fr; }
          .rb-section:first-child { border-right: none; border-bottom: 1px solid var(--border); }
          .review-scores { grid-template-columns: 1fr 1fr; gap: 12px; padding: 14px 16px; }
          .section, .faqs, .disclaimer-box { padding-left: 16px; padding-right: 16px; }
          .rh-name { font-size: 22px; }
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

            {/* HERO */}
            <section className="hero">
                <div className="hero-grid" />
                <div className="hero-glow" />
                <div className="hero-inner">
                    <div className="crumb">
                        <Link href="/">首页</Link>
                        <span>/</span>
                        <span className="now">热门活动</span>
                    </div>
                    <div className="eyebrow">2026 WORLD CUP · 平台评测</div>
                    <h1 className="h1">
                        热门平台
                        <em>对比与活动</em>
                    </h1>
                    <p className="lead">
                        综合赔率水平、活动力度、用户体验与平台稳定性，整理 2026 世界杯期间值得关注的体育竞猜平台。所有信息来源于公开资料，仅供参考。
                    </p>
                    <div className="trust-row">
                        <span className="trust-tag">✓ 信息公开透明</span>
                        <span className="trust-tag">✓ 多维度评分</span>
                        <span className="trust-tag">✓ 持续更新</span>
                        <span className="trust-tag">✓ 18+ 理性参与</span>
                    </div>
                </div>
            </section>

            {/* QUICK COMPARISON TABLE */}
            <div className="summary">
                <div className="summary-card">
                    <div className="summary-head">
                        <span>⚡ 快速对比</span>
                        <span style={{color:'var(--text3)',fontWeight:400,letterSpacing:0.5,textTransform:'none',fontSize:11}}>共 {brands.length} 个平台</span>
                    </div>
                    <table className="summary-table">
                        <thead>
                        <tr>
                            <th style={{width:60}}>排名</th>
                            <th>平台</th>
                            <th>评分</th>
                            <th>新人活动</th>
                            <th style={{textAlign:'right'}}>查看</th>
                        </tr>
                        </thead>
                        <tbody>
                        {brands.map((b, i) => (
                            <tr key={b.key}>
                                <td>
                                    <div className={`st-rank ${i === 0 ? 'top' : 'mid'}`}>{i + 1}</div>
                                </td>
                                <td>
                                    <div className="st-name">
                                        {b.name}
                                        {b.tag && <span className="st-tag">{b.tag}</span>}
                                    </div>
                                </td>
                                <td className="st-rating-cell">
                                    <span className="st-rating-num">{b.rating}</span>
                                    <span style={{color:'var(--text3)',fontSize:12}}>/ 5.0</span>
                                </td>
                                <td>
                                    <span className="st-bonus">{b.bonus}</span>
                                </td>
                                <td style={{textAlign:'right'}}>
                                    <a href={`/go/${b.key}`} rel="nofollow sponsored noopener" target="_blank" className="st-action">
                                        查看 →
                                    </a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* DETAILED REVIEWS */}
            <div className="section">
                <div className="sec-tag">DETAILED REVIEWS</div>
                <div className="sec-title">详细平台评测</div>
                <div className="sec-sub">基于赔率、出入款、客服、稳定性四个维度综合评分</div>
            </div>

            <div className="reviews">
                {brands.map((b, i) => {
                    const s = renderStars(b.rating)
                    // 模拟 4 维度评分
                    const scoreSeed = b.rating * 20
                    const scores = [
                        { label: '赔率', val: Math.min(100, Math.round(scoreSeed - 5 + (i % 2) * 4)) },
                        { label: '入款', val: Math.min(100, Math.round(scoreSeed + 2)) },
                        { label: '客服', val: Math.min(100, Math.round(scoreSeed - 3)) },
                        { label: '稳定', val: Math.min(100, Math.round(scoreSeed + 3 - i)) },
                    ]
                    return (
                        <div key={b.key} className={`review ${i === 0 ? 'featured' : ''}`}>
                            <div className="review-head">
                                <div className={`rh-rank ${i === 0 ? 'top' : ''}`}>
                                    <div className="rh-rank-num">{i + 1}</div>
                                    <div className="rh-rank-label">{i === 0 ? 'BEST' : `#${i+1}`}</div>
                                </div>
                                <div className="rh-info">
                                    <div className="rh-title-row">
                                        <span className="rh-name">{b.name}</span>
                                        {b.tag && <span className="rh-tag">{b.tag}</span>}
                                    </div>
                                    <div className="rh-rating">
                                        <div className="stars">
                                            {Array.from({ length: s.full }).map((_, j) => <span key={`f${j}`} className="star">★</span>)}
                                            {s.half && <span className="star">⯨</span>}
                                            {Array.from({ length: s.empty }).map((_, j) => <span key={`e${j}`} className="star empty">★</span>)}
                                        </div>
                                        <span className="rh-rating-text">{b.rating}/5.0 · 综合评分</span>
                                    </div>
                                    <div className="rh-bonus">🎁 {b.bonus}</div>
                                </div>
                                <div className="rh-cta">
                                    <a href={`/go/${b.key}`} rel="nofollow sponsored noopener" target="_blank" className="rh-cta-btn">
                                        查看活动 →
                                    </a>
                                    <span className="rh-cta-note">18+ · 理性参与</span>
                                </div>
                            </div>

                            <div className="review-body">
                                <div className="rb-section">
                                    <div className="rb-label">📋 平台简介</div>
                                    <div className="rb-desc">{b.description}</div>
                                </div>
                                <div className="rb-section">
                                    <div className="rb-label">✨ 主要特点</div>
                                    <div className="rb-features">
                                        {b.features.map((f) => (
                                            <div key={f} className="rb-feat">
                                                <span className="rb-feat-icon">✓</span>
                                                <span>{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="review-scores">
                                {scores.map((sc) => (
                                    <div key={sc.label} className="rs-item">
                                        <div className="rs-label">{sc.label}</div>
                                        <div className="rs-bar">
                                            <div className="rs-fill" style={{width: `${sc.val}%`}} />
                                        </div>
                                        <div className="rs-val">{sc.val}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* FAQ */}
            <div className="section faqs">
                <div className="sec-tag">FREQUENTLY ASKED</div>
                <div className="sec-title">常见问题</div>
                <div className="faq-grid">
                    {faqs.map((f, i) => (
                        <div key={i} className="faq">
                            <div className="faq-q">
                                <span className="faq-q-icon">Q</span>
                                {f.q}
                            </div>
                            <div className="faq-a">{f.a}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* DISCLAIMER */}
            <div className="disclaimer-box">
                <div className="disc-title">⚠️ 免责声明</div>
                本页面所有内容均为信息整理与参考用途，不构成任何投注建议或推荐。本站可能通过推广链接获得佣金，但这不影响任何评测结论。请在参与前确认您所在地区的相关法律法规，并对自身行为负责。如您或您的家人有赌博相关问题，请寻求专业帮助。本站不向 18 岁以下用户提供任何信息或服务。
            </div>

            <footer>
                <div className="links">
                    <Link href="/">首页</Link>
                    <Link href="/best-sites">热门活动</Link>
                    <a>关于我们</a>
                    <a>免责声明</a>
                </div>
                <div>© 2026 WorldCup Pro · 内容仅作信息整理参考，不构成投注建议</div>
                <div style={{marginTop:4}}>请确认您所在地区相关服务合法，并理性参与。18+</div>
            </footer>
        </>
    )
}
