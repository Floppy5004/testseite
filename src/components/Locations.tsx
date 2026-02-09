"use client";

import { useState } from "react";
import Image from "next/image";

const LOCATIONS = [
  { name: "Die Wurstbox", size: "S", label: "kompakt", address: "Nickepütz 26, 52349 Düren", hours: "24/7 zugänglich", payment: "Nur Barzahlung" },
  { name: "Die Wurstbox", size: "M", label: "mehr Auswahl", address: "Römerstraße 2, 52382 Niederzier", hours: "06:00 – 22:00", payment: null },
  { name: "Die Wurstbox", size: "L", label: "groß", address: "Bahnstraße 11, 52355 Düren", hours: "24/7 zugänglich", payment: null },
  { name: "Die Wurstbox", size: "L", label: "groß", address: "Dürener Straße 317, 52249 Eschweiler", hours: "24/7 zugänglich", payment: null },
];

const CAROUSEL_IMAGES = [
  { src: "/images/WurstboxSNickepuetz.jpg", title: "Die Wurstbox S – Nickepütz" },
  { src: "/images/WurstboxM.jpg", title: "Die Wurstbox M – Niederzier" },
  { src: "/images/WurstBoxAutomat.jpg", title: "Die Wurstbox L – Düren" },
  { src: "/images/WurstboxLEschweiler.jpg", title: "Die Wurstbox L – Eschweiler" },
];

export default function Locations() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [fullscreenImg, setFullscreenImg] = useState<{ src: string; title: string } | null>(null);

  const prev = () => setCarouselIndex((i) => (i - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  const next = () => setCarouselIndex((i) => (i + 1) % CAROUSEL_IMAGES.length);
  const current = CAROUSEL_IMAGES[carouselIndex];

  return (
    <section id="standorte" className="py-12">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="font-mono text-xs tracking-[0.08em] uppercase text-white/70 mb-1">Standorte</div>
        <h2 className="text-[clamp(22px,3vw,36px)] font-bold leading-tight mb-8">Wo steht die Box</h2>

        {/* Location cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {LOCATIONS.map((loc, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_18px_60px_rgba(0,0,0,0.55)] overflow-hidden relative">
              <div className="absolute inset-[-2px] pointer-events-none rounded-2xl" style={{
                background: "radial-gradient(300px 160px at 15% 0%, rgba(225,6,0,0.08), transparent 60%)"
              }} />
              <div className="relative p-5">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-base font-bold">{loc.name} <span className="text-white/50">{loc.size}</span></h3>
                  <span className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full border border-white/12 bg-black/20 text-white/85">
                    <strong className="text-white">{loc.size}</strong>{loc.label}
                  </span>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex gap-2 text-white/80">
                    <span className="text-white/50 shrink-0">Adresse:</span>
                    <code className="font-mono text-xs bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-lg text-white/85">{loc.address}</code>
                  </div>
                  <div className="flex gap-2 text-white/80">
                    <span className="text-white/50 shrink-0">Zeiten:</span>
                    <span className="text-white/70">{loc.hours}</span>
                  </div>
                  {loc.payment && (
                    <div className="flex gap-2 text-white/80">
                      <span className="text-white/50 shrink-0">Zahlung:</span>
                      <span className="text-white/70">{loc.payment}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_18px_60px_rgba(0,0,0,0.55)] overflow-hidden relative">
          <div className="absolute inset-[-2px] pointer-events-none rounded-3xl" style={{
            background: "radial-gradient(420px 220px at 50% 0%, rgba(225,6,0,0.10), transparent 60%)"
          }} />
          <div className="relative p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-mono text-xs tracking-[0.08em] uppercase text-white/70">Unsere Automaten</div>
                <h3 className="text-lg font-bold mt-1">Zum Durchklicken</h3>
              </div>
            </div>

            {/* Stage */}
            <div className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.45)] mb-4">
              <Image
                src={current.src}
                alt={current.title}
                width={1100}
                height={600}
                className="w-full h-auto"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <button onClick={prev} className="px-3.5 py-2 rounded-xl text-[13px] font-medium border border-white/14 bg-white/[0.06] text-white/80 hover:bg-white/[0.08] transition-all">
                Zurück
              </button>

              <div className="flex gap-2 items-center">
                {CAROUSEL_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full border transition-all ${i === carouselIndex ? "bg-red/75 border-red/85 shadow-[0_0_10px_rgba(225,6,0,0.5)]" : "border-white/22 bg-white/10 hover:bg-white/20"}`}
                    aria-label={`Bild ${i + 1}`}
                  />
                ))}
              </div>

              <button onClick={next} className="px-3.5 py-2 rounded-xl text-[13px] font-medium border border-white/14 bg-white/[0.06] text-white/80 hover:bg-white/[0.08] transition-all">
                Weiter
              </button>
            </div>

            <button
              onClick={() => setFullscreenImg(current)}
              className="mt-3 w-full px-3.5 py-2 rounded-xl text-[13px] font-medium border border-white/14 bg-white/[0.06] text-white/80 hover:bg-white/[0.08] transition-all text-center"
            >
              Bild groß ansehen
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen */}
      {fullscreenImg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setFullscreenImg(null)}>
          <div className="relative max-w-[980px] w-full rounded-2xl border border-white/16 bg-[rgba(0,0,0,0.9)] shadow-[0_18px_60px_rgba(0,0,0,0.55)] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <b className="text-sm">{fullscreenImg.title}</b>
              <button onClick={() => setFullscreenImg(null)} className="px-3 py-1.5 rounded-xl border border-white/14 bg-white/[0.06] text-sm text-white/80">Schließen</button>
            </div>
            <div className="p-4">
              <Image src={fullscreenImg.src} alt={fullscreenImg.title} width={960} height={640} className="w-full h-auto rounded-xl border border-white/10" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
