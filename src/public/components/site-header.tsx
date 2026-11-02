import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { schoolConfig } from "@/config/school";
import { Menu, X, ArrowUpRight, GraduationCap } from "lucide-react";

export const SiteHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--pub-paper)]/95 backdrop-blur-md border-b border-[var(--pub-border)] transition-colors">
      <div className="public-container">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo / School Identity */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 text-[var(--pub-ink)] hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pub-forest)]"
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

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
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

          {/* Action CTAs: Portal & Admissions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to={schoolConfig.portalNavigation.href}
              className="pub-btn-portal"
              title="Access the classroom management application"
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

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to={schoolConfig.portalNavigation.href}
              className="pub-btn-portal text-xs py-1.5 px-2.5"
              title="Access Portal"
            >
              <GraduationCap className="w-4 h-4 text-[var(--pub-forest)]" />
              <span>Portal</span>
            </Link>

            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="p-2 rounded-md text-[var(--pub-ink)] hover:bg-[var(--pub-border)] focus-visible:outline-2 focus-visible:outline-[var(--pub-forest)]"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden bg-[var(--pub-white)] border-b border-[var(--pub-border)] shadow-lg"
        >
          <div className="public-container py-5 space-y-4">
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-2">
              {schoolConfig.navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={closeMobileMenu}
                    className={`py-2 px-3 rounded-md text-base transition-colors ${
                      isActive
                        ? "bg-[rgba(36,75,61,0.08)] text-[var(--pub-forest)] font-semibold"
                        : "text-[var(--pub-ink)] hover:bg-[var(--pub-paper)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-[var(--pub-border)] flex flex-col gap-2.5">
              <Link
                to="/admissions"
                onClick={closeMobileMenu}
                className="pub-btn-primary w-full text-center"
              >
                Apply Now
              </Link>
              <Link
                to={schoolConfig.portalNavigation.href}
                onClick={closeMobileMenu}
                className="pub-btn-portal w-full justify-center"
              >
                <GraduationCap className="w-4 h-4 text-[var(--pub-forest)]" />
                <span>Open Classroom Portal</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
