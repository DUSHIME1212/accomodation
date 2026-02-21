"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageContext";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navContainer = useRef(null);

  const navLinks = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.apartments, path: "/apartments" },
    { name: t.nav.amenities, path: "/amenities" },
    { name: t.nav.gallery, path: "/gallery" },
    { name: t.nav.contact, path: "/contact" },
  ];

  // GSAP for Mobile Menu staggered reveal
  useGSAP(() => {
    if (mobileMenuOpen) {
      gsap.fromTo(
        ".mobile-link",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power4.out",
          duration: 0.8,
          delay: 0.2,
        },
      );
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Show/Hide logic
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false); // Scrolling Down
      } else {
        setIsVisible(true); // Scrolling Up
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={navContainer}
      className={cn(
        "fixed top-0 right-0 left-0 z-[100] transition-all duration-700 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full",
        isScrolled ? "px-4 py-3 md:px-8" : "px-6 py-6 md:px-12 lg:px-20",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-2.5 transition-all duration-500",
          isScrolled
            ? "bg-background/80 border-border/40 border shadow-lg backdrop-blur-lg"
            : "bg-transparent",
        )}
      >
        {/* Left: Language & Technical Marker */}
        <div className="flex items-center gap-2 lg:gap-4">
          <LanguageSelector />
          {/* <div className="hidden lg:block h-3 w-[1px] bg-border" /> */}
          <span className="text-muted-foreground hidden text-[9px] font-medium tracking-[0.4em] uppercase italic xl:block">
            Silver Horizon
          </span>
        </div>

        {/* Center: Main Navigation */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          <ul className="flex items-center space-x-8 lg:space-x-12">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className="text-muted-foreground/60 hover:text-foreground text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Tools & CTA */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden items-center sm:flex">
            <ThemeToggle />
          </div>

          <Button
            asChild
            className="bg-primary text-primary-foreground rounded-none px-6 py-5 text-[9px] font-bold tracking-widest uppercase shadow-xl shadow-black/5 transition-all duration-500 hover:brightness-110 md:px-8"
          >
            <Link href="/booking">{t.nav.bookNow}</Link>
          </Button>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="hover:bg-muted flex items-center justify-center rounded-none p-2 transition-colors md:hidden"
          >
            <Menu className="text-foreground h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Overlay */}
      <div
        className={cn(
          "bg-background fixed inset-0 z-[110] flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.8,0,0.2,1)]",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Subtle Background Texture for Mobile Menu */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <img
            src="https://www.transparenttextures.com/patterns/cubes.png"
            alt=""
            className="object-repeat h-full w-full invert dark:invert-0"
          />
        </div>

        <button
          onClick={() => setMobileMenuOpen(false)}
          className="text-foreground group absolute top-8 right-8 p-4"
        >
          <X className="h-8 w-8 stroke-[1px] transition-transform duration-500 group-hover:rotate-90" />
        </button>

        <nav className="relative z-10 w-full px-12">
          <ul className="flex flex-col items-start gap-6 md:gap-10">
            {navLinks.map((link, idx) => (
              <li key={link.name} className="mobile-link group overflow-hidden">
                <Link
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-baseline gap-4"
                >
                  <span className="text-primary/40 font-mono text-xs">
                    0{idx + 1}
                  </span>
                  <span className="text-foreground/20 group-hover:text-primary font-serif text-5xl italic transition-all duration-500 md:text-7xl">
                    {link.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-12 flex flex-col items-center gap-8">
          <ThemeToggle />
          <div className="text-muted-foreground flex gap-8 text-[9px] font-black tracking-[0.4em] uppercase">
            <span>Instagram</span>
            <span>Inquiries</span>
          </div>
        </div>
      </div>
    </header>
  );
}
