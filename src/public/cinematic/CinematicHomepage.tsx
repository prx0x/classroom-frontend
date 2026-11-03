import React, { useRef } from "react";
import { Link } from "react-router";
import { schoolConfig } from "@/config/school";
import { CINEMATIC_SCENES } from "./cinematic-config";
import { useCinematicScroll } from "./use-cinematic-scroll";
import {
  ExteriorSkylineVista,
  ArchwayColonnadePortal,
  RotundaInteriorVault,
  DisciplineSpaceCardGraphic,
} from "./CampusVisuals";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  ShieldAlert,
  CheckCircle2,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import "./cinematic-homepage.css";

export const CinematicHomepage: React.FC = () => {
  const { hero, intro, pillars, academicsPreview, values, admissionsCta } = schoolConfig;
  const schoolDisplayName = schoolConfig.name.split(" (")[0];

  // DOM Refs for GSAP Master Timeline
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const cameraRef = useRef<HTMLDivElement | null>(null);

  // Scene 1 Refs
  const scene1Ref = useRef<HTMLDivElement | null>(null);
  const scene1PhotoRef = useRef<HTMLDivElement | null>(null);
  const scene1TextRef = useRef<HTMLDivElement | null>(null);
  const scene1ForegroundRef = useRef<HTMLDivElement | null>(null);

  // Scene 2 Refs
  const scene2Ref = useRef<HTMLDivElement | null>(null);
  const scene2PillarLeftRef = useRef<HTMLDivElement | null>(null);
  const scene2PillarRightRef = useRef<HTMLDivElement | null>(null);
  const scene2ArchVaultRef = useRef<HTMLDivElement | null>(null);
  const scene2TextRef = useRef<HTMLDivElement | null>(null);

  // Scene 3 Refs
  const scene3Ref = useRef<HTMLDivElement | null>(null);
  const scene3TextRef = useRef<HTMLDivElement | null>(null);
  const scene3PillarsContainerRef = useRef<HTMLDivElement | null>(null);

  // Scene 4 Refs
  const scene4Ref = useRef<HTMLDivElement | null>(null);
  const scene4TextRef = useRef<HTMLDivElement | null>(null);
  const scene4CardsRef = useRef<HTMLDivElement | null>(null);

  // Scene 5 Refs
  const scene5Ref = useRef<HTMLDivElement | null>(null);
  const scene5ContentRef = useRef<HTMLDivElement | null>(null);

  // HUD Refs
  const hudProgressTextRef = useRef<HTMLSpanElement | null>(null);
  const hudProgressBarRef = useRef<HTMLDivElement | null>(null);

  const { activeSceneIndex, jumpToScene } = useCinematicScroll({
    containerRef,
    viewportRef,
    cameraRef,
    scene1Ref,
    scene1PhotoRef,
    scene1TextRef,
    scene1ForegroundRef,
    scene2Ref,
    scene2PillarLeftRef,
    scene2PillarRightRef,
    scene2ArchVaultRef,
    scene2TextRef,
    scene3Ref,
    scene3TextRef,
    scene3PillarsContainerRef,
    scene4Ref,
    scene4TextRef,
    scene4CardsRef,
    scene5Ref,
    scene5ContentRef,
    hudProgressTextRef,
    hudProgressBarRef,
  });

  const activeSceneMeta =
    CINEMATIC_SCENES.find((s) => s.index === activeSceneIndex) || CINEMATIC_SCENES[0];

  return (
    <div className="cinematic-wrapper">
      {/* Outer Scroll Track */}
      <div ref={containerRef} className="cinematic-track">
        {/* Pinned 100vh Viewport */}
        <div ref={viewportRef} className="cinematic-viewport">
          {/* Subtle Viewfinder Reticle Corners */}
          <div className="cinematic-reticle-corner cinematic-reticle-tl" />
          <div className="cinematic-reticle-corner cinematic-reticle-tr" />
          <div className="cinematic-reticle-corner cinematic-reticle-bl" />
          <div className="cinematic-reticle-corner cinematic-reticle-br" />

          {/* Depth Vignette Overlay */}
          <div className="cinematic-vignette" />

          {/* Master 3D Camera Rig */}
          <div ref={cameraRef} className="cinematic-camera">
            {/* =======================================================
                SCENE 1: THE ESTABLISHING SHOT
                Grand campus horizon, central hall facade, foreground balustrade
                ======================================================= */}
            <div ref={scene1Ref} className="cinematic-scene-layer">
              <ExteriorSkylineVista
                photoRef={scene1PhotoRef}
                foregroundRef={scene1ForegroundRef}
              />

              {/* Floating Hero Typography Layer */}
              <div
                ref={scene1TextRef}
                className="absolute inset-0 flex items-center justify-center p-6 sm:p-12 z-20 pointer-events-auto"
              >
                <div className="max-w-4xl text-center space-y-6">
                  {/* Status Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--pub-gold)]/20 border border-[var(--pub-gold)]/40 text-[var(--pub-gold)] text-[11px] font-semibold tracking-wider uppercase">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{hero.badge}</span>
                  </div>

                  {/* School Title */}
                  <div className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[var(--pub-paper)]/70 font-mono">
                    {schoolDisplayName} &bull; Ranpur Permanent Campus
                  </div>

                  {/* Main Headline */}
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal public-serif text-[var(--pub-paper)] leading-[1.1] tracking-tight">
                    {hero.headline}
                  </h1>

                  {/* Subheadline */}
                  <p className="text-base sm:text-xl text-[var(--pub-paper)]/80 max-w-2xl mx-auto public-sans font-normal leading-relaxed">
                    {hero.subheadline}
                  </p>

                  {/* Interactive CTAs */}
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                    <Link
                      to={hero.primaryCta.href}
                      className="pub-btn-primary px-6 py-3.5 text-sm sm:text-base bg-[var(--pub-gold)] text-[var(--pub-ink)] hover:bg-[#d6aa5d]"
                    >
                      <span>{hero.primaryCta.label}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>

                    <Link
                      to={hero.secondaryCta.href}
                      className="inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-semibold rounded-md border border-[var(--pub-paper)]/40 text-[var(--pub-paper)] hover:bg-[var(--pub-paper)]/10 transition-colors"
                    >
                      <span>{hero.secondaryCta.label}</span>
                    </Link>

                    <Link
                      to={hero.portalCta.href}
                      className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold rounded-md bg-[#162e27] text-[var(--pub-paper)] border border-[#2b5447] hover:bg-[#1d3d34] transition-colors"
                      title="Direct access to classroom portal"
                    >
                      <GraduationCap className="w-4 h-4 text-[var(--pub-gold)]" />
                      <span>{hero.portalCta.label}</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Foreground Balustrade Element Ref for Parallax scale past camera */}
              <div ref={scene1ForegroundRef} className="absolute inset-0 pointer-events-none" />
            </div>

            {/* =======================================================
                SCENE 2: APPROACHING THE ENTRANCE PORTAL
                Framing colonnade archway and portal push-through
                ======================================================= */}
            <div ref={scene2Ref} className="cinematic-scene-layer opacity-0">
              <ArchwayColonnadePortal
                leftPillarRef={scene2PillarLeftRef}
                rightPillarRef={scene2PillarRightRef}
                archVaultRef={scene2ArchVaultRef}
              />

              {/* Scene 2 Narrative Card */}
              <div
                ref={scene2TextRef}
                className="absolute inset-0 flex items-center justify-center p-6 z-30 pointer-events-auto"
              >
                <div className="cinematic-card max-w-xl p-8 sm:p-10 text-center space-y-4">
                  <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--pub-gold)]">
                    {intro.overline}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-normal public-serif text-[var(--pub-paper)] leading-snug">
                    {intro.heading}
                  </h2>
                  <p className="text-sm sm:text-base text-[var(--pub-paper)]/80 leading-relaxed font-normal">
                    {intro.paragraphs[0]}
                  </p>
                  <div className="pt-2 text-xs font-mono text-[var(--pub-gold)]/80">
                    &bull; Passing into the Central Rotunda &bull;
                  </div>
                </div>
              </div>
            </div>

            {/* =======================================================
                SCENE 3: THE LEARNING ENVIRONMENT & PILLARS
                The Great Rotunda interior and 4 pedagogical pillars
                ======================================================= */}
            <div ref={scene3Ref} className="cinematic-scene-layer opacity-0">
              <RotundaInteriorVault />

              <div className="absolute inset-0 flex flex-col items-center justify-between p-6 sm:p-12 z-20 pointer-events-auto">
                {/* Scene 3 Header Text */}
                <div ref={scene3TextRef} className="text-center space-y-2 mt-16 max-w-2xl">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--pub-gold)]">
                    Pedagogical Framework
                  </span>
                  <h2 className="text-2xl sm:text-4xl public-serif text-[var(--pub-paper)] font-normal">
                    Four Pillars Shaping Our Learning Community
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--pub-paper)]/75 max-w-lg mx-auto">
                    Weaving rigorous scholarship with creative exploration, civic responsibility, and empirical discipline.
                  </p>
                </div>

                {/* 4 Floating Pillar Monoliths */}
                <div
                  ref={scene3PillarsContainerRef}
                  className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-auto"
                >
                  {pillars.map((pillar) => (
                    <div
                      key={pillar.id}
                      className="cinematic-card p-6 flex flex-col justify-between hover:border-[var(--pub-gold)] transition-colors group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-[var(--pub-gold)]/20 pb-2">
                          <span className="font-mono text-sm font-bold text-[var(--pub-gold)]">
                            {pillar.number}
                          </span>
                          <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--pub-paper)]/60">
                            {pillar.category}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-normal public-serif text-[var(--pub-paper)] group-hover:text-[var(--pub-gold)] transition-colors">
                          {pillar.title}
                        </h3>

                        <p className="text-xs text-[var(--pub-paper)]/80 leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-3 border-t border-[var(--pub-gold)]/20">
                        <Link
                          to={pillar.href}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--pub-gold)] hover:underline"
                        >
                          <span>Curriculum Pathway</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-10" />
              </div>
            </div>

            {/* =======================================================
                SCENE 4: CAMPUS DISCIPLINES & ACADEMIC WINGS
                Specialized learning spaces, laboratories, and curriculum
                ======================================================= */}
            <div ref={scene4Ref} className="cinematic-scene-layer opacity-0">
              <div className="absolute inset-0 bg-gradient-to-b from-[#11231f] via-[#162e28] to-[#0e1a17]" />

              <div className="absolute inset-0 flex flex-col items-center justify-between p-6 sm:p-10 z-20 pointer-events-auto">
                {/* Header */}
                <div ref={scene4TextRef} className="text-center space-y-2 mt-16 max-w-2xl">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--pub-gold)]">
                    {academicsPreview.overline}
                  </span>
                  <h2 className="text-2xl sm:text-4xl public-serif text-[var(--pub-paper)] font-normal">
                    {academicsPreview.heading}
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--pub-paper)]/75 max-w-xl mx-auto">
                    {academicsPreview.description}
                  </p>
                </div>

                {/* 3 Academic Discipline Showcase Wings */}
                <div
                  ref={scene4CardsRef}
                  className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 my-auto"
                >
                  {academicsPreview.pathways.map((pathway, idx) => {
                    const graphicType =
                      idx === 0 ? "humanities" : idx === 1 ? "sciences" : "arts";
                    return (
                      <div
                        key={pathway.id}
                        className="cinematic-card overflow-hidden flex flex-col justify-between hover:border-[var(--pub-gold)] transition-colors group"
                      >
                        <div className="w-full h-36 overflow-hidden border-b border-[var(--pub-gold)]/20">
                          <DisciplineSpaceCardGraphic type={graphicType} />
                        </div>

                        <div className="p-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full bg-[var(--pub-gold)]/20 text-[var(--pub-gold)] text-[10px] font-mono uppercase tracking-wider">
                              Pathway 0{idx + 1}
                            </span>
                            <BookOpen className="w-4 h-4 text-[var(--pub-gold)]" />
                          </div>

                          <h3 className="text-xl font-normal public-serif text-[var(--pub-paper)] group-hover:text-[var(--pub-gold)] transition-colors">
                            {pathway.title}
                          </h3>

                          <p className="text-xs text-[var(--pub-paper)]/80 leading-relaxed">
                            {pathway.overview}
                          </p>

                          <div className="space-y-1.5 pt-2">
                            {pathway.focusAreas.slice(0, 3).map((area, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-xs text-[var(--pub-paper)]/90"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--pub-gold)] shrink-0" />
                                <span>{area}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 pt-0">
                          <div className="pt-4 border-t border-[var(--pub-gold)]/20">
                            <Link
                              to={pathway.href}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--pub-gold)] hover:underline"
                            >
                              <span>Explore Discipline</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="h-10" />
              </div>
            </div>

            {/* =======================================================
                SCENE 5: SCHOOL IDENTITY & ADMISSIONS DIALOGUE
                Summit Terrace, Institutional Values, and Call to Action
                ======================================================= */}
            <div ref={scene5Ref} className="cinematic-scene-layer opacity-0">
              {/* Golden Hour Summit Terrace Vista */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#132722] via-[#1a3830] to-[#254d41]" />

              <div
                ref={scene5ContentRef}
                className="absolute inset-0 flex items-center justify-center p-6 sm:p-12 z-20 pointer-events-auto overflow-y-auto"
              >
                <div className="max-w-5xl w-full text-center space-y-8 my-auto py-8">
                  {/* Institutional Crest */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-[var(--pub-gold)] text-[var(--pub-ink)] flex items-center justify-center font-bold public-serif text-2xl tracking-tighter shadow-[0_0_25px_rgba(195,154,82,0.5)]">
                      IK
                    </div>
                    <span className="text-xs uppercase tracking-[0.3em] font-mono text-[var(--pub-gold)]">
                      INSTITUTE OF NATIONAL IMPORTANCE &bull; ACT OF PARLIAMENT
                    </span>
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal public-serif text-[var(--pub-paper)] leading-tight">
                      {schoolDisplayName}
                    </h2>
                    <p className="text-sm sm:text-base text-[var(--pub-paper)]/85 max-w-2xl mx-auto leading-relaxed">
                      {schoolConfig.positioningStatement}
                    </p>
                  </div>

                  {/* Core Institutional Values 4-Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                    {values.items.map((val, idx) => (
                      <div
                        key={idx}
                        className="cinematic-card p-5 space-y-2 border border-[var(--pub-gold)]/30 hover:border-[var(--pub-gold)] transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs border-b border-[var(--pub-gold)]/20 pb-2">
                          <span className="font-mono text-[var(--pub-gold)]">
                            0{idx + 1}
                          </span>
                          {val.latinMotto && (
                            <span className="italic public-serif text-[var(--pub-paper)]/70">
                              {val.latinMotto}
                            </span>
                          )}
                        </div>
                        <h4 className="text-base font-medium public-serif text-[var(--pub-paper)]">
                          {val.name}
                        </h4>
                        <p className="text-xs text-[var(--pub-paper)]/75 leading-relaxed">
                          {val.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Admissions and Navigation Actions */}
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                    <Link
                      to={admissionsCta.primaryCta.href}
                      className="pub-btn-primary px-7 py-3.5 text-base bg-[var(--pub-gold)] text-[var(--pub-ink)] hover:bg-[#d4a85a] font-semibold shadow-lg"
                    >
                      <span>{admissionsCta.primaryCta.label}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>

                    <Link
                      to="/academics"
                      className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold rounded-md border border-[var(--pub-paper)]/40 text-[var(--pub-paper)] hover:bg-[var(--pub-paper)]/10 transition-colors"
                    >
                      <span>Curriculum Pathways</span>
                    </Link>

                    <Link
                      to="/portal"
                      className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold rounded-md bg-[#18362d] text-[var(--pub-paper)] border border-[#2e594b] hover:bg-[#204539] transition-colors"
                    >
                      <GraduationCap className="w-4 h-4 text-[var(--pub-gold)]" />
                      <span>Classroom Portal</span>
                    </Link>
                  </div>

                  {/* Scroll Down Invitation to Complete Page Details */}
                  <div className="pt-4 flex flex-col items-center justify-center gap-1 text-xs text-[var(--pub-gold)]/80 animate-pulse">
                    <span>Scroll down for Admissions Timeline &amp; Campus Directory</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =======================================================
              DIRECTOR'S ARCHITECTURAL HUD OVERLAY
              Coordinates, Scene Jump Bar, and Progress Indicator
              ======================================================= */}
          <div className="cinematic-hud">
            {/* Top Bar: Scene Navigator & Location Badge */}
            <div className="flex items-center justify-between gap-4">
              {/* Scene Navigation Selector */}
              <nav aria-label="Cinematic Scenes" className="cinematic-scene-nav">
                {CINEMATIC_SCENES.map((scene) => {
                  const isActive = scene.index === activeSceneIndex;
                  return (
                    <button
                      key={scene.id}
                      type="button"
                      onClick={() => jumpToScene(scene.index)}
                      className={`cinematic-scene-btn ${isActive ? "is-active" : ""}`}
                      title={`Jump to ${scene.title}`}
                    >
                      <span>{scene.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Coordinates & Scene Metas */}
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-[10px] font-mono tracking-widest text-[var(--pub-gold)] uppercase">
                  {activeSceneMeta.code} &bull; {activeSceneMeta.coordinates}
                </span>
                <span className="text-xs public-serif text-[var(--pub-paper)]/90">
                  {activeSceneMeta.title}
                </span>
              </div>
            </div>

            {/* Bottom Bar: Camera Diagnostics & Scroll Progress */}
            <div className="flex items-end justify-between gap-4">
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[9px] font-mono tracking-widest text-[var(--pub-paper)]/50 uppercase">
                  CAMERA SYSTEM &bull; 3D ARCHITECTURAL DEPTH
                </span>
                <span className="text-[11px] font-mono text-[var(--pub-gold)]/80">
                  SCROLL-PROGRESS DRIVEN
                </span>
              </div>

              {/* Center Scroll Hint */}
              <div className="flex flex-col items-center mx-auto text-center">
                <span className="text-[10px] font-mono tracking-widest text-[var(--pub-paper)]/60 uppercase">
                  SCROLL TO TRAVEL CAMPUS
                </span>
                <div className="w-12 h-1 bg-[var(--pub-paper)]/20 rounded-full mt-1 overflow-hidden">
                  <div
                    ref={hudProgressBarRef}
                    className="h-full bg-[var(--pub-gold)] transition-all duration-75"
                    style={{ width: "0%" }}
                  />
                </div>
              </div>

              {/* Progress Percentage Display */}
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--pub-gold)]">
                <span className="text-[10px] text-[var(--pub-paper)]/60 uppercase tracking-widest">
                  JOURNEY:
                </span>
                <span ref={hudProgressTextRef} className="font-bold">
                  0%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
