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
      className="min-h-screen flex flex-col py-4 ml-64 mr-8 justify-between transition-colors duration-300"
    >
      <div>
        <h2 className="text-3xl mt-4 bg-gradient-to-r font-semibold">
          <span className="text-2xl text-fontColor font-light">
            {sectionNumber ? `${sectionNumber}. ` : ""}
          </span>
          {sectionTitle}
        </h2>
      </div>
      <div className="max-w-6xl">{children}</div>
      <div className="">
        <AppNextSectionButton sectionId={nextSectionId ?? "welcome"} />
      </div>
    </section>
  );
}
