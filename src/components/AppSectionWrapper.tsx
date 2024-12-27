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
      className="min-h-screen flex flex-col py-8 ml-64 mr-8 justify-between transition-colors duration-300"
    >
      <div>
        <h2 className="text-3xl bg-gradient-to-r from-sky-400 to-slate-50 bg-clip-text text-transparent font-bold">
          {sectionTitle}
        </h2>
      </div>
      <div className="max-w-4xl">{children}</div>
      <div className="">
        <AppNextSectionButton sectionId={nextSectionId ?? "welcome"} />
      </div>
    </section>
  );
}
