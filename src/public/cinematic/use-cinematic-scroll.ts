import { useRef, useState, useCallback } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "../motion/gsap";
import { CINEMATIC_CONFIG } from "./cinematic-config";

export interface CinematicRefs {
  containerRef: React.RefObject<HTMLDivElement | null>;
  viewportRef: React.RefObject<HTMLDivElement | null>;
  cameraRef: React.RefObject<HTMLDivElement | null>;
  // Scene 1
  scene1Ref: React.RefObject<HTMLDivElement | null>;
  scene1PhotoRef: React.RefObject<HTMLDivElement | null>;
  scene1TextRef: React.RefObject<HTMLDivElement | null>;
  scene1ForegroundRef: React.RefObject<HTMLDivElement | null>;
  // Scene 2
  scene2Ref: React.RefObject<HTMLDivElement | null>;
  scene2PillarLeftRef: React.RefObject<HTMLDivElement | null>;
  scene2PillarRightRef: React.RefObject<HTMLDivElement | null>;
  scene2ArchVaultRef: React.RefObject<HTMLDivElement | null>;
  scene2TextRef: React.RefObject<HTMLDivElement | null>;
  // Scene 3
  scene3Ref: React.RefObject<HTMLDivElement | null>;
  scene3TextRef: React.RefObject<HTMLDivElement | null>;
  scene3PillarsContainerRef: React.RefObject<HTMLDivElement | null>;
  // Scene 4
  scene4Ref: React.RefObject<HTMLDivElement | null>;
  scene4TextRef: React.RefObject<HTMLDivElement | null>;
  scene4CardsRef: React.RefObject<HTMLDivElement | null>;
  // Scene 5
  scene5Ref: React.RefObject<HTMLDivElement | null>;
  scene5ContentRef: React.RefObject<HTMLDivElement | null>;
  // HUD
  hudProgressTextRef: React.RefObject<HTMLSpanElement | null>;
  hudProgressBarRef: React.RefObject<HTMLDivElement | null>;
}

export function useCinematicScroll(refs: CinematicRefs) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(1);
  const [progressPercent, setProgressPercent] = useState(0);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  // Jump to specific scene helper (scrolls window to the appropriate timeline progress)
  const jumpToScene = useCallback(
    (sceneIndex: number) => {
      const st = scrollTriggerInstanceRef.current;
      if (!st) return;

      const sceneProgressMap: Record<number, number> = {
        1: 0.0,
        2: 0.22,
        3: 0.44,
        4: 0.67,
        5: 0.88,
      };

      const targetProgress = sceneProgressMap[sceneIndex] ?? 0;
      const targetScroll = st.start + (st.end - st.start) * targetProgress;

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    },
    []
  );

  useGSAP(
    () => {
      // If user prefers reduced motion or container isn't ready, skip pinned timeline
      if (
        prefersReducedMotion() ||
        !refs.containerRef.current ||
        !refs.viewportRef.current ||
        !refs.cameraRef.current
      ) {
        return;
      }

      const mm = gsap.matchMedia();

      // Desktop and Tablet matchMedia setup
      mm.add("(min-width: 768px)", () => {
        const container = refs.containerRef.current;
        const viewport = refs.viewportRef.current;
        const camera = refs.cameraRef.current;

        if (!container || !viewport || !camera) return;

        // Initialize Scene Opacities & Transforms
        gsap.set(refs.scene1Ref.current, { opacity: 1, scale: 1 });
        if (refs.scene1PhotoRef.current) {
          gsap.set(refs.scene1PhotoRef.current, { scale: 1, yPercent: 0 });
        }
        gsap.set(refs.scene2Ref.current, { opacity: 0, scale: 0.85 });
        gsap.set(refs.scene3Ref.current, { opacity: 0, scale: 0.85 });
        gsap.set(refs.scene4Ref.current, { opacity: 0, scale: 0.85 });
        gsap.set(refs.scene5Ref.current, { opacity: 0, scale: 0.85 });

        // Master Timeline spanning 100 units
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            pin: viewport,
            start: "top top",
            end: "bottom bottom",
            scrub: CINEMATIC_CONFIG.scrubDuration,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              const roundedPct = Math.round(p * 100);
              setProgressPercent(roundedPct);

              // Update HUD DOM directly for 60fps performance without state thrashing
              if (refs.hudProgressTextRef.current) {
                refs.hudProgressTextRef.current.textContent = `${roundedPct}%`;
              }
              if (refs.hudProgressBarRef.current) {
                refs.hudProgressBarRef.current.style.width = `${roundedPct}%`;
              }

              // Update active scene pill indicator based on progress thresholds
              if (p < 0.2) {
                setActiveSceneIndex(1);
              } else if (p < 0.42) {
                setActiveSceneIndex(2);
              } else if (p < 0.65) {
                setActiveSceneIndex(3);
              } else if (p < 0.85) {
                setActiveSceneIndex(4);
              } else {
                setActiveSceneIndex(5);
              }
            },
          },
        });

        scrollTriggerInstanceRef.current = tl.scrollTrigger ?? null;

        // ========================================================
        // SCENE 1: THE ESTABLISHING SHOT (0 -> 22)
        // Camera glides towards campus entrance, foreground expands past lens
        // ========================================================
        tl.addLabel("scene1_start", 0);

        tl.to(
          refs.scene1TextRef.current,
          {
            opacity: 0,
            y: -60,
            scale: 0.95,
            duration: 14,
            ease: "power1.inOut",
          },
          0
        );

        tl.to(
          refs.scene1ForegroundRef.current,
          {
            scale: 1.6,
            y: 90,
            opacity: 0,
            duration: 16,
            ease: "power1.in",
          },
          0
        );

        // Zoom into the authentic college entrance photography!
        if (refs.scene1PhotoRef.current) {
          tl.to(
            refs.scene1PhotoRef.current,
            {
              scale: 1.55,
              yPercent: 3,
              duration: 22,
              ease: "none",
            },
            0
          );
        }

        tl.to(
          refs.scene1Ref.current,
          {
            scale: 1.15,
            duration: 22,
            ease: "none",
          },
          0
        );

        // ========================================================
        // SCENE 2: APPROACHING THE ENTRANCE PORTAL (18 -> 44)
        // Colonnade archway grows, pillars diverge, camera pushes through
        // ========================================================
        tl.addLabel("scene2_start", 18);

        // Crossfade Scene 1 to Scene 2
        tl.to(
          refs.scene1Ref.current,
          {
            opacity: 0,
            duration: 6,
            ease: "power1.inOut",
          },
          18
        );

        tl.fromTo(
          refs.scene2Ref.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1.0, duration: 8, ease: "power1.out" },
          18
        );

        // Scene 2 Introductory Typography
        tl.fromTo(
          refs.scene2TextRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 6, ease: "power2.out" },
          22
        );

        tl.to(
          refs.scene2TextRef.current,
          { opacity: 0, y: -40, duration: 6, ease: "power2.in" },
          32
        );

        // Camera pushes THROUGH the Archway Colonnade (pillars part left & right)
        tl.to(
          refs.scene2PillarLeftRef.current,
          {
            xPercent: -130,
            scale: 2.2,
            opacity: 0.2,
            duration: 16,
            ease: "power1.inOut",
          },
          26
        );

        tl.to(
          refs.scene2PillarRightRef.current,
          {
            xPercent: 130,
            scale: 2.2,
            opacity: 0.2,
            duration: 16,
            ease: "power1.inOut",
          },
          26
        );

        tl.to(
          refs.scene2ArchVaultRef.current,
          {
            yPercent: -80,
            scale: 2.4,
            opacity: 0.1,
            duration: 16,
            ease: "power1.inOut",
          },
          26
        );

        tl.to(
          refs.scene2Ref.current,
          {
            scale: 1.5,
            duration: 16,
            ease: "none",
          },
          26
        );

        // ========================================================
        // SCENE 3: THE GREAT ROTUNDA & PILLARS (40 -> 66)
        // Interior rotunda with soaring bookshelves and floating pillars
        // ========================================================
        tl.addLabel("scene3_start", 40);

        // Scene 2 fades out, Scene 3 Rotunda emerges
        tl.to(
          refs.scene2Ref.current,
          { opacity: 0, duration: 6, ease: "power1.inOut" },
          38
        );

        tl.fromTo(
          refs.scene3Ref.current,
          { opacity: 0, scale: 0.88 },
          { opacity: 1, scale: 1.0, duration: 8, ease: "power1.out" },
          38
        );

        // Rotunda Title
        tl.fromTo(
          refs.scene3TextRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 6, ease: "power2.out" },
          42
        );

        // Animate the 4 pillar cards in 3D sequence
        if (refs.scene3PillarsContainerRef.current) {
          const pillarCards = refs.scene3PillarsContainerRef.current.children;
          if (pillarCards.length > 0) {
            tl.fromTo(
              pillarCards,
              {
                opacity: 0,
                y: 50,
                scale: 0.9,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 3,
                duration: 8,
                ease: "power2.out",
              },
              44
            );
          }
        }

        // Camera tilts upward into rotunda vault
        tl.to(
          camera,
          {
            rotationX: 2.5,
            y: -15,
            duration: 16,
            ease: "sine.inOut",
          },
          42
        );

        // ========================================================
        // SCENE 4: CAMPUS DISCIPLINES & ACADEMIC WINGS (62 -> 86)
        // Architectural corridors, laboratories, and arts studios
        // ========================================================
        tl.addLabel("scene4_start", 62);

        // Reset camera tilt
        tl.to(
          camera,
          {
            rotationX: 0,
            y: 0,
            duration: 8,
            ease: "sine.inOut",
          },
          60
        );

        // Fade Scene 3 into Scene 4
        tl.to(
          refs.scene3Ref.current,
          { opacity: 0, scale: 1.15, duration: 6, ease: "power1.inOut" },
          60
        );

        tl.fromTo(
          refs.scene4Ref.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1.0, duration: 8, ease: "power1.out" },
          60
        );

        // Scene 4 Text
        tl.fromTo(
          refs.scene4TextRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 6, ease: "power2.out" },
          64
        );

        // Animate Discipline Wings Parallax Cards
        if (refs.scene4CardsRef.current) {
          const wingCards = refs.scene4CardsRef.current.children;
          if (wingCards.length > 0) {
            tl.fromTo(
              wingCards,
              {
                opacity: 0,
                x: 40,
                scale: 0.92,
              },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                stagger: 3,
                duration: 10,
                ease: "power2.out",
              },
              66
            );
          }
        }

        // ========================================================
        // SCENE 5: SCHOOL IDENTITY & ADMISSIONS DIALOGUE (82 -> 100)
        // Grand panoramic summit terrace, values, and clear admissions CTAs
        // ========================================================
        tl.addLabel("scene5_start", 82);

        // Fade Scene 4 into Scene 5
        tl.to(
          refs.scene4Ref.current,
          { opacity: 0, scale: 1.15, duration: 6, ease: "power1.inOut" },
          80
        );

        tl.fromTo(
          refs.scene5Ref.current,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1.0, duration: 8, ease: "power1.out" },
          80
        );

        // Scene 5 Content Reveal
        tl.fromTo(
          refs.scene5ContentRef.current,
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1.0, duration: 10, ease: "power2.out" },
          84
        );
      });

      return () => {
        mm.revert();
      };
    },
    { scope: refs.containerRef }
  );

  return {
    activeSceneIndex,
    progressPercent,
    jumpToScene,
  };
}
