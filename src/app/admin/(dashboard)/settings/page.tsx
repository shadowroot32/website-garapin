"use client";

import { useEffect, useState } from "react";
import { Save, Shield, User, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSettings, saveSettings, AppSettings } from "@/lib/firebase/settings-service";
import { auth } from "@/lib/firebase/config";

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState<AppSettings>({
    adminName: "Admin Garapin",
    brandName: "Garapin.id",
    whatsappNumber: "085283868884",
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const userEmail = auth.currentUser?.email || "admin@garapin.id";

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getSettings();
        if (data) {
          setFormData(data);
        }
      } catch (err) {
        console.error("Error loading settings", err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMsg("");
    try {
      await saveSettings(formData);
      setSuccessMsg("Pengaturan berhasil disimpan!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error saving settings", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse text-garapin-gray">Memuat pengaturan...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-garapin-navy">Pengaturan</h2>
          <p className="text-garapin-gray text-sm mt-1">Konfigurasi dasar website dan akun Anda.</p>
        </div>
        {successMsg && (
          <div className="flex items-center gap-2 text-garapin-success text-sm font-medium bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100">
            <CheckCircle size={16} />
            {successMsg}
          </div>
        )}
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
              <input 
                type="text" 
                name="adminName"
                value={formData.adminName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-garapin-border rounded-lg text-sm focus:ring-garapin-orange outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-garapin-navy mb-1.5">Email Akses</label>
              <input 
                type="email" 
                disabled 
                value={userEmail} 
                className="w-full px-4 py-2 border border-garapin-border rounded-lg text-sm bg-gray-100 text-gray-500 cursor-not-allowed" 
              />
              <p className="text-[11px] text-garapin-gray mt-1">Email hanya bisa diubah melalui Firebase Console.</p>
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
              <input 
                type="text" 
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-garapin-border rounded-lg text-sm focus:ring-garapin-orange outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-garapin-navy mb-1.5">Nomor WhatsApp Penerima (Untuk Tombol CTA)</label>
              <input 
                type="text" 
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="Misal: 085283868884"
                className="w-full px-4 py-2 border border-garapin-border rounded-lg text-sm focus:ring-garapin-orange outline-none" 
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </div>
    </div>
  );
}
