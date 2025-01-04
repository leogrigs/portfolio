import AppSectionWrapper from "@/components/AppSectionWrapper";

export default function Welcome() {
  return (
    <AppSectionWrapper sectionId="welcome" nextSectionId="about">
      <div className="flex flex-col justify-center">
        {/* Text Content */}
        <h1 className="text-sm md:text-md bg-gradient-to-r from-fontColor to-foreground bg-clip-text text-transparent mb-2">
          Hi, my name is
        </h1>
        <h2 className="text-3xl md:text-7xl font-bold bg-gradient-to-r from-foreground to-fontColor bg-clip-text text-transparent leading-relaxed">
          Leonardo
        </h2>
        <h2 className="text-3xl md:text-7xl font-bold bg-gradient-to-r from-foreground to-fontColor bg-clip-text text-transparent mb-6 !leading-tight">
          Grigorio Ferreira.
        </h2>
        <h3 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-fontColor to-foreground bg-clip-text text-transparent mb-12">
          Front-End Developer
        </h3>
        <p className="text-md md:text-lg font-light text-muted-foreground leading-relaxed mb-6">
          Frontend Developer with 3+ years of experience in fnancial services
          and consulting, specializing in agile solutions that enhance
          engagement, accessibility, and effciency. Proven track record of
          driving improvements, boosting metrics, and delivering high NPS scores
          through modernized user experiences and collaborative workfows.
        </p>
      </div>
    </AppSectionWrapper>
  );
}
