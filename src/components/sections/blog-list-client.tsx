"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/types/dictionary";
import { blogPosts } from "@/data/blog";
import { useState } from "react";

interface BlogListClientProps {
  dict: Dictionary["blog"];
  lang: string;
}

export function BlogListClient({ dict, lang }: BlogListClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { key: "all", label: lang === "id" ? "Semua" : "All" },
    ...Object.entries(dict.categories).map(([key, label]) => ({ key, label })),
  ];

  const filtered = activeCategory === "all" ? blogPosts : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-br from-garapin-navy to-garapin-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold mb-4">
            {dict.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-garapin-light">
            {dict.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-garapin-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  activeCategory === cat.key
                    ? "bg-garapin-orange text-white shadow-lg shadow-garapin-orange/25"
                    : "bg-white text-garapin-gray hover:text-garapin-navy border border-garapin-border"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden border border-garapin-border hover:shadow-xl transition-all duration-300 group"
              >
                <div className="aspect-video bg-gradient-to-br from-garapin-orange/20 to-garapin-dark flex items-center justify-center">
                  <span className="text-4xl font-bold text-white/30">{post.title.charAt(0)}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-garapin-gray mb-3">
                    <span className="px-2 py-1 bg-garapin-orange-muted text-garapin-orange rounded-md">
                      {dict.categories[post.category as keyof typeof dict.categories] || post.category}
                    </span>
                    <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-garapin-navy mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-garapin-gray line-clamp-2 mb-4">{post.excerpt}</p>
                  <Link
                    href={`/${lang}/blog/${post.slug}`}
                    className="inline-flex items-center text-sm font-medium text-garapin-orange hover:text-garapin-orange-light transition-colors group"
                  >
                    {dict.read_more} <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}