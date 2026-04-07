"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, User, CheckCircle2 } from "lucide-react";

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
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4">
      {/* Branding Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-4 shadow-lg shadow-blue-200">
          <Shield size={32} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          SECURE<span className="text-blue-600">TRUST</span>
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          Official Government Security Portal
        </p>
        <div className="flex items-center justify-center gap-2 mt-2 text-xs text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full border border-green-100 uppercase tracking-wider">
          <CheckCircle2 size={12} />
          Verified Secure Environment
        </div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800">Agency Login</h2>
            <p className="text-sm text-slate-500 mt-1">
              Authorized personnel from registered security companies only.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1">
                Security ID / Agency Code
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="SA-SEC-XXXXX"
                  value={securityId}
                  onChange={(e) => setSecurityId(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1">
                Security Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200 ${isLoading ? "opacity-80 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Authenticate Access
                </>
              )}
            </button>
          </form>
        </div>

        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            Unauthorized access is strictly prohibited under the Cybercrimes Act of South Africa.
          </p>
        </div>
      </div>

      <footer className="mt-12 text-center text-slate-400 text-sm">
        <p>© 2026 South African Department of Security. All rights reserved.</p>
        <p className="mt-1">Project Massive: Security & Trust Hackathon</p>
      </footer>
    </div>
  );
}
