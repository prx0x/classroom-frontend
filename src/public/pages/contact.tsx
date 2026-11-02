import React, { useState } from "react";
import { Link } from "react-router";
import { schoolConfig } from "@/config/school";
import { usePageMeta } from "../hooks/use-page-meta";
import { PageHero } from "../components/page-hero";
import { SectionHeading } from "../components/section-heading";
import { EditorialImage } from "../components/editorial-image";
import { CallToAction } from "../components/call-to-action";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
} from "lucide-react";

export const ContactPage: React.FC = () => {
  const { contact, contactPage } = schoolConfig;

  usePageMeta({
    title: "Contact",
    description: contactPage.hero.description,
  });

  // Interactive Email Drafter state
  const [inquiryType, setInquiryType] = useState<string>("admissions");
  const [inquirerName, setInquirerName] = useState<string>("");
  const [inquirerSubject, setInquirerSubject] = useState<string>("");
  const [inquirerMessage, setInquirerMessage] = useState<string>("");

  const getRecipientEmail = () => {
    switch (inquiryType) {
      case "admissions":
        return contact.admissionsEmail;
      case "academics":
        return "academics@school-placeholder.internal";
      default:
        return contact.email;
    }
  };

  const generateMailtoUrl = () => {
    const recipient = getRecipientEmail();
    const subject = encodeURIComponent(
      inquirerSubject ? `[Inquiry - ${inquiryType.toUpperCase()}] ${inquirerSubject}` : `[Inquiry - ${inquiryType.toUpperCase()}] Prospective Family Inquiry`
    );
    const body = encodeURIComponent(
      `Hello,\n\nName: ${inquirerName || "Prospective Family"}\nInquiry Domain: ${inquiryType}\n\nMessage:\n${inquirerMessage}\n\n---\nSent via School Website Inquiry Assistant`
    );
    return `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* 1. Page Hero */}
      <PageHero
        badge={contactPage.hero.badge}
        title={contactPage.hero.title}
        description={contactPage.hero.description}
        breadcrumbs={[{ label: "Contact" }]}
        primaryCta={{ label: "Admissions Journey", href: "/admissions" }}
        secondaryCta={{ label: "Classroom Portal", href: "/portal" }}
        disclaimer="Official institutional address and contact records pending final school verification."
        metaItems={[
          { label: "Admissions Desk", value: contact.officeHours.split(" (")[0] },
          { label: "Campus Visits", value: "Prior Registration Required" },
          { label: "Direct Email", value: "Enabled via Client Drafter" },
        ]}
      />

      {/* 2. Departmental Directory */}
      <section className="public-container" aria-labelledby="directory-heading">
        <div className="space-y-10">
          <SectionHeading
            overline="Departmental Contacts"
            title="Direct communication directory."
            description="Connect with the appropriate office to ensure your inquiry is answered promptly."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactPage.departments.map((dept, idx) => (
              <div
                key={idx}
                className="pub-card p-6 sm:p-7 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-md bg-[var(--pub-forest)]/10 text-[var(--pub-forest)] flex items-center justify-center font-mono font-bold text-xs">
                    0{idx + 1}
                  </div>

                  <h3 className="text-xl public-serif text-[var(--pub-ink)] font-normal leading-snug">
                    {dept.department}
                  </h3>

                  <p className="text-xs text-[var(--pub-muted)] leading-relaxed">
                    {dept.purpose}
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-[var(--pub-border)] text-xs">
                  <div className="flex items-start gap-2 text-[var(--pub-ink)]">
                    <Mail className="w-3.5 h-3.5 text-[var(--pub-forest)] shrink-0 mt-0.5" />
                    <a
                      href={`mailto:${dept.email.split(" (")[0]}`}
                      className="hover:underline font-mono text-[11px] break-all text-[var(--pub-forest)]"
                    >
                      {dept.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-[var(--pub-muted)]">
                    <Phone className="w-3.5 h-3.5 text-[var(--pub-forest)] shrink-0" />
                    <span>{dept.phone}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[var(--pub-muted)]">
                    <Clock className="w-3.5 h-3.5 text-[var(--pub-forest)] shrink-0" />
                    <span>{dept.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Interactive Direct Email Assistant & Form Status Notice */}
      <section className="public-container" aria-labelledby="inquiry-form-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Status & Guidance Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="pub-badge-forest">{contactPage.inquiryNotice.overline}</span>
              <h2 id="inquiry-form-heading" className="text-2xl sm:text-3xl public-serif text-[var(--pub-ink)] font-normal">
                {contactPage.inquiryNotice.heading}
              </h2>
              <p className="text-sm text-[var(--pub-muted)] leading-relaxed">
                {contactPage.inquiryNotice.description}
              </p>
            </div>

            <div className="p-5 rounded-lg border border-[var(--pub-border)] bg-[var(--pub-white)] space-y-3">
              <div className="flex items-center gap-2">
                <span className="pub-badge-unverified text-[10px]">
                  {contactPage.inquiryNotice.status}
                </span>
              </div>
              <p className="text-xs text-[var(--pub-muted)] leading-relaxed">
                {contactPage.inquiryNotice.alternativeInstructions}
              </p>
              <div className="text-[11px] text-[var(--pub-muted)] font-mono pt-1 border-t border-[var(--pub-border)]">
                Policy: Zero fake submission states or synthetic auto-responders.
              </div>
            </div>

            <div className="p-5 rounded-lg bg-[var(--pub-forest)] text-[var(--pub-white)] space-y-3">
              <h3 className="text-base font-semibold">Immediate Assistance</h3>
              <p className="text-xs opacity-90 leading-relaxed">
                For urgent admissions matters, you can reach out directly to the admissions coordination office:
              </p>
              <a
                href={`mailto:${contact.admissionsEmail.split(" (")[0]}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--pub-white)] underline hover:opacity-80"
              >
                <Mail className="w-3.5 h-3.5" />
                {contact.admissionsEmail.split(" (")[0]}
              </a>
            </div>
          </div>

          {/* Email Drafter Assistant Card */}
          <div className="lg:col-span-7 pub-card p-6 sm:p-8 space-y-5">
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-[var(--pub-ink)] flex items-center gap-2">
                <Send className="w-4 h-4 text-[var(--pub-forest)]" />
                Prepare Direct Inquiry
              </h3>
              <p className="text-xs text-[var(--pub-muted)]">
                Draft your inquiry details below to launch your email client with verified department routing:
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="inquiry-type" className="block text-xs font-medium text-[var(--pub-ink)] mb-1">
                  Inquiry Department
                </label>
                <select
                  id="inquiry-type"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full text-xs p-2.5 rounded border border-[var(--pub-border)] bg-[var(--pub-paper)] text-[var(--pub-ink)] focus:outline-none focus:border-[var(--pub-forest)]"
                >
                  <option value="admissions">Admissions &amp; Enrollment ({contact.admissionsEmail.split(" (")[0]})</option>
                  <option value="academics">Academic Curriculum &amp; Faculty</option>
                  <option value="general">General Campus Operations</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inquiry-name" className="block text-xs font-medium text-[var(--pub-ink)] mb-1">
                    Your Name / Family Name
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    placeholder="e.g. Eleanor Vance"
                    value={inquirerName}
                    onChange={(e) => setInquirerName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded border border-[var(--pub-border)] bg-[var(--pub-paper)] text-[var(--pub-ink)] focus:outline-none focus:border-[var(--pub-forest)]"
                  />
                </div>

                <div>
                  <label htmlFor="inquiry-subject" className="block text-xs font-medium text-[var(--pub-ink)] mb-1">
                    Inquiry Topic / Grade
                  </label>
                  <input
                    id="inquiry-subject"
                    type="text"
                    placeholder="e.g. Grade 7 Enrollment Question"
                    value={inquirerSubject}
                    onChange={(e) => setInquirerSubject(e.target.value)}
                    className="w-full text-xs p-2.5 rounded border border-[var(--pub-border)] bg-[var(--pub-paper)] text-[var(--pub-ink)] focus:outline-none focus:border-[var(--pub-forest)]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="inquiry-message" className="block text-xs font-medium text-[var(--pub-ink)] mb-1">
                  Inquiry Details
                </label>
                <textarea
                  id="inquiry-message"
                  rows={4}
                  placeholder="Please describe your question or campus visit requirements..."
                  value={inquirerMessage}
                  onChange={(e) => setInquirerMessage(e.target.value)}
                  className="w-full text-xs p-2.5 rounded border border-[var(--pub-border)] bg-[var(--pub-paper)] text-[var(--pub-ink)] focus:outline-none focus:border-[var(--pub-forest)] resize-y"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[var(--pub-border)]">
                <span className="text-[11px] text-[var(--pub-muted)]">
                  Dispatches directly to: <span className="font-mono text-[var(--pub-forest)]">{getRecipientEmail().split(" (")[0]}</span>
                </span>

                <a
                  href={generateMailtoUrl()}
                  className="pub-btn-primary text-xs w-full sm:w-auto inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Launch Email Client
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Campus Location & Visitor Instructions */}
      <section className="public-container" aria-labelledby="location-heading">
        <div className="p-8 sm:p-10 rounded-xl pub-surface border border-[var(--pub-border)] space-y-6">
          <div className="space-y-3">
            <span className="pub-badge-forest">{contactPage.visitInfo.overline}</span>
            <h2 id="location-heading" className="text-2xl sm:text-3xl public-serif text-[var(--pub-ink)] font-normal">
              {contactPage.visitInfo.heading}
            </h2>
            <p className="text-sm sm:text-base text-[var(--pub-muted)] leading-relaxed max-w-3xl">
              {contactPage.visitInfo.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-lg bg-[var(--pub-paper)] border border-[var(--pub-border)] space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--pub-ink)]">
                <MapPin className="w-4 h-4 text-[var(--pub-forest)]" />
                <span>Campus Location Address</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--pub-muted)] leading-relaxed">
                {contact.address}
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[var(--pub-paper)] border border-[var(--pub-border)] space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--pub-ink)]">
                <ShieldCheck className="w-4 h-4 text-[var(--pub-forest)]" />
                <span>Visitor Security &amp; Access</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--pub-muted)] leading-relaxed">
                {contactPage.visitInfo.toursNotice}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-md border border-dashed border-[var(--pub-border)] text-xs text-[var(--pub-muted)] flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#8c6a23] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <span className="font-semibold text-[var(--pub-ink)]">Parking &amp; Transit: </span>
              {contactPage.visitInfo.parkingTransit}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Classroom Portal Navigation Bridge */}
      <section className="public-container">
        <div className="p-6 sm:p-8 rounded-xl bg-[var(--pub-ink)] text-[var(--pub-white)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-[var(--pub-gold)] text-xs font-mono uppercase tracking-wider font-semibold">
              <GraduationCap className="w-4 h-4" />
              <span>Internal Administration</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-normal public-serif">
              Already an enrolled student or faculty member?
            </h3>
            <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
              Access the existing classroom management portal to view classes, subjects, and departmental resources.
            </p>
          </div>

          <Link
            to="/portal"
            className="pub-btn-primary bg-[var(--pub-paper)] text-[var(--pub-ink)] hover:bg-[var(--pub-white)] shrink-0"
          >
            Access Classroom Portal
          </Link>
        </div>
      </section>
    </div>
  );
};
