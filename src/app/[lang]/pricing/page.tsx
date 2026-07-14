import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { PricingClient } from "@/components/sections/pricing-client";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "id" ? "Harga - Garapin.id" : "Pricing - Garapin.id" };
}

export default async function PricingPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  return <PricingClient dict={dict.pricing} lang={lang} />;
}