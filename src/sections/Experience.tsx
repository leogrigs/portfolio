import AppCard from "@/components/AppCard";
import AppSectionWrapper from "@/components/AppSectionWrapper";
import { EXPERIENCES } from "@/content/experience.const";

export default function Experience() {
  return (
    <AppSectionWrapper
      sectionId="experience"
      sectionTitle="Experience"
      sectionNumber="03"
      nextSectionId="projects"
    >
      <div className="flex flex-col bg-background">
        <div className="w-full max-w-6xl">
          {/* Experience Header */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold">
              Frontend Software Engineer{" "}
              <a
                href="https://www.nttdata.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fontColor no-underline after-line"
              >
                @ NTT DATA
              </a>
            </h3>
            <p className="text-sm text-muted-foreground">Nov 2021 – Present</p>
            <p className="text-sm md:text-base mt-4">
              Providing consulting services to Itaú Unibanco, Latin America’s
              largest private bank, specializing in scalable, secure, and
              user-centric web solutions.
            </p>
          </div>
        </div>

        {/* Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {EXPERIENCES.map((project) => (
            <AppCard card={project} key={project.cardTitle} />
          ))}
        </div>
      </div>
    </AppSectionWrapper>
  );
}
