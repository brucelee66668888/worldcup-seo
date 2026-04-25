import type { Metadata } from "next";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
};

const FALLBACK_URL = "https://worldcup-seo.example.com";

export function buildMetadata({ title, description, path = "/" }: SeoInput): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_URL;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = new URL(normalizedPath, siteUrl).toString();

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: normalizedPath
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}
