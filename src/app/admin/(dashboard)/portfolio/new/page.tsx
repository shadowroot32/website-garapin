"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createPortfolio } from "@/lib/firebase/portfolio-service";

export default function NewPortfolioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "company_profile",
    tags: "",
    link: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tagsArray = formData.tags.split(",").map(t => t.trim()).filter(Boolean);
      await createPortfolio({
        title: formData.title,
        description: formData.description,
        category: formData.category as any,
        tags: tagsArray,
        link: formData.link,
      });
      router.push("/admin/portfolio");
    } catch (error) {
      console.error("Gagal menyimpan portofolio", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/portfolio" className="p-2 bg-white rounded-full border border-garapin-border text-garapin-gray hover:text-garapin-navy transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-garapin-navy">Tambah Proyek Baru</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-garapin-border shadow-sm p-6 sm:p-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-garapin-navy mb-1.5">Judul Proyek</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="block w-full px-4 py-2.5 border border-garapin-border rounded-xl text-sm focus:ring-2 focus:ring-garapin-orange/20 focus:border-garapin-orange transition-all bg-garapin-bg/50"
              placeholder="Contoh: Website Company Profile PT Abadi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-garapin-navy mb-1.5">Deskripsi</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="block w-full px-4 py-2.5 border border-garapin-border rounded-xl text-sm focus:ring-2 focus:ring-garapin-orange/20 focus:border-garapin-orange transition-all bg-garapin-bg/50"
              placeholder="Jelaskan secara singkat mengenai proyek ini..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-garapin-navy mb-1.5">Kategori</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="block w-full px-4 py-2.5 border border-garapin-border rounded-xl text-sm focus:ring-2 focus:ring-garapin-orange/20 focus:border-garapin-orange transition-all bg-garapin-bg/50"
              >
                <option value="company_profile">Company Profile</option>
                <option value="ecommerce">E-Commerce</option>
                <option value="landing_page">Landing Page</option>
                <option value="dashboard">Web App / Dashboard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-garapin-navy mb-1.5">URL Proyek (Opsional)</label>
              <input
                type="url"
                value={formData.link}
                onChange={e => setFormData({ ...formData, link: e.target.value })}
                className="block w-full px-4 py-2.5 border border-garapin-border rounded-xl text-sm focus:ring-2 focus:ring-garapin-orange/20 focus:border-garapin-orange transition-all bg-garapin-bg/50"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-garapin-navy mb-1.5">Tags (Pisahkan dengan koma)</label>
            <input
              type="text"
              required
              value={formData.tags}
              onChange={e => setFormData({ ...formData, tags: e.target.value })}
              className="block w-full px-4 py-2.5 border border-garapin-border rounded-xl text-sm focus:ring-2 focus:ring-garapin-orange/20 focus:border-garapin-orange transition-all bg-garapin-bg/50"
              placeholder="Next.js, Tailwind CSS, Vercel"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-garapin-border flex justify-end">
          <Button type="submit" variant="primary" disabled={loading}>
            <Save size={16} className="mr-2" />
            {loading ? "Menyimpan..." : "Simpan Proyek"}
          </Button>
        </div>
      </form>
    </div>
  );
}
