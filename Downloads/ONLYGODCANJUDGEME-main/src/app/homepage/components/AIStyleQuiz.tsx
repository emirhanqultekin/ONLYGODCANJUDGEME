"use client";
import React, { useState } from "react";
import Icon from "@/components/ui/AppIcon";
import { useCart } from "@/context/CartContext";

const productDatabase = [
  {
    id: "aura-wristband",
    name: "Aura Wristband",
    category: "active",
    priceNum: 1299,
    priceStr: "₺1.299",
    desc: "7/24 sağlık takibi ve GPS ile aktif yaşamın için mükemmel eşlik.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "sonic-buds",
    name: "Sonic Buds",
    category: "music",
    priceNum: 899,
    priceStr: "₺899",
    desc: "40dB ANC ve kristal ses kalitesiyle müziğe gömülürsün.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "nova-speaker",
    name: "Nova Speaker",
    category: "social",
    priceNum: 1599,
    priceStr: "₺1.599",
    desc: "360° surround ses ve 30 saat pil ile her ortamı doldur.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop"
  }
];

const questions = [
  {
    id: 1, question: "Sabahları ilk yaptığın şey nedir?", emoji: "☕",
    options: [
      { value: "active", label: "Koşu veya Esneme", icon: "BoltIcon" },
      { value: "music", label: "Müzik Açmak", icon: "MusicalNoteIcon" },
      { value: "social", label: "Mesajlara Bakmak", icon: "UserGroupIcon" },
    ],
  },
  {
    id: 2, question: "Teknolojide en çok neye önem verirsin?", emoji: "🎯",
    options: [
      { value: "active", label: "Dayanıklılık", icon: "ShieldCheckIcon" },
      { value: "music", label: "Ses Netliği", icon: "SpeakerWaveIcon" },
      { value: "social", label: "Tasarım & Trend", icon: "SparklesIcon" },
    ],
  },
  {
    id: 3, question: "İdeal hafta sonun hangisi?", emoji: "⛰️",
    options: [
      { value: "active", label: "Doğa Yürüyüşü", icon: "MapIcon" },
      { value: "music", label: "Evde Dinlenmek", icon: "HomeIcon" },
      { value: "social", label: "Partilemek", icon: "UserGroupIcon" },
    ],
  },
  {
    id: 4, question: "Hangi renk paleti seni yansıtıyor?", emoji: "🎨",
    options: [
      { value: "active", label: "Neon & Enerjik", icon: "FireIcon" },
      { value: "music", label: "Mat & Minimal", icon: "Squares2X2Icon" },
      { value: "social", label: "Pastel & Canlı", icon: "FaceSmileIcon" },
    ],
  },
  {
    id: 5, question: "En çok nerede vakit geçirirsin?", emoji: "🏠",
    options: [
      { value: "active", label: "Spor Salonunda", icon: "TrophyIcon" },
      { value: "music", label: "Kendi Odamda", icon: "HomeIcon" },
      { value: "social", label: "Kafelerde", icon: "MapPinIcon" },
    ],
  },
];

function getResult(answers: string[]) {
  if (answers.length === 0) return null;
  const score: Record<string, number> = {};
  answers.forEach((val) => { score[val] = (score[val] || 0) + 1; });
  const topCategory = Object.keys(score).reduce((a, b) => (score[a] > score[b] ? a : b));
  return productDatabase.find(p => p.category === topCategory) || productDatabase[0];
}

export default function AIStyleQuiz() {
  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleStart = () => setStep("quiz");

  const handleOption = (value: string) => {
    setSelected(value);
    setTimeout(() => {
      const newAnswers = [...answers, value];
      if (currentQ + 1 < questions.length) {
        setAnswers(newAnswers);
        setCurrentQ(currentQ + 1);
        setSelected(null);
      } else {
        setAnswers(newAnswers);
        setStep("result");
      }
    }, 400);
  };

  const handleReset = () => {
    setStep("intro");
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setAddedToCart(false);
  };

  const result = step === "result" ? getResult(answers) : null;

  const handleAddToCart = () => {
    if (!result) return;
    addItem({ id: result.id, name: result.name, price: result.priceNum, image: result.image });
    setAddedToCart(true);
  };

  return (
    <section id="quiz" className="py-20 md:py-28 bg-[#f7f9fc] dark:bg-[#0a0f1c] transition-colors duration-500">
      <div className="max-w-[680px] mx-auto px-5">
        <div className="text-center mb-10">
          <p className="apple-label mb-3">Tarzını Seç</p>
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.08] text-[#1a1a2e] dark:text-white transition-colors" style={{ letterSpacing: "-0.04em" }}>
            Sana Özel Lumina Tech'i
          </h2>
          <p className="text-[17px] font-light mt-3 text-[#8a8aaa] dark:text-gray-400 transition-colors" style={{ letterSpacing: "-0.01em" }}>
            bulmana yardım edelim
          </p>
        </div>

        <div className="rounded-[28px] p-8 md:p-10 bg-white/80 dark:bg-[#111827]/80 backdrop-blur-[24px] border border-white/90 dark:border-gray-800 shadow-[0_8px_40px_rgba(90,172,240,0.10)] dark:shadow-none transition-colors duration-500">
          {step === "intro" && (
            <div className="text-center animate-fade-in">
              <div className="text-5xl mb-6">LuminAI</div>
              <h3 className="text-[22px] font-semibold mb-3 tracking-[-0.02em] text-[#1a1a2e] dark:text-white transition-colors">
                5 Soru, 1 Mükemmel Eşleşme
              </h3>
              <p className="text-[15px] leading-relaxed mb-8 max-w-sm mx-auto text-[#8a8aaa] dark:text-gray-400 transition-colors">
                Yaşam tarzına göre en uygun Lumina Tech ürününü sana önerelim. Sadece 45 saniyeni alacak!
              </p>
              <button onClick={handleStart} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white text-[15px] font-medium tracking-[-0.01em] transition-all duration-250 hover:scale-[1.02] shadow-[0_8px_24px_rgba(90,172,240,0.30)]" style={{ background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)" }}>
                Quize Başla <Icon name="ArrowRightIcon" size={15} />
              </button>
            </div>
          )}

          {step === "quiz" && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-slate-200/80 dark:bg-gray-700">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${((currentQ + 1) / questions.length) * 100}%`, background: "linear-gradient(90deg, #5aacf0 0%, #2ec4a0 100%)" }} />
                </div>
                <span className="text-[12px] whitespace-nowrap text-[#8a8aaa] dark:text-gray-400">{currentQ + 1} / {questions.length}</span>
              </div>

              <div className="text-center mb-8">
                <div className="text-4xl mb-4">{questions[currentQ].emoji}</div>
                <h3 className="text-[20px] md:text-[22px] font-semibold tracking-[-0.02em] text-[#1a1a2e] dark:text-white transition-colors">
                  {questions[currentQ].question}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {questions[currentQ].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleOption(opt.value)}
                    className="relative rounded-[16px] p-5 text-left transition-all duration-200 border"
                    style={selected === opt.value ? { background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)", borderColor: "transparent", color: "white", transform: "scale(0.98)", boxShadow: "0 8px 24px rgba(90,172,240,0.30)" } : {}}
                    // Tailwind class'ları ile dark mode renkleri:
                    {...(!selected || selected !== opt.value ? { className: "relative rounded-[16px] p-5 text-left transition-all duration-200 border border-slate-200 dark:border-gray-700 bg-slate-50/90 dark:bg-gray-800 text-[#1a1a2e] dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700" } : {})}
                  >
                    <Icon name={opt.icon as any} size={20} className="mb-3" style={{ color: selected === opt.value ? "white" : "#5aacf0" } as React.CSSProperties} />
                    <p className="text-[13px] font-medium tracking-[-0.01em]">{opt.label}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "result" && result && (
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#5aacf0]/20" style={{ background: "linear-gradient(135deg, rgba(90,172,240,0.15) 0%, rgba(46,196,160,0.15) 100%)" }}>
                <Icon name="SparklesIcon" size={28} style={{ color: "#5aacf0" } as React.CSSProperties} />
              </div>
              <p className="apple-label mb-2">Senin için seçtik</p>
              <h3 className="text-[26px] font-bold mb-2 tracking-[-0.03em] text-[#1a1a2e] dark:text-white transition-colors">{result.name}</h3>
              <p className="text-[15px] mb-2 max-w-xs mx-auto leading-relaxed text-[#8a8aaa] dark:text-gray-400 transition-colors">{result.desc}</p>
              <p className="text-[24px] font-bold mb-8 tracking-[-0.03em]" style={{ background: "linear-gradient(90deg, #5aacf0 0%, #2ec4a0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{result.priceStr}</p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={handleAddToCart} disabled={addedToCart} className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-white text-[15px] font-medium tracking-[-0.01em] transition-all duration-200 hover:scale-[1.01]" style={addedToCart ? { background: "rgba(46,196,160,0.2)", color: "#2ec4a0", border: "1px solid rgba(46,196,160,0.3)" } : { background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)", boxShadow: "0 8px 24px rgba(90,172,240,0.28)" }}>
                  {addedToCart ? "✓ Sepete Eklendi" : "Sepete Ekle"}
                </button>
                <button onClick={handleReset} className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-[15px] font-medium transition-all duration-200 hover:scale-[1.01] text-[#5aacf0] border border-[#5aacf0]/30 bg-[#5aacf0]/5 dark:hover:bg-[#5aacf0]/10">
                  Tekrar Dene
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}