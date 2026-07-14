"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Monitor,
  Layout,
  ShoppingCart,
  BarChart3,
  Building2,
  Users,
  Check,
  ChevronDown,
  ArrowRight,
  Star,
  Code2,
  Palette,
  Search,
  Rocket,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/types/dictionary";
import { portfolioItems } from "@/data/portfolio";

interface HomeClientProps {
  dict: Dictionary;
  lang: string;
}

const serviceIcons: Record<string, React.ReactNode> = {
  company_profile: <Building2 size={24} />,
  landing_page: <Layout size={24} />,
  ecommerce: <ShoppingCart size={24} />,
  dashboard: <BarChart3 size={24} />,
  erp: <Monitor size={24} />,
  crm: <Users size={24} />,
};

const workflowIcons: Record<string, React.ReactNode> = {
  consultation: <Users size={20} />,
  research: <Search size={20} />,
  design: <Palette size={20} />,
  development: <Code2 size={20} />,
  testing: <Shield size={20} />,
  launch: <Rocket size={20} />,
  support: <Star size={20} />,
};

const staggerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const SectionHeading = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    variants={fadeInUp}
    className="text-center max-w-2xl mx-auto mb-16"
  >
    <h2 className="text-3xl sm:text-4xl font-bold text-garapin-navy mb-4">
      {title}
    </h2>
    <p className="text-garapin-gray text-lg">{subtitle}</p>
  </motion.div>
);

function HeroSection({ dict }: { dict: Dictionary["hero"] }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-garapin-navy via-garapin-dark to-garapin-navy">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-garapin-orange/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-garapin-orange/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-garapin-orange/5 to-transparent" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-garapin-orange/10 text-garapin-orange border border-garapin-orange/20 mb-6">
              {dict.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {dict.title}
            </h1>
            <p className="text-lg text-garapin-light leading-relaxed mb-8 max-w-xl">
              {dict.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#contact">
                <Button variant="primary" size="lg">
                  {dict.cta_primary}
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              <Link href="#portfolio">
                <Button variant="white" size="lg">
                  {dict.cta_secondary}
                </Button>
              </Link>
            </div>

            <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
              {[
                { value: "50+", label: dict.stats_clients },
                { value: "100+", label: dict.stats_projects },
                { value: "5+", label: dict.stats_years },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-garapin-light">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-3/4 bg-white/10 rounded" />
                  <div className="h-4 w-1/2 bg-white/10 rounded" />
                  <div className="h-32 bg-white/5 rounded-lg mt-4" />
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="h-20 bg-white/5 rounded-lg" />
                    <div className="h-20 bg-white/5 rounded-lg" />
                    <div className="h-20 bg-white/5 rounded-lg" />
                  </div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-garapin-orange/20 to-transparent rounded-2xl blur-xl -z-10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ dict }: { dict: Dictionary["services"] }) {
  return (
    <section id="services" className="py-24 bg-garapin-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={dict.title} subtitle={dict.subtitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(dict.items).map(([key, service], i) => (
            <motion.div
              key={key}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerVariants}
              className="group bg-white rounded-2xl p-6 border border-garapin-border hover:border-garapin-orange/30 transition-all duration-300 hover:shadow-xl hover:shadow-garapin-orange/5"
            >
              <div className="w-12 h-12 rounded-xl bg-garapin-orange-muted text-garapin-orange flex items-center justify-center mb-4 group-hover:bg-garapin-orange group-hover:text-white transition-all duration-300">
                {serviceIcons[key]}
              </div>
              <h3 className="text-lg font-semibold text-garapin-navy mb-2">{service.title}</h3>
              <p className="text-garapin-gray text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowSection({ dict }: { dict: Dictionary["workflow"] }) {
  const steps = Object.entries(dict.steps);
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={dict.title} subtitle={dict.subtitle} />
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-garapin-orange via-garapin-orange/50 to-transparent hidden lg:block" />
          <div className="space-y-12 lg:space-y-0">
            {steps.map(([key, step], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1 }}
                className="relative flex items-start gap-6 lg:gap-0 lg:even:flex-row-reverse"
              >
                <div className="hidden lg:flex w-1/2 items-center justify-center">
                  <div className="lg:mx-auto lg:max-w-sm">
                    {i % 2 === 0 ? (
                      <div className="pr-12">
                        <h3 className="text-xl font-semibold text-garapin-navy mb-2">{step.title}</h3>
                        <p className="text-garapin-gray">{step.desc}</p>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>

                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-garapin-orange-muted border-4 border-white shadow-md flex items-center justify-center text-garapin-orange">
                    {workflowIcons[key]}
                  </div>
                </div>

                <div className="flex-1 lg:hidden">
                  <h3 className="text-xl font-semibold text-garapin-navy mb-2">{step.title}</h3>
                  <p className="text-garapin-gray">{step.desc}</p>
                </div>

                <div className="hidden lg:flex w-1/2 items-center">
                  <div className="max-w-sm">
                    {i % 2 !== 0 && (
                      <div className="pl-12">
                        <h3 className="text-xl font-semibold text-garapin-navy mb-2">{step.title}</h3>
                        <p className="text-garapin-gray">{step.desc}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioSection({ dict }: { dict: Dictionary["portfolio"] }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { key: "all", label: dict.all },
    ...Object.entries(dict.categories).map(([key, label]) => ({
      key,
      label,
    })),
  ];

  const filtered =
    activeCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-garapin-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={dict.title} subtitle={dict.subtitle} />

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
              <div className="aspect-video bg-gradient-to-br from-garapin-dark to-garapin-navy flex items-center justify-center relative overflow-hidden">
                <Monitor size={48} className="text-white/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-garapin-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
  );
}

function PricingSection({ dict }: { dict: Dictionary["pricing"] }) {
  const tiers = [
    { key: "starter" as const, data: dict.starter, highlighted: false },
    { key: "profesional" as const, data: dict.profesional, highlighted: true },
    { key: "premium" as const, data: dict.premium, highlighted: false },
  ];

  const featureKeys = ["pages", "language", "cms", "database", "seo", "revision", "support"] as const;

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={dict.title} subtitle={dict.subtitle} />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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

              <Button variant={tier.highlighted ? "primary" : "outline"} size="md" className="w-full">
                {dict.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-garapin-gray mt-8">{dict.note}</p>
      </div>
    </section>
  );
}

function TestimonialsSection({ dict }: { dict: Dictionary["testimonials"] }) {
  const testimonials = [
    {
      name: "Ahmad R.",
      role: "Owner, PT Maju Jaya",
      content: "Garapin.id delivered beyond our expectations. The website is fast, beautiful, and our clients love it.",
      rating: 5,
    },
    {
      name: "Siti N.",
      role: "Marketing Manager",
      content: "Professional from start to finish. They understood our needs and delivered a product that truly represents our brand.",
      rating: 5,
    },
    {
      name: "Bambang S.",
      role: "School Principal",
      content: "The school information system they built has transformed how we manage data. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-garapin-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={dict.title} subtitle={dict.subtitle} />
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-garapin-border"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-garapin-slate text-sm leading-relaxed mb-4">&ldquo;{t.content}&rdquo;</p>
              <div>
                <div className="font-semibold text-garapin-navy text-sm">{t.name}</div>
                <div className="text-garapin-gray text-xs">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ dict }: { dict: Dictionary["faq"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={dict.title} subtitle={dict.subtitle} />
        <div className="space-y-3">
          {dict.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border border-garapin-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-garapin-bg transition-colors"
              >
                <span className="font-medium text-garapin-navy text-sm">{item.q}</span>
                <ChevronDown
                  size={16}
                  className={cn("text-garapin-gray transition-transform shrink-0 ml-4", openIndex === i && "rotate-180")}
                />
              </button>
              <div className={cn("overflow-hidden transition-all duration-200", openIndex === i ? "max-h-96" : "max-h-0")}>
                <p className="p-4 pt-0 text-sm text-garapin-gray leading-relaxed">{item.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ dict, lang }: { dict: Dictionary["cta_section"]; lang: string }) {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-garapin-navy to-garapin-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-garapin-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-garapin-orange/5 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{dict.title}</h2>
          <p className="text-garapin-light text-lg mb-8">{dict.subtitle}</p>
          <Link href={`/${lang}/contact`}>
            <Button variant="primary" size="xl">
              {dict.button}
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export function HomeClient({ dict, lang }: HomeClientProps) {
  return (
    <>
      <HeroSection dict={dict.hero} />
      <ServicesSection dict={dict.services} />
      <WorkflowSection dict={dict.workflow} />
      <PortfolioSection dict={dict.portfolio} />
      <PricingSection dict={dict.pricing} />
      <TestimonialsSection dict={dict.testimonials} />
      <FAQSection dict={dict.faq} />
      <CTASection dict={dict.cta_section} lang={lang} />
    </>
  );
}