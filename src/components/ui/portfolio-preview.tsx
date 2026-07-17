"use client";

import { ShoppingCart } from "lucide-react";

interface PortfolioPreviewProps {
  category: string;
  lang: string;
}

export function PortfolioPreview({ category, lang }: PortfolioPreviewProps) {
  return (
    <div className="w-full h-full relative overflow-hidden select-none bg-garapin-navy flex flex-col justify-between p-3 text-[10px] text-white">
      {/* Dynamic background gradient based on category */}
      <div className="absolute inset-0 bg-gradient-to-br from-garapin-navy via-slate-900 to-garapin-navy opacity-90" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Concept Badge */}
      <span className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[8px] font-bold text-white/95 border border-white/10 uppercase tracking-wider">
        {lang === "id" ? "Contoh Konsep" : "Concept Design"}
      </span>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-garapin-orange" />
          <span className="font-bold tracking-wider text-[8px] uppercase text-white/80">
            {category === "company" && "CorpProfile v2.0"}
            {category === "landing" && "Campaign Page"}
            {category === "ecommerce" && "NusantaraStore"}
            {category === "dashboard" && "EduTrack v1.0"}
            {category === "system" && "SiakadPlus DB"}
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-6 h-1.5 rounded-full bg-white/10" />
          <div className="w-3 h-1.5 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Dynamic content depending on category */}
      <div className="relative z-10 flex-1 flex flex-col justify-center my-3">
        {category === "company" && (
          <div className="space-y-2">
            <div className="w-4/5 h-3 bg-gradient-to-r from-garapin-orange to-amber-500 rounded" />
            <div className="w-3/5 h-2 bg-white/10 rounded" />
            <div className="w-2/5 h-2 bg-white/15 rounded" />
            <div className="grid grid-cols-3 gap-1 pt-2">
              <div className="h-6 rounded bg-white/5 border border-white/5" />
              <div className="h-6 rounded bg-white/5 border border-white/5" />
              <div className="h-6 rounded bg-white/5 border border-white/5" />
            </div>
          </div>
        )}

        {category === "landing" && (
          <div className="flex flex-col items-center text-center space-y-2">
            <span className="px-1.5 py-0.5 rounded bg-garapin-orange/20 text-garapin-orange border border-garapin-orange/20 text-[7px] uppercase font-bold tracking-widest">
              Live Now
            </span>
            <div className="w-11/12 h-4 bg-gradient-to-r from-white via-white/85 to-white/60 rounded font-black text-center text-[7px] text-garapin-navy flex items-center justify-center">
              CONVERSION BOOST
            </div>
            <div className="w-16 h-3 rounded-full bg-garapin-orange hover:bg-garapin-orange-light shadow shadow-garapin-orange/20 flex items-center justify-center text-[7px] font-bold">
              Get Started
            </div>
          </div>
        )}

        {category === "ecommerce" && (
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded bg-white/5 border border-white/10 flex flex-col justify-between h-14">
              <div className="w-full h-7 rounded bg-white/10 flex items-center justify-center">
                <ShoppingCart size={16} className="text-white/20" />
              </div>
              <div className="h-2 w-full bg-white/20 rounded mt-1" />
              <div className="h-2 w-1/2 bg-garapin-orange rounded mt-0.5" />
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/10 flex flex-col justify-between h-14">
              <div className="w-full h-7 rounded bg-white/10 flex items-center justify-center">
                <ShoppingCart size={16} className="text-white/20" />
              </div>
              <div className="h-2 w-full bg-white/20 rounded mt-1" />
              <div className="h-2 w-1/2 bg-garapin-orange rounded mt-0.5" />
            </div>
          </div>
        )}

        {category === "dashboard" && (
          <div className="flex gap-3 items-center justify-between">
            {/* Left chart */}
            <div className="flex-1 flex flex-col gap-1">
              <div className="h-2 w-full bg-white/15 rounded" />
              <div className="h-8 w-full bg-white/5 border border-white/10 rounded p-1 flex items-end gap-0.5 justify-around">
                <div className="w-1.5 h-1/3 bg-garapin-orange rounded-t-sm animate-pulse" />
                <div className="w-1.5 h-1/2 bg-white/30 rounded-t-sm" />
                <div className="w-1.5 h-3/4 bg-garapin-orange rounded-t-sm" />
                <div className="w-1.5 h-1/4 bg-white/20 rounded-t-sm" />
              </div>
            </div>
            {/* Right radial gauge */}
            <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-garapin-orange flex items-center justify-center shrink-0">
              <span className="text-[8px] font-bold">84%</span>
            </div>
          </div>
        )}

        {category === "system" && (
          <div className="space-y-1">
            <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded border border-white/5">
              <span>Database</span>
              <span className="text-emerald-400">Connected</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded border border-white/5">
              <span>SSL Certificate</span>
              <span className="text-emerald-400">Active</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded border border-white/5">
              <span>API Status</span>
              <span className="text-amber-400">99.9% Uptime</span>
            </div>
          </div>
        )}
      </div>

      {/* Conceptualized footer */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-2 text-[7px] text-white/40">
        <span>Conceptualized by Garapin.id</span>
        <span className="px-1.5 py-0.2 rounded bg-white/10 text-white/60">Concept</span>
      </div>
    </div>
  );
}
