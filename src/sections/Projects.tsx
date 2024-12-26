import AppSectionWrapper from "@/components/AppSectionWrapper";

export default function Projects() {
  return (
    <AppSectionWrapper sectionTitle="Projects" sectionId="projects">
      <h3 className="mb-8">
        Here are some of the projects I've worked on. Click on a project to
        learn more.
      </h3>
      <div className="flex justify-between items-center">
        {[1, 2, 3].map((project) => (
          <div
            key={project}
            className="border border-slate-600 rounded-md p-8 min-h-72"
          >
            <h3>Project {project}</h3>
            <p>Project description</p>
          </div>
        ))}
      </div>
    </AppSectionWrapper>
  );
}
