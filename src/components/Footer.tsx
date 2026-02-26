"use client";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";
import Link from "next/link";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/30 text-foreground border-border/10 border-t px-8 pt-24 pb-12 md:px-16 lg:px-32">
      <div className="mx-auto max-w-7xl">
        {/* --- TOP SECTION: BRANDING --- */}
        <div className="mb-20">
          <h2 className="text-foreground/5 font-serif text-6xl leading-none select-none md:text-8xl lg:text-9xl">
            Silver Horizon
          </h2>
        </div>

        <div className="mb-20 grid grid-cols-1 gap-16 md:grid-cols-12">
          {/* Mission & Social */}
          <div className="space-y-8 md:col-span-4">
            <h4 className="text-primary text-xs font-bold tracking-[0.3em] uppercase">
              The Vision
            </h4>
            <p className="text-muted-foreground text-lg leading-relaxed font-light">
              {t.footer.description}
            </p>
            <div className="text-foreground flex space-x-6">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="text-foreground/70 hover:text-primary group flex items-center gap-1 transition-all duration-500"
                >
                  <social.Icon size={16} strokeWidth={1.5} />
                  <span className="hidden text-[10px] tracking-widest uppercase opacity-0 transition-opacity group-hover:opacity-100 lg:block">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-8 md:col-span-2">
            <h4 className="text-muted-foreground/40 text-[10px] font-bold tracking-[0.3em] uppercase">
              Explore
            </h4>
            <ul className="space-y-4">
              {[
                { name: t.nav.home, path: "/" },
                { name: t.nav.apartments, path: "/apartments" },
                { name: t.nav.amenities, path: "/amenities" },
                { name: t.nav.gallery, path: "/gallery" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-muted-foreground hover:text-foreground group flex items-center text-sm font-light transition-colors"
                  >
                    {link.name}
                    <ArrowUpRight className="ml-1 h-3 w-3 -translate-y-1 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8 md:col-span-3">
            <h4 className="text-muted-foreground/40 text-[10px] font-bold tracking-[0.3em] uppercase">
              Inquiries
            </h4>
            <ul className="text-muted-foreground/70 space-y-6 text-sm font-light">
              <li className="flex gap-4">
                <MapPin className="text-primary h-4 w-4 shrink-0" />
                <span>
                  123 Coastal Avenue
                  <br />
                  Kigali, Rwanda
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-primary h-4 w-4 shrink-0" />
                <span>+250 782 454 192</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-primary h-4 w-4 shrink-0" />
                <span className="hover:border-primary border-border/10 cursor-pointer border-b transition-colors">
                  concierge@silverhorizon.com
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8 md:col-span-3">
            <h4 className="text-muted-foreground/40 text-[10px] font-bold tracking-[0.3em] uppercase">
              The Journal
            </h4>
            <p className="text-muted-foreground/50 text-xs leading-relaxed font-light">
              Join our curated list for exclusive seasonal offers and coastal
              insights.
            </p>
            <form className="group relative">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="focus:border-primary border-border/20 placeholder:text-muted-foreground/20 w-full border-b bg-transparent py-3 text-[10px] tracking-[0.2em] transition-colors outline-none"
                required
              />
              <button
                type="submit"
                className="text-muted-foreground/40 hover:text-foreground absolute right-0 bottom-3 transition-colors"
              >
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="border-border/10 flex flex-col items-center justify-between gap-6 border-t pt-12 md:flex-row">
          <p className="text-muted-foreground/30 text-[10px] tracking-[0.2em] uppercase">
            &copy; {currentYear} Silver Horizon Luxury Hotel Group
          </p>
          <div className="text-muted-foreground/30 flex gap-8 text-[10px] tracking-[0.2em] uppercase">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="hover:text-foreground transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
