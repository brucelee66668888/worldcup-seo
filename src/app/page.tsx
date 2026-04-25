import Link from "next/link";
import CTABox from "@/components/CTABox";
import { posts } from "@/data/posts";
import { matches } from "@/data/matches";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "World Cup Match Predictions Today",
  description: "Data-backed previews and scoreline predictions for upcoming World Cup matches.",
  path: "/"
});

export default function HomePage() {
  const latestPosts = posts.slice(0, 3);

  return (
    <section>
      <h1 style={{ marginBottom: 8 }}>World Cup Predictions</h1>
      <p style={{ marginTop: 0, marginBottom: 24 }}>
        Tactical previews, scoreline projections, and betting insights.
      </p>

      <h2>Latest Predictions</h2>
      <ul style={{ paddingLeft: 20 }}>
        {latestPosts.map((post) => (
          <li key={post.slug} style={{ marginBottom: 8 }}>
            <Link href={`/prediction/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <h2>Upcoming Matches</h2>
      <ul style={{ paddingLeft: 20 }}>
        {matches.map((match) => (
          <li key={match.id} style={{ marginBottom: 8 }}>
            {match.homeTeam} vs {match.awayTeam} ({match.date}, {match.venue})
          </li>
        ))}
      </ul>

      <CTABox
        title="Need a trusted bookmaker?"
        description="Compare top-rated betting platforms and claim the best welcome bonuses."
      />
    </section>
  );
}
