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
      className="min-h-screen flex flex-col py-8 justify-between transition-colors duration-300"
    >
      <div>
        <h2 className="text-3xl bg-gradient-to-r from-sky-400 to-slate-50 bg-clip-text text-transparent font-bold ml-24">
          {sectionTitle}
        </h2>
      </div>
      <div className="max-w-4xl pl-24">{children}</div>
      <div className="flex justify-center">
        <AppNextSectionButton sectionId={nextSectionId ?? "welcome"} />
      </div>
    </section>
  );
}
