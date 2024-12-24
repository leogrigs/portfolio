import AppNextSectionButton from "@/components/AppNextSectionButton";

export default function Summary() {
  return (
    <section
      id="summary"
      className="min-h-screen flex flex-col justify-center transition-colors duration-300"
    >
      <div className="flex flex-col-reverse mt-auto lg:flex-row justify-center items-center gap-8 lg:gap-16 px-6 md:px-16  ">
        <div className="fadeup-enter text-left lg:max-w-full lg:w-1/2">
          <h1 className="text-sm md:text-md tracking-tight text-blue-400 dark:text-sky-600 mb-2 transition-colors duration-300">
            Hi, my name is
          </h1>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight lg:text-5xl text-white dark:text-gray-800 mb-4 leading-relaxed transition-colors duration-300">
            Leonardo Grigorio Ferreira
          </h2>

          <h3 className="pb-2 text-2xl md:text-3xl font-semibold tracking-tight text-blue-400 dark:text-sky-500 mb-6 transition-colors duration-300">
            Front-End Developer
          </h3>

          <p className="text-sm md:text-lg text-muted-foreground leading-relaxed transition-colors duration-300">
            I’m a passionate and dedicated{" "}
            <strong className="text-white">Front-End Developer</strong> with
            over{" "}
            <strong className="text-white">three years of experience</strong>{" "}
            specializing in <strong className="text-white">Angular</strong>. I
            enjoy creating intuitive, accessible, and user-friendly web
            interfaces for a diverse audience. Currently, I am expanding my
            expertise in <strong className="text-white">React</strong>,{" "}
            <strong className="text-white">AWS</strong>, and modern web
            technologies to deliver scalable and innovative solutions.
          </p>
        </div>
        <div className="w-56 md:w-72">
          <img
            className="rounded-full w-full h-auto object-cover border-2 border-slate-100"
            src="https://media.licdn.com/dms/image/v2/D4D03AQFwyDAhI0EPEA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728589234021?e=1740614400&v=beta&t=y6wvt45X0d2oswFED4eAGuxFJQPcVRTcWZdN7toii1c"
            alt="Leonardo Grigorio Ferreira"
          />
        </div>
      </div>
      <div className="flex justify-center mt-auto mb-24">
        <AppNextSectionButton sectionId="experience" />
      </div>
    </section>
  );
}
