"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import { useCart } from "@/context/CartContext";
import ReferralModal from "../../../components/RefferalModal"; 

export default function CartContent() {
  const { items, updateQuantity, removeItem, totalItems, totalPrice } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [couponStatus, setCouponStatus] = useState<"idle" | "success" | "error">("idle");
  const [isReferralOpen, setIsReferralOpen] = useState(false);

  const [discountType, setDiscountType] = useState<"percentage" | "fixed" | null>(null);
  const [discountValue, setDiscountValue] = useState(0);

  // Kargo Hesaplamaları (Hedef 2500 TL)
  const FREE_SHIPPING_THRESHOLD = 2500;
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - totalPrice, 0);
  const progressPercentage = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const { subtotal, discountAmount, finalTotal } = useMemo(() => {
    const sub = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let disc = 0;
    
    if (discountType === "percentage") disc = sub * discountValue;
    else if (discountType === "fixed") { disc = discountValue; if (disc > sub) disc = sub; }

    return { subtotal: sub, discountAmount: disc, finalTotal: sub - disc };
  }, [items, discountType, discountValue]);

  // Kargo Ücreti Mantığı
  const shippingFee = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : 49.90;
  const grandTotal = finalTotal + shippingFee;

  const handleApplyCoupon = () => {
    const code = couponInput.toUpperCase();
    if (code === "LUMINA30") { setDiscountType("percentage"); setDiscountValue(0.30); setCouponStatus("success"); }
    else if (code === "EDU50") { setDiscountType("percentage"); setDiscountValue(0.50); setCouponStatus("success"); }
    else if (code === "DAVET250") { setDiscountType("fixed"); setDiscountValue(250); setCouponStatus("success"); }
    else { setCouponStatus("error"); setTimeout(() => setCouponStatus("idle"), 2000); }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 transition-colors">
          <Icon name="ShoppingBagIcon" size={40} className="text-gray-300 dark:text-gray-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2 transition-colors">Sepetiniz Boş</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-xs transition-colors">Görünüşe göre henüz bir ürün eklemediniz.</p>
        <Link href="/homepage" className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium transition-transform hover:scale-105">
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-[1100px] mx-auto px-5 py-10 transition-colors duration-500">
        
        <div className="w-full bg-gradient-to-r from-[#f59e0b]/10 to-[#fcd34d]/10 border border-[#f59e0b]/20 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] flex items-center justify-center shrink-0"><Icon name="GiftIcon" size={20} /></div>
            <div>
              <h3 className="font-bold text-[#1a1a2e] dark:text-white">Arkadaşını Davet Et, 250 TL Kazan!</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sevdiğin birine Lumina Tech öner, anında sepetinde 250 TL indirim kullan.</p>
            </div>
          </div>
          <button onClick={() => setIsReferralOpen(true)} className="px-6 py-2.5 bg-[#f59e0b] hover:bg-[#d97706] text-white text-sm font-bold rounded-xl transition-colors shrink-0 shadow-lg shadow-[#f59e0b]/20">Hemen Davet Et</button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-[#1a1a2e] dark:text-white transition-colors">Sepetim ({totalItems})</h1>
            
            <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm transition-colors duration-500">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${remainingForFreeShipping > 0 ? 'bg-[#5aacf0]/10 text-[#5aacf0]' : 'bg-[#2ec4a0]/10 text-[#2ec4a0]'} transition-colors`}>
                    <Icon name="TruckIcon" size={16} />
                  </div>
                  <span className="text-[14px] font-bold text-[#1a1a2e] dark:text-white transition-colors">
                    {remainingForFreeShipping > 0 
                      ? `Ücretsiz kargoya ${remainingForFreeShipping.toLocaleString('tr-TR')} TL kaldı!`
                      : "Tebrikler! Kargonuz Bedava 🚀"}
                  </span>
                </div>
              </div>
              <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden transition-colors">
                 <div 
                   className={`h-full transition-all duration-700 ease-out ${remainingForFreeShipping > 0 ? 'bg-[#5aacf0]' : 'bg-[#2ec4a0]'}`}
                   style={{ width: `${progressPercentage}%` }}
                 ></div>
              </div>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm transition-colors hover:shadow-md">
                  <div className="w-24 h-24 bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shrink-0">
                    <AppImage src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-[#1a1a2e] dark:text-white transition-colors">{item.name}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"><Icon name="TrashIcon" size={18} /></button>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 p-1 rounded-lg border border-gray-100 dark:border-gray-800 transition-colors">
                        <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 dark:text-white rounded-md transition-all shadow-sm">-</button>
                        <span className="font-semibold text-sm w-4 text-center dark:text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 dark:text-white rounded-md transition-all shadow-sm">+</button>
                      </div>
                      <span className="font-bold text-[#1a1a2e] dark:text-white transition-colors">{(item.price * item.quantity).toLocaleString('tr-TR')} TL</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[380px] space-y-6">
            <div className="p-6 bg-gray-50 dark:bg-[#111827] rounded-[32px] border border-gray-100 dark:border-gray-800 sticky top-24 transition-colors duration-500">
              <h2 className="text-xl font-bold mb-6 text-[#1a1a2e] dark:text-white transition-colors">Sipariş Özeti</h2>
              
              <div className="mb-8">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Kupon Kodu</label>
                <div className="relative">
                  <input type="text" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="Kodunuzu girin..." className={`w-full bg-white dark:bg-gray-900 border ${couponStatus === 'success' ? 'border-green-500 dark:border-green-500' : 'border-gray-200 dark:border-gray-700'} px-4 py-3 rounded-xl focus:outline-none text-sm transition-colors dark:text-white`} />
                  <button onClick={handleApplyCoupon} className="absolute right-2 top-2 px-4 py-1.5 bg-[#1a1a2e] dark:bg-white text-white dark:text-black text-xs font-bold rounded-lg hover:bg-black dark:hover:bg-gray-200 transition-colors">Uygula</button>
                </div>
                {couponStatus === 'success' && <p className="text-green-600 dark:text-green-400 text-[12px] mt-2 font-medium flex items-center gap-1 animate-fade-in"><Icon name="CheckCircleIcon" size={14} /> {discountType === "percentage" ? `%${discountValue * 100} indirim uygulandı!` : `${discountValue} TL indirim uygulandı!`}</p>}
                {couponStatus === 'error' && <p className="text-red-500 dark:text-red-400 text-[12px] mt-2 font-medium animate-shake">Geçersiz veya süresi dolmuş kod.</p>}
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800 transition-colors">
                <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
                  <span>Ara Toplam</span>
                  <span>{subtotal.toLocaleString('tr-TR')} TL</span>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400 text-sm font-medium">
                    <span>İndirim Tutarı</span>
                    <span>-{discountAmount.toLocaleString('tr-TR')} TL</span>
                  </div>
                )}
                
                <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
                  <span>Kargo</span>
                  <span className={`font-bold tracking-tight ${shippingFee === 0 ? 'text-[#2ec4a0]' : 'text-[#1a1a2e] dark:text-white'}`}>
                    {shippingFee === 0 ? "ÜCRETSİZ" : "49,90 TL"}
                  </span>
                </div>

                <div className="flex justify-between items-end pt-4 border-t border-gray-200 dark:border-gray-800 mt-4">
                  <span className="text-lg font-bold text-[#1a1a2e] dark:text-white transition-colors">Genel Toplam</span>
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#1a1a2e] dark:text-white tracking-tighter transition-colors">
                      {grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="w-full mt-8 py-4 bg-gradient-to-r from-[#5aacf0] to-[#2ec4a0] text-white rounded-2xl font-bold shadow-[0_10px_20px_rgba(90,172,240,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
                Ödemeye Geç <Icon name="ArrowRightIcon" size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <ReferralModal isOpen={isReferralOpen} onClose={() => setIsReferralOpen(false)} />
    </>
  );
}