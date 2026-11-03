import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { schoolConfig } from "@/config/school";
import { Menu, ArrowUpRight, GraduationCap } from "lucide-react";
import { MobileNavigation } from "./mobile-navigation";

export const SiteHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-[var(--pub-paper)]/95 backdrop-blur-md border-b border-[var(--pub-border)] transition-all duration-200 ${
          scrolled ? "shadow-sm bg-[var(--pub-paper)]/98" : ""
        }`}
      >
        <div className="public-container">
          <div className="flex items-center justify-between h-20">
            {/* School Brand Mark / Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 text-[var(--pub-ink)] hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pub-forest)]"
              aria-label={`${schoolConfig.shortName} - Back to homepage`}
            >
              <div className="w-10 h-10 rounded-full bg-[var(--pub-forest)] text-[var(--pub-white)] flex items-center justify-center font-bold public-serif text-sm tracking-tight shadow-xs">
                IK
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg tracking-tight public-serif leading-none">
                  {schoolConfig.shortName}
                </span>
                <span className="text-xs text-[var(--pub-muted)] uppercase tracking-wider font-medium mt-1">
                  Institute of National Importance
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center gap-7"
            >
              {schoolConfig.navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`text-sm font-medium transition-colors hover:text-[var(--pub-forest)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pub-forest)] ${
                      isActive
                        ? "text-[var(--pub-forest)] font-semibold border-b-2 border-[var(--pub-forest)] pb-1"
                        : "text-[var(--pub-ink)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action CTAs (Admissions + Internal Portal) */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/portal"
                className="pub-btn-portal"
                title="Access internal classroom management system"
              >
                <GraduationCap className="w-4 h-4 text-[var(--pub-forest)]" />
                <span>Portal</span>
              </Link>

              <Link to="/admissions" className="pub-btn-primary">
                <span>Admissions</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

            {/* Mobile Menu Trigger Button */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-[var(--pub-ink)] hover:bg-[var(--pub-white)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--pub-forest)]"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Drawer Navigation */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </>
  );
};
