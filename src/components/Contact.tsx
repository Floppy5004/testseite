"use client";

import { useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{ title: string; msg: string } | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const subject = data.get("subject") as string;
    const message = data.get("message") as string;

    const { error } = await supabase.from("contact_messages").insert({ name, email, subject, message });

    if (error) {
      setToast({ title: "Fehler", msg: "Nachricht konnte nicht gesendet werden. Bitte versuche es erneut." });
    } else {
      setToast({ title: "Gesendet!", msg: "Deine Nachricht wurde erfolgreich übermittelt. Wir melden uns bei dir!" });
      form.reset();
    }

    setSending(false);
    setTimeout(() => setToast(null), 5000);
  }

  return (
    <section id="kontakt" className="py-12">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="font-mono text-xs tracking-[0.08em] uppercase text-white/70 mb-1">Kontakt</div>
        <h2 className="text-[clamp(22px,3vw,36px)] font-bold leading-tight mb-2">Sag Hallo oder schick uns deine Bestellung</h2>
        <p className="text-white/80 text-base max-w-2xl mb-8">
          Wenn du zu weit weg von unseren Automaten wohnst, frag hier über das Kontaktformular an.
          Gib uns deine Bestellung sowie deine Kontaktdaten und Lieferadresse durch.
        </p>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_18px_60px_rgba(0,0,0,0.55)] overflow-hidden relative">
          <div className="absolute inset-[-2px] pointer-events-none rounded-3xl" style={{
            background: "radial-gradient(420px 220px at 80% 0%, rgba(225,6,0,0.10), transparent 60%)"
          }} />
          <div className="relative p-5 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="space-y-1.5">
                  <span className="text-[13px] text-white/80">Name</span>
                  <input
                    name="name"
                    type="text"
                    placeholder="Dein Name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/12 bg-black/30 text-white placeholder:text-white/30 outline-none shadow-[0_1px_0_rgba(255,255,255,0.05)_inset] focus:border-red/30 focus:shadow-[0_0_0_3px_rgba(225,6,0,0.15)] transition-all"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-[13px] text-white/80">E-Mail</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="name@mail.de"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/12 bg-black/30 text-white placeholder:text-white/30 outline-none shadow-[0_1px_0_rgba(255,255,255,0.05)_inset] focus:border-red/30 focus:shadow-[0_0_0_3px_rgba(225,6,0,0.15)] transition-all"
                  />
                </label>
              </div>

              <label className="space-y-1.5 block">
                <span className="text-[13px] text-white/80">Betreff</span>
                <input
                  name="subject"
                  type="text"
                  placeholder="Bestellung / Frage / Kooperation"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/12 bg-black/30 text-white placeholder:text-white/30 outline-none shadow-[0_1px_0_rgba(255,255,255,0.05)_inset] focus:border-red/30 focus:shadow-[0_0_0_3px_rgba(225,6,0,0.15)] transition-all"
                />
              </label>

              <label className="space-y-1.5 block">
                <span className="text-[13px] text-white/80">Nachricht</span>
                <textarea
                  name="message"
                  placeholder="Bitte Bestellung, Anzahl Flaschen, Lieferadresse und ggf. Rückfragen."
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-white/12 bg-black/30 text-white placeholder:text-white/30 outline-none shadow-[0_1px_0_rgba(255,255,255,0.05)_inset] focus:border-red/30 focus:shadow-[0_0_0_3px_rgba(225,6,0,0.15)] transition-all resize-y min-h-[120px]"
                />
              </label>

              <p className="text-xs text-white/50">
                Deine Daten werden nur zur Bearbeitung deiner Anfrage verwendet und nicht an Dritte weitergegeben.
              </p>

              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl font-semibold text-sm border border-red/40 bg-gradient-to-b from-red/28 to-red/12 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:from-red/32 hover:to-red/16 hover:-translate-y-px transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
              >
                {sending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  "Absenden"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] w-[min(640px,calc(100%-24px))] rounded-2xl border border-white/14 bg-[rgba(0,0,0,0.85)] backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.55)] p-4 animate-fade-up">
          <div className="flex items-start justify-between gap-3">
            <div>
              <b className="block text-sm mb-0.5">{toast.title}</b>
              <span className="text-sm text-white/65">{toast.msg}</span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="px-3 py-1.5 rounded-xl border border-white/14 bg-white/[0.06] text-sm text-white/80 hover:bg-white/[0.08] transition-colors shrink-0"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
