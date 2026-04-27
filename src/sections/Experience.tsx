import AppCard from "@/components/AppCard";
import AppSectionWrapper from "@/components/AppSectionWrapper";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Experience() {
  const experienceData = useSelector((state: RootState) => {
    const entry = state.content.data?.experience[0];
    return {
      company: entry?.company,
      role: entry?.role,
      period: entry?.period,
      description: entry?.description,
      experiences: entry?.projects,
      sectionTitle: state.content.data?.others.sections.experience,
    };
  });

  if (!experienceData.role) {
    return null;
  }

  return (
    <AppSectionWrapper
      sectionId="experience"
      sectionTitle={experienceData.sectionTitle ?? "Experience"}
      sectionNumber="03"
      nextSectionId="projects"
    >
      <div className="flex flex-col">
        <div className="w-full max-w-6xl">
          <div className="mb-8">
            <h3 className="text-xl font-semibold">
              {`${experienceData.role} `}
              <a
                href="https://www.nttdata.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fontColor no-underline after-line"
              >
                @ {experienceData.company}
              </a>
            </h3>
            <p className="text-sm text-muted-foreground">
              {experienceData.period}
            </p>
            <p className="text-sm md:text-base mt-4">
              {experienceData.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {experienceData.experiences?.map((project) => (
            <AppCard card={project} key={project.cardTitle} />
          ))}
        </div>
      </div>
    </AppSectionWrapper>
  );
}
