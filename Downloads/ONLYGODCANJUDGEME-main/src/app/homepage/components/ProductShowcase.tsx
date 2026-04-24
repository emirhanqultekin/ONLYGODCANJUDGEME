"use client";
import React from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import { useCart } from "@/context/CartContext";

const products = [
  {
    id: "aura-wristband",
    name: "Aura Wristband",
    tag: "Yeni",
    price: 1299,
    priceStr: "₺1.299",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    colors: ["#1a1a2e", "#e2e8f0", "#5aacf0"]
  },
  {
    id: "sonic-buds",
    name: "Sonic Buds",
    tag: "Çok Satan",
    price: 899,
    priceStr: "₺899",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop",
    colors: ["#1a1a2e", "#e2e8f0"]
  },
  {
    id: "nova-speaker",
    name: "Nova Speaker",
    tag: "",
    price: 1599,
    priceStr: "₺1.599",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop",
    colors: ["#e2e8f0", "#2ec4a0"]
  }
];

export default function ProductShowcase() {
  const { addItem } = useCart();

  return (
    // BARKPLAN DEĞİŞİMİ: bg-white -> dark:bg-[#0a0f1c]
    <section id="products" className="py-24 bg-white dark:bg-[#0a0f1c] transition-colors duration-500">
      <div className="max-w-[1024px] mx-auto px-5">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            {/* YAZI DEĞİŞİMİ: text-[#1a1a2e] -> dark:text-white */}
            <h2 className="text-[2.5rem] font-bold leading-tight tracking-[-0.03em] text-[#1a1a2e] dark:text-white transition-colors">Koleksiyonu Keşfet</h2>
            <p className="text-[17px] text-[#8a8aaa] dark:text-gray-400 mt-2 transition-colors">Tarzını yansıtacak teknolojiyi bul.</p>
          </div>
          <button className="text-[15px] font-semibold text-[#5aacf0] hover:text-[#1a1a2e] dark:hover:text-white transition-colors flex items-center gap-1 group">
            Tümünü Gör <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* KUTU DEĞİŞİMİ: bg-[#f7f9fc] -> dark:bg-[#111827] */}
              <div className="relative aspect-square rounded-[32px] overflow-hidden bg-[#f7f9fc] dark:bg-[#111827] mb-5 transition-colors duration-500">
                
                {product.tag && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-white/90 dark:bg-black/50 backdrop-blur-md rounded-full text-[11px] font-bold tracking-wider uppercase text-[#1a1a2e] dark:text-white shadow-sm transition-colors">
                    {product.tag}
                  </div>
                )}
                
                <AppImage 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply dark:mix-blend-normal" 
                />
                
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addItem(product);
                  }}
                  className="absolute bottom-4 right-4 w-12 h-12 bg-white dark:bg-[#1a1a2e] rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                >
                  <Icon name="ShoppingBagIcon" size={20} className="text-[#1a1a2e] dark:text-white" />
                </button>
              </div>

              <div className="px-2">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-[19px] font-bold text-[#1a1a2e] dark:text-white transition-colors">{product.name}</h3>
                  <span className="text-[17px] font-semibold text-[#8a8aaa] dark:text-gray-400 transition-colors">{product.priceStr}</span>
                </div>
                <div className="flex gap-1.5 mt-3">
                  {product.colors.map((color, i) => (
                    <div key={i} className="w-4 h-4 rounded-full border border-gray-200 dark:border-gray-700 transition-colors" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}