import AppBullet from "@/components/AppBullet";
import AppSectionWrapper from "@/components/AppSectionWrapper";
import FadeIn from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { RootState } from "@/store/store";
import { Award, Briefcase, Code2, Database, Globe2, LucideIcon, Zap } from "lucide-react";
import { shallowEqual, useSelector } from "react-redux";

const BULLET_ICONS: LucideIcon[] = [
  Briefcase,
  Code2,
  Globe2,
  Database,
  Award,
  Zap,
];

export default function About() {
  const aboutData = useSelector((state: RootState) => {
    const _data = state.content.data?.about;
    return {
      bullets: _data?.bullets,
      image: state.content.data?.profilePicture.fields.file.url,
      sectionTitle: state.content.data?.others.sections.about,
    };
  }, shallowEqual);

  return (
    <AppSectionWrapper
      sectionId="about"
      nextSectionId="experience"
      sectionTitle={aboutData.sectionTitle ?? "About"}
      sectionNumber="02"
    >
      <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-10 md:gap-16 lg:gap-24">
        <Stagger className="w-full md:flex-1 space-y-5">
          {aboutData.bullets?.map((paragraph: string, index: number) => (
            <StaggerItem key={`bullet-${index}`}>
              <AppBullet
                bulletText={paragraph}
                icon={BULLET_ICONS[index % BULLET_ICONS.length]}
              />
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn y={32} className="relative shrink-0">
          <div className="relative w-44 sm:w-52 md:w-60 lg:w-72 aspect-square">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-full bg-gradient-to-br from-accent-from to-accent-to opacity-30 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-from to-accent-to p-[2px]"
            >
              <div className="w-full h-full rounded-full bg-background" />
            </div>
            <img
              src={aboutData.image}
              alt="Leonardo Grigorio Ferreira"
              className="relative w-full h-full object-cover rounded-full shadow-2xl"
            />
            <a
              href="https://www.credly.com/badges/08549e01-a715-4af4-9188-2f7cb18cf207"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-1 right-1 transform hover:scale-110 transition-transform duration-300"
              aria-label="AWS Certification"
            >
              <img
                src="https://miro.medium.com/v2/resize:fit:512/0*P7dmdm5OCZaMEPOG"
                alt="AWS Certification Badge"
                className="w-14 sm:w-16 lg:w-20 drop-shadow-lg"
              />
            </a>
          </div>
        </FadeIn>
      </div>
    </AppSectionWrapper>
  );
}
