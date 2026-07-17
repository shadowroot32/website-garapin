import { Users, Briefcase, FileText, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Kunjungan", value: "2,451", icon: Users, trend: "+12%" },
    { label: "Proyek Selesai", value: "34", icon: Briefcase, trend: "+3" },
    { label: "Artikel Blog", value: "12", icon: FileText, trend: "+2" },
    { label: "Konversi Leads", value: "15%", icon: TrendingUp, trend: "+1.2%" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-garapin-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-garapin-orange/10 flex items-center justify-center text-garapin-orange">
                <stat.icon size={24} />
              </div>
              <span className="text-sm font-medium text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <div className="text-3xl font-bold text-garapin-navy mb-1">{stat.value}</div>
            <div className="text-sm text-garapin-gray">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-garapin-border shadow-sm min-h-[300px]">
          <h3 className="text-lg font-semibold text-garapin-navy mb-4">Pesan Masuk Terbaru</h3>
          <div className="flex flex-col items-center justify-center h-48 text-garapin-gray">
            <p>Belum ada pesan baru hari ini.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-garapin-border shadow-sm min-h-[300px]">
          <h3 className="text-lg font-semibold text-garapin-navy mb-4">Draf Artikel</h3>
          <div className="flex flex-col items-center justify-center h-48 text-garapin-gray">
            <p>Tidak ada artikel yang sedang dibuat.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
