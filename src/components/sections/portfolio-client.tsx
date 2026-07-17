"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/types/dictionary";
import { portfolioItems } from "@/data/portfolio";
import { PortfolioPreview } from "@/components/ui/portfolio-preview";

interface PortfolioClientProps {
  dict: Dictionary["portfolio"];
  lang: string;
}

export function PortfolioClient({ dict, lang }: PortfolioClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { key: "all", label: dict.all },
    ...Object.entries(dict.categories).map(([key, label]) => ({ key, label })),
  ];

  const filtered = activeCategory === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === activeCategory);

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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white rounded-2xl overflow-hidden border border-garapin-border hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video relative overflow-hidden">
                  <PortfolioPreview category={item.category} lang={lang} />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-garapin-orange uppercase tracking-wider">
                    {dict.categories[item.category as keyof typeof dict.categories]}
                  </span>
                  <h3 className="text-base font-semibold text-garapin-navy mt-1 mb-2">{item.title}</h3>
                  <p className="text-sm text-garapin-gray line-clamp-2">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-garapin-bg rounded-md text-xs text-garapin-slate">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}