"use client";

import { Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-garapin-navy">Manajemen Blog</h2>
          <p className="text-garapin-gray text-sm mt-1">Kelola artikel dan berita untuk pengunjung website.</p>
        </div>
        <Button variant="primary">
          <Plus size={16} className="mr-2" />
          Tulis Artikel Baru
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-garapin-border shadow-sm overflow-hidden p-12 text-center text-garapin-gray">
        <div className="w-16 h-16 bg-garapin-bg rounded-full flex items-center justify-center mx-auto mb-4">
          <Edit2 size={24} className="text-garapin-orange" />
        </div>
        <h3 className="text-lg font-semibold text-garapin-navy mb-2">Belum Ada Artikel</h3>
        <p className="text-sm max-w-md mx-auto">Anda belum menulis artikel apapun. Artikel yang Anda tulis akan muncul di sini dan dapat dibaca oleh pengunjung website Anda.</p>
        <Button variant="outline" className="mt-6">Mulai Menulis</Button>
      </div>
    </div>
  );
}
