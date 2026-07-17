"use client";

import { useState, useEffect } from "react";
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
  Globe,
  Megaphone,
  GraduationCap,
  HeartPulse,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/types/dictionary";
import { getPortfolios, PortfolioItem } from "@/lib/firebase/portfolio-service";
import { PortfolioPreview } from "@/components/ui/portfolio-preview";

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

function HeroSection({ dict, lang }: { dict: Dictionary["hero"]; lang: string }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-garapin-navy via-garapin-dark to-garapin-navy">
      <div className="absolute inset-0 overflow-hidden grid-pattern-dark opacity-30" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-garapin-orange/15 rounded-full blur-3xl animate-pulse duration-[8000ms]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-garapin-orange/10 rounded-full blur-3xl animate-pulse duration-[10000ms]" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-gradient-to-r from-garapin-orange/20 to-garapin-orange/5 text-garapin-orange border border-garapin-orange/30 shadow-lg shadow-garapin-orange/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-garapin-orange mr-2 animate-pulse" />
              {dict.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              {dict.title.split(' ').map((word, i, arr) => 
                (i >= arr.length - 2) ? <span key={i} className="text-gradient"> {word}</span> : <span key={i}> {word}</span>
              )}
            </h1>
            <p className="text-lg sm:text-xl text-garapin-light leading-relaxed mb-10 max-w-xl font-medium">
              {dict.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="primary" size="lg">
                <Link href="#contact">
                  {dict.cta_primary}
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
              <Button asChild variant="white" size="lg">
                <Link href="#portfolio">
                  {dict.cta_secondary}
                </Link>
              </Button>
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
            className="hidden lg:block relative"
          >
            {/* Floating Badge 1 */}
            <motion.div 
              className="absolute -left-12 top-1/4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl z-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Shield size={20} />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Aman & Cepat</div>
                  <div className="text-white/60 text-xs">Uptime 99.9%</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Badge 2 */}
            <motion.div 
              className="absolute -right-8 bottom-1/3 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl z-20"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-garapin-orange/20 flex items-center justify-center text-garapin-orange">
                  <Star size={20} className="fill-garapin-orange" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Top Rated</div>
                  <div className="text-white/60 text-xs">Desain Premium</div>
                </div>
              </div>
            </motion.div>

            <div className="relative z-10">
              <div className="relative glass-panel-dark rounded-xl shadow-2xl overflow-hidden border border-white/10">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-950/80 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <div className="ml-4 flex-1 max-w-md h-6 rounded-md bg-white/5 border border-white/10 flex items-center px-3">
                    <span className="text-[10px] text-white/40 tracking-wider">garapin.id/builder</span>
                  </div>
                </div>
                {/* Mockup content */}
                <div className="p-6 bg-slate-900/50 text-white relative">
                  <div className="absolute inset-0 grid-pattern opacity-5" />
                  
                  {/* Navbar mockup */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-garapin-orange flex items-center justify-center text-[10px] font-black text-white">G</div>
                      <div className="h-3 w-16 bg-white/10 rounded animate-pulse" />
                    </div>
                    <div className="flex gap-4">
                      <div className="h-2 w-8 bg-white/5 rounded" />
                      <div className="h-2 w-8 bg-white/5 rounded" />
                      <div className="h-2 w-8 bg-white/5 rounded" />
                    </div>
                  </div>
                  
                  {/* Hero section mockup */}
                  <div className="mb-6 relative z-10">
                    <div className="h-3 w-20 bg-garapin-orange/20 text-garapin-orange border border-garapin-orange/30 rounded-full mb-3 text-[8px] flex items-center justify-center font-bold">
                      PROJEK TERBARU
                    </div>
                    <div className="h-5 w-4/5 bg-gradient-to-r from-white to-white/60 rounded mb-2" />
                    <div className="h-5 w-3/5 bg-gradient-to-r from-white to-white/60 rounded mb-4" />
                    <div className="space-y-1.5 mb-4">
                      <div className="h-2.5 w-full bg-white/5 rounded" />
                      <div className="h-2.5 w-11/12 bg-white/5 rounded" />
                    </div>
                  </div>
                  
                  {/* Live Stats Graph Mockup */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 relative z-10 mb-2">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-bold text-white/80">Analitik Konversi</span>
                      <span className="text-[9px] text-emerald-400 font-bold">+28.4%</span>
                    </div>
                    <div className="h-16 w-full flex items-end gap-1.5 justify-between pt-2">
                      <div className="w-full h-[30%] bg-white/10 rounded-t-sm" />
                      <div className="w-full h-[45%] bg-white/15 rounded-t-sm" />
                      <div className="w-full h-[60%] bg-white/10 rounded-t-sm" />
                      <div className="w-full h-[55%] bg-white/15 rounded-t-sm" />
                      <div className="w-full h-[75%] bg-garapin-orange/60 rounded-t-sm" />
                      <div className="w-full h-[90%] bg-garapin-orange rounded-t-sm shadow-lg shadow-garapin-orange/50 animate-pulse" />
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-garapin-orange/20 to-transparent rounded-xl blur-xl -z-10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrustMarqueeSection() {
  const logos = [
    "TechCorp Indonesia", "Global Exim", "Kopi Nusantara", 
    "Sinar Jaya Logistics", "Agro Makmur", "Digital Kreatif", 
    "Mandiri Solusi", "EduTech Bina", "Sentosa E-Commerce"
  ];
  return (
    <section className="py-12 bg-white border-b border-garapin-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-sm font-semibold text-garapin-gray uppercase tracking-widest">
          Dipercaya oleh 50+ UMKM & Perusahaan di Seluruh Indonesia
        </p>
      </div>
      <div className="relative flex overflow-hidden group">
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />
        
        <div className="flex space-x-8 animate-marquee group-hover:[animation-play-state:paused] w-max">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex items-center justify-center px-8 py-4 bg-garapin-bg/50 rounded-2xl border border-garapin-border/60 hover:border-garapin-orange/30 hover:shadow-md transition-all duration-300 min-w-[200px]">
              <span className="font-bold text-lg text-garapin-slate/80 font-heading tracking-tight">{logo}</span>
            </div>
          ))}
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={dict.title} subtitle={dict.subtitle} />
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-garapin-orange via-garapin-orange/50 to-transparent" />
          <div className="space-y-10">
            {steps.map(([key, step], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1 }}
                className="relative flex items-start gap-6 pl-0"
              >
                {/* Circle connector */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-garapin-orange-muted border-4 border-white shadow-md flex items-center justify-center text-garapin-orange">
                    {workflowIcons[key]}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-3">
                  <h3 className="text-xl font-semibold text-garapin-navy mb-2">{step.title}</h3>
                  <p className="text-garapin-gray">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioSection({ dict, lang }: { dict: Dictionary["portfolio"]; lang: string }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getPortfolios();
        setPortfolioItems(data);
      } catch (err) {
        console.error("Gagal mengambil data portfolio", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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
  );
}

function PricingSection({ dict }: { dict: Dictionary["pricing"] }) {
  const [prices, setPrices] = useState({
    starter: dict.starter.price,
    profesional: dict.profesional.price,
    premium: dict.premium.price
  });

  useEffect(() => {
    import("@/lib/firebase/settings-service").then(({ getSettings }) => {
      getSettings().then(settings => {
        if (settings) {
          setPrices({
            starter: settings.priceStarter || dict.starter.price,
            profesional: settings.priceProfesional || dict.profesional.price,
            premium: settings.pricePremium || dict.premium.price
          });
        }
      });
    });
  }, [dict]);

  const tiers = [
    { key: "starter" as const, data: { ...dict.starter, price: prices.starter }, highlighted: false },
    { key: "profesional" as const, data: { ...dict.profesional, price: prices.profesional }, highlighted: true },
    { key: "premium" as const, data: { ...dict.premium, price: prices.premium }, highlighted: false },
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

              <Button asChild variant={tier.highlighted ? "primary" : "outline"} size="md" className="w-full">
                <Link href="#contact">
                  {dict.cta}
                </Link>
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
              className="relative p-8 rounded-3xl bg-white hover:bg-garapin-bg/50 border border-garapin-border hover:border-garapin-orange/30 hover:shadow-2xl hover:shadow-garapin-orange/10 transition-all duration-300 group"
            >
              <div className="absolute top-8 right-8 text-garapin-border/50 group-hover:text-garapin-orange/20 transition-colors">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={18} className="fill-garapin-warning text-garapin-warning" />
                ))}
              </div>
              <p className="text-garapin-slate text-base sm:text-lg font-medium leading-relaxed mb-8 relative z-10">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-garapin-navy to-garapin-slate flex items-center justify-center text-white font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-garapin-navy text-sm">{t.name}</div>
                  <div className="text-garapin-gray text-xs mt-0.5">{t.role}</div>
                </div>
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
              className={cn(
                "border rounded-xl overflow-hidden transition-all duration-300",
                openIndex === i 
                  ? "border-garapin-orange/30 bg-white shadow-lg shadow-garapin-orange/5" 
                  : "border-garapin-border bg-white hover:border-garapin-orange/20 hover:shadow-md"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors"
              >
                <span className={cn(
                  "font-semibold text-base transition-colors",
                  openIndex === i ? "text-garapin-orange" : "text-garapin-navy"
                )}>
                  {item.q}
                </span>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-4 transition-all duration-300",
                  openIndex === i ? "bg-garapin-orange text-white" : "bg-garapin-bg text-garapin-gray"
                )}>
                  <ChevronDown
                    size={16}
                    className={cn("transition-transform duration-300", openIndex === i && "rotate-180")}
                  />
                </div>
              </button>
              <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
                <p className="p-5 pt-0 text-sm sm:text-base text-garapin-gray leading-relaxed border-t border-garapin-border/50 mx-5">{item.a}</p>
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
          <Button asChild variant="primary" size="xl">
            <Link href={`/${lang}/contact`}>
              {dict.button}
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export function HomeClient({ dict, lang }: HomeClientProps) {
  return (
    <>
      <HeroSection dict={dict.hero} lang={lang} />
      <TrustMarqueeSection />
      <ServicesSection dict={dict.services} />
      <WorkflowSection dict={dict.workflow} />
      <PortfolioSection dict={dict.portfolio} lang={lang} />
      <PricingSection dict={dict.pricing} />
      <TestimonialsSection dict={dict.testimonials} />
      <FAQSection dict={dict.faq} />
      <CTASection dict={dict.cta_section} lang={lang} />
    </>
  );
}