import AppSectionWrapper from "@/components/AppSectionWrapper";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Welcome() {
  const welcomeData = useSelector((state: RootState) => {
    const _data = state.content.data?.welcome;
    return {
      introduction: _data?.introduction,
      firstName: _data?.firstName,
      lastName: _data?.lastName,
      role: _data?.role,
      paragraph: _data?.paragraph,
    };
  });

  return (
    <AppSectionWrapper sectionId="welcome" nextSectionId="about">
      <div className="flex flex-col justify-center">
        <h1 className="text-sm md:text-md bg-gradient-to-r from-fontColor to-foreground bg-clip-text text-transparent mb-2">
          {welcomeData.introduction}
        </h1>
        <h2 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-foreground to-fontColor bg-clip-text text-transparent leading-relaxed">
          {welcomeData.firstName}
        </h2>
        <h2 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-foreground to-fontColor bg-clip-text text-transparent mb-6 !leading-tight">
          {welcomeData.lastName}
        </h2>
        <h3 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-fontColor to-foreground bg-clip-text text-transparent mb-12">
          {welcomeData.role}
        </h3>
        <p className="text-sm md:text-lg font-light text-muted-foreground leading-relaxed mb-6">
          {welcomeData.paragraph}
        </p>
      </div>
    </AppSectionWrapper>
  );
}
