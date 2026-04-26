import { brands } from '@/data/brands';
import { NextResponse } from 'next/server';

type Props = {
  params: Promise<{ brand: string }>;
};

export async function GET(_: Request, { params }: Props) {
  const { brand } = await params;
  const item = brands.find((b) => b.key === brand);

  if (!item) {
    return NextResponse.redirect(new URL('/best-sites', process.env.NEXT_PUBLIC_SITE_URL));
  }

  // 这里可以后续接数据库，记录点击次数、来源、时间等
  return NextResponse.redirect(item.url);
}