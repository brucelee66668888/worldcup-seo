import { NextRequest, NextResponse } from "next/server";
import { getBrandByKey } from "@/data/brands";

type BrandRouteContext = {
  params: Promise<{
    brand: string;
  }>;
};

export async function GET(request: NextRequest, { params }: BrandRouteContext) {
  const { brand } = await params;
  const brandItem = getBrandByKey(brand);

  if (!brandItem) {
    return NextResponse.redirect(new URL("/best-sites", request.url), 307);
  }

  const targetUrl = new URL(brandItem.url);
  targetUrl.searchParams.set("utm_source", "worldcup-seo");
  targetUrl.searchParams.set("utm_medium", "referral");
  targetUrl.searchParams.set("utm_campaign", brandItem.key);

  return NextResponse.redirect(targetUrl, 307);
}
