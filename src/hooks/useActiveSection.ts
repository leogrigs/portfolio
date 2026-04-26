import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]): string | null {
  const [active, setActive] = useState<string | null>(sectionIds[0] ?? null);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const visibility = new Map<string, number>();
    sectionIds.forEach((id) => visibility.set(id, 0));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.intersectionRatio);
        });

        let topId: string | null = null;
        let topRatio = 0;
        visibility.forEach((ratio, id) => {
          if (ratio > topRatio) {
            topRatio = ratio;
            topId = id;
          }
        });

        if (topId) setActive(topId);
      },
      {
        threshold: [0.15, 0.35, 0.55, 0.75],
        rootMargin: "-20% 0px -40% 0px",
      }
    );

    const elements: Element[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [sectionIds]);

  return active;
}
