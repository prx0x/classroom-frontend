import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "./gsap";

/**
 * Editorial desktop moment for the educational pillars narrative.
 * On desktop (>=1024px), subtly pins the section narrative heading
 * while the 4 pillar cards scroll by, staggering into focus.
 * On mobile/tablet (<1024px) or if reduced-motion is requested,
 * pinning and scrub effects are omitted, preserving native fluid scrolling.
 */
export function useEditorialPillarsMotion() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !containerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const container = containerRef.current;
        if (!container) return;

        const pinHeader = container.querySelector<HTMLElement>(".editorial-pillar-heading");
        const cards = container.querySelectorAll<HTMLElement>(".editorial-pillar-card");

        if (pinHeader) {
          ScrollTrigger.create({
            trigger: container,
            pin: pinHeader,
            start: "top 18%",
            end: "bottom 88%",
            pinSpacing: false,
          });
        }

        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            {
              opacity: 0,
              y: 28,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: container,
                start: "top 75%",
                once: true,
              },
              clearProps: "all",
            }
          );
        }
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return containerRef;
}
