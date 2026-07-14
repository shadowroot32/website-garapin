"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const params = useParams();
  const lang = (params?.lang as string) || "id";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-garapin-navy to-garapin-dark">
      <div className="text-center px-4">
        <h1 className="text-8xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-2">Halaman Tidak Ditemukan</h2>
        <p className="text-garapin-light mb-8 max-w-md mx-auto">
          Halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        <Link href={`/${lang}`}>
          <Button variant="primary" size="lg">
            <ArrowLeft className="mr-2" size={18} />
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  );
}