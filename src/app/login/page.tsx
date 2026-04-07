"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, User, CheckCircle2, Zap } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [securityId, setSecurityId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ securityId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/dashboard");
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Tactical Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      {/* Branding Header */}
      <div className="mb-12 text-center relative z-10 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 border border-white/10 text-white mb-6 shadow-2xl shadow-white/5 group hover:border-white/30 transition-all duration-500">
          <Shield size={40} className="group-hover:scale-110 transition-transform duration-500" />
        </div>
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-2">
          MASSIVE<span className="text-white/40">OSINTX</span>
        </h1>
        <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-6">
          Tactical Intelligence & Forensic Suite
        </p>
        <div className="flex items-center justify-center gap-2 text-[10px] text-white font-black bg-white/5 px-4 py-1.5 rounded-full border border-white/10 uppercase tracking-widest animate-pulse">
          <CheckCircle2 size={12} />
          Uplink Status: Secure Mesh Active
        </div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden relative z-10 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="p-10">
          <div className="mb-10">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Operator Authentication</h2>
            <p className="text-xs text-white/40 mt-2 font-bold uppercase tracking-wider">
              Enter credentials to establish tactical uplink.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest animate-shake" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">
                Security ID / Agency Code
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-white transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="SA-SEC-XXXXX"
                  value={securityId}
                  onChange={(e) => setSecurityId(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/30 transition-all font-mono text-sm"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">
                Security Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-white transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/30 transition-all font-mono text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-5 px-4 bg-white hover:bg-white/90 text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-white/5 active:scale-[0.98] ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  Establish Access
                  <Zap size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="px-10 py-6 bg-white/5 border-t border-white/10 text-center">
          <p className="text-[9px] text-white/20 font-bold uppercase leading-relaxed tracking-widest">
            Unauthorized access is strictly prohibited under the Cybercrimes Act of South Africa. Node tracking is active.
          </p>
        </div>
      </div>

      <footer className="mt-16 text-center text-white/20 text-[10px] font-bold uppercase tracking-[0.3em] relative z-10">
        <p>© 2026 South African Department of Security. All rights reserved.</p>
        <p className="mt-2 text-white/10">Project Massive: Tactical Intelligence Mesh v1.0.4</p>
      </footer>
    </div>
  );
}
