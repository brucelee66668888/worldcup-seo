import { slugify } from "../lib/slug";

export type PredictionPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: string;
  matchId: string;
};

type RawPost = Omit<PredictionPost, "slug">;

const rawPosts: RawPost[] = [
  {
    title: "Brazil vs Spain Prediction: Who Controls Midfield?",
    excerpt: "Form analysis, tactical edge, and projected scoreline.",
    content:
      "Brazil brings width and pressing intensity, while Spain relies on central control and patient buildup. The key battle is transition defense after turnovers.",
    publishDate: "2026-04-20",
    matchId: "m1"
  },
  {
    title: "Argentina vs France Prediction: Final-Style Clash",
    excerpt: "Expected lineups, xG trend, and value angles.",
    content:
      "Argentina is stronger in chance creation from the right half-space, but France has superior pace in direct attacks. Match rhythm may decide this one.",
    publishDate: "2026-04-21",
    matchId: "m2"
  },
  {
    title: "Germany vs England Prediction: Set Pieces Could Decide It",
    excerpt: "Head-to-head context and probable game state.",
    content:
      "Germany's pressing traps can generate high-value chances, but England's set-piece quality remains an equalizer in balanced games.",
    publishDate: "2026-04-22",
    matchId: "m3"
  }
];

export const posts: PredictionPost[] = rawPosts.map((post) => ({
  ...post,
  slug: slugify(post.title)
}));

export function getPostBySlug(slug: string): PredictionPost | undefined {
  return posts.find((post) => post.slug === slug);
}
