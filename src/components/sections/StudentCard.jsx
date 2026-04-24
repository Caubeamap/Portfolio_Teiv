import React from 'react';
import teivPhoto from '../../assets/teiv.jpg';
import { Scan, Fingerprint, Network } from 'lucide-react';

export default function StudentCard() {
  return (
    <div
      className="relative w-full h-full rounded-[24px] overflow-hidden glass-panel group bg-[#020617]/80"
      style={{
        boxShadow: '0 20px 50px -18px rgba(30,41,59,0.35), inset 0 0 0 1px rgba(56, 189, 248, 0.25), inset 0 20px 40px -20px rgba(56, 189, 248, 0.12)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Animated Hexagon Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none mix-blend-screen" />
      
      {/* Top Header */}
      <div className="relative px-6 pt-5 pb-4 flex items-center justify-between border-b border-[#38bdf8]/20 bg-gradient-to-b from-[#38bdf8]/10 to-transparent">
        <div className="flex items-center gap-2.5">
          <Network className="w-4 h-4 text-[#38bdf8] opacity-80" />
          <span className="text-[12px] font-bold tracking-[0.3em] text-[#38bdf8] uppercase">
            FIT.HCMUS
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] font-mono text-slate-400 tracking-widest">LIVE</span>
          <div className="relative w-2.5 h-2.5">
            <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></div>
            <div className="relative w-full h-full rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-8 z-10 pb-6">
        {/* Holographic Avatar Container */}
        <div className="relative w-[140px] h-[140px] mb-6">
          {/* Rotating outer rings */}
          <div className="absolute -inset-3 border border-[#38bdf8]/30 rounded-full animate-[spin_12s_linear_infinite] border-t-[#38bdf8] border-r-[#38bdf8] drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
          <div className="absolute -inset-1 border border-indigo-500/30 rounded-full animate-[spin_8s_linear_infinite_reverse] border-b-indigo-400 drop-shadow-[0_0_5px_rgba(129,140,248,0.5)]" />
          
          <div className="relative w-full h-full rounded-full overflow-hidden p-[4px] bg-slate-900 shadow-[0_0_20px_rgba(56,189,248,0.2)] z-10 hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-shadow duration-500">
            <div className="w-full h-full rounded-full overflow-hidden border border-slate-700 relative">
              <div className="absolute inset-0 bg-[#38bdf8]/10 mix-blend-color-dodge z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
              <img
                src={teivPhoto}
                alt="Việt Hoàng"
                className="w-full h-full object-cover grayscale-[30%] contrast-125 brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Identity Details */}
        <div className="text-center space-y-2 w-full">
          <div className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#818cf8] uppercase flex items-center justify-center gap-1.5 opacity-90">
            <Scan className="w-3.5 h-3.5" /> DATA ENGINEER
          </div>
          <h2 className="text-[28px] font-black tracking-tight bg-gradient-to-r from-[#4f46e5] to-[#0ea5e9] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(15,23,42,0.35)]">
            Việt Hoàng
          </h2>
          <div className="text-[10px] font-mono text-slate-500 tracking-widest uppercase mt-2">
            DOB: 24/09/2005
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative bg-gradient-to-r from-[#e9f4ff] to-[#eef2ff] px-6 py-4 flex items-center justify-between border-t border-[#c7d9f4]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-md border border-[#d8e5f7] group-hover:border-[#38bdf8]/50 transition-colors">
            <Fingerprint className="w-5 h-5 text-slate-500 group-hover:text-[#0284c7] transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold tracking-[0.2em] text-slate-700 uppercase">
              Intern
            </span>
            <span className="text-[9px] font-mono text-[#0284c7] tracking-widest opacity-90">
              LVL.01 ACCESS
            </span>
          </div>
        </div>
        
        {/* Stylish Tech Barcode */}
        <div className="flex gap-[4px] items-center h-8 opacity-70 group-hover:opacity-100 transition-opacity">
          {[40,80,60,100,50,90,40,70].map((h, i) => (
            <div 
              key={i} 
              className="w-[3px] bg-slate-500 group-hover:bg-[#0284c7] rounded-full transition-all duration-300" 
              style={{ height: `${h}%`, transitionDelay: `${i * 30}ms` }} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
