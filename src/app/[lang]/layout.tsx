import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";

export async function generateStaticParams() {
  return [{ lang: "id" }, { lang: "en" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Navbar dict={dict.nav} lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}