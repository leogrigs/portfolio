import AppCard from "@/components/AppCard";
import AppSectionWrapper from "@/components/AppSectionWrapper";
import { PROJECTS } from "@/content/projects.const";

export default function Projects() {
  return (
    <AppSectionWrapper
      sectionTitle="Projects"
      sectionNumber="04"
      sectionId="projects"
      nextSectionId="contact"
    >
      <h3 className="mb-8">Here are some of the projects I've worked on.</h3>
      <div className="flex justify-between gap-8 items-center">
        {PROJECTS.map((project) => (
          <AppCard card={project} />
        ))}
      </div>
    </AppSectionWrapper>
  );
}
