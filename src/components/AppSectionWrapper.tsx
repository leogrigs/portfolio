import AppNextSectionButton from "./AppNextSectionButton";

interface AppSectionWrapperProps {
  children: React.ReactNode;
  sectionTitle?: string;
  sectionId: string;
  nextSectionId?: string;
}

export default function AppSectionWrapper({
  children,
  sectionTitle,
  sectionId,
  nextSectionId,
}: AppSectionWrapperProps) {
  return (
    <section
      id={sectionId}
      className="min-h-screen flex flex-col py-24 justify-between transition-colors duration-300"
    >
      <div>
        <h2 className="text-3xl text-white font-bold text-center">
          {sectionTitle}
        </h2>
      </div>
      {children}
      <div className="flex justify-center">
        <AppNextSectionButton sectionId={nextSectionId ?? "welcome"} />
      </div>
    </section>
  );
}
