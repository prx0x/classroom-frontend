import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger once globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // Ensure debugging markers are disabled in production
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });
}

/**
 * Returns true if the user's OS or browser has requested reduced motion.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Check if the current viewport is desktop-sized (width >= 1024px)
 */
export function isDesktopViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= 1024;
}

export { gsap, ScrollTrigger, useGSAP };
