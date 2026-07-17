"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPost, getBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost } from "@/lib/firebase/blog-service";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "",
    author: "Admin"
  });

  const loadData = async () => {
    setLoading(true);
    const data = await getBlogPosts();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenModal = (post?: BlogPost) => {
    if (post) {
      setEditingId(post.id!);
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        category: post.category,
        author: post.author,
      });
    } else {
      setEditingId(null);
      setFormData({ title: "", excerpt: "", content: "", coverImage: "", category: "Teknologi", author: "Admin" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateBlogPost(editingId, formData);
      } else {
        await addBlogPost(formData as any);
      }
      await loadData();
      handleCloseModal();
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan artikel.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      try {
        await deleteBlogPost(id);
        await loadData();
      } catch (error) {
        alert("Gagal menghapus.");
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-garapin-gray">Loading...</div>;

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-garapin-navy">Manajemen Blog</h2>
          <p className="text-garapin-gray text-sm mt-1">Kelola artikel dan berita untuk pengunjung website.</p>
        </div>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          <Plus size={16} className="mr-2" />
          Tulis Artikel Baru
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-garapin-border shadow-sm overflow-hidden p-12 text-center text-garapin-gray">
          <div className="w-16 h-16 bg-garapin-bg rounded-full flex items-center justify-center mx-auto mb-4">
            <Edit2 size={24} className="text-garapin-orange" />
          </div>
          <h3 className="text-lg font-semibold text-garapin-navy mb-2">Belum Ada Artikel</h3>
          <p className="text-sm max-w-md mx-auto">Anda belum menulis artikel apapun. Artikel yang Anda tulis akan muncul di sini.</p>
          <Button variant="outline" className="mt-6" onClick={() => handleOpenModal()}>Mulai Menulis</Button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-garapin-border shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-garapin-bg text-garapin-gray text-sm border-b border-garapin-border">
                <th className="p-4 font-medium">Judul</th>
                <th className="p-4 font-medium">Kategori</th>
                <th className="p-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-garapin-border hover:bg-garapin-bg/50">
                  <td className="p-4 text-garapin-navy font-medium">{post.title}</td>
                  <td className="p-4 text-garapin-slate">{post.category}</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleOpenModal(post)} className="text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(post.id!)} className="text-red-500 hover:underline">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-garapin-navy">{editingId ? "Edit Artikel" : "Tambah Artikel Baru"}</h3>
              <button onClick={handleCloseModal} className="text-garapin-gray hover:text-garapin-navy">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-garapin-navy mb-1">Judul Artikel</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-garapin-orange" />
              </div>
              <div>
                <label className="block text-sm font-medium text-garapin-navy mb-1">URL Gambar Cover (Kosongkan bila tidak ada)</label>
                <input type="text" value={formData.coverImage} onChange={(e) => setFormData({...formData, coverImage: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-garapin-orange" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-garapin-navy mb-1">Kategori</label>
                  <input required type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-garapin-orange" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-garapin-navy mb-1">Penulis</label>
                  <input required type="text" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-garapin-orange" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-garapin-navy mb-1">Ringkasan (Excerpt)</label>
                <textarea required rows={2} value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-garapin-orange" />
              </div>
              <div>
                <label className="block text-sm font-medium text-garapin-navy mb-1">Isi Konten (Dukung Format Dasar)</label>
                <textarea required rows={8} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-garapin-orange" />
              </div>
              <div className="flex justify-end pt-4 border-t">
                <Button type="button" variant="outline" className="mr-2" onClick={handleCloseModal}>Batal</Button>
                <Button type="submit" variant="primary" disabled={saving}>
                  {saving ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
                  Simpan Artikel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
