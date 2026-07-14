"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/types/dictionary";

interface NavbarProps {
  dict: Dictionary["nav"];
  lang: string;
}

const navLinks = [
  { key: "home", href: "" },
  { key: "about", href: "about" },
  { key: "services", href: "services" },
  { key: "portfolio", href: "portfolio" },
  { key: "pricing", href: "pricing" },
  { key: "blog", href: "blog" },
  { key: "contact", href: "contact" },
] as const;

export function Navbar({ dict, lang }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-garapin-border"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2 group"
          >
            <Image
              src="/garapin-logo-transparent.png"
              alt="Garapin.id"
              width={120}
              height={32}
              priority
              className="h-8 w-auto lg:h-10"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                href={`/${lang}/${href}`}
                className="text-sm font-medium text-garapin-slate hover:text-garapin-orange transition-colors"
              >
                {dict[key as keyof typeof dict]}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher currentLocale={lang} />
            <Link href={`/${lang}/contact`}>
              <Button variant="primary" size="sm">
                {dict.cta}
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-garapin-navy"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-garapin-border overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map(({ key, href }) => (
                <Link
                  key={key}
                  href={`/${lang}/${href}`}
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-base font-medium text-garapin-slate hover:text-garapin-orange transition-colors py-2"
                >
                  {dict[key as keyof typeof dict]}
                </Link>
              ))}
              <div className="pt-4 border-t border-garapin-border">
                <LanguageSwitcher currentLocale={lang} />
              </div>
              <Link href={`/${lang}/contact`} onClick={() => setIsMobileOpen(false)}>
                <Button variant="primary" size="md" className="w-full">
                  {dict.cta}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}