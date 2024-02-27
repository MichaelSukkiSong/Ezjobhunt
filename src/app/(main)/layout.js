"use client";

import { useMediaQuery } from "@react-hook/media-query";

export default function MainLayout({ children }) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}

      {children}
    </section>
  );
}
