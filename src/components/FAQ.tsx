"use client";

import { useState } from "react";
import Image from "next/image";

const FAQS = [
  { q: "Wie zahle ich am Automaten mit Karte?", a: "An den meisten unserer Automaten ist eine kontaktlose Kartenzahlung möglich. Halte hierzu die Karte kurz an das Lesegerät, wähle die Produktnummer und halte die Karte zur Bestätigung erneut vor, bis der Aufzug sich bewegt." },
  { q: "Wie bestelle ich?", a: "Wenn du zu weit weg von unseren Automaten wohnst, frag über unser Kontaktformular an! Gib uns deine Bestellung sowie deine Kontaktdaten und Lieferadresse durch. Unser Büro meldet sich bei dir und wir schicken dir die Soßen nach Zahlungseingang zu!" },
  { q: "Wie lange ist die Soße haltbar?", a: "Wir versuchen die Versandwege so kurz wie möglich zu halten. Damit ist unsere Soße mindestens 4 Monate haltbar, wenn sie bei dir ankommt." },
  { q: "Muss die Soße in den Kühlschrank?", a: "Unsere Soßen sollten kühl und vor Licht geschützt gelagert werden. Nach Anbruch bitte im Kühlschrank aufbewahren! So hast du lange was davon." },
  { q: "Wie bezahle ich?", a: "An unseren Automaten kannst du mit Karte oder in Bar zahlen (Ausnahme Nickepütz: nur Barzahlung!). Wenn du die Soßen bei uns bestellst, kannst du per Überweisung zahlen." },
  { q: "Wie hoch sind die Versandkosten?", a: "Bis 8 Flaschen berechnen wir eine Versandpauschale von 8€. Größere Mengen müssen gesondert angefragt und berechnet werden." },
  { q: "Was tue ich bei einer Störung am Automaten?", a: "Ruf einfach die Störungsnummer auf dem jeweiligen Automaten an. Wir lösen dein Problem telefonisch, oder sind in wenigen Minuten bei dir." },
  { q: "Wo finde ich eure Soßen noch?", a: "Unsere Soßen findest du auch in ausgewählten EDEKA Märkten im Kreis Düren, sowie im REWE Markt in Nideggen." },
  { q: "Was kostet eine Flasche?", a: "Eine Flasche kostet 4,99€. Versandkosten kommen bei Online-Bestellungen hinzu." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 relative">
      <div className="max-w-[1200px] mx-auto px-5 relative">
        {/* Decorative Mr. Curry stickers */}
        <Image
          src="/images/Mr._Curry01.png"
          alt=""
          width={120}
          height={120}
          className="absolute -left-8 top-4 w-[clamp(70px,9vw,110px)] -rotate-[10deg] opacity-70 pointer-events-none hidden lg:block drop-shadow-[0_14px_40px_rgba(0,0,0,0.55)]"
          aria-hidden="true"
        />
        <Image
          src="/images/Mr._Curry02.png"
          alt=""
          width={110}
          height={110}
          className="absolute -right-8 bottom-8 w-[clamp(65px,8vw,100px)] rotate-[10deg] opacity-65 pointer-events-none hidden lg:block drop-shadow-[0_14px_40px_rgba(0,0,0,0.55)]"
          aria-hidden="true"
        />

        <div className="font-mono text-xs tracking-[0.08em] uppercase text-white/70 mb-1">FAQ</div>
        <h2 className="text-[clamp(22px,3vw,36px)] font-bold leading-tight mb-8">Kurz gefragt, klar beantwortet</h2>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-colors hover:border-white/15"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-4 text-left font-bold text-white/90 hover:text-white transition-colors"
              >
                <span className="text-[15px]">{faq.q}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`shrink-0 opacity-80 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div
                className="grid transition-all duration-200 ease-out"
                style={{ gridTemplateRows: openIndex === i ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 text-white/70 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
