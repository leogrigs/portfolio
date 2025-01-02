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
      <div className="flex flex-col justify-start bg-background">
        <div className="w-full max-w-6xl">
          <div className="mb-8">
            <h3 className="text-xl font-semibold">
              Front-End Software Engineer{" "}
              <a
                href="https://www.nttdata.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fontColor no-underline after-line"
              >
                @ NTT DATA
              </a>
            </h3>
            <p className="text-sm">Nov 2021 – Present</p>
            <p className="text-sm md:text-base mt-2">
              Building secure, accessible, and scalable web applications for the
              largest private bank in Latin America.
            </p>
          </div>
        </div>
        <div className="flex justify-start gap-8 items-center">
          {EXPERIENCES.map((project) => (
            <AppCard card={project} />
          ))}
        </div>
      </div>
    </AppSectionWrapper>
  );
}
