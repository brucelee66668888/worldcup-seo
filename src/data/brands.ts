export type Brand = {
  key: string;
  name: string;
  url: string;
  bonus: string;
  rating: number;
  description: string;
};

export const brands: Brand[] = [
  {
    key: "bet365",
    name: "Bet365",
    url: "https://www.bet365.com",
    bonus: "Up to $200 bonus",
    rating: 4.8,
    description: "Deep market coverage and strong live betting options."
  },
  {
    key: "draftkings",
    name: "DraftKings",
    url: "https://www.draftkings.com",
    bonus: "$150 in bonus bets",
    rating: 4.7,
    description: "Competitive odds and clean mobile experience."
  },
  {
    key: "fanduel",
    name: "FanDuel",
    url: "https://www.fanduel.com",
    bonus: "No sweat first bet",
    rating: 4.6,
    description: "Fast payouts and broad soccer market selection."
  }
];

export function getBrandByKey(key: string): Brand | undefined {
  return brands.find((brand) => brand.key === key);
}
