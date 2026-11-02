import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { schoolConfig } from "@/config/school";
import { Menu, ArrowUpRight, GraduationCap } from "lucide-react";
import { MobileNavigation } from "./mobile-navigation";

export const SiteHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[var(--pub-paper)]/95 backdrop-blur-md border-b border-[var(--pub-border)] transition-colors">
        <div className="public-container">
          <div className="flex items-center justify-between h-20">
            {/* School Brand Mark / Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 text-[var(--pub-ink)] hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pub-forest)]"
              aria-label={`${schoolConfig.shortName.split(" (")[0]} - Back to homepage`}
            >
              <div className="w-10 h-10 rounded-full bg-[var(--pub-forest)] text-[var(--pub-white)] flex items-center justify-center font-bold public-serif text-xl shadow-xs">
                O
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg tracking-tight public-serif leading-none">
                  {schoolConfig.name.split(" (")[0]}
                </span>
                <span className="text-xs text-[var(--pub-muted)] uppercase tracking-wider font-medium mt-1">
                  Editorial Campus
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

            {/* Action Buttons: Classroom Portal & Apply Now */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to={schoolConfig.portalNavigation.href}
                className="pub-btn-portal"
                title="Open the classroom management portal"
              >
                <GraduationCap className="w-4 h-4 text-[var(--pub-forest)]" />
                <span>Portal</span>
              </Link>

              <Link
                to="/admissions"
                className="pub-btn-primary"
              >
                <span>Apply Now</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 opacity-80" />
              </Link>
            </div>

            {/* Mobile Actions: Compact Portal link and Accessible Menu Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                to={schoolConfig.portalNavigation.href}
                className="pub-btn-portal text-xs py-1.5 px-2.5 sm:hidden"
                title="Classroom Portal"
              >
                <GraduationCap className="w-4 h-4 text-[var(--pub-forest)]" />
                <span>Portal</span>
              </Link>

              <button
                type="button"
                onClick={toggleMobileMenu}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-dialog"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                className="p-2 rounded-md text-[var(--pub-ink)] hover:bg-[var(--pub-border)] focus-visible:outline-2 focus-visible:outline-[var(--pub-forest)]"
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Drawer / Modal */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </>
  );
};
