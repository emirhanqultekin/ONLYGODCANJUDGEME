import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartContent from "./components/CartContent";

export const metadata = {
  title: "Sepetim | Lumina Tech",
  description: "Lumina Tech sepetiniz",
};

export default function CartPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="min-h-screen pt-32 pb-20 bg-[#f7f9fc] dark:bg-[#0a0f1c] transition-colors duration-500">
      <CartContent />
    </div>
      <Header />
      <CartContent />
      <Footer />
    </main>
  );
}