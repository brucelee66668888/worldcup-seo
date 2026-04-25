import Link from "next/link";

type CTABoxProps = {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function CTABox({
  title,
  description,
  ctaLabel = "View Best Betting Sites",
  ctaHref = "/best-sites"
}: CTABoxProps) {
  return (
    <section
      style={{
        marginTop: 24,
        padding: 20,
        border: "1px solid #d1d5db",
        borderRadius: 12,
        background: "#f9fafb"
      }}
    >
      <h3 style={{ marginBottom: 8 }}>{title}</h3>
      <p style={{ marginBottom: 14 }}>{description}</p>
      <Link href={ctaHref} style={{ fontWeight: 600 }}>
        {ctaLabel}
      </Link>
    </section>
  );
}
