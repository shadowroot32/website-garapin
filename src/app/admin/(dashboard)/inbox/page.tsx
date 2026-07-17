"use client";

import { useEffect, useState } from "react";
import { Mail, Search, Trash2, Check, Phone } from "lucide-react";
import { getMessages, deleteMessage, markAsRead, InboxMessage } from "@/lib/firebase/inbox-service";

export default function AdminInboxPage() {
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInbox = async () => {
    setLoading(true);
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInbox();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id);
    fetchInbox();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Hapus pesan ini?")) {
      await deleteMessage(id);
      fetchInbox();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-garapin-navy">Pesan Masuk (Inbox)</h2>
          <p className="text-garapin-gray text-sm mt-1">Daftar pesan dari calon klien melalui form kontak.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-garapin-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-garapin-gray animate-pulse">Memuat pesan...</div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center text-garapin-gray">
            <div className="w-16 h-16 bg-garapin-bg rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={24} className="text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold text-garapin-navy mb-2">Kotak Masuk Kosong</h3>
            <p className="text-sm max-w-md mx-auto">Belum ada pesan baru dari pengunjung website.</p>
          </div>
        ) : (
          <div className="divide-y divide-garapin-border">
            {messages.map((msg) => (
              <div key={msg.id} className={`p-6 transition-colors ${msg.read ? 'bg-white' : 'bg-garapin-orange/5'}`}>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className={`text-lg ${msg.read ? 'font-medium text-garapin-navy' : 'font-bold text-garapin-navy'}`}>
                        {msg.name} {msg.company && <span className="text-garapin-gray font-normal text-sm">({msg.company})</span>}
                      </h4>
                      {!msg.read && <span className="bg-garapin-orange text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Baru</span>}
                    </div>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-garapin-slate">
                        <Phone size={14} className="text-garapin-orange" />
                        <a href={`https://wa.me/${msg.contact.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="hover:text-garapin-orange hover:underline">
                          {msg.contact}
                        </a>
                      </div>
                      <div className="text-garapin-slate">
                        <span className="font-semibold text-garapin-navy">Tipe:</span> {msg.websiteType}
                      </div>
                      <div className="text-garapin-slate">
                        <span className="font-semibold text-garapin-navy">Paket:</span> {msg.package}
                      </div>
                    </div>

                    {msg.message && (
                      <p className="text-garapin-gray text-sm p-4 bg-garapin-bg rounded-xl border border-garapin-border/50">
                        {msg.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 shrink-0">
                    {!msg.read && (
                      <button onClick={() => handleMarkAsRead(msg.id!)} className="p-2 text-garapin-gray hover:text-emerald-500 bg-white border border-garapin-border rounded-lg shadow-sm transition-colors" title="Tandai sudah dibaca">
                        <Check size={16} />
                      </button>
                    )}
                    <button onClick={() => handleDelete(msg.id!)} className="p-2 text-garapin-gray hover:text-red-500 bg-white border border-garapin-border rounded-lg shadow-sm transition-colors" title="Hapus pesan">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
