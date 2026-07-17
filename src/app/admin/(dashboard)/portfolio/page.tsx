"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPortfolios, deletePortfolio, PortfolioItem, createPortfolio } from "@/lib/firebase/portfolio-service";
import { portfolioItems as hardcodedPortfolios } from "@/data/portfolio";

export default function AdminPortfolioPage() {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const fetchPortfolios = async () => {
    setLoading(true);
    try {
      const data = await getPortfolios();
      setPortfolios(data);
    } catch (error) {
      console.error("Gagal mengambil data portfolio", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus portofolio ini?")) {
      await deletePortfolio(id);
      fetchPortfolios();
    }
  };

  const handleSeedData = async () => {
    if (!confirm("Ini akan memasukkan data bawaan (dummy) ke Firestore. Lanjutkan?")) return;
    setSeeding(true);
    try {
      for (const item of hardcodedPortfolios) {
        await createPortfolio({
          title: item.title,
          description: item.description,
          category: item.category as any,
          tags: item.tags,
          link: "https://garapin.id",
        });
      }
      alert("Berhasil memasukkan data bawaan!");
      fetchPortfolios();
    } catch (error) {
      console.error("Seed error:", error);
      alert("Gagal memasukkan data.");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-garapin-navy">Manajemen Portofolio</h2>
          <p className="text-garapin-gray text-sm mt-1">Kelola proyek yang tampil di website utama.</p>
        </div>
        <div className="flex gap-3">
          {portfolios.length === 0 && !loading && (
            <Button onClick={handleSeedData} disabled={seeding} variant="outline" className="bg-white">
              <RefreshCw size={16} className={`mr-2 ${seeding ? "animate-spin" : ""}`} />
              {seeding ? "Menyalin..." : "Salin Data Dummy"}
            </Button>
          )}
          <Link href="/admin/portfolio/new">
            <Button variant="primary">
              <Plus size={16} className="mr-2" />
              Tambah Proyek
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-garapin-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-garapin-gray animate-pulse">Memuat data dari Firestore...</div>
        ) : portfolios.length === 0 ? (
          <div className="p-12 text-center text-garapin-gray">
            <p className="mb-4">Belum ada portofolio di Database.</p>
            <p className="text-sm">Klik "Salin Data Dummy" atau tambah proyek baru.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-garapin-slate">
              <thead className="bg-garapin-bg/50 text-xs uppercase text-garapin-navy font-semibold border-b border-garapin-border">
                <tr>
                  <th className="px-6 py-4">Judul Proyek</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Tags</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-garapin-border">
                {portfolios.map((item) => (
                  <tr key={item.id} className="hover:bg-garapin-bg/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-garapin-navy">{item.title}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-garapin-orange/10 text-garapin-orange rounded-md text-xs font-semibold uppercase tracking-wider">
                        {item.category.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {item.tags?.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 rounded text-xs">{tag}</span>
                        ))}
                        {(item.tags?.length || 0) > 2 && <span className="text-xs text-garapin-gray">+{item.tags.length - 2}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {item.link && (
                          <a href={item.link} target="_blank" rel="noreferrer" className="p-2 text-garapin-gray hover:text-garapin-navy transition-colors">
                            <ExternalLink size={16} />
                          </a>
                        )}
                        <Link href={`/admin/portfolio/${item.id}`}>
                          <button className="p-2 text-garapin-gray hover:text-emerald-500 transition-colors">
                            <Edit2 size={16} />
                          </button>
                        </Link>
                        <button onClick={() => handleDelete(item.id!)} className="p-2 text-garapin-gray hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
