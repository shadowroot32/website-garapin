import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { ServicesClient } from "@/components/sections/services-client";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "id" ? "Layanan - Garapin.id" : "Services - Garapin.id" };
}

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  return <ServicesClient dict={dict.services} lang={lang} />;
}