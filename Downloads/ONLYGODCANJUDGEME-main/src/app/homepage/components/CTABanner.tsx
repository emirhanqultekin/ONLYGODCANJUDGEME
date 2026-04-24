"use client";
import React from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

export default function CTABanner() {
  return (
    <section className="py-24 bg-white dark:bg-[#0a0f1c] transition-colors duration-500">
      <div className="max-w-[1024px] mx-auto px-5">
        <div 
          className="rounded-[32px] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 transition-all duration-500 bg-gradient-to-br from-[#5aacf0] to-[#2ec4a0] dark:from-[#1a1a2e] dark:to-[#2a2a4a] shadow-[0_20px_40px_rgba(90,172,240,0.2)] dark:shadow-none"
        >
          {/* Işık Hüzmeleri */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 dark:bg-[#5aacf0]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 dark:bg-[#2ec4a0]/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3"></div>

          <div className="relative z-10 max-w-lg text-center md:text-left">
            <h2 className="text-[2.5rem] md:text-[3.2rem] font-bold text-white leading-tight tracking-[-0.03em] mb-4">
              Gelecek <span className="text-white/90 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#5aacf0] dark:to-[#2ec4a0]">Seninle</span> Başlar
            </h2>
            <p className="text-[17px] text-white/90 dark:text-gray-400 mb-8 leading-relaxed">
              Bugün sipariş ver, yarın geleceği kolunda, kulağında ve odanda hissetmeye başla. Sınırları aşmak için daha fazla bekleme.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                href="#products"
                className="px-8 py-4 bg-white text-[#5aacf0] dark:text-[#1a1a2e] rounded-full font-bold tracking-wide hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg text-center"
              >
                Hemen Alışverişe Başla
              </Link>
            </div>
          </div>
          
          <div className="relative z-10 hidden md:block">
             <div className="w-32 h-32 rounded-full border border-white/30 dark:border-white/10 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                <Icon name="SparklesIcon" size={40} className="text-white dark:text-[#5aacf0]" />
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}