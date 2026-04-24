"use client";
import React, { useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";
import { useCart } from "@/context/CartContext";

const initialForm = {
  firstName: "", lastName: "", email: "", phone: "",
  address: "", city: "", zip: "",
  cardNumber: "", cardExpiry: "", cardCvc: "", cardName: ""
};

export default function CheckoutContent() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // KARGO HESAPLAMALARI
  const FREE_SHIPPING_THRESHOLD = 2500;
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - totalPrice, 0);
  const progressPercentage = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  
  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : 49.9;
  const grandTotal = totalPrice + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === "cardNumber") formatted = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    if (name === "cardExpiry") formatted = value.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");
    if (name === "cardCvc") formatted = value.replace(/\D/g, "").slice(0, 3);
    if (name === "phone") formatted = value.replace(/\D/g, "").slice(0, 11);
    setForm((prev) => ({ ...prev, [name]: formatted }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      clearCart();
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-5 animate-fade-in text-center">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(74,222,128,0.3)] animate-bounce">
          <Icon name="CheckCircleIcon" size={48} />
        </div>
        <h2 className="text-3xl font-bold text-[#1a1a2e] dark:text-white mb-4">Siparişiniz Alındı!</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
          Lumina Tech ailesine hoş geldiniz. Sipariş detaylarınız {form.email} adresine gönderilmiştir.
        </p>
        <Link href="/homepage" className="px-8 py-4 bg-gradient-to-r from-[#5aacf0] to-[#2ec4a0] text-white rounded-full font-bold shadow-lg hover:scale-105 transition-all">
          Alışverişe Dön
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center py-20 animate-fade-in text-center">
        <h2 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-4">Sepetiniz Boş</h2>
        <Link href="/homepage" className="px-8 py-3 bg-[#1a1a2e] dark:bg-white text-white dark:text-black rounded-full font-medium">Alışverişe Başla</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto px-5 py-10 transition-colors duration-500">
      <h1 className="text-3xl font-bold tracking-tight text-[#1a1a2e] dark:text-white mb-10">Ödeme Yap</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* SOL: Form Alanı */}
        <div className="flex-1">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            
            <div className="bg-white dark:bg-[#111827] p-6 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
              <h2 className="text-xl font-bold text-[#1a1a2e] dark:text-white mb-6">İletişim Bilgileri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required name="firstName" value={form.firstName} onChange={handleChange} type="text" placeholder="Adınız" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#5aacf0] outline-none text-[#1a1a2e] dark:text-white transition-colors" />
                <input required name="lastName" value={form.lastName} onChange={handleChange} type="text" placeholder="Soyadınız" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#5aacf0] outline-none text-[#1a1a2e] dark:text-white transition-colors" />
                <input required name="email" value={form.email} onChange={handleChange} type="email" placeholder="E-posta Adresiniz" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#5aacf0] outline-none text-[#1a1a2e] dark:text-white transition-colors md:col-span-2" />
                <input required name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="Telefon (5XX)" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#5aacf0] outline-none text-[#1a1a2e] dark:text-white transition-colors md:col-span-2" />
              </div>
            </div>

            <div className="bg-white dark:bg-[#111827] p-6 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
              <h2 className="text-xl font-bold text-[#1a1a2e] dark:text-white mb-6">Ödeme Bilgileri</h2>
              <div className="space-y-4">
                <input required name="cardName" value={form.cardName} onChange={handleChange} type="text" placeholder="Kart Üzerindeki İsim" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#5aacf0] outline-none text-[#1a1a2e] dark:text-white transition-colors" />
                <input required name="cardNumber" value={form.cardNumber} onChange={handleChange} type="text" placeholder="Kart Numarası (XXXX XXXX XXXX XXXX)" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#5aacf0] outline-none text-[#1a1a2e] dark:text-white transition-colors font-mono" />
                <div className="grid grid-cols-2 gap-4">
                  <input required name="cardExpiry" value={form.cardExpiry} onChange={handleChange} type="text" placeholder="AA/YY" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#5aacf0] outline-none text-[#1a1a2e] dark:text-white transition-colors font-mono" />
                  <input required name="cardCvc" value={form.cardCvc} onChange={handleChange} type="password" placeholder="CVC" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#5aacf0] outline-none text-[#1a1a2e] dark:text-white transition-colors font-mono" />
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* SAĞ: Özet ve Kargo Barı */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-gray-50 dark:bg-[#111827] p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 sticky top-24 transition-colors">
            
            {/* DİNAMİK KARGO BARI */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 mb-6 border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${remainingForFreeShipping > 0 ? 'bg-[#5aacf0]/10 text-[#5aacf0]' : 'bg-[#2ec4a0]/10 text-[#2ec4a0]'}`}>
                  <Icon name="TruckIcon" size={20} />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#1a1a2e] dark:text-white leading-tight">
                    {remainingForFreeShipping > 0 ? `Ücretsiz kargoya ${remainingForFreeShipping.toLocaleString('tr-TR')} TL kaldı!` : "Harika! Kargonuz Bedava"}
                  </p>
                  {remainingForFreeShipping > 0 && (
                     <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Sepetinize ürün eklemeye devam edin.</p>
                  )}
                </div>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                 <div className={`h-full transition-all duration-700 ease-out ${remainingForFreeShipping > 0 ? 'bg-[#5aacf0]' : 'bg-[#2ec4a0]'}`} style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-[#1a1a2e] dark:text-white mb-6">Sipariş Özeti</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-300 truncate pr-4">{item.quantity}x {item.name}</span>
                  <span className="font-medium text-[#1a1a2e] dark:text-white shrink-0">{(item.price * item.quantity).toLocaleString('tr-TR')} TL</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
                <span>Ara Toplam</span>
                <span>{totalPrice.toLocaleString('tr-TR')} TL</span>
              </div>
              <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
                <span>Kargo</span>
                <span className={`font-bold ${shipping === 0 ? 'text-[#2ec4a0]' : 'text-[#1a1a2e] dark:text-white'}`}>
                  {shipping === 0 ? "ÜCRETSİZ" : "49,90 TL"}
                </span>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-gray-200 dark:border-gray-800 mt-4">
                <span className="text-lg font-bold text-[#1a1a2e] dark:text-white">Genel Toplam</span>
                <span className="text-2xl font-black text-[#1a1a2e] dark:text-white tracking-tighter">
                  {grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL
                </span>
              </div>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              disabled={loading}
              className="w-full mt-8 py-4 bg-gradient-to-r from-[#5aacf0] to-[#2ec4a0] text-white rounded-2xl font-bold shadow-[0_10px_20px_rgba(90,172,240,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  İşleniyor...
                </span>
              ) : (
                <>Siparişi Tamamla <Icon name="CheckCircleIcon" size={18} /></>
              )}
            </button>
            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
              <Icon name="ShieldCheckIcon" size={14} /> 256-bit SSL ile güvenli ödeme
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}