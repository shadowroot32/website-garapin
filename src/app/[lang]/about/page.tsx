import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { AboutClient } from "@/components/sections/about-client";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "id" ? "Tentang Kami - Garapin.id" : "About Us - Garapin.id",
  };
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  return <AboutClient dict={dict.about} lang={lang} />;
}