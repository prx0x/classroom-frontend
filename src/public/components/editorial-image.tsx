import React from "react";
import { ShieldAlert, Image as ImageIcon } from "lucide-react";

export interface EditorialImageProps {
  aspectRatio?: "16/10" | "16/9" | "4/3" | "1/1";
  title?: string;
  caption?: string;
  statusNote?: string;
  sourceNote?: string;
  className?: string;
  src?: string;
  alt: string;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  aspectRatio = "16/10",
  title,
  caption,
  statusNote = "Representative Architectural Concept • Official School Photo Pending",
  sourceNote,
  className = "",
  src,
  alt,
}) => {
  const aspectClass = {
    "16/10": "aspect-[16/10]",
    "16/9": "aspect-[16/9]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-[1/1]",
  }[aspectRatio];

  return (
    <figure className={`space-y-2.5 ${className}`}>
      <div
        className={`relative w-full ${aspectClass} overflow-hidden rounded-md border border-[var(--pub-border)] bg-[var(--pub-paper)] pub-architectural-pattern flex flex-col justify-between p-6 sm:p-8`}
        role="img"
        aria-label={alt}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          /* Editorial Geometric Architectural Representation */
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <span className="pub-badge-unverified text-[10px]">
                <ShieldAlert className="w-3 h-3" />
                {statusNote}
              </span>
              <div className="w-8 h-8 rounded-full bg-[var(--pub-forest)]/10 text-[var(--pub-forest)] flex items-center justify-center">
                <ImageIcon className="w-4 h-4 opacity-75" />
              </div>
            </div>

            <div className="my-auto py-6 text-center space-y-2">
              <div className="mx-auto w-12 h-0.5 bg-[var(--pub-gold)] mb-3 opacity-60" />
              {title && (
                <h4 className="text-xl sm:text-2xl font-normal public-serif text-[var(--pub-ink)]">
                  {title}
                </h4>
              )}
              <p className="text-xs text-[var(--pub-muted)] max-w-md mx-auto">
                {caption || "Campus architectural study and learning environment visualization."}
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[var(--pub-muted)] border-t border-[var(--pub-border)]/60 pt-3">
              <span>Architectural Study</span>
              <span>{sourceNote || "Internal Design Foundation"}</span>
            </div>
          </div>
        )}
      </div>

      {(caption || sourceNote) && (
        <figcaption className="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--pub-muted)] px-1">
          <span>{caption}</span>
          {sourceNote && <span className="italic text-[11px]">{sourceNote}</span>}
        </figcaption>
      )}
    </figure>
  );
};
