import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/types/dictionary";

interface FooterProps {
  dict: Dictionary["footer"];
  lang: string;
  servicesDict?: {
    items: Record<string, { title: string; desc: string }>;
  };
}

const serviceLinks = [
  { key: "company_profile", href: "services" },
  { key: "landing_page", href: "services" },
  { key: "ecommerce", href: "services" },
  { key: "dashboard", href: "services" },
];

const quickLinks = [
  { key: "about", href: "about" },
  { key: "portfolio", href: "portfolio" },
  { key: "pricing", href: "pricing" },
  { key: "blog", href: "blog" },
  { key: "contact", href: "contact" },
];

export function Footer({ dict, lang, servicesDict }: FooterProps) {
  return (
    <footer className="bg-garapin-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href={`/${lang}`} className="flex items-center gap-2">
              <Image
                src="/icon-192.png"
                alt="Garapin.id"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-xl font-bold">
                Garapin<span className="text-garapin-orange">.id</span>
              </span>
            </Link>
            <p className="text-garapin-light text-sm leading-relaxed">
              {dict.description}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-garapin-orange mb-4">
              {dict.services_title}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map(({ key }) => (
                <li key={key}>
                  <Link
                    href={`/${lang}/services#${key}`}
                    className="text-garapin-light hover:text-white transition-colors text-sm flex items-center gap-1 group"
                  >
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>
                      {servicesDict?.items[key]?.title || key.replace("_", " ")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-garapin-orange mb-4">
              {dict.quick_links}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={`/${lang}/${href}`}
                    className="text-garapin-light hover:text-white transition-colors text-sm flex items-center gap-1 group"
                  >
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{dict[key as keyof typeof dict]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-garapin-orange mb-4">
              {dict.contact_title}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`https://wa.me/6285283868884`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-garapin-light hover:text-white transition-colors group"
                >
                  <Phone size={16} className="text-garapin-orange shrink-0" />
                  <span className="text-sm">{dict.contact_wa}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:hello@garapin.id`}
                  className="flex items-center gap-3 text-garapin-light hover:text-white transition-colors group"
                >
                  <Mail size={16} className="text-garapin-orange shrink-0" />
                  <span className="text-sm">hello@garapin.id</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-garapin-light">
                <MapPin size={16} className="text-garapin-orange shrink-0" />
                <span className="text-sm">Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-garapin-light text-sm">
            {dict.copyright}
          </p>
          <p className="text-garapin-light text-sm flex items-center gap-1">
            {dict.made_with} ❤️ {dict.in_indonesia}
          </p>
        </div>
      </div>
    </footer>
  );
}