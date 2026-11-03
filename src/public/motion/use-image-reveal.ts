import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";

/**
 * Subtle scroll reveal for editorial images and visual compositions.
 * Avoids aggressive parallax while providing a calm, premium entrance.
 */
export function useImageReveal() {
  const imageRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !imageRef.current) return;

      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.98,
          y: 14,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 88%",
            once: true,
          },
          clearProps: "all",
        }
      );
    },
    { scope: imageRef }
  );

  return imageRef;
}
