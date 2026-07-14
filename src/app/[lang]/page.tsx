import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { HomeClient } from "@/components/sections/home-client";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "id" ? "Garapin.id - Web Development Agency" : "Garapin.id - Web Development Agency",
    description: lang === "id"
      ? "Dari Ide Menjadi Website Profesional. Jasa pembuatan website untuk UMKM, perusahaan, dan instansi."
      : "From Ideas to Professional Websites. Web development services for businesses and institutions.",
  };
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return <HomeClient dict={dict} lang={lang} />;
}