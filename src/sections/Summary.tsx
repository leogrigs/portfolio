export default function Summary() {
  return (
    <section
      id="summary"
      className="h-screen flex flex-col justify-center items-center gap-12 px-6 md:px-16 transition-colors duration-300"
    >
      <div className="fadeup-enter text-left max-w-3xl">
        <h1 className="text-sm text-sky-400 dark:text-sky-600 mb-2 transition-colors duration-300">
          Hi, my name is
        </h1>

        <h2 className="text-5xl md:text-6xl font-extrabold text-white dark:text-gray-800 mb-4 leading-tight transition-colors duration-300">
          Leonardo Grigorio Ferreira
        </h2>

        <h3 className="text-2xl md:text-3xl text-sky-600 dark:text-sky-500 mb-6 font-medium transition-colors duration-300">
          Front-End Developer
        </h3>

        <p className="text-md md:text-lg text-slate-400 dark:text-gray-600 leading-relaxed transition-colors duration-300">
          I’m a passionate and dedicated <strong>Front-End Developer</strong>{" "}
          with over <strong>three years of experience</strong> specializing in{" "}
          <strong>Angular</strong>. I enjoy creating intuitive, accessible, and
          user-friendly web interfaces for a diverse audience. Currently, I am
          expanding my expertise in <strong>React</strong>, <strong>AWS</strong>
          , and modern web technologies to deliver scalable and innovative
          solutions.
        </p>
      </div>
    </section>
  );
}
