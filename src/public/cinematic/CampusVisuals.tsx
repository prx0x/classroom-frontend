import React from "react";

/**
 * High-fidelity architectural compositions for the cinematic sequence.
 * Features the authentic college entrance photography paired with
 * architectural coordinate overlays, colonnade portals, and rotunda vaults.
 */

// Scene 1: Authentic College Entrance Establishing Shot & Quadrangle Vista
export const ExteriorSkylineVista: React.FC<{
  className?: string;
  photoRef?: React.RefObject<HTMLDivElement | null>;
  foregroundRef?: React.RefObject<HTMLDivElement | null>;
}> = ({ className = "", photoRef, foregroundRef }) => {
  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      {/* Real College Entrance Photography Layer (Zoomable Camera Target) */}
      <div
        ref={photoRef}
        className="absolute inset-0 w-full h-full transform-gpu origin-[50%_52%]"
      >
        <picture>
          <source
            srcSet="/images/college-entrance.jpg"
            type="image/jpeg"
          />
          <img
            src="/images/college-entrance.jpg"
            alt="College Main Campus Entrance and Quadrangle"
            className="w-full h-full object-cover object-[center_52%]"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Cinematic Atmospheric Tint & Vignette for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1d1a]/90 via-transparent to-[#0e1d1a]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1d1a]/50 via-transparent to-[#0e1d1a]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(14,29,26,0.7)_100%)] pointer-events-none" />

        {/* Subtle Architectural Blueprint Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(195, 154, 82, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(195, 154, 82, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Architectural Entrance Alignment Line */}
        <div className="absolute top-[52%] left-0 right-0 h-[1px] bg-[var(--pub-gold)]/20 pointer-events-none" />

        {/* Central Entrance Target Crosshair */}
        <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30">
          <div className="w-16 h-16 border border-[var(--pub-gold)]/50 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[var(--pub-gold)]" />
          </div>
        </div>
      </div>

      {/* Foreground Courtyard Stone Balustrade & Lantern Posts Layer */}
      <div
        ref={foregroundRef}
        className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 flex items-end justify-between px-6 sm:px-16 pointer-events-none z-10"
      >
        {/* Left Lantern Post */}
        <div className="flex flex-col items-center">
          <div className="w-5 h-7 rounded-sm border border-[var(--pub-gold)]/60 bg-[var(--pub-gold)]/20 shadow-[0_0_15px_rgba(195,154,82,0.4)] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[var(--pub-paper)] blur-[1px]" />
          </div>
          <div className="w-1.5 h-12 bg-[#122320] border-x border-[var(--pub-gold)]/30" />
          <div className="w-8 h-4 bg-[#101f1c] rounded-t-sm border border-[var(--pub-gold)]/30" />
        </div>

        {/* Center Balustrade Rail & Elevation Tag */}
        <div className="flex-1 max-w-4xl mx-8 flex flex-col items-center pb-2">
          <div className="text-[9px] font-mono tracking-[0.25em] text-[var(--pub-gold)]/70 uppercase mb-2">
            MAIN ACADEMIC COMPLEX &bull; RANPUR, KOTA &bull; ELEV 271M
          </div>
          <div className="w-full h-4 border-t-2 border-[var(--pub-gold)]/30 flex items-center justify-around opacity-60">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="w-1 h-4 bg-[#122420] rounded-full border border-[var(--pub-gold)]/20"
              />
            ))}
          </div>
        </div>

        {/* Right Lantern Post */}
        <div className="flex flex-col items-center">
          <div className="w-5 h-7 rounded-sm border border-[var(--pub-gold)]/60 bg-[var(--pub-gold)]/20 shadow-[0_0_15px_rgba(195,154,82,0.4)] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[var(--pub-paper)] blur-[1px]" />
          </div>
          <div className="w-1.5 h-12 bg-[#122320] border-x border-[var(--pub-gold)]/30" />
          <div className="w-8 h-4 bg-[#101f1c] rounded-t-sm border border-[var(--pub-gold)]/30" />
        </div>
      </div>
    </div>
  );
};

// Scene 2: Colonnade Archway Portal (Close-up & Framing for Push-Through)
export const ArchwayColonnadePortal: React.FC<{
  leftPillarRef?: React.RefObject<HTMLDivElement | null>;
  rightPillarRef?: React.RefObject<HTMLDivElement | null>;
  archVaultRef?: React.RefObject<HTMLDivElement | null>;
  portalInteriorRef?: React.RefObject<HTMLDivElement | null>;
}> = ({ leftPillarRef, rightPillarRef, archVaultRef, portalInteriorRef }) => {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      {/* Background through the archway: View into the grand rotunda */}
      <div
        ref={portalInteriorRef}
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#18322c] via-[#1f3f37] to-[#122420] transition-transform duration-75"
      >
        {/* Warm Golden Interior Ambient Glow */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[var(--pub-gold)]/15 blur-3xl pointer-events-none" />

        {/* Distant Interior Rotunda Arches Silhouette */}
        <svg
          className="w-[80%] max-w-[800px] h-[70%] text-[#142622] opacity-75"
          viewBox="0 0 800 600"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Tiered arched gallery */}
          <path
            d="M100,550 L100,250 C100,100 700,100 700,250 L700,550 Z"
            stroke="#c39a52"
            strokeWidth="1"
            strokeOpacity="0.4"
            fill="#162e27"
          />
          <path
            d="M160,550 L160,270 C160,150 640,150 640,270 L640,550 Z"
            stroke="#c39a52"
            strokeWidth="0.8"
            strokeOpacity="0.3"
            fill="#1b3930"
          />
          {/* Oculus skylight */}
          <ellipse
            cx="400"
            cy="180"
            rx="90"
            ry="35"
            stroke="#c39a52"
            strokeWidth="1.5"
            strokeOpacity="0.6"
            fill="#f5f2e9"
            fillOpacity="0.2"
          />
          {/* Library shelves hint */}
          <line x1="200" y1="340" x2="600" y2="340" stroke="#c39a52" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="200" y1="410" x2="600" y2="410" stroke="#c39a52" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="200" y1="480" x2="600" y2="480" stroke="#c39a52" strokeWidth="1" strokeOpacity="0.3" />
        </svg>

        {/* Perspective Interior Wood Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#0e1c19] to-transparent border-t border-[var(--pub-gold)]/20" />
      </div>

      {/* Massive Overhead Arch Vault (Top) */}
      <div
        ref={archVaultRef}
        className="cinematic-arch-vault absolute top-0 left-0 right-0 h-[42%] z-20 flex flex-col items-center justify-start pointer-events-none"
      >
        <div className="w-full h-16 sm:h-24 bg-[#142823] border-b-2 border-[var(--pub-gold)]/50 shadow-2xl flex flex-col items-center justify-center px-4">
          <div className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[var(--pub-gold)]">
            INDIAN INSTITUTE OF INFORMATION TECHNOLOGY KOTA
          </div>
          <div className="text-sm sm:text-lg public-serif tracking-widest text-[var(--pub-paper)] uppercase mt-1">
            &ldquo;WORK IS WORSHIP &bull; VIDYA DADATI VINAYAM&rdquo;
          </div>
        </div>

        {/* Semicircular Stone Arch Outline */}
        <svg
          className="w-full max-w-[900px] h-full text-[#142823]"
          viewBox="0 0 900 300"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Keystone in center */}
          <path d="M425,0 L475,0 L465,55 L435,55 Z" fill="#1e3a33" stroke="#c39a52" strokeWidth="1.5" />
          {/* Arch voussoirs ring */}
          <path
            d="M50,300 C50,80 850,80 850,300 L760,300 C760,140 140,140 140,300 Z"
            fill="#172f28"
            stroke="#c39a52"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          {/* Decorative dentils under arch */}
          <path
            d="M150,300 C150,150 750,150 750,300"
            stroke="#c39a52"
            strokeWidth="2"
            strokeDasharray="8 6"
            strokeOpacity="0.4"
          />
        </svg>
      </div>

      {/* Flanking Colossal Left Pillar */}
      <div
        ref={leftPillarRef}
        className="cinematic-arch-pillar absolute top-0 bottom-0 left-0 w-[24%] sm:w-[20%] max-w-[280px] bg-gradient-to-r from-[#10201d] via-[#19322c] to-[#122421] border-r border-[var(--pub-gold)]/40 shadow-2xl z-20 flex flex-col justify-between p-4 pointer-events-none"
      >
        <div className="w-full h-12 border-b border-[var(--pub-gold)]/30 bg-[#1d3831] rounded-b-sm flex items-center justify-center">
          <span className="text-[9px] font-mono tracking-widest text-[var(--pub-gold)]/70 uppercase">
            IONIC SHAFT
          </span>
        </div>
        {/* Fluting vertical grooves */}
        <div className="flex-1 flex justify-around px-2 my-2 opacity-50">
          <div className="w-1 bg-[#0f1f1c] shadow-inner" />
          <div className="w-1 bg-[#0f1f1c] shadow-inner" />
          <div className="w-1 bg-[#0f1f1c] shadow-inner" />
          <div className="w-1 bg-[#0f1f1c] shadow-inner" />
        </div>
        <div className="w-full h-16 bg-[#122420] border-t border-[var(--pub-gold)]/40 flex items-center justify-center">
          <span className="text-[9px] font-mono text-[var(--pub-paper)]/50">COLUMN BASE 01</span>
        </div>
      </div>

      {/* Flanking Colossal Right Pillar */}
      <div
        ref={rightPillarRef}
        className="cinematic-arch-pillar absolute top-0 bottom-0 right-0 w-[24%] sm:w-[20%] max-w-[280px] bg-gradient-to-l from-[#10201d] via-[#19322c] to-[#122421] border-l border-[var(--pub-gold)]/40 shadow-2xl z-20 flex flex-col justify-between p-4 pointer-events-none"
      >
        <div className="w-full h-12 border-b border-[var(--pub-gold)]/30 bg-[#1d3831] rounded-b-sm flex items-center justify-center">
          <span className="text-[9px] font-mono tracking-widest text-[var(--pub-gold)]/70 uppercase">
            IONIC SHAFT
          </span>
        </div>
        {/* Fluting vertical grooves */}
        <div className="flex-1 flex justify-around px-2 my-2 opacity-50">
          <div className="w-1 bg-[#0f1f1c] shadow-inner" />
          <div className="w-1 bg-[#0f1f1c] shadow-inner" />
          <div className="w-1 bg-[#0f1f1c] shadow-inner" />
          <div className="w-1 bg-[#0f1f1c] shadow-inner" />
        </div>
        <div className="w-full h-16 bg-[#122420] border-t border-[var(--pub-gold)]/40 flex items-center justify-center">
          <span className="text-[9px] font-mono text-[var(--pub-paper)]/50">COLUMN BASE 02</span>
        </div>
      </div>
    </div>
  );
};

// Scene 3: The Great Rotunda & Archive Vault Interior
export const RotundaInteriorVault: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Architectural Vault Background */}
      <div className="absolute inset-0 bg-radial from-[#22443b] via-[#172e28] to-[#0f1d19]" />

      {/* Soaring Skylight Oculus Ray */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[800px] pointer-events-none"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 0%, transparent 40%, rgba(245, 242, 233, 0.12) 48%, rgba(195, 154, 82, 0.18) 50%, rgba(245, 242, 233, 0.12) 52%, transparent 60%)",
        }}
      />

      {/* Rotunda Architectural Geometry & Mezzanines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Ribbed Dome Arches radiating from top center */}
        {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180].map((deg, i) => (
          <line
            key={i}
            x1="600"
            y1="50"
            x2={600 + Math.cos((deg * Math.PI) / 180) * 900}
            y2={50 + Math.sin((deg * Math.PI) / 180) * 800}
            stroke="#c39a52"
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />
        ))}

        {/* Concentric Vault Rings */}
        <circle cx="600" cy="50" r="140" stroke="#c39a52" strokeWidth="1.2" strokeOpacity="0.5" />
        <circle cx="600" cy="50" r="280" stroke="#c39a52" strokeWidth="0.9" strokeOpacity="0.35" strokeDasharray="6 4" />
        <circle cx="600" cy="50" r="440" stroke="#c39a52" strokeWidth="1" strokeOpacity="0.3" />

        {/* Tier 1 Gallery Balustrade */}
        <path d="M50,480 C350,560 850,560 1150,480" stroke="#c39a52" strokeWidth="2" strokeOpacity="0.6" />
        <path d="M50,510 C350,590 850,590 1150,510" stroke="#c39a52" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Library Archive Shelves (Left & Right Flanks) */}
        {[530, 570, 610, 650, 690, 730].map((sy, i) => (
          <g key={i}>
            <line x1="20" y1={sy} x2="320" y2={sy - 40} stroke="#c39a52" strokeWidth="0.8" strokeOpacity="0.3" />
            <line x1="880" y1={sy - 40} x2="1180" y2={sy} stroke="#c39a52" strokeWidth="0.8" strokeOpacity="0.3" />
          </g>
        ))}
      </svg>

      {/* Atmospheric Dust / Light Particles Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--pub-gold)]/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

// Scene 4: Campus Disciplines & Specialized Environments Blueprint Graphic
export const DisciplineSpaceCardGraphic: React.FC<{
  type: "humanities" | "sciences" | "arts" | "athletics";
}> = ({ type }) => {
  if (type === "humanities") {
    return (
      <svg className="w-full h-full text-[var(--pub-forest)]" viewBox="0 0 400 240" fill="none">
        <rect width="400" height="240" fill="#18312b" />
        {/* Book Stacks & Vaulted Arch Blueprint */}
        <path d="M60,200 L60,80 C60,40 340,40 340,80 L340,200 Z" stroke="#c39a52" strokeWidth="1.2" strokeOpacity="0.5" />
        <path d="M100,200 L100,100 C100,60 300,60 300,100 L300,200 Z" stroke="#c39a52" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="60" y1="120" x2="340" y2="120" stroke="#c39a52" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="60" y1="160" x2="340" y2="160" stroke="#c39a52" strokeWidth="0.8" strokeOpacity="0.3" />
        <circle cx="200" cy="100" r="18" stroke="#c39a52" strokeWidth="1" strokeOpacity="0.6" />
        <text x="200" y="222" textAnchor="middle" fill="#c39a52" fontSize="10" fontFamily="monospace" letterSpacing="2">
          CSE &bull; ALGORITHMS &amp; SYSTEMS
        </text>
      </svg>
    );
  }

  if (type === "sciences") {
    return (
      <svg className="w-full h-full text-[var(--pub-forest)]" viewBox="0 0 400 240" fill="none">
        <rect width="400" height="240" fill="#142a25" />
        {/* Laboratory & Optics Geometry */}
        <circle cx="200" cy="105" r="55" stroke="#c39a52" strokeWidth="1.2" strokeOpacity="0.6" strokeDasharray="4 3" />
        <circle cx="200" cy="105" r="30" stroke="#c39a52" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="100" y1="105" x2="300" y2="105" stroke="#c39a52" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="200" y1="30" x2="200" y2="180" stroke="#c39a52" strokeWidth="0.8" strokeOpacity="0.4" />
        <polygon points="200,65 235,125 165,125" stroke="#c39a52" strokeWidth="1" strokeOpacity="0.5" fill="none" />
        <text x="200" y="222" textAnchor="middle" fill="#c39a52" fontSize="10" fontFamily="monospace" letterSpacing="2">
          AI &amp; DATA ENGINEERING &bull; DEEP LEARNING
        </text>
      </svg>
    );
  }

  if (type === "arts") {
    return (
      <svg className="w-full h-full text-[var(--pub-forest)]" viewBox="0 0 400 240" fill="none">
        <rect width="400" height="240" fill="#1a312a" />
        {/* Amphitheater & Acoustic Wave Geometry */}
        <path d="M80,180 C120,70 280,70 320,180" stroke="#c39a52" strokeWidth="1.5" strokeOpacity="0.6" />
        <path d="M110,180 C140,95 260,95 290,180" stroke="#c39a52" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M140,180 C160,120 240,120 260,180" stroke="#c39a52" strokeWidth="0.8" strokeOpacity="0.4" />
        <circle cx="200" cy="170" r="10" fill="#c39a52" fillOpacity="0.4" />
        <text x="200" y="222" textAnchor="middle" fill="#c39a52" fontSize="10" fontFamily="monospace" letterSpacing="2">
          ECE &bull; VLSI CHIP DESIGN &amp; IOT
        </text>
      </svg>
    );
  }

  return (
    <svg className="w-full h-full text-[var(--pub-forest)]" viewBox="0 0 400 240" fill="none">
      <rect width="400" height="240" fill="#152c26" />
      {/* Athletics Track Oval Geometry */}
      <rect x="70" y="55" width="260" height="110" rx="55" stroke="#c39a52" strokeWidth="1.5" strokeOpacity="0.6" />
      <rect x="95" y="70" width="210" height="80" rx="40" stroke="#c39a52" strokeWidth="1" strokeOpacity="0.4" />
      <rect x="120" y="85" width="160" height="50" rx="25" stroke="#c39a52" strokeWidth="0.8" strokeOpacity="0.3" />
      <text x="200" y="222" textAnchor="middle" fill="#c39a52" fontSize="10" fontFamily="monospace" letterSpacing="2">
        CAMPUS LIFE &bull; SPORTS &bull; EIGEN FEST
      </text>
    </svg>
  );
};
