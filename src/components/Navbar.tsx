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
        { y: 0, opacity: 1, stagger: 0.1, ease: "power4.out", duration: 0.8, delay: 0.2 }
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
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full",
        isScrolled ? "py-3 px-4 md:px-8" : "py-6 px-6 md:px-12 lg:px-20"
      )}
    >
      <div className={cn(
        "mx-auto w-full max-w-[1400px] flex items-center justify-between transition-all duration-500  px-6 py-2.5",
        isScrolled 
          ? "bg-white  border border-black/5 dark:border-white/10 shadow-lg" 
          : "bg-white"
      )}>
        
        {/* Left: Language & Technical Marker */}
        <div className="flex items-center gap-2 lg:gap-4">
          <LanguageSelector />
          {/* <div className="hidden lg:block h-3 w-[1px] bg-black/10 dark:bg-white/20" /> */}
          <span className="hidden xl:block text-[9px] uppercase tracking-[0.4em] text-muted-foreground font-medium italic">
            Silver Horizon
          </span>
        </div>

        {/* Center: Main Navigation */}
        <nav className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center space-x-8 lg:space-x-12">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className="text-[10px] uppercase tracking-[0.25em] font-bold text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-all duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Tools & CTA */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex items-center">
            <ThemeToggle />
          </div>
          
<Button 
            asChild 
            className="rounded-none bg-black text-white dark:bg-white dark:text-black px-6 md:px-8 py-5 text-[9px] uppercase tracking-widest font-bold hover:bg-primary transition-all duration-500 shadow-xl shadow-black/5"
          >
            <Link href="/booking">{t.nav.bookNow}</Link>
          </Button>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden flex items-center justify-center p-2  hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <Menu className="h-5 w-5 text-black dark:text-white" />
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-white dark:bg-[#080808] z-[110] flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.8,0,0.2,1)]",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Subtle Background Texture for Mobile Menu */}
        <div className="absolute inset-0   pointer-events-none grayscale">
          <img src="https://www.transparenttextures.com/patterns/cubes.png" alt="" className="w-full h-full object-repeat" />
        </div>

        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-8 right-8 p-4 text-black dark:text-white group"
        >
          <X className="h-8 w-8 stroke-[1px] group-hover:rotate-90 transition-transform duration-500" />
        </button>

        <nav className="relative z-10 w-full px-12">
          <ul className="flex flex-col items-start gap-6 md:gap-10">
            {navLinks.map((link, idx) => (
              <li key={link.name} className="mobile-link overflow-hidden group">
                <Link
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-baseline gap-4 group"
                >
                  <span className="text-xs font-mono text-primary/40">0{idx + 1}</span>
                  <span className="text-5xl md:text-7xl font-serif italic text-black/20 dark:text-white/10 group-hover:text-black dark:group-hover:text-white transition-all duration-500">
                    {link.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-12 flex flex-col items-center gap-8">
           <ThemeToggle />
           <div className="flex gap-8 text-[9px] uppercase tracking-[0.4em] text-muted-foreground font-black">
              <span>Instagram</span>
              <span>Inquiries</span>
           </div>
        </div>
      </div>
    </header>
  );
}