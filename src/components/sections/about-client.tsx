"use client";

import { motion } from "framer-motion";
import { Target, Eye, Shield, Lightbulb, Heart, Zap } from "lucide-react";
import type { Dictionary } from "@/types/dictionary";

interface AboutClientProps {
  dict: Dictionary["about"];
  lang: string;
}

const valueIcons: Record<string, React.ReactNode> = {
  quality: <Shield size={24} />,
  integrity: <Heart size={24} />,
  innovation: <Lightbulb size={24} />,
  support: <Zap size={24} />,
};

export function AboutClient({ dict }: AboutClientProps) {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-garapin-navy to-garapin-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            {dict.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-garapin-light"
          >
            {dict.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-garapin-navy mb-6">{dict.story_title}</h2>
            {dict.story.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-garapin-slate leading-relaxed mb-4 text-lg">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-garapin-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-garapin-border"
            >
              <Eye size={32} className="text-garapin-orange mb-4" />
              <h3 className="text-2xl font-bold text-garapin-navy mb-4">{dict.vision_title} - Visi</h3>
              <p className="text-garapin-slate leading-relaxed">{dict.vision}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-garapin-border"
            >
              <Target size={32} className="text-garapin-orange mb-4" />
              <h3 className="text-2xl font-bold text-garapin-navy mb-4">{dict.vision_title} - Misi</h3>
              <p className="text-garapin-slate leading-relaxed">{dict.mission}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-garapin-navy text-center mb-16"
          >
            {dict.values_title}
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(dict.values).map(([key, value], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-garapin-bg border border-garapin-border"
              >
                <div className="w-14 h-14 rounded-full bg-garapin-orange-muted text-garapin-orange flex items-center justify-center mx-auto mb-4">
                  {valueIcons[key]}
                </div>
                <h3 className="text-lg font-semibold text-garapin-navy mb-2">{value.title}</h3>
                <p className="text-sm text-garapin-gray leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 bg-garapin-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-24 h-24 rounded-full bg-garapin-orange flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-white">MH</span>
            </div>
            <h3 className="text-2xl font-bold text-garapin-navy mb-2">{dict.founder_name}</h3>
            <p className="text-garapin-orange font-medium mb-4">{dict.founder_role}</p>
            <p className="text-garapin-slate leading-relaxed max-w-2xl mx-auto">
              {dict.founder_desc}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}