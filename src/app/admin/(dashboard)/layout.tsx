import { Sidebar } from "@/components/admin/Sidebar";
import { AuthProvider } from "@/components/admin/AuthProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Garapin.id",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-garapin-bg">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {/* Top Header Placeholder */}
          <header className="bg-white border-b border-garapin-border h-16 flex items-center px-8 shadow-sm">
            <h1 className="text-xl font-semibold text-garapin-navy">Admin Dashboard</h1>
          </header>
          {/* Main Content Area */}
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}
