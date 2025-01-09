import AppSectionWrapper from "@/components/AppSectionWrapper";
import { client } from "@/contentful/contentful";
import { useEffect, useState } from "react";

export default function Welcome() {
  const [description, setDescription] = useState("");

  useEffect(() => {
    client
      .getEntries({ content_type: "portfolioWelcome", limit: 1 })
      .then((response) => {
        console.log(response);
        setDescription(response.items[0].fields.paragraph as string);
      });
  }, []);

  return (
    <AppSectionWrapper sectionId="welcome" nextSectionId="about">
      <div className="flex flex-col justify-center">
        {/* Text Content */}
        <h1 className="text-sm md:text-md bg-gradient-to-r from-fontColor to-foreground bg-clip-text text-transparent mb-2">
          Hi, my name is
        </h1>
        <h2 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-foreground to-fontColor bg-clip-text text-transparent leading-relaxed">
          Leonardo
        </h2>
        <h2 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-foreground to-fontColor bg-clip-text text-transparent mb-6 !leading-tight">
          Grigorio Ferreira.
        </h2>
        <h3 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-fontColor to-foreground bg-clip-text text-transparent mb-12">
          Front-End Developer
        </h3>
        <p className="text-sm md:text-lg font-light text-muted-foreground leading-relaxed mb-6">
          {description}
        </p>
      </div>
    </AppSectionWrapper>
  );
}
