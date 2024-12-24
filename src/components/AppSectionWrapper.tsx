import AppNextSectionButton from "./AppNextSectionButton";

interface AppSectionWrapperProps {
  children: React.ReactNode;
  sectionId: string;
  nextSectionId?: string;
}

export default function AppSectionWrapper({
  children,
  sectionId,
  nextSectionId,
}: AppSectionWrapperProps) {
  return (
    <section
      id={sectionId}
      className="min-h-screen flex flex-col justify-center transition-colors duration-300"
    >
      {children}
      <div className="flex justify-center mt-auto mb-24">
        <AppNextSectionButton sectionId={nextSectionId ?? "welcome"} />
      </div>
    </section>
  );
}
