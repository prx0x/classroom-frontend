import React from "react";
import { Link } from "react-router";
import { schoolConfig } from "@/config/school";
import { ArrowLeft, ShieldAlert, Mail, Phone, MapPin, Clock } from "lucide-react";

export const ContactPage: React.FC = () => {
  return (
    <div className="public-container py-16">
      <div className="max-w-3xl space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--pub-forest)] font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </Link>

        <div className="inline-flex items-center gap-2">
          <span className="pub-badge-unverified">
            <ShieldAlert className="w-3.5 h-3.5" />
            Phase 1 Routing Foundation
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl public-serif text-[var(--pub-ink)] font-normal">
          Campus Contact &amp; Enquiries
        </h1>

        <p className="text-lg text-[var(--pub-muted)] leading-relaxed">
          Get in touch with administrative offices, schedule campus tours, or submit questions.
        </p>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-lg pub-surface space-y-2">
            <div className="flex items-center gap-2 text-[var(--pub-forest)] font-semibold text-sm">
              <MapPin className="w-4 h-4" />
              <span>Campus Address</span>
            </div>
            <p className="text-sm text-[var(--pub-muted)]">
              {schoolConfig.contact.address}
            </p>
          </div>

          <div className="p-6 rounded-lg pub-surface space-y-2">
            <div className="flex items-center gap-2 text-[var(--pub-forest)] font-semibold text-sm">
              <Phone className="w-4 h-4" />
              <span>Telephone</span>
            </div>
            <p className="text-sm text-[var(--pub-muted)]">
              {schoolConfig.contact.phone}
            </p>
          </div>

          <div className="p-6 rounded-lg pub-surface space-y-2">
            <div className="flex items-center gap-2 text-[var(--pub-forest)] font-semibold text-sm">
              <Mail className="w-4 h-4" />
              <span>Electronic Mail</span>
            </div>
            <p className="text-sm text-[var(--pub-muted)]">
              {schoolConfig.contact.email}
            </p>
          </div>

          <div className="p-6 rounded-lg pub-surface space-y-2">
            <div className="flex items-center gap-2 text-[var(--pub-forest)] font-semibold text-sm">
              <Clock className="w-4 h-4" />
              <span>Office Hours</span>
            </div>
            <p className="text-sm text-[var(--pub-muted)]">
              {schoolConfig.contact.officeHours}
            </p>
          </div>
        </div>

        {/* Note regarding enquiry submission */}
        <div className="p-6 rounded-lg border border-dashed border-[var(--pub-border)] bg-[var(--pub-paper)] space-y-2">
          <h2 className="text-sm font-semibold text-[var(--pub-ink)]">
            Interactive Enquiry Dispatch
          </h2>
          <p className="text-xs text-[var(--pub-muted)] leading-relaxed">
            In compliance with project specifications, form submissions will be enabled in Phase 3
            only when an authenticated backend endpoint or verified dispatch webhook is configured.
            Fake form submission or misleading instant success indicators are disabled.
          </p>
        </div>
      </div>
    </div>
  );
};
