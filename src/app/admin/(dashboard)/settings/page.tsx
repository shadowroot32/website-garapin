"use client";

import { Save, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-garapin-navy">Pengaturan</h2>
        <p className="text-garapin-gray text-sm mt-1">Konfigurasi dasar website dan akun Anda.</p>
      </div>

      <div className="bg-white rounded-2xl border border-garapin-border shadow-sm p-6 sm:p-8 space-y-8">
        {/* Section: Akun */}
        <div>
          <h3 className="text-lg font-semibold text-garapin-navy flex items-center gap-2 mb-4">
            <User size={18} className="text-garapin-orange" />
            Pengaturan Akun Admin
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-garapin-navy mb-1.5">Nama Lengkap</label>
              <input type="text" defaultValue="Admin Garapin" className="w-full px-4 py-2 border border-garapin-border rounded-lg text-sm bg-garapin-bg/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-garapin-navy mb-1.5">Email Akses</label>
              <input type="email" disabled defaultValue="admin@garapin.id" className="w-full px-4 py-2 border border-garapin-border rounded-lg text-sm bg-gray-100 text-gray-500 cursor-not-allowed" />
            </div>
          </div>
        </div>

        <hr className="border-garapin-border" />

        {/* Section: Website */}
        <div>
          <h3 className="text-lg font-semibold text-garapin-navy flex items-center gap-2 mb-4">
            <Shield size={18} className="text-garapin-orange" />
            Informasi Website Utama
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-garapin-navy mb-1.5">Nama Brand / Web</label>
              <input type="text" defaultValue="Garapin.id" className="w-full px-4 py-2 border border-garapin-border rounded-lg text-sm focus:ring-garapin-orange outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-garapin-navy mb-1.5">Nomor WhatsApp Penerima (Untuk Tombol CTA)</label>
              <input type="text" defaultValue="6281234567890" className="w-full px-4 py-2 border border-garapin-border rounded-lg text-sm focus:ring-garapin-orange outline-none" />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="primary">
            <Save size={16} className="mr-2" />
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  );
}
