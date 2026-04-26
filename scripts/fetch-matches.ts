import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

for (const envFile of ['.env.local', '.env']) {
    dotenv.config({ path: path.join(process.cwd(), envFile), override: false, quiet: true });
}

type FootballDataMatch = {
    utcDate: string;
    homeTeam: { name: string };
    awayTeam: { name: string };
    competition: { name: string };
};

function slugify(input: string) {
    return input
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

async function main() {
    const token = process.env.FOOTBALL_DATA_TOKEN?.trim();

    if (!token) {
        throw new Error('缺少 FOOTBALL_DATA_TOKEN，请检查 .env.local');
    }

    /**
     * WC = World Cup
     * season=2026 用于 2026 世界杯
     * v3.football.api-sports.io
     */
    // const url = 'https://api.football-data.org/v4/competitions/WC/matches?season=2026';
    const url = 'https://api.football-data.org/v3.football.api-sports.io';

    const res = await fetch(url, {
        headers: {
            'X-Auth-Token': token,
        },
    });

    if (!res.ok) {
        throw new Error(`football-data 请求失败：${res.status} ${await res.text()}`);
    }

    const data = await res.json();

    const matches = data.matches.map((m: FootballDataMatch) => ({
        home: m.homeTeam.name,
        away: m.awayTeam.name,
        date: m.utcDate.slice(0, 10),
        league: m.competition.name,
        slug: slugify(`${m.homeTeam.name}-vs-${m.awayTeam.name}-prediction`),
    }));

    const filePath = path.join(process.cwd(), 'src/data/matches.ts');

    fs.writeFileSync(
        filePath,
        `export const matches = ${JSON.stringify(matches, null, 2)} as const;\n`,
    );

    console.log(`Fetched ${matches.length} matches`);
}

main();
