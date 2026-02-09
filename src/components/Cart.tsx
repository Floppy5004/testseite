"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "./CartProvider";
import { supabase } from "@/lib/supabase";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, subtotal, shippingCost, total, isOpen, setIsOpen } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "done">("cart");
  const [sending, setSending] = useState(false);

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    // Create customer
    const { data: customer, error: custErr } = await supabase.from("customers").insert({
      email: fd.get("email") as string,
      first_name: fd.get("first_name") as string,
      last_name: fd.get("last_name") as string,
      phone: fd.get("phone") as string,
      street: fd.get("street") as string,
      city: fd.get("city") as string,
      zip: fd.get("zip") as string,
    }).select().single();

    if (custErr || !customer) {
      alert("Fehler beim Anlegen der Kundendaten. Bitte versuche es erneut.");
      setSending(false);
      return;
    }

    // Create order
    const { data: order, error: orderErr } = await supabase.from("orders").insert({
      customer_id: customer.id,
      total,
      shipping_cost: shippingCost,
      notes: fd.get("notes") as string || null,
    }).select().single();

    if (orderErr || !order) {
      alert("Fehler beim Erstellen der Bestellung.");
      setSending(false);
      return;
    }

    // Create order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      unit_price: item.price,
    }));

    await supabase.from("order_items").insert(orderItems);

    clearCart();
    setCheckoutStep("done");
    setSending(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setIsOpen(false); setCheckoutStep("cart"); }} />

      {/* Panel */}
      <div className="relative w-full max-w-[440px] h-full bg-[rgba(11,11,12,0.97)] border-l border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div>
            <h2 className="font-bold text-lg">Warenkorb</h2>
            <span className="text-xs text-white/50 font-mono">{totalItems} {totalItems === 1 ? "Artikel" : "Artikel"}</span>
          </div>
          <button
            onClick={() => { setIsOpen(false); setCheckoutStep("cart"); }}
            className="px-3 py-1.5 rounded-xl border border-white/14 bg-white/[0.06] text-sm text-white/80 hover:bg-white/[0.08] transition-colors"
          >
            Schließen
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {checkoutStep === "done" ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-ok/20 border border-ok/30 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3ddc97" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
              </div>
              <h3 className="text-xl font-bold">Bestellung aufgegeben!</h3>
              <p className="text-white/65 text-sm max-w-[280px]">Wir haben deine Bestellung erhalten und melden uns per E-Mail bei dir mit den Zahlungsdetails.</p>
              <button onClick={() => { setIsOpen(false); setCheckoutStep("cart"); }} className="px-5 py-2.5 rounded-xl border border-white/14 bg-white/[0.06] text-sm font-medium text-white/80 hover:bg-white/[0.08] transition-colors">
                Weiter einkaufen
              </button>
            </div>
          ) : checkoutStep === "form" ? (
            <form onSubmit={handleCheckout} className="space-y-3">
              <h3 className="font-bold text-base mb-2">Deine Daten</h3>
              <div className="grid grid-cols-2 gap-3">
                <input name="first_name" placeholder="Vorname" required className="px-3 py-2.5 rounded-xl border border-white/12 bg-black/30 text-sm text-white placeholder:text-white/30 outline-none focus:border-red/30 transition-all" />
                <input name="last_name" placeholder="Nachname" required className="px-3 py-2.5 rounded-xl border border-white/12 bg-black/30 text-sm text-white placeholder:text-white/30 outline-none focus:border-red/30 transition-all" />
              </div>
              <input name="email" type="email" placeholder="E-Mail" required className="w-full px-3 py-2.5 rounded-xl border border-white/12 bg-black/30 text-sm text-white placeholder:text-white/30 outline-none focus:border-red/30 transition-all" />
              <input name="phone" type="tel" placeholder="Telefon (optional)" className="w-full px-3 py-2.5 rounded-xl border border-white/12 bg-black/30 text-sm text-white placeholder:text-white/30 outline-none focus:border-red/30 transition-all" />
              <input name="street" placeholder="Straße + Nr." required className="w-full px-3 py-2.5 rounded-xl border border-white/12 bg-black/30 text-sm text-white placeholder:text-white/30 outline-none focus:border-red/30 transition-all" />
              <div className="grid grid-cols-3 gap-3">
                <input name="zip" placeholder="PLZ" required className="px-3 py-2.5 rounded-xl border border-white/12 bg-black/30 text-sm text-white placeholder:text-white/30 outline-none focus:border-red/30 transition-all" />
                <input name="city" placeholder="Stadt" required className="col-span-2 px-3 py-2.5 rounded-xl border border-white/12 bg-black/30 text-sm text-white placeholder:text-white/30 outline-none focus:border-red/30 transition-all" />
              </div>
              <textarea name="notes" placeholder="Anmerkungen (optional)" rows={2} className="w-full px-3 py-2.5 rounded-xl border border-white/12 bg-black/30 text-sm text-white placeholder:text-white/30 outline-none focus:border-red/30 transition-all resize-y" />

              <p className="text-xs text-white/40">Zahlung per Überweisung. Details erhältst du per E-Mail.</p>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setCheckoutStep("cart")} className="flex-1 px-4 py-2.5 rounded-xl border border-white/14 bg-white/[0.06] text-sm font-medium text-white/80 hover:bg-white/[0.08] transition-colors">
                  Zurück
                </button>
                <button type="submit" disabled={sending} className="flex-1 px-4 py-2.5 rounded-xl border border-red/40 bg-gradient-to-b from-red/28 to-red/12 text-sm font-semibold text-white hover:from-red/32 hover:to-red/16 transition-all disabled:opacity-50">
                  {sending ? "Wird gesendet..." : "Bestellen"}
                </button>
              </div>
            </form>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 text-white/40">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p className="text-sm">Dein Warenkorb ist leer</p>
              <a href="#produkte" onClick={() => setIsOpen(false)} className="text-red text-sm font-medium hover:underline">Zu den Produkten</a>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03]">
                  {item.image_url && (
                    <div className="w-16 h-16 rounded-lg border border-white/10 bg-black/20 overflow-hidden shrink-0">
                      <Image src={item.image_url} alt={item.name} width={64} height={64} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{item.name}</div>
                    <div className="text-white/50 text-xs font-mono">{item.price.toFixed(2).replace(".", ",")}€ / Stück</div>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-lg border border-white/14 bg-white/[0.06] text-sm flex items-center justify-center hover:bg-white/[0.08] transition-colors">−</button>
                      <span className="text-sm font-mono w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-lg border border-white/14 bg-white/[0.06] text-sm flex items-center justify-center hover:bg-white/[0.08] transition-colors">+</button>
                      <button onClick={() => removeItem(item.id)} className="ml-auto text-white/30 hover:text-red text-xs transition-colors">Entfernen</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer (only when cart has items and not in done/form step) */}
        {checkoutStep === "cart" && items.length > 0 && (
          <div className="border-t border-white/10 px-5 py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Zwischensumme</span>
              <span>{subtotal.toFixed(2).replace(".", ",")}€</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Versand {items.reduce((s, i) => s + i.quantity, 0) <= 8 ? "(bis 8 Flaschen)" : "(Sonderberechnung)"}</span>
              <span>{items.reduce((s, i) => s + i.quantity, 0) <= 8 ? `${shippingCost.toFixed(2).replace(".", ",")}€` : "Auf Anfrage"}</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex justify-between font-bold">
              <span>Gesamt</span>
              <span className="text-lg">{total.toFixed(2).replace(".", ",")}€</span>
            </div>
            <button
              onClick={() => setCheckoutStep("form")}
              className="w-full px-5 py-3 rounded-2xl font-semibold text-sm border border-red/40 bg-gradient-to-b from-red/28 to-red/12 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:from-red/32 hover:to-red/16 transition-all"
            >
              Zur Bestellung
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
