"use client";
import React, { useEffect } from "react";
import Icon from "./ui/AppIcon";

interface ToastProps {
  id: number;
  message: string;
  onClose: (id: number) => void;
}

export default function Toast({ id, message, onClose }: ToastProps) {
  // 3 saniye sonra sadece bu bildirimi (id ile) kapat
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 3000); 
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className="bg-white border border-gray-100 shadow-[0_10px_30px_rgba(90,172,240,0.2)] rounded-2xl p-4 flex items-center gap-3 w-80 pointer-events-auto animate-fade-in-up">
      <div className="w-10 h-10 bg-green-100 text-green-500 rounded-full flex items-center justify-center shrink-0">
        <Icon name="CheckIcon" size={20} />
      </div>
      <div className="flex-1">
        <p className="text-[14px] font-bold text-[#1a1a2e]">Başarılı!</p>
        <p className="text-[12px] text-gray-500 leading-tight mt-0.5">{message}</p>
      </div>
      <button onClick={() => onClose(id)} className="text-gray-300 hover:text-gray-500 transition-colors shrink-0">
        <Icon name="XMarkIcon" size={16} />
      </button>
    </div>
  );
}