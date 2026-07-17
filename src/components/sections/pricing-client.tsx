"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/types/dictionary";

interface PricingClientProps {
  dict: Dictionary["pricing"];
  lang: string;
}

export function PricingClient({ dict, lang }: PricingClientProps) {
  const tiers = [
    { key: "starter" as const, data: dict.starter, highlighted: false },
    { key: "profesional" as const, data: dict.profesional, highlighted: true },
    { key: "premium" as const, data: dict.premium, highlighted: false },
  ];

  const featureKeys = ["pages", "language", "cms", "database", "seo", "revision", "support"] as const;

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

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "relative rounded-2xl p-8 border-2 transition-all duration-300",
                  tier.highlighted
                    ? "border-garapin-orange bg-gradient-to-b from-garapin-orange-muted to-white shadow-xl shadow-garapin-orange/10 scale-105"
                    : "border-garapin-border bg-white hover:border-garapin-orange/30"
                )}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-garapin-orange text-white text-xs font-semibold rounded-full">
                    {dict.recommended}
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-garapin-navy mb-2">{tier.data.name}</h3>
                  <div className="text-3xl font-bold text-garapin-navy mb-2">{tier.data.price}</div>
                  <p className="text-sm text-garapin-gray">{tier.data.desc}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {featureKeys.map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <Check size={16} className="text-garapin-orange shrink-0 mt-0.5" />
                      <span className="text-sm text-garapin-slate">{tier.data.features[key]}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/${lang}/contact`}>
                  <Button variant={tier.highlighted ? "primary" : "outline"} size="md" className="w-full">
                    {dict.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-garapin-gray mt-8">{dict.note}</p>
        </div>
      </section>

      <section className="py-24 bg-garapin-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-garapin-navy mb-4">
            {lang === "id" ? "Butuh Paket Custom?" : "Need a Custom Plan?"}
          </h2>
          <p className="text-garapin-gray text-lg mb-8">
            {lang === "id"
              ? "Setiap bisnis memiliki kebutuhan unik. Hubungi kami untuk solusi yang disesuaikan dengan anggaran dan kebutuhan Anda."
              : "Every business is unique. Contact us for a tailored solution that fits your specific needs and budget."}
          </p>
          <Link href={`/${lang}/contact`}>
            <Button variant="primary" size="lg">
              {lang === "id" ? "Hubungi Kami" : "Contact Us"} <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}