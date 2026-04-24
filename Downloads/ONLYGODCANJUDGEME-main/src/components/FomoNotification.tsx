"use client";
import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";

// Veri seti aynı kalıyor
const fomoData = [
  { name: "Ahmet", city: "İstanbul", product: "Aura Wristband", time: "2 dakika önce" },
  { name: "Ayşe", city: "İzmir", product: "Sonic Buds", time: "5 dakika önce" },
  { name: "Can", city: "Ankara", product: "Nova Speaker", time: "10 dakika önce" },
  { name: "Zeynep", city: "Bursa", product: "Aura Wristband", time: "1 dakika önce" },
  { name: "Emre", city: "Antalya", product: "Sonic Buds", time: "Az önce" }
];

export default function FomoNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(fomoData[0]);

  useEffect(() => {
    // 3 saniye sonra başla
    const startTimeout = setTimeout(() => {
      triggerNotification();
    }, 3000);

    // Her 15 saniyede bir tekrarla (Okunması için süreyi biraz uzattık)
    const interval = setInterval(() => {
      triggerNotification();
    }, 15000);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, []);

  const triggerNotification = () => {
    const randomData = fomoData[Math.floor(Math.random() * fomoData.length)];
    setData(randomData);
    setIsVisible(true);

    // Ekranda 6 saniye kalsın (Daha büyük metin, daha çok okuma süresi)
    setTimeout(() => {
      setIsVisible(false);
    }, 6000);
  };

  if (!isVisible) return null;

  return (
    // fixed bottom ve left değerlerini biraz artırdık ki köşeye çok sıkışmasın
    <div className="fixed bottom-10 left-10 z-[100] animate-fade-in-up">
      {/* BÜYÜTÜLEN KISIM: w-[300px] -> w-[380px], p-4 -> p-6, rounded-2xl -> rounded-3xl */}
      <div className="bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md border-2 border-gray-100 dark:border-gray-800 shadow-[0_12px_40px_rgba(90,172,240,0.2)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] rounded-3xl p-6 flex items-center gap-5 w-[380px] transition-colors duration-500 relative overflow-hidden group">
        
        {/* Sol taraftaki yeşil ikon BÜYÜTÜLDÜ: w-10 h-10 -> w-14 h-14, size={20} -> size={28} */}
        <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center shrink-0">
          <Icon name="ShoppingBagIcon" size={28} />
        </div>
        
        {/* Bildirim İçeriği BÜYÜTÜLDÜ */}
        <div className="flex-1 pr-5">
          {/* text-[13px] -> text-[16px] */}
          <p className="text-[16px] text-gray-600 dark:text-gray-300 leading-tight">
            <span className="font-bold text-[#1a1a2e] dark:text-white transition-colors">{data.name}</span> ({data.city})
          </p>
          {/* text-[12px] -> text-[15px] */}
          <p className="text-[15px] font-bold text-[#5aacf0] mt-1 mb-0.5">
            {data.product} <span className="text-[#1a1a2e] dark:text-white font-medium">satın aldı!</span>
          </p>
          {/* text-[10px] -> text-[13px], mt-1 -> mt-2 */}
          <p className="text-[13px] text-gray-400 dark:text-gray-500 mt-2 font-medium">{data.time}</p>
        </div>

        {/* Kapatma Butonu BÜYÜTÜLDÜ: top-3 -> top-5, size={14} -> size={18} */}
        <button 
          onClick={() => setIsVisible(false)} 
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors disabled:opacity-50"
        >
          <Icon name="XMarkIcon" size={18} />
        </button>

        {/* Küçük bir estetik: Alt kısıma hafif bir degrade çizgi */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5aacf0] to-[#2ec4a0]"></div>

      </div>
    </div>
  );
}