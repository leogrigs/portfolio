import AppSectionWrapper from "@/components/AppSectionWrapper";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Welcome() {
  const welcomeData = useSelector((state: RootState) => {
    return state.contentV2.data.home;
  });

  return (
    <AppSectionWrapper sectionId="welcome" nextSectionId="about">
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl leading-relaxed md:text-[56px] font-semibold text-center text-fontColor">
          {welcomeData.name}
        </h1>
        <h2 className="text-2xl leading-relaxed md:text-[56px] font-light text-center text-muted-foreground">
          {welcomeData.description}
        </h2>
      </div>
    </AppSectionWrapper>
  );
}
