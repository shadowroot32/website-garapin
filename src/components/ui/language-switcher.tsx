"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { locales, type Locale } from "@/lib/i18n";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  currentLocale: string;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = useCallback(
    (newLocale: string) => {
      const segments = pathname.split("/");
      segments[1] = newLocale;
      const newPath = segments.join("/") || "/";
      router.push(newPath);
    },
    [pathname, router]
  );

  return (
    <div className="flex items-center gap-1.5">
      <Globe className="w-4 h-4 text-garapin-gray" />
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          <button
            onClick={() => switchLanguage(locale)}
            className={cn(
              "text-sm font-medium transition-colors hover:text-garapin-orange",
              currentLocale === locale
                ? "text-garapin-orange"
                : "text-garapin-gray"
            )}
          >
            {locale.toUpperCase()}
          </button>
          {index < locales.length - 1 && (
            <span className="mx-1 text-garapin-border">|</span>
          )}
        </span>
      ))}
    </div>
  );
}