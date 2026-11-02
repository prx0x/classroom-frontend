import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { ScrollTrigger } from "../motion/gsap";

export const PublicLayout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // When route changes, refresh ScrollTrigger to recalculate viewport offsets for the new page
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="public-site">
      <SiteHeader />
      <main className="flex-1 flex flex-col" id="main-content">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};
