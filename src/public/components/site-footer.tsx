import React from "react";
import { Link } from "react-router";
import { schoolConfig } from "@/config/school";
import { GraduationCap, ArrowUpRight, MapPin, Phone, Mail, Clock } from "lucide-react";

export const SiteFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--pub-ink)] text-[var(--pub-paper)] border-t border-[#263c3c] mt-auto">
      <div className="public-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1: Identity & Motto (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--pub-forest)] text-[var(--pub-white)] flex items-center justify-center font-bold public-serif text-xl">
                O
              </div>
              <span className="font-semibold text-xl public-serif text-[var(--pub-white)]">
                {schoolConfig.name.split(" (")[0]}
              </span>
            </div>

            <p className="text-sm text-[#95a3a2] leading-relaxed">
              {schoolConfig.positioningStatement}
            </p>

            <div className="space-y-2 pt-2">
              <div className="text-xs uppercase tracking-wider text-[#95a3a2] font-semibold">
                Campus Motto
              </div>
              <p className="text-sm italic font-normal text-[var(--pub-white)]/90 public-serif">
                &ldquo;Cultivating Curiosity, Character, and Community.&rdquo;
              </p>
            </div>

            <div className="pt-2">
              <span className="pub-badge-unverified text-[11px]">
                Official School Identity: Pending Confirmation
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#95a3a2]">
              Academic Exploration
            </h3>
            <ul className="space-y-2.5 text-sm">
              {schoolConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-[var(--pub-paper)]/80 hover:text-[var(--pub-white)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--pub-gold)] inline-flex items-center gap-1.5"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#95a3a2]">
              Campus Contact &amp; Hours
            </h3>
            <div className="space-y-3 text-sm text-[#95a3a2]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--pub-gold)] mt-1 shrink-0" />
                <span className="leading-snug">{schoolConfig.contact.address}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[var(--pub-gold)] mt-1 shrink-0" />
                <span>{schoolConfig.contact.phone}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[var(--pub-gold)] mt-1 shrink-0" />
                <span className="break-all">{schoolConfig.contact.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[var(--pub-gold)] mt-1 shrink-0" />
                <span>{schoolConfig.contact.officeHours}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Portal & Internal Tools (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#95a3a2]">
              Institutional Access
            </h3>
            <p className="text-xs text-[#95a3a2] leading-relaxed">
              Faculty and students can access course schedules, grades, and records.
            </p>
            <div>
              <Link
                to={schoolConfig.portalNavigation.href}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-md bg-[#223939] text-[var(--pub-white)] hover:bg-[var(--pub-forest)] transition-colors border border-[#2e4c4c] w-full justify-between"
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[var(--pub-gold)]" />
                  <span>Classroom Portal</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="mt-14 pt-8 border-t border-[#263c3c] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#95a3a2]">
          <p>
            &copy; {currentYear} {schoolConfig.shortName.split(" (")[0]}. All rights reserved. Educational content structured for Phase 2 review.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/about" className="hover:text-[var(--pub-white)] transition-colors">
              About
            </Link>
            <Link to="/academics" className="hover:text-[var(--pub-white)] transition-colors">
              Academics
            </Link>
            <Link to="/admissions" className="hover:text-[var(--pub-white)] transition-colors">
              Admissions
            </Link>
            <Link to="/contact" className="hover:text-[var(--pub-white)] transition-colors">
              Contact
            </Link>
            <Link to="/portal" className="hover:text-[var(--pub-white)] transition-colors">
              Portal Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
