import AppCard from "@/components/AppCard";
import AppSectionWrapper from "@/components/AppSectionWrapper";
import FadeIn from "@/components/motion/FadeIn";
import { Badge } from "@/components/ui/badge";
import { RootState } from "@/store/store";
import { shallowEqual, useSelector } from "react-redux";

export default function Experience() {
  const { experiences, sectionTitle } = useSelector(
    (state: RootState) => ({
      experiences: state.content.data?.experience ?? [],
      sectionTitle: state.content.data?.others.sections.experience,
    }),
    shallowEqual
  );

  return (
    <AppSectionWrapper
      sectionId="experience"
      sectionTitle={sectionTitle ?? "Experience"}
      sectionNumber="03"
      nextSectionId="projects"
    >
      <div className="relative md:pl-8">
        <span
          aria-hidden
          className="hidden md:block absolute left-2 top-3 bottom-3 w-px bg-gradient-to-b from-accent-from/60 via-border to-transparent"
        />

        <div className="flex flex-col gap-16 md:gap-20">
          {experiences.map((experience, idx) => (
            <FadeIn
              key={`${experience.company}-${idx}`}
              delay={idx * 0.05}
              className="relative"
            >
              <span
                aria-hidden
                className="hidden md:block absolute -left-8 top-2 w-4 h-4 rounded-full bg-gradient-to-br from-accent-from to-accent-to ring-4 ring-background"
              />

              <div className="mb-6">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
                    {experience.role}
                  </h3>
                  <span className="text-muted-foreground">@</span>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-fontColor no-underline after-line text-lg md:text-xl"
                  >
                    {experience.company}
                  </a>
                </div>
                <Badge variant="outline" className="mt-3 font-normal">
                  {experience.period}
                </Badge>
                {experience.description && (
                  <p className="text-sm md:text-base text-muted-foreground mt-4 max-w-3xl">
                    {experience.description}
                  </p>
                )}
              </div>

              {experience.projects && experience.projects.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {experience.projects.map((project) => (
                    <AppCard card={project} key={project.cardTitle} />
                  ))}
                </div>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </AppSectionWrapper>
  );
}
