import { cn } from "@/lib/utils";
import AppNextSectionButton from "./AppNextSectionButton";

export type SectionHeight = "hero" | "standard" | "closing";

interface AppSectionWrapperProps {
  children: React.ReactNode;
  sectionNumber?: string;
  sectionTitle?: string;
  sectionId: string;
  nextSectionId?: string;
  hideHeader?: boolean;
  height?: SectionHeight;
}

const heightClassName: Record<SectionHeight, string> = {
  hero: "min-h-screen pb-10",
  standard: "min-h-0 py-20 md:py-28",
  closing: "min-h-0 py-20 md:py-28",
};

export default function AppSectionWrapper({
  children,
  sectionNumber,
  sectionTitle,
  sectionId,
  nextSectionId,
  hideHeader = false,
  height = "standard",
}: AppSectionWrapperProps) {
  const isHero = height === "hero";

  return (
    <section
      id={sectionId}
      className={cn(
        "relative flex flex-col px-6 pt-20 md:pt-24 mx-auto w-full max-w-6xl transition-colors duration-300",
        isHero ? "justify-between" : "gap-10",
        heightClassName[height]
      )}
    >
      {!hideHeader && (sectionNumber || sectionTitle) && (
        <div className="mb-10 flex items-end gap-4 md:gap-6">
          {sectionNumber && (
            <span className="font-display text-5xl md:text-7xl leading-none text-gradient select-none">
              {sectionNumber}
            </span>
          )}
          <div className="flex flex-1 items-end gap-4 pb-1 md:pb-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              {sectionTitle}
            </h2>
            <span className="hidden sm:block flex-1 h-px bg-border mb-2" />
          </div>
        </div>
      )}

      <div
        className={cn(
          "flex flex-col",
          isHero && "flex-1 justify-center"
        )}
      >
        {children}
      </div>

      {nextSectionId && (
        <div className="flex justify-center">
          <AppNextSectionButton sectionId={nextSectionId} />
        </div>
      )}
    </section>
  );
}
