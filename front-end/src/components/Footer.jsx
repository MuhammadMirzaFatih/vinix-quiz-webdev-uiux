import React from 'react';
import { GraduationCap, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#003399] to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-900">
                <span className="text-[#003399] font-black">VINIX</span>
                <span className="text-[#FBE156] font-black drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">7</span> Mini-Course &amp; Assessment
              </p>
              <p className="text-xs text-slate-500">Tugas Akhir Magang Web Educational Technology</p>
            </div>
          </div>

          {/* Compliance & Standards Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-md border border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Progressive Gating Engine
            </span>
            <span className="px-2.5 py-1 bg-slate-100 rounded-md border border-slate-200">
              KKM Lulus: 80 Poin
            </span>
            <span className="px-2.5 py-1 bg-slate-100 rounded-md border border-slate-200">
              WCAG 2.1 AA Compliant
            </span>
          </div>

          <p className="text-xs text-slate-400 text-center md:text-right">
            &copy; {new Date().getFullYear()} Tim Pengembang <span className="text-[#003399] font-bold">VINIX</span><span className="text-[#FBE156] font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">7</span>. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
