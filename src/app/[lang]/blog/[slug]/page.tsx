import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { blogPosts } from "@/data/blog";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: Array<{ lang: string; slug: string }> = [];
  for (const lang of ["id", "en"]) {
    for (const post of blogPosts) {
      params.push({ lang, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} - Garapin.id`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const contentHtml = post.content
    .split("\n")
    .map((line) => {
      if (line.startsWith("## ")) return `<h2 class="text-2xl font-bold text-garapin-navy mt-8 mb-4">${line.slice(3)}</h2>`;
      if (line.startsWith("### ")) return `<h3 class="text-xl font-semibold text-garapin-navy mt-6 mb-3">${line.slice(4)}</h3>`;
      if (line.match(/^\d+\.\s/)) return `<li class="text-garapin-slate ml-4 mb-1">${line.replace(/^\d+\.\s/, "")}</li>`;
      if (line.startsWith("- ")) return `<li class="text-garapin-slate ml-4 mb-1">${line.slice(2)}</li>`;
      if (line.startsWith("**") && line.endsWith("**")) return `<strong class="text-garapin-navy font-semibold">${line.slice(2, -2)}</strong>`;
      if (line.trim() === "") return "";
      return `<p class="text-garapin-slate leading-relaxed mb-4">${line}</p>`;
    })
    .join("");

  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-br from-garapin-navy to-garapin-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center text-sm text-garapin-light hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={16} className="mr-2" />
            {dict.blog.title}
          </Link>
          <div className="flex items-center gap-3 text-sm text-garapin-light mb-4">
            <span className="px-2 py-1 bg-garapin-orange/10 text-garapin-orange rounded-md">
              {dict.blog.categories[post.category as keyof typeof dict.blog.categories] || post.category}
            </span>
            <span className="flex items-center gap-1"><Calendar size={14} />{post.date}</span>
            <span className="flex items-center gap-1"><Clock size={14} />{post.readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">{post.title}</h1>
          <p className="text-garapin-light mt-4">By {post.author}</p>
        </div>
      </section>

      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
          <div className="mt-12 pt-8 border-t border-garapin-border">
            <Link href={`/${lang}/blog`}>
              <Button variant="outline">
                <ArrowLeft className="mr-2" size={16} />
                {dict.blog.title}
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}