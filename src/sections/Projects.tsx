import AppCard from "@/components/AppCard";
import AppSectionWrapper from "@/components/AppSectionWrapper";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Projects() {
  const projectsData = useSelector((state: RootState) => {
    if (!state.content.data) return null;
    return {
      paragraph: state.content.data.projects.paragraph,
      projects: state.content.data.projects.projects,
    };
  });

  if (!projectsData) {
    return (
      <AppSectionWrapper sectionId="projects" nextSectionId="contact">
        <div className="flex flex-col justify-center">
          <p>Loading...</p>
        </div>
      </AppSectionWrapper>
    );
  }

  return (
    <AppSectionWrapper
      sectionTitle="Projects"
      sectionNumber="04"
      sectionId="projects"
      nextSectionId="contact"
    >
      <h3 className="text-lg md:text-xl font-semibold mb-8">
        {projectsData.paragraph}
      </h3>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projectsData.projects.map((project, index) => (
          <AppCard card={project} key={`project-${index}`} />
        ))}
      </div>
    </AppSectionWrapper>
  );
}
