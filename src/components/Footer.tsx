import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-gradient-to-b from-transparent to-black/25 pt-8 pb-12 text-white/70">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.7fr] gap-6 mb-8">
          <div>
            <div className="font-mono text-xs tracking-[0.08em] uppercase text-white/70">Die Wurst Box</div>
            <div className="text-white/50 text-sm mt-2">Premium-Soßen am Automaten und per Bestellung.</div>
            <div className="text-white/40 text-sm mt-3">
              &copy; {new Date().getFullYear()} Die Wurst Box
            </div>
          </div>
          <div>
            <div className="flex gap-2 flex-wrap">
              <a href="#impressum" className="px-3 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-[13px] text-white/75 hover:text-white hover:border-white/16 hover:bg-white/[0.05] transition-all">Impressum</a>
              <a href="#datenschutz" className="px-3 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-[13px] text-white/75 hover:text-white hover:border-white/16 hover:bg-white/[0.05] transition-all">Datenschutz</a>
              <a href="#kontakt" className="px-3 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-[13px] text-white/75 hover:text-white hover:border-white/16 hover:bg-white/[0.05] transition-all">Kontakt</a>
            </div>
          </div>
        </div>

        {/* Impressum */}
        <div id="impressum" className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_18px_60px_rgba(0,0,0,0.55)] overflow-hidden mb-4">
          <div className="relative p-5 md:p-8">
            <div className="flex justify-center mb-6">
              <Image
                src="/images/MittlerLogo.png"
                alt="Mittler Gastronomie"
                width={320}
                height={120}
                className="max-w-[320px] w-full drop-shadow-[0_14px_40px_rgba(0,0,0,0.45)]"
              />
            </div>

            <div className="font-mono text-xs tracking-[0.08em] uppercase text-white/70 mb-1">Impressum</div>
            <p className="text-white/50 text-sm mb-4">Angaben gemäß § 5 TMG</p>

            <div className="h-px bg-white/10 mb-5" />

            <div className="font-mono text-xs tracking-[0.08em] uppercase text-white/70 mb-3">Nikolaus Josef Mittler Gastronomie</div>
            <div className="space-y-1.5 text-sm mb-6">
              <div className="flex gap-2 text-white/80"><span className="text-white/50 shrink-0">Telefon:</span><code className="font-mono text-xs bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-lg text-white/85">0 24 21 - 22 3 44 45</code></div>
              <div className="flex gap-2 text-white/80"><span className="text-white/50 shrink-0">Mail:</span><code className="font-mono text-xs bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-lg text-white/85">zentrale@mittler-gastro.de</code></div>
              <div className="flex gap-2 text-white/80"><span className="text-white/50 shrink-0">Registergericht:</span><code className="font-mono text-xs bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-lg text-white/85">Düren</code></div>
              <div className="flex gap-2 text-white/80"><span className="text-white/50 shrink-0">USt-IdNr.:</span><code className="font-mono text-xs bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-lg text-white/85">DE123438291</code></div>
            </div>

            <div className="h-px bg-white/10 mb-5" />

            <div className="font-mono text-xs tracking-[0.08em] uppercase text-white/70 mb-3">Patricia Mittler Gastronomie</div>
            <div className="space-y-1.5 text-sm mb-6">
              <div className="flex gap-2 text-white/80"><span className="text-white/50 shrink-0">Telefon:</span><code className="font-mono text-xs bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-lg text-white/85">0 24 21 - 22 3 44 45</code></div>
              <div className="flex gap-2 text-white/80"><span className="text-white/50 shrink-0">Mail:</span><code className="font-mono text-xs bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-lg text-white/85">zentrale@mittler-gastro.de</code></div>
              <div className="flex gap-2 text-white/80"><span className="text-white/50 shrink-0">Registergericht:</span><code className="font-mono text-xs bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-lg text-white/85">Düren</code></div>
              <div className="flex gap-2 text-white/80"><span className="text-white/50 shrink-0">HRB-Nummer:</span><code className="font-mono text-xs bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-lg text-white/85">folgt</code></div>
              <div className="flex gap-2 text-white/80"><span className="text-white/50 shrink-0">USt-IdNr.:</span><code className="font-mono text-xs bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-lg text-white/85">DE70432968711</code></div>
            </div>

            <div className="h-px bg-white/10 mb-5" />

            <div className="font-mono text-xs tracking-[0.08em] uppercase text-white/70 mb-3">Zuständige Aufsichtsbehörde</div>
            <p className="text-white/60 text-sm">Das Gewerbeaufsichtsamt Düren ist die zuständige Aufsichtsbehörde für diese Betriebe.</p>
          </div>
        </div>

        {/* Datenschutz */}
        <div id="datenschutz" className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_18px_60px_rgba(0,0,0,0.55)] overflow-hidden">
          <div className="p-5 md:p-8">
            <div className="font-mono text-xs tracking-[0.08em] uppercase text-white/70 mb-1">Datenschutz</div>
            <p className="text-white/50 text-sm">Platzhalter. Hier kommen später Infos zur Datenverarbeitung, Hosting, Kontaktformular, Logs, Rechte der Betroffenen.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
