import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";

/**
 * Restrained hero entrance animation for public pages.
 * Animates elements tagged with `data-hero-elem` with a subtle vertical reveal and stagger.
 * If reduced motion is requested, content is displayed immediately without animation.
 */
export function useHeroEntrance() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !containerRef.current) return;

      const elements = containerRef.current.querySelectorAll("[data-hero-elem]");
      if (!elements.length) return;

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "all",
        }
      );
    },
    { scope: containerRef }
  );

  return containerRef;
}
