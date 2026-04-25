import SiteCard from "@/components/SiteCard";
import { brands } from "@/data/brands";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Best Betting Sites for World Cup",
  description: "Compare bonuses, ratings, and key features for trusted betting brands.",
  path: "/best-sites"
});

export default function BestSitesPage() {
  return (
    <section>
      <h1 style={{ marginBottom: 8 }}>Best Betting Sites</h1>
      <p style={{ marginTop: 0, marginBottom: 24 }}>
        Shortlist of top operators for World Cup markets.
      </p>

      <div style={{ display: "grid", gap: 16 }}>
        {brands.map((brand) => (
          <SiteCard key={brand.key} brand={brand} />
        ))}
      </div>
    </section>
  );
}
