"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "./CartProvider";

const NAV_LINKS = [
  { href: "#produkte", label: "Produkte", spy: "produkte" },
  { href: "#ueber-uns", label: "Über uns", spy: "ueber-uns" },
  { href: "#standorte", label: "Standorte", spy: "standorte" },
  { href: "#faq", label: "FAQ", spy: "faq" },
  { href: "#kontakt", label: "Kontakt", spy: "kontakt" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.spy)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.05, 0.2, 0.5] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[rgba(11,11,12,0.72)] border-b border-white/[0.08]">
      <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between h-[68px]">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3 shrink-0" aria-label="Zurück nach oben">
          <div className="w-11 h-11 rounded-xl border border-white/10 bg-black/40 shadow-lg overflow-hidden flex items-center justify-center p-1.5">
            <Image src="/images/WurstBoxLogo.png" alt="Die Wurst Box" width={36} height={36} className="object-contain" />
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-sm tracking-wide leading-tight">Die Wurst Box</div>
            <div className="font-mono text-[11px] text-white/50 tracking-wider uppercase">Premium-Soßen</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2" aria-label="Navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.spy}
              href={link.href}
              className={`
                px-3.5 py-2 rounded-full text-[13px] font-medium border transition-all duration-150
                ${activeSection === link.spy
                  ? "border-red/40 bg-red/10 text-white shadow-[0_0_0_1px_rgba(225,6,0,0.18)_inset]"
                  : "border-white/10 bg-white/[0.03] text-white/75 hover:text-white hover:bg-white/[0.06] hover:-translate-y-px"
                }
              `}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side: Cart + Mobile menu */}
        <div className="flex items-center gap-3">
          {/* Cart button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative px-3.5 py-2 rounded-full text-[13px] font-medium border border-white/10 bg-white/[0.03] text-white/75 hover:text-white hover:bg-white/[0.06] transition-all duration-150"
            aria-label="Warenkorb öffnen"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red text-[10px] font-bold text-white flex items-center justify-center shadow-[0_0_12px_rgba(225,6,0,0.6)]">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden px-2.5 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-white/75"
            aria-label="Menü"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-white/[0.08] bg-[rgba(11,11,12,0.95)] backdrop-blur-xl px-5 py-4 flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.spy}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`
                px-4 py-2.5 rounded-xl text-sm font-medium border transition-all
                ${activeSection === link.spy
                  ? "border-red/40 bg-red/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-white/75"
                }
              `}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
