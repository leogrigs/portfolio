import AppNextSectionButton from "./AppNextSectionButton";

interface AppSectionWrapperProps {
  children: React.ReactNode;
  sectionNumber?: string;
  sectionTitle?: string;
  sectionId: string;
  nextSectionId?: string;
}

export default function AppSectionWrapper({
  children,
  sectionNumber,
  sectionTitle,
  sectionId,
  nextSectionId,
}: AppSectionWrapperProps) {
  return (
    <section
      id={sectionId}
      className="min-h-screen flex flex-col justify-between px-6 pt-24 pb-6 mx-auto w-full max-w-6xl transition-colors duration-300"
    >
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          <span className="text-lg sm:text-xl lg:text-2xl text-fontColor font-light">
            {sectionNumber ? `${sectionNumber}. ` : ""}
          </span>
          {sectionTitle}
        </h2>
      </div>

      {/* Section Content */}
      <div className="max-w-6xl">{children}</div>

      {/* Next Section Button */}
      <div className="mt-6 flex justify-center">
        <AppNextSectionButton sectionId={nextSectionId} />
      </div>
    </section>
  );
}
