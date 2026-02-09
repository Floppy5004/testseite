import Image from "next/image";

const SECTIONS = [
  {
    kicker: "Willkommen",
    title: "Familie, Handwerk, Geschmack",
    text: "Seit über 40 Jahren steht unser Familienunternehmen für ehrliche Handwerkskunst und unverwechselbaren Genuss. Was einst als kleiner Familienbetrieb begann, ist über die Jahre zu einem Ort geworden, an dem Menschen zusammenkommen, um gutes Essen zu feiern. Jetzt bringen wir diese Leidenschaft für Qualität direkt zu Dir nach Hause – mit unserem neuen Onlineshop.",
    image: "/images/WurstBoxAutomatTag.jpg",
    reverse: false,
  },
  {
    kicker: "Unsere Soßen",
    title: "Der Anfang einer Genussreise",
    text: "Den Start machen unsere beiden unverwechselbaren Soßen: die würzig-süße Currysoße und die fruchtig-scharfe Feuersoße. Beide Soßen sind nicht nur für ihre perfekte Kombination aus fein abgestimmten Aromen bekannt, sondern sie sind auch vielseitig einsetzbar – ob klassisch zu Currywurst, als Marinade für Grillgut oder als raffinierter Dip.",
    image: "/images/CurrysosseVorne.jpg",
    reverse: true,
  },
  {
    kicker: "Mehr als Soßen",
    title: "Bald auch Grillgut und mehr",
    text: "Unser Onlineshop ist der erste Schritt, um unsere Liebe zum Grillen mit Dir zu teilen. Aber das ist nur der Anfang. Schon bald wirst Du hier eine Vielfalt an Produkten entdecken, die ebenso viel Herzblut und Qualität in sich tragen wie unsere Soßen. Freu Dich auf erstklassiges Grillgut, erlesene Gewürze und viele weitere Köstlichkeiten.",
    image: "/images/EPX_7412.jpg",
    reverse: false,
  },
];

export default function About() {
  return (
    <section id="ueber-uns" className="py-16">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="font-mono text-xs tracking-[0.08em] uppercase text-white/70 mb-1">Über uns</div>
        <h2 className="text-[clamp(22px,3vw,36px)] font-bold leading-tight mb-8">Tradition trifft auf echten Geschmack!</h2>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_18px_60px_rgba(0,0,0,0.55)] overflow-hidden">
          <div className="relative">
            <div className="absolute inset-[-2px] pointer-events-none rounded-3xl" style={{
              background: "radial-gradient(420px 220px at 20% 0%, rgba(225,6,0,0.12), transparent 60%)"
            }} />

            <div className="relative p-5 md:p-8 space-y-10">
              {SECTIONS.map((section, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start ${section.reverse ? "md:[direction:rtl] md:*:[direction:ltr]" : ""}`}
                >
                  <div className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                    <Image
                      src={section.image}
                      alt={section.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
                    <div className="font-mono text-xs tracking-[0.08em] uppercase text-white/70 mb-2">{section.kicker}</div>
                    <h3 className="text-lg font-bold mb-3">{section.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{section.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
