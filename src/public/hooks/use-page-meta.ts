import { useEffect } from "react";
import { schoolConfig } from "@/config/school";

export interface PageMetaOptions {
  title: string;
  description?: string;
}

export function usePageMeta({ title, description }: PageMetaOptions) {
  useEffect(() => {
    // Format title using schoolConfig.meta.titleTemplate or fallback
    const template = schoolConfig.meta?.titleTemplate || "%s | School Website";
    document.title = template.replace("%s", title);

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);
    }

    // Scroll to top upon route change
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [title, description]);
}
