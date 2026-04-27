import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Spotlight from "@/components/motion/Spotlight";
import AppSectionWrapper from "@/components/AppSectionWrapper";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";

function splitName(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return { first: name, rest: "" };
  return {
    first: parts[0],
    rest: parts.slice(1).join(" "),
  };
}

export default function Welcome() {
  const home = useSelector((state: RootState) => state.contentV2.data.home);
  const { first, rest } = splitName(home.name);

  return (
    <AppSectionWrapper sectionId="home" nextSectionId="about" hideHeader>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />
        <Spotlight />
      </div>

      <Stagger
        staggerDelay={0.1}
        initialDelay={0.05}
        className="flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        <StaggerItem>
          <p className="text-sm md:text-base uppercase tracking-[0.2em] text-muted-foreground">
            {home.role}
          </p>
        </StaggerItem>

        <StaggerItem className="mt-3">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[1] tracking-tight text-foreground">
            {first}{" "}
            <span className="text-gradient">{rest}</span>
          </h1>
        </StaggerItem>

        <StaggerItem className="mt-6">
          <p className="text-base md:text-xl font-light text-muted-foreground max-w-2xl">
            {home.description}
          </p>
        </StaggerItem>

        <StaggerItem className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm md:text-base">
            {home.stats?.map((stat, idx) => (
              <div key={stat.label} className="flex items-center gap-3">
                {idx > 0 && (
                  <span className="hidden sm:block w-px h-6 bg-border" />
                )}
                <div className="flex flex-col items-center sm:items-start">
                  <span className="font-display text-xl md:text-2xl text-foreground leading-none">
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem className="mt-10">
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full group">
              <a href="#contact">
                {home.cta?.primary}
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              <a href="#projects">{home.cta?.secondary}</a>
            </Button>
          </div>
        </StaggerItem>
      </Stagger>
    </AppSectionWrapper>
  );
}
