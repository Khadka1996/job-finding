"use client";

import { MessageCircleMore } from "lucide-react";

export function WhatsAppButton() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "15551234567";
  const href = `https://wa.me/${whatsappNumber}?text=Hello%20I%20am%20interested%20in%20jobs`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact via WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#14213d] px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-[#14213d]/30 transition hover:-translate-y-0.5 hover:bg-[#0e1831]"
    >
      <MessageCircleMore className="h-4 w-4" />
      WhatsApp
    </a>
  );
}