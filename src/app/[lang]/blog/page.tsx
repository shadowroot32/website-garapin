import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { BlogListClient } from "@/components/sections/blog-list-client";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "id" ? "Blog - Garapin.id" : "Blog - Garapin.id" };
}

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  return <BlogListClient dict={dict.blog} lang={lang} />;
}