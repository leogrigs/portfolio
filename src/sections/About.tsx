import AppBullet from "@/components/AppBullet";
import AppSectionWrapper from "@/components/AppSectionWrapper";
import { ABOUT } from "@/content/about.const";

export default function About() {
  return (
    <AppSectionWrapper
      sectionId="about"
      nextSectionId="experience"
      sectionTitle="About"
      sectionNumber="02"
    >
      <div className="flex flex-col lg:flex-row items-start gap-32">
        {/* Text Section */}
        <div className="lg:w-1/2 space-y-4 mb-8">
          {ABOUT.map((paragraph, index) => (
            <AppBullet bulletText={paragraph} key={`bullet-${index}`} />
          ))}
        </div>

        {/* Image Section */}
        <div className="w-40 md:w-56 lg:w-80 relative hover:scale-105 transition-transform duration-300 ">
          <img
            className="rounded-full w-full h-auto object-cover border border-fontColor"
            src="https://media.licdn.com/dms/image/v2/D4D03AQFwyDAhI0EPEA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728589234021?e=1740614400&v=beta&t=y6wvt45X0d2oswFED4eAGuxFJQPcVRTcWZdN7toii1c"
            alt="Leonardo Grigorio Ferreira"
          />
          <a
            className="hover:scale-125 transition-transform duration-300 absolute bottom-0 right-8"
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
