"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-garapin-navy">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1, 0.9] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/icon-192.png"
          alt="Garapin.id"
          width={96}
          height={96}
          className="h-24 w-24"
          priority
        />
      </motion.div>
    </div>
  );
}