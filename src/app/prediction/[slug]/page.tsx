import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CTABox from "@/components/CTABox";
import { getPostBySlug, posts } from "@/data/posts";
import { matches } from "@/data/matches";
import { buildMetadata } from "@/lib/seo";

type PredictionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PredictionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Prediction Not Found",
      description: "The requested prediction page does not exist.",
      path: `/prediction/${slug}`
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/prediction/${post.slug}`
  });
}

export default async function PredictionPage({ params }: PredictionPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const match = matches.find((item) => item.id === post.matchId);

  return (
    <article>
      <h1 style={{ marginBottom: 8 }}>{post.title}</h1>
      <p style={{ marginTop: 0, color: "#374151" }}>{post.excerpt}</p>
      <p style={{ marginTop: 0, marginBottom: 20 }}>
        Published: {post.publishDate}
        {match ? ` | Match: ${match.homeTeam} vs ${match.awayTeam}` : ""}
      </p>
      <p>{post.content}</p>

      <CTABox
        title="Want the best odds for this match?"
        description="Open our recommended betting sites list and compare welcome offers."
      />
    </article>
  );
}
