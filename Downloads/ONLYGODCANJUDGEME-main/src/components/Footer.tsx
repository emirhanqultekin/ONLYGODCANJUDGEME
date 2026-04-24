"use client";
import React from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0a0f1c] border-t border-gray-100 dark:border-gray-800 pt-16 pb-8 transition-colors duration-500">
      <div className="max-w-[1024px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Marka ve Sosyal Medya */}
          <div className="md:col-span-1">
            <Link href="/homepage" className="flex items-center gap-2 mb-4 group">
              <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)" }}>
                <img src="/assets/images/app_logo.png" alt="Logo" className="w-4 h-4 object-contain" />
              </div>
              <span className="text-[17px] font-semibold tracking-[-0.02em] text-[#1a1a2e] dark:text-white transition-colors">
                Lumina<span className="text-[#8a8aaa] font-normal">Tech</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 transition-colors">
              Sınırlarını zorlayan teknoloji, seni asla yarı yolda bırakmaz. Geleceği bugünden yaşa.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-[#5aacf0] dark:hover:text-[#5aacf0] transition-colors"><Icon name="GlobeAltIcon" size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-[#5aacf0] dark:hover:text-[#5aacf0] transition-colors"><Icon name="ChatBubbleOvalLeftEllipsisIcon" size={16} /></a>
            </div>
          </div>
          
          {/* Linkler */}
          <div>
            <h4 className="font-bold text-[#1a1a2e] dark:text-white mb-4 transition-colors">Ürünler</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-[#5aacf0] transition-colors">Akıllı Saatler</a></li>
              <li><a href="#" className="hover:text-[#5aacf0] transition-colors">Kablosuz Kulaklıklar</a></li>
              <li><a href="#" className="hover:text-[#5aacf0] transition-colors">Hoparlörler</a></li>
              <li><a href="#" className="hover:text-[#5aacf0] transition-colors">Aksesuarlar</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#1a1a2e] dark:text-white mb-4 transition-colors">Kurumsal</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-[#5aacf0] transition-colors">Hakkımızda</a></li>
              <li><a href="#" className="hover:text-[#5aacf0] transition-colors">Kariyer</a></li>
              <li><a href="#" className="hover:text-[#5aacf0] transition-colors">Mağazalarımız</a></li>
              <li><a href="#" className="hover:text-[#5aacf0] transition-colors">İletişim</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#1a1a2e] dark:text-white mb-4 transition-colors">Destek</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-[#5aacf0] transition-colors">Sıkça Sorulan Sorular</a></li>
              <li><a href="#" className="hover:text-[#5aacf0] transition-colors">Kargo ve Teslimat</a></li>
              <li><a href="#" className="hover:text-[#5aacf0] transition-colors">İade Şartları</a></li>
              <li><a href="#" className="hover:text-[#5aacf0] transition-colors">Garanti Süreçleri</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
          <p className="text-sm text-gray-400 dark:text-gray-500">© 2026 Lumina Tech. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
            <a href="#" className="hover:text-[#5aacf0] transition-colors">Gizlilik Politikası</a>
            <span>•</span>
            <a href="#" className="hover:text-[#5aacf0] transition-colors">Çerez Aydınlatma Metni</a>
          </div>
        </div>
      </div>
    </footer>
  );
}