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
      <h3 className="text-lg md:text-xl font-semibold mb-8">
        Here are some of the projects I've worked on.
      </h3>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project, index) => (
          <AppCard card={project} key={`project-${index}`} />
        ))}
      </div>
    </AppSectionWrapper>
  );
}
