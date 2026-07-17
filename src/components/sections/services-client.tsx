"use client";

import { motion } from "framer-motion";
import { Building2, Layout, ShoppingCart, BarChart3, Monitor, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/types/dictionary";

interface ServicesClientProps {
  dict: Dictionary["services"];
  lang: string;
}

const icons: Record<string, React.ReactNode> = {
  company_profile: <Building2 size={32} />,
  landing_page: <Layout size={32} />,
  ecommerce: <ShoppingCart size={32} />,
  dashboard: <BarChart3 size={32} />,
  erp: <Monitor size={32} />,
  crm: <Users size={32} />,
};

export function ServicesClient({ dict, lang }: ServicesClientProps) {
  const services = Object.entries(dict.items);

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(([key, service], i) => (
              <motion.div
                key={key}
                id={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-garapin-bg rounded-2xl p-8 border border-garapin-border hover:border-garapin-orange/30 transition-all duration-300 scroll-mt-24"
              >
                <div className="w-16 h-16 rounded-2xl bg-garapin-orange-muted text-garapin-orange flex items-center justify-center mb-6 group-hover:bg-garapin-orange group-hover:text-white transition-all duration-300">
                  {icons[key]}
                </div>
                <h3 className="text-xl font-semibold text-garapin-navy mb-3">{service.title}</h3>
                <p className="text-garapin-gray leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-garapin-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-garapin-navy mb-4">
            {lang === "id" ? "Tidak yakin layanan mana yang tepat?" : "Not sure which service is right for you?"}
          </h2>
          <p className="text-garapin-gray text-lg mb-8">
            {lang === "id"
              ? "Konsultasi gratis dengan tim kami untuk mendiskusikan kebutuhan website Anda."
              : "Get a free consultation with our team to discuss your website requirements."}
          </p>
          <Button asChild variant="primary" size="lg">
            <Link href={`/${lang}/contact`}>
              {lang === "id" ? "Konsultasi Gratis" : "Free Consultation"} <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}