"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <>
      {/* Logo Banner */}
      <div className="flex justify-center py-4 px-5 border-b border-white/[0.06] bg-gradient-to-b from-black/50 to-black/10">
        <Image
          src="/images/WurstBoxLogo.png"
          alt="Die Wurst Box Logo"
          width={520}
          height={200}
          className="w-[min(520px,92vw)] h-auto drop-shadow-[0_14px_40px_rgba(0,0,0,0.55)]"
          priority
        />
      </div>

      <section id="top" className="relative py-12 md:py-20 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-[5%] w-[900px] h-[600px] bg-red/20 rounded-full blur-[120px] opacity-40" />
          <div className="absolute top-[10%] right-[5%] w-[700px] h-[500px] bg-ember/10 rounded-full blur-[100px] opacity-30" />
          <div className="absolute bottom-0 left-[25%] w-[600px] h-[400px] bg-red/8 rounded-full blur-[100px] opacity-25" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-5">
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_18px_60px_rgba(0,0,0,0.55)] overflow-hidden">
            {/* Inner glow */}
            <div className="absolute inset-[-2px] pointer-events-none rounded-3xl" style={{
              background: "radial-gradient(420px 220px at 20% 0%, rgba(225,6,0,0.18), transparent 60%), radial-gradient(360px 220px at 85% 25%, rgba(255,106,26,0.10), transparent 60%)"
            }} />

            <div className="relative p-6 md:p-10">
              {/* Mr. Curry sticker */}
              <Image
                src="/images/Mr._Curry01.png"
                alt=""
                width={180}
                height={180}
                className="absolute right-4 top-4 w-[clamp(100px,16vw,180px)] rotate-2 drop-shadow-[0_14px_40px_rgba(0,0,0,0.55)] opacity-90 pointer-events-none hidden sm:block"
                style={{ animation: "float 6s ease-in-out infinite" }}
                aria-hidden="true"
              />

              <div className="flex gap-2 items-center mb-4">
                <span className="w-2 h-2 rounded-full bg-red shadow-[0_0_18px_rgba(225,6,0,0.5)]" style={{ animation: "glow-pulse 2s ease-in-out infinite" }} />
                <span className="font-mono text-xs tracking-[0.08em] uppercase text-white/70">
                  Premium-Soßen, Familientradition
                </span>
              </div>

              <h1 className="text-[clamp(32px,4.5vw,58px)] font-black leading-[1.02] tracking-tight mb-4 max-w-2xl">
                Feuersoße<br />
                <span className="bg-gradient-to-r from-red via-ember to-red bg-clip-text text-transparent">&amp; Currysoße</span>
              </h1>

              <p className="text-white/80 text-lg max-w-xl mb-6 leading-relaxed">
                Zwei Soßen für dein perfektes Grillerlebnis. Wir bringen Würze auf deinen Tisch.
                Egal ob fruchtig, scharf oder würzig-süß: Hier ist für jeden etwas dabei.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-black/20 text-[13px] text-white/80">
                  <strong className="text-white">2</strong> Soßen, klarer Fokus
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-black/20 text-[13px] text-white/80">
                  <strong className="text-white">Familie</strong> seit Jahrzehnten
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-black/20 text-[13px] text-white/80">
                  <strong className="text-white">Vielseitig</strong> Grill, Currywurst, Dip
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#produkte" className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl font-semibold text-sm border border-red/40 bg-gradient-to-b from-red/30 to-red/12 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:from-red/35 hover:to-red/16 hover:-translate-y-px transition-all duration-150">
                  Zu den Soßen
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                </a>
                <a href="#ueber-uns" className="inline-flex items-center justify-center px-5 py-3 rounded-2xl font-semibold text-sm border border-white/14 bg-white/[0.06] text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:bg-white/[0.08] hover:-translate-y-px transition-all duration-150">
                  Über uns
                </a>
                <a href="#kontakt" className="inline-flex items-center justify-center px-5 py-3 rounded-2xl font-semibold text-sm border border-white/14 bg-white/[0.06] text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:bg-white/[0.08] hover:-translate-y-px transition-all duration-150">
                  Bestellung anfragen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
