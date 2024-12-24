import AppSectionWrapper from "@/components/AppSectionWrapper";

export default function About() {
  return (
    <AppSectionWrapper
      sectionId="about"
      nextSectionId="experience"
      sectionTitle="About"
    >
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16 px-6 md:px-16">
        <div className="lg:max-w-full lg:w-1/2">
          <p className="text-md md:text-lg text-slate-300 mb-6">
            Hello! My name is Leonardo, and I enjoy creating web interfaces that
            combine design and functionality. My journey in web development
            began with a deep curiosity for building digital solutions and a
            knack for problem-solving. Over time, I honed my skills and
            specialized in Angular, focusing on delivering accessible, engaging,
            and high-performing web applications.
          </p>
          <p className="text-md md:text-lg text-slate-300 mb-6">
            Currently, I am a Software Engineer at NTT DATA, one of the largest
            technology consultancies in the world. Here, I contribute to
            projects for Itaú Private Bank, a division of Itaú Unibanco,
            offering personalized and exclusive financial services to
            high-income clients. In this role, I work on modernizing web
            platforms to enhance user experience, accessibility, and
            scalability, achieving impactful results such as a 400% increase in
            engagement rates.
          </p>
          <p className="text-md md:text-lg text-slate-300 mb-6">
            I’m also experienced in building SPAs and microfrontends with
            Angular Elements, using reactive programming with RxJS, state
            management with NgRx, and tools like Nx for monorepos. My backend
            work involves creating BFFs in Node.js, prioritizing accessibility
            and functionality with agile frameworks such as Scrum.
          </p>
          <p className="text-md md:text-lg text-slate-300 mb-6">
            I hold a degree in Information Systems from the University of São
            Paulo (USP) and have advanced proficiency in English. I'm constantly
            seeking meaningful challenges where I can contribute my expertise
            while promoting collaborative and motivating work environments.
          </p>
          <h3 className="text-xl font-semibold text-sky-400 mt-8">
            Technologies I’ve Been Working With:
          </h3>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-slate-300">
            <li>JavaScript (ES6+)</li>
            <li>TypeScript</li>
            <li>Angular</li>
            <li>React</li>
            <li>Node.js</li>
            <li>RxJS</li>
            <li>NgRx</li>
            <li>GA4</li>
          </ul>
        </div>
        <div className="w-56 md:w-72">
          <img
            className="rounded-full w-full h-auto object-cover border-2 border-slate-100"
            src="https://media.licdn.com/dms/image/v2/D4D03AQFwyDAhI0EPEA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728589234021?e=1740614400&v=beta&t=y6wvt45X0d2oswFED4eAGuxFJQPcVRTcWZdN7toii1c"
            alt="Leonardo Grigorio Ferreira"
          />
        </div>
      </div>
    </AppSectionWrapper>
  );
}
