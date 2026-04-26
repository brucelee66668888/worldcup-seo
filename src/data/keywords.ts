export const keywordTemplates = [
    '{home}vs{away}预测',
    '{home}对{away}比分预测',
    '{home}vs{away}盘口分析',
    '{home}vs{away}胜负推荐',
    '{home}vs{away}赛前分析',
    '{home}vs{away}谁会赢',
    '{home}vs{away}大小球分析',
    '{home}vs{away}世界杯预测',
];

export function buildKeywords(home: string, away: string) {
    return keywordTemplates.map((tpl) =>
        tpl.replaceAll('{home}', home).replaceAll('{away}', away),
    );
}