"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useCart } from "./CartProvider";
import type { Tables } from "@/lib/database.types";

export default function Products() {
  const [products, setProducts] = useState<Tables<"products">[]>([]);
  const [dialogImg, setDialogImg] = useState<{ src: string; title: string } | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    supabase.from("products").select("*").order("sort_order").then(({ data }) => {
      if (data) setProducts(data);
    });
  }, []);

  const handleAddToCart = (product: Tables<"products">) => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image_url: product.image_url,
    });
  };

  return (
    <section id="produkte" className="py-16 relative">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="font-mono text-xs tracking-[0.08em] uppercase text-white/70 mb-1">Produkte</div>
        <h2 className="text-[clamp(22px,3vw,36px)] font-bold leading-tight mb-2">Feuersoße und Currysoße</h2>
        <p className="text-white/80 text-base max-w-2xl mb-8">
          Zwei Soßen für dein perfektes Grillerlebnis. Wir bringen Würze auf deinen Tisch.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {products.map((product) => (
            <article
              key={product.id}
              className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_18px_60px_rgba(0,0,0,0.55)] overflow-hidden"
            >
              {/* Card glow */}
              <div className="absolute inset-[-2px] pointer-events-none rounded-2xl opacity-90" style={{
                background: product.heat_level === "scharf"
                  ? "radial-gradient(420px 220px at 20% 0%, rgba(255,106,26,0.18), transparent 60%)"
                  : "radial-gradient(420px 220px at 20% 0%, rgba(61,220,151,0.12), transparent 60%)"
              }} />

              <div className="relative p-5 md:p-6">
                {/* Top row: tag + order button */}
                <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                  <span className={`
                    inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full border
                    ${product.heat_level === "scharf"
                      ? "border-ember/30 bg-ember/10 text-ember"
                      : "border-ok/22 bg-ok/8 text-ok"
                    }
                  `}>
                    {product.heat_level === "scharf" ? "🔥" : "🌶️"} {product.name} ({product.heat_level})
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold border border-red/40 bg-gradient-to-b from-red/25 to-red/10 text-white hover:from-red/30 hover:to-red/15 hover:-translate-y-px transition-all duration-150 shadow-lg"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    In den Warenkorb
                  </button>
                </div>

                {/* Product image */}
                {product.image_url && (
                  <div className="relative rounded-2xl border border-white/10 bg-black/20 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.45)] mb-5 group-hover:border-white/15 transition-colors">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                {/* Price tag */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-black text-white">{product.price.toFixed(2).replace(".", ",")}€</span>
                  <span className="text-xs text-white/50 font-mono">pro Flasche</span>
                </div>

                <h3 className="text-lg font-bold mb-2">{product.name} – {product.description?.split("–")[0]?.trim()}</h3>
                <p className="text-white/65 text-sm mb-4 leading-relaxed">{product.long_description}</p>

                <div className="font-mono text-xs tracking-[0.08em] uppercase text-white/70 mb-2">Verwendungsmöglichkeiten</div>
                <ul className="space-y-2 mb-4">
                  {product.slug === "currysosse" ? (
                    <>
                      <li className="text-white/75 text-sm"><b className="text-white">Perfekt zu Currywurst:</b> Verleihe dem Klassiker einen besonderen Touch.</li>
                      <li className="text-white/75 text-sm"><b className="text-white">Ideal zu Grillgut:</b> Ob zartes Steak oder würziger Grillkäse.</li>
                      <li className="text-white/75 text-sm"><b className="text-white">Dip-Deluxe:</b> Kartoffelecken, Gemüsesticks oder Käsewürfel.</li>
                    </>
                  ) : (
                    <>
                      <li className="text-white/75 text-sm"><b className="text-white">Feuriger Klassiker:</b> Für eine schärfere Variante der Currywurst.</li>
                      <li className="text-white/75 text-sm"><b className="text-white">Zu gegrilltem Gemüse:</b> Veredle Zucchini, Paprika oder Auberginen.</li>
                      <li className="text-white/75 text-sm"><b className="text-white">Besonderer Dip-Moment:</b> Perfekt für Pommes, Tapas oder Gemüsesticks.</li>
                    </>
                  )}
                </ul>

                {/* Nährwerte button */}
                {product.image_back_url && (
                  <button
                    onClick={() => setDialogImg({ src: product.image_back_url!, title: `${product.name} – Nährwerte` })}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-medium border border-white/14 bg-white/[0.06] text-white/80 hover:bg-white/[0.08] hover:-translate-y-px transition-all"
                  >
                    Nährwerte und Rückseite
                  </button>
                )}
              </div>
            </article>
          ))}

          {products.length === 0 && (
            <div className="col-span-full text-center py-20 text-white/40">
              <div className="inline-block w-8 h-8 border-2 border-white/20 border-t-red rounded-full animate-spin mb-3" />
              <p className="text-sm">Produkte werden geladen...</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Dialog */}
      {dialogImg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setDialogImg(null)}>
          <div className="relative max-w-[980px] w-full rounded-2xl border border-white/16 bg-[rgba(0,0,0,0.9)] shadow-[0_18px_60px_rgba(0,0,0,0.55)] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <b className="text-sm">{dialogImg.title}</b>
              <button onClick={() => setDialogImg(null)} className="px-3 py-1.5 rounded-xl border border-white/14 bg-white/[0.06] text-sm text-white/80 hover:bg-white/[0.08] transition-colors">
                Schließen
              </button>
            </div>
            <div className="p-4">
              <Image src={dialogImg.src} alt={dialogImg.title} width={960} height={640} className="w-full h-auto rounded-xl border border-white/10" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
