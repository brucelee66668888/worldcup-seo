export type Match = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  group: string;
  venue: string;
};

export const matches: Match[] = [
  {
    id: "m1",
    homeTeam: "Brazil",
    awayTeam: "Spain",
    date: "2026-06-15",
    group: "Group A",
    venue: "New York"
  },
  {
    id: "m2",
    homeTeam: "Argentina",
    awayTeam: "France",
    date: "2026-06-16",
    group: "Group B",
    venue: "Los Angeles"
  },
  {
    id: "m3",
    homeTeam: "Germany",
    awayTeam: "England",
    date: "2026-06-17",
    group: "Group C",
    venue: "Dallas"
  }
];
