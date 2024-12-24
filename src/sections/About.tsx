import AppSectionWrapper from "@/components/AppSectionWrapper";

export default function About() {
  return (
    <AppSectionWrapper
      sectionId="about"
      nextSectionId="experience"
      sectionTitle="About"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
        {/* Text Section */}
        <div className="lg:w-1/2 space-y-4 mb-8">
          <p className="text-md md:text-lg text-slate-400">
            Hi, I’m Leonardo, a Front-End Developer focused on building
            accessible and high-performing web applications with expertise in
            Angular, SPAs, and microfrontends.
          </p>
          <p className="text-md md:text-lg text-slate-400">
            At NTT DATA, I’ve contributed to modernizing web platforms for Itaú
            Private Bank, enhancing user experience and accessibility, and
            achieving impactful results like a 400% engagement increase.
          </p>
          <p className="text-md md:text-lg text-slate-400">
            I bring skills in Angular Elements, RxJS, NgRx, and Node.js, along
            with a strong foundation in agile methodologies and accessibility
            best practices.
          </p>
        </div>

        {/* Image Section */}
        <div className="w-40 md:w-56 lg:w-80 relative">
          <img
            className="rounded-full w-full h-auto object-cover border border-slate-100"
            src="https://media.licdn.com/dms/image/v2/D4D03AQFwyDAhI0EPEA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728589234021?e=1740614400&v=beta&t=y6wvt45X0d2oswFED4eAGuxFJQPcVRTcWZdN7toii1c"
            alt="Leonardo Grigorio Ferreira"
          />
          <a
            className="absolute bottom-0 right-8"
            href="https://www.credly.com/badges/08549e01-a715-4af4-9188-2f7cb18cf207"
          >
            <img
              src="https://miro.medium.com/v2/resize:fit:512/0*P7dmdm5OCZaMEPOG"
              width="64"
            />
          </a>
        </div>
      </div>
    </AppSectionWrapper>
  );
}
