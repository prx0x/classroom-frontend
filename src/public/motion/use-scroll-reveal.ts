import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";

export interface ScrollRevealOptions {
  /** Selector for elements to animate within the container (default: '[data-reveal]') */
  selector?: string;
  /** Vertical start offset in pixels (default: 20) */
  y?: number;
  /** Animation duration in seconds (default: 0.6) */
  duration?: number;
  /** Stagger delay between items in seconds (default: 0.1) */
  stagger?: number;
  /** ScrollTrigger viewport trigger position (default: 'top 85%') */
  start?: string;
}

/**
 * Reusable scroll-triggered reveal hook using GSAP and ScrollTrigger.
 * Elements tagged with `data-reveal` or custom selector smoothly animate into view.
 * If reduced motion is requested, elements remain fully visible with zero delay.
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    selector = "[data-reveal]",
    y = 20,
    duration = 0.6,
    stagger = 0.1,
    start = "top 85%",
  } = options;

  useGSAP(
    () => {
      if (prefersReducedMotion() || !containerRef.current) return;

      const targets = containerRef.current.querySelectorAll(selector);
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            toggleActions: "play none none none",
            once: true,
          },
          clearProps: "all",
        }
      );
    },
    { scope: containerRef }
  );

  return containerRef;
}
