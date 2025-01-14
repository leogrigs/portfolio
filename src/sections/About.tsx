import AppBullet from "@/components/AppBullet";
import AppSectionWrapper from "@/components/AppSectionWrapper";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function About() {
  const aboutData = useSelector((state: RootState) => {
    if (!state.content.data) return null;
    const _data = state.content.data.about;
    return {
      bullets: _data.bullets,
      image: state.content.data.profilePicture.fields.file.url,
    };
  });

  if (!aboutData) {
    return (
      <AppSectionWrapper sectionId="about" nextSectionId="experience">
        <div className="flex flex-col justify-center">
          <p>Loading...</p>
        </div>
      </AppSectionWrapper>
    );
  }

  return (
    <AppSectionWrapper
      sectionId="about"
      nextSectionId="experience"
      sectionTitle="About"
      sectionNumber="02"
    >
      <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-8 md:gap-16 lg:gap-32">
        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-4">
          {aboutData.bullets.map((paragraph: string, index: number) => (
            <AppBullet bulletText={paragraph} key={`bullet-${index}`} />
          ))}
        </div>

        {/* Image Section */}
        <div className="relative w-32 sm:w-40 md:w-56 lg:w-64">
          {/* Profile Image */}
          <img
            className="rounded-full w-full h-auto object-cover border border-fontColor shadow-lg"
            src={aboutData.image}
            alt="Leonardo Grigorio Ferreira"
          />

          {/* Badge */}
          <a
            href="https://www.credly.com/badges/08549e01-a715-4af4-9188-2f7cb18cf207"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-0 right-0 transform hover:scale-110 transition-transform duration-300"
          >
            <img
              src="https://miro.medium.com/v2/resize:fit:512/0*P7dmdm5OCZaMEPOG"
              alt="AWS Certification Badge"
              className="w-12 sm:w-16 lg:w-20"
            />
          </a>
        </div>
      </div>
    </AppSectionWrapper>
  );
}
