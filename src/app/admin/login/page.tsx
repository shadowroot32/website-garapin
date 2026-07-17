"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Lock, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/admin");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err: any) {
      setError("Email atau password salah. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-garapin-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-garapin-border p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-garapin-orange/10 text-garapin-orange rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-garapin-navy mb-2">Login Admin</h1>
          <p className="text-garapin-gray text-sm">Masuk untuk mengelola website Garapin.id</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-garapin-navy mb-1.5">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-garapin-gray" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-garapin-border rounded-xl text-sm focus:ring-2 focus:ring-garapin-orange/20 focus:border-garapin-orange transition-all bg-garapin-bg/50"
                placeholder="admin@garapin.id"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-garapin-navy mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-garapin-gray" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-garapin-border rounded-xl text-sm focus:ring-2 focus:ring-garapin-orange/20 focus:border-garapin-orange transition-all bg-garapin-bg/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full h-11 text-base font-semibold mt-4"
            disabled={loading}
          >
            {loading ? "Memverifikasi..." : "Masuk ke Dashboard"}
          </Button>
        </form>
      </div>
    </div>
  );
}
