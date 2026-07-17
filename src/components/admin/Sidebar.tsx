"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Briefcase, FileText, Inbox, Settings, LogOut } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Portofolio", href: "/admin/portfolio", icon: Briefcase },
  { name: "Blog", href: "/admin/blog", icon: FileText },
  { name: "Pesan Masuk", href: "/admin/inbox", icon: Inbox },
  { name: "Pengaturan", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-garapin-navy text-white flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-bold text-garapin-orange">Garapin Admin</h2>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm",
                isActive 
                  ? "bg-garapin-orange text-white" 
                  : "text-garapin-light hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-red-400 hover:bg-red-500/10 transition-colors font-medium text-sm">
          <LogOut size={20} />
          Keluar
        </button>
      </div>
    </aside>
  );
}
