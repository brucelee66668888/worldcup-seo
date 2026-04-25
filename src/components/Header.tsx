import Link from "next/link";

export default function Header() {
  return (
    <header style={{ padding: "16px 24px", borderBottom: "1px solid #e5e7eb" }}>
      <nav style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Link href="/" style={{ fontWeight: 700 }}>
          WorldCup SEO
        </Link>
        <Link href="/prediction/brazil-vs-spain-prediction-who-controls-midfield">
          Predictions
        </Link>
        <Link href="/best-sites">Best Sites</Link>
      </nav>
    </header>
  );
}
