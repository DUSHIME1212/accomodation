"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageContext";
import Link from "next/link";

export default function Navbar() {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.apartments, path: "/apartments" },
    { name: t.nav.amenities, path: "/amenities" },
    { name: t.nav.gallery, path: "/gallery" },
    { name: t.nav.contact, path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 px-8 md:px-16 lg:px-32 left-0 z-50 transition-all duration-300",
        scrolled
          ? "dark:bg-card/80 bg-white/80 py-3 shadow-md backdrop-blur-lg"
          : "bg-transparent py-5",
      )}
    >
      <nav className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LanguageSelector />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden space-x-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.name} className="relative">
              <Link
                href={link.path}
                className="hover:text-primary after:bg-primary font-medium transition-colors after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-all hover:after:w-full"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center space-x-2 md:flex">
          <ThemeToggle />
          <Button asChild className="btn-primary">
            <Link href="/booking">{t.nav.bookNow}</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "bg-background/80 fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div
          className={cn(
            "bg-card fixed inset-y-0 right-0 w-3/4 max-w-sm p-6 shadow-xl transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="mb-8 flex justify-between">
                <LanguageSelector />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <ul className="space-y-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="hover:text-primary text-lg font-medium transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Button asChild className="btn-primary mt-6 w-full">
              <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
                {t.nav.bookNow}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
