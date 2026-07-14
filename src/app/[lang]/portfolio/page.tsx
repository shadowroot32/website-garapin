import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { PortfolioClient } from "@/components/sections/portfolio-client";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "id" ? "Portfolio - Garapin.id" : "Portfolio - Garapin.id" };
}

export default async function PortfolioPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  return <PortfolioClient dict={dict.portfolio} lang={lang} />;
}