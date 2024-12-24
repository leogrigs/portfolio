import AppSectionWrapper from "@/components/AppSectionWrapper";

export default function Welcome() {
  return (
    <AppSectionWrapper sectionId="welcome" nextSectionId="about">
      <div className="flex flex-col justify-center">
        {/* Text Content */}
        <h1 className="text-sm md:text-md bg-gradient-to-r from-sky-400 to-slate-50 bg-clip-text text-transparent mb-2">
          Hi, my name is
        </h1>
        <h2 className="text-3xl md:text-7xl font-extrabold bg-gradient-to-r from-slate-300 to-sky-400 bg-clip-text text-transparent leading-relaxed">
          Leonardo
        </h2>
        <h2 className="text-3xl md:text-7xl font-extrabold bg-gradient-to-r from-slate-300 to-sky-400 bg-clip-text text-transparent mb-6 !leading-tight">
          Grigorio Ferreira.
        </h2>
        <h3 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-sky-400 to-slate-50 bg-clip-text text-transparent mb-12">
          Front-End Developer
        </h3>
        <p className="text-md md:text-lg font-light text-slate-400 leading-relaxed mb-6">
          I’m a dedicated Front-End Developer with over three years of
          experience, specializing in Angular. I create intuitive, accessible,
          and user-friendly web interfaces for diverse audiences while expanding
          my expertise in React, AWS, and modern web technologies to deliver
          innovative and scalable solutions.
        </p>
      </div>
    </AppSectionWrapper>
  );
}
