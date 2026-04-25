import Link from "next/link";
import type { Brand } from "@/data/brands";

type SiteCardProps = {
  brand: Brand;
};

export default function SiteCard({ brand }: SiteCardProps) {
  return (
    <article
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16
      }}
    >
      <h3 style={{ marginBottom: 8 }}>{brand.name}</h3>
      <p style={{ marginBottom: 8 }}>{brand.description}</p>
      <p style={{ marginBottom: 4 }}>Rating: {brand.rating.toFixed(1)}/5</p>
      <p style={{ marginBottom: 12 }}>Offer: {brand.bonus}</p>
      <Link href={`/go/${brand.key}`} style={{ fontWeight: 600 }}>
        Claim Offer
      </Link>
    </article>
  );
}
