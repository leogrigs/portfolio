import AppSectionWrapper from "@/components/AppSectionWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Experience() {
  return (
    <AppSectionWrapper
      sectionId="experience"
      sectionTitle="Experience"
      nextSectionId="projects"
    >
      <div className="flex flex-col justify-start items-center bg-background">
        <div className="w-full max-w-6xl">
          <div className="mb-8">
            <h3 className="text-xl font-semibold">
              Front-End Software Engineer{" "}
              <a
                href="https://www.nttdata.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 no-underline after-line"
              >
                @ NTT DATA
              </a>
            </h3>
            <p className="text-sm">Nov 2021 – Present</p>
            <p className="text-sm md:text-base mt-2">
              Building secure, accessible, and scalable web applications for the
              largest private bank in Latin America, ensuring compliance and
              exceptional user experiences.
            </p>
          </div>

          <Tabs defaultValue="aws-modernization">
            <TabsList className="flex space-x-4 border-b border-slate-700">
              <TabsTrigger value="aws-modernization">
                AWS Modernization
              </TabsTrigger>
              <TabsTrigger value="private-bank">Itaú Private Bank</TabsTrigger>
            </TabsList>

            <TabsContent value="aws-modernization" className="mt-6">
              <h4 className="text-lg font-semibold text-blue-400">
                AWS Modernization
              </h4>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  Migrated non-logged pages from AEM to Angular + Node.js + AWS,
                  cutting operational costs.
                </li>
                <li>
                  Enhanced web platform scalability, accessibility, and
                  performance.
                </li>
                <li>
                  Ensured compliance with Central Bank regulations for digital
                  inclusion.
                </li>
              </ul>
            </TabsContent>

            <TabsContent value="private-bank" className="mt-6">
              <h4 className="text-lg font-semibold text-blue-400">
                Itaú Private Bank
              </h4>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  Developed a multi-language (English, Portuguese, Spanish)
                  application for clients in Miami, Zurich, and Brazil.
                </li>
                <li>
                  Built features using Angular, C# + .NET, and AWS for a secure,
                  user-friendly experience.
                </li>
                <li>
                  Enhanced security through robust authentication systems and
                  ensured scalability for high-value clients.
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppSectionWrapper>
  );
}
