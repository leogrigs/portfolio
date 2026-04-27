import AppCard from "@/components/AppCard";
import AppSectionWrapper from "@/components/AppSectionWrapper";
import FadeIn from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { RootState } from "@/store/store";
import { shallowEqual, useSelector } from "react-redux";

export default function Projects() {
  const projectsData = useSelector(
    (state: RootState) => ({
      paragraph: state.content.data?.projects.paragraph,
      projects: state.content.data?.projects.projects ?? [],
      sectionTitle: state.content.data?.others.sections.projects,
    }),
    shallowEqual
  );

  const projects = projectsData.projects;

  return (
    <AppSectionWrapper
      sectionTitle={projectsData.sectionTitle ?? "Projects"}
      sectionNumber="04"
      sectionId="projects"
      nextSectionId="contact"
    >
      {projectsData.paragraph && (
        <FadeIn>
          <p className="text-base md:text-lg font-light text-muted-foreground max-w-3xl mb-10">
            {projectsData.paragraph}
          </p>
        </FadeIn>
      )}

      <Stagger
        staggerDelay={0.08}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {projects.map((project, index) => {
          const isFeatured = index === 0 && projects.length > 1;
          return (
            <StaggerItem
              key={project.cardTitle}
              className={isFeatured ? "md:col-span-2" : ""}
            >
              <AppCard
                card={project}
                variant={isFeatured ? "featured" : "default"}
              />
            </StaggerItem>
          );
        })}
      </Stagger>
    </AppSectionWrapper>
  );
}
