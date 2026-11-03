import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { schoolConfig } from "@/config/school";
import { X, GraduationCap, ArrowUpRight } from "lucide-react";

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
}) => {
  const location = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap / focus management
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-down / pop-in Navigation panel */}
      <div
        ref={drawerRef}
        className="relative z-10 w-full bg-[var(--pub-white)] border-b border-[var(--pub-border)] shadow-2xl max-h-[85vh] overflow-y-auto"
      >
        <div className="public-container py-6 space-y-6">
          {/* Header row in mobile menu */}
          <div className="flex items-center justify-between border-b border-[var(--pub-border-subtle)] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--pub-forest)] text-[var(--pub-white)] flex items-center justify-center font-bold public-serif text-xs tracking-tight">
                IK
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-base public-serif text-[var(--pub-ink)] leading-tight">
                  {schoolConfig.shortName}
                </span>
                <span className="text-[10px] text-[var(--pub-muted)] uppercase tracking-wider font-medium">
                  Institute of National Importance
                </span>
              </div>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-2 rounded-md text-[var(--pub-ink)] hover:bg-[var(--pub-paper)] focus-visible:outline-2 focus-visible:outline-[var(--pub-forest)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links list */}
          <nav aria-label="Mobile Primary Navigation" className="flex flex-col space-y-1">
            {schoolConfig.navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={`py-3 px-4 rounded-md text-base transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-[rgba(36,75,61,0.08)] text-[var(--pub-forest)] font-semibold"
                      : "text-[var(--pub-ink)] hover:bg-[var(--pub-paper)]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <div className="w-2 h-2 rounded-full bg-[var(--pub-forest)]" />}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Portal Links */}
          <div className="pt-4 border-t border-[var(--pub-border-subtle)] space-y-3">
            <Link
              to="/admissions"
              onClick={onClose}
              className="pub-btn-primary w-full text-center py-3"
            >
              <span>Apply for Admissions</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5 opacity-80" />
            </Link>

            <Link
              to={schoolConfig.portalNavigation.href}
              onClick={onClose}
              className="pub-btn-portal w-full justify-center py-2.5"
            >
              <GraduationCap className="w-4 h-4 text-[var(--pub-forest)]" />
              <span>Enter Classroom Portal</span>
            </Link>
          </div>

          {/* Quick contact / hours info */}
          <div className="pt-2 text-xs text-[var(--pub-muted)] space-y-1">
            <p><strong>Office Hours:</strong> {schoolConfig.contact.officeHours}</p>
            <p><strong>Campus Desk:</strong> {schoolConfig.contact.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
