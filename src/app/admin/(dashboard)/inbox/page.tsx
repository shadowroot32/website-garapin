"use client";

import { Mail, Clock, Search } from "lucide-react";

export default function AdminInboxPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-garapin-navy">Pesan Masuk (Inbox)</h2>
          <p className="text-garapin-gray text-sm mt-1">Daftar pesan dari calon klien melalui form kontak.</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-garapin-gray" />
          <input 
            type="text" 
            placeholder="Cari pesan..." 
            className="pl-9 pr-4 py-2 text-sm border border-garapin-border rounded-lg focus:ring-2 focus:ring-garapin-orange/20 outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-garapin-border shadow-sm overflow-hidden p-12 text-center text-garapin-gray">
        <div className="w-16 h-16 bg-garapin-bg rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail size={24} className="text-emerald-500" />
        </div>
        <h3 className="text-lg font-semibold text-garapin-navy mb-2">Kotak Masuk Kosong</h3>
        <p className="text-sm max-w-md mx-auto">Pesan dari pengunjung website yang mengisi form di bagian "Hubungi Kami" akan otomatis masuk ke halaman ini.</p>
      </div>
    </div>
  );
}
