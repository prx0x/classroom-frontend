import React from "react";
import { Link } from "react-router";
import { schoolConfig } from "@/config/school";
import { GraduationCap, ArrowUpRight } from "lucide-react";

export const SiteFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--pub-ink)] text-[var(--pub-paper)] border-t border-[#263c3c] mt-auto">
      <div className="public-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Identity Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--pub-forest)] text-[var(--pub-white)] flex items-center justify-center font-bold public-serif text-lg">
                O
              </div>
              <span className="font-semibold text-lg public-serif text-[var(--pub-white)]">
                {schoolConfig.name.split(" (")[0]}
              </span>
            </div>
            <p className="text-sm text-[#95a3a2] leading-relaxed">
              {schoolConfig.positioningStatement}
            </p>
            <div className="pt-2">
              <span className="pub-badge-unverified text-[11px]">
                Identity Pending Confirmation
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#95a3a2]">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              {schoolConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-[var(--pub-paper)]/80 hover:text-[var(--pub-white)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--pub-gold)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (Marked Unverified) */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#95a3a2]">
              Campus Contact
            </h3>
            <div className="space-y-2 text-sm text-[#95a3a2]">
              <p>
                <strong className="text-[var(--pub-paper)]/90">Address:</strong>{" "}
                {schoolConfig.contact.address}
              </p>
              <p>
                <strong className="text-[var(--pub-paper)]/90">Phone:</strong>{" "}
                {schoolConfig.contact.phone}
              </p>
              <p>
                <strong className="text-[var(--pub-paper)]/90">Email:</strong>{" "}
                {schoolConfig.contact.email}
              </p>
              <p>
                <strong className="text-[var(--pub-paper)]/90">Hours:</strong>{" "}
                {schoolConfig.contact.officeHours}
              </p>
            </div>
          </div>

          {/* Portal & Administration */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#95a3a2]">
              Internal Portals
            </h3>
            <p className="text-sm text-[#95a3a2]">
              Faculty, staff, and enrolled students can manage classes, subjects, and records via the portal.
            </p>
            <Link
              to={schoolConfig.portalNavigation.href}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-[#223939] text-[var(--pub-white)] hover:bg-[var(--pub-forest)] transition-colors border border-[#2e4c4c]"
            >
              <GraduationCap className="w-4 h-4 text-[var(--pub-gold)]" />
              <span>{schoolConfig.portalNavigation.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70 ml-auto" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#263c3c] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#95a3a2]">
          <p>
            &copy; {currentYear} {schoolConfig.shortName}. All rights reserved. Content pending official verification.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-[var(--pub-white)] transition-colors">
              Campus Enquiries
            </Link>
            <Link to="/admissions" className="hover:text-[var(--pub-white)] transition-colors">
              Admissions Policy
            </Link>
            <Link to="/portal" className="hover:text-[var(--pub-white)] transition-colors">
              Management Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
