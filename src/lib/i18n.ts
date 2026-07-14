import type { Dictionary } from "@/types/dictionary";

const dictionaries = {
  en: () => import("@/data/dictionaries/en.json").then((module) => module.default) as Promise<Dictionary>,
  id: () => import("@/data/dictionaries/id.json").then((module) => module.default) as Promise<Dictionary>,
};

export type Locale = keyof typeof dictionaries;

export const locales = ["en", "id"] as const;
export const defaultLocale: Locale = "id";

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();