import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Experience() {
  return (
    <section
      id="experience"
      className="h-screen flex flex-col justify-center md:px-16"
    >
      <div className="text-3xl md:text-4xl font-bold text-sky-400 w-full mb-8">
        Experience
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 bg-slate-900 text-slate-200">
        <div className="flex flex-col justify-center items-start md:w-1/3 mb-12 md:mb-0 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Front-End Software Engineer{" "}
            <a
              href="https://www.nttdata.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              @ NTT DATA
            </a>
          </h2>
          <p className="text-md text-slate-300">Nov 2021 – Present</p>
          <p className="text-sm md:text-md text-slate-500">
            I've been working on projects for the biggest private bank in Latin
            America, building secure, accessible, and scalable web applications.
          </p>
        </div>

        <div className="w-full md:w-2/3">
          <Tabs defaultValue="aws-modernization" className="w-full">
            <TabsList>
              <TabsTrigger value="aws-modernization">
                AWS Modernization
              </TabsTrigger>
              <TabsTrigger value="private-bank">Itaú Private Bank</TabsTrigger>
            </TabsList>
            <TabsContent value="aws-modernization">
              <div className="mt-8 space-y-3">
                <h3 className="text-xl font-semibold text-sky-400">
                  AWS Modernization
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-300">
                  <li>
                    Migrated non-logged pages from AEM to Angular + Node.js +
                    AWS, significantly reducing operational costs.
                  </li>
                  <li>
                    Modernized web platforms, improving scalability,
                    accessibility, and performance.
                  </li>
                  <li>
                    Ensured compliance with Central Bank regulations, promoting
                    digital inclusion.
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="private-bank">
              <div className="mt-4 space-y-3">
                <h3 className="text-xl font-semibold text-sky-400">
                  Itaú Private Bank
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-300">
                  <li>
                    Developed a multi-language (English, Portuguese, Spanish)
                    application for clients in Miami, Zurich, and Brazil.
                  </li>
                  <li>
                    Built features using Angular, C# + .NET, and AWS to deliver
                    a secure and user-friendly experience.
                  </li>
                  <li>
                    Improved security through robust authentication systems and
                    ensured scalability for high-value clients.
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
