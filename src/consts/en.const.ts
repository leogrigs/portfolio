import { PortfolioContent } from "@/interfaces/portfolio-content.interface";

export const ENGLISH: PortfolioContent = {
  navbar: {
    home: "Home",
    about: "About",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact",
    resume: "Resume",
    language: {
      english: "English",
      portuguese: "Portuguese",
    },
  },
  home: {
    name: "Leonardo Grigorio Ferreira",
    description:
      "I’m a Software Engineer specialized in Web Development and Cloud Technologies",
  },
  about: {
    title: "About Me",
    featured: {
      title: "Featured Skills",
      bullets: [
        "4+ years of experience as a Software Engineer",
        "Bachelor’s degree in Information Systems - USP",
        "Proficient in English for professional communication",
        "Experience with BFFs (Backend for Frontend) in Node.js",
        "Expertise in financial and high-data applications",
      ],
    },
    main_technologies: {
      title: "Main Technologies",
      bullets: [
        "Angular",
        "React",
        "Node.js",
        "AWS",
        "TypeScript",
        "JavaScript",
        "TailwindCSS",
      ],
    },
    picture_url: "https://avatars.githubusercontent.com/u/25400092?v=4",
  },
  experience: {
    title: "Experience",
    experiences: [
      {
        company: "Itaú Unibanco",
        role: "Software Engineer",
        period: "2023 - Present",
        bullets: [
          "Developed and optimized a financial dashboard for high-net-worth clients handling large-scale data.",
          "Designed and implemented a BFF (Backend for Frontend) in Node.js to enhance performance and security.",
          "Integrated analytics and data visualization tools to improve user insights.",
        ],
      },
      {
        company: "NTT Data",
        role: "Software Engineer",
        period: "2022 - 2023",
        bullets: [
          "Developed a multilingual SPA for 5k high-net-worth clients, improving accessibility across Brazil, Miami, and Zurich.",
          "Integrated secure OAuth-based JWT authentication and MFA, strengthening security and user session management.",
          "Implemented a CMS (Contentstack), cutting content management time from days to minutes.",
        ],
      },
    ],
  },
  projects: {
    title: "Projects",
    projects: [
      {
        title: "Easy Budget",
        description: "A simple budget app to help you manage your finances.",
        bullets: [
          "Developed a responsive web app using React and TypeScript.",
          "Implemented a custom hook to manage the app state.",
          "Styled the app using TailwindCSS.",
        ],
        technologies: ["React", "TypeScript", "TailwindCSS"],
        url: "https://easy-budget-app.netlify.app/",
      },
    ],
  },
  contact: {
    title: "Get in Touch",
    email: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
  },
  footer: {
    made_by: "Made by Leonardo Grigorio Ferreira",
  },
  links: {
    resume: "https://drive.google.com/file/d/1",
    github: "https://github.com/leogrigs",
    linkedin: "https://www.linkedin.com/in/leogrigs/",
    email: "mailto:leo.grigorio16@gmail.com",
  },
};
