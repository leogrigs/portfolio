import AppNextSectionButton from "./AppNextSectionButton";

interface AppSectionWrapperProps {
  children: React.ReactNode;
  sectionNumber?: string;
  sectionTitle?: string;
  sectionId: string;
  nextSectionId?: string;
  hideHeader?: boolean;
}

export default function AppSectionWrapper({
  children,
  sectionNumber,
  sectionTitle,
  sectionId,
  nextSectionId,
  hideHeader = false,
}: AppSectionWrapperProps) {
  return (
    <section
      id={sectionId}
      className="relative min-h-screen flex flex-col justify-between px-6 pt-24 pb-10 mx-auto w-full max-w-6xl transition-colors duration-300"
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

      <div className="flex-1 flex flex-col justify-center">{children}</div>

      <div className="mt-10 flex justify-center">
        <AppNextSectionButton sectionId={nextSectionId} />
      </div>
    </section>
  );
}
