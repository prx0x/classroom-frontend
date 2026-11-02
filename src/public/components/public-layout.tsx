import React from "react";
import { Outlet } from "react-router";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export const PublicLayout: React.FC = () => {
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
