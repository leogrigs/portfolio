import type { Content } from "./types";

export const en: Content = {
  meta: {
    title: "Leonardo Grigorio Ferreira · Forward Deployed Engineer",
    description:
      "Software engineer focused on AI automation. Forward Deployed Engineer at Tela.",
    skip: "Skip to content",
  },
  nav: {
    chapters: {
      home: "Start",
      impact: "Impact",
      path: "Path",
      contact: "Contact",
    },
    chapterNav: "Chapters",
    resume: "Resume",
    switchLanguage: "Mudar para português",
    switchLanguageShort: "PT",
    theme: {
      toDark: "Switch to dark theme",
      toLight: "Switch to light theme",
    },
  },
  intro: {
    caption: "Software engineering · AI",
  },
  hero: {
    name: "Leonardo Grigorio Ferreira",
    particleLines: ["LEONARDO"],
    tagline: "Software engineer focused on *AI automation*.",
    facts: [
      "Forward Deployed Engineer at Tela",
      "São Paulo · remote",
      "5 years of experience",
    ],
    scroll: "Scroll down",
  },
  impact: {
    title: "Time per task, *before and after*.",
    beforeLabel: "before",
    afterLabel: "after",
    steps: [
      {
        before: "~30 min",
        after: "1 min",
        context: "customer onboarding",
        where: "Tela",
        ratio: 1 / 30,
      },
      {
        before: "10-15 min",
        after: "1 click",
        context: "product setup in catalogs of up to 10,000 items",
        where: "Kodaris",
        ratio: 0.05,
      },
      {
        before: "5-10 min",
        after: "0",
        context: "manual work per marketplace event",
        where: "Suger",
        ratio: 0,
      },
      {
        before: "days",
        after: "minutes",
        context: "content updates on a private banking app",
        where: "NTT DATA · Itaú",
        ratio: 0.02,
      },
    ],
  },
  path: {
    nowLabel: "Now",
    sinceLabel: "since",
    milestones: [
      {
        year: "2021",
        company: "Luft Brasil",
        role: "IT Intern",
        place: "São Paulo",
        story: "Infrastructure, backups and firewall. Backup costs down 70%.",
      },
      {
        year: "2021",
        company: "NTT DATA · Itaú",
        role: "Junior Software Engineer",
        place: "São Paulo",
        story:
          "Branch locator: traffic up 800%, 400k users a month and fully accessible pages.",
      },
      {
        year: "2023",
        company: "NTT DATA · Itaú Private",
        role: "Software Engineer",
        place: "São Paulo",
        story:
          "Three-language app for clients in Brazil, Miami and Zurich. Led a team of five engineers.",
      },
      {
        year: "2024",
        company: "Kodaris",
        role: "UX Engineer",
        place: "Atlanta · remote",
        story:
          "First AI tool in production. Direct contact with customers, including the largest one.",
      },
      {
        year: "2025",
        company: "Suger",
        role: "Software Engineer",
        place: "San Francisco · remote",
        story: "Go and AWS Marketplace. Dozens of event-driven workflows.",
      },
      {
        year: "2025",
        company: "Tela",
        role: "Forward Deployed Engineer",
        place: "San Francisco · remote",
        story:
          "Legal case data extraction, document anti-fraud and an internal chatbot over company files.",
        current: true,
      },
    ],
    stackLabel: "Tools",
    stack: [
      "TypeScript",
      "Vue",
      "Nuxt",
      "Go",
      "Python",
      "PostgreSQL",
      "AWS",
      "Trigger.dev",
      "LLMs",
      "Claude Code",
      "Railway",
      "Datadog",
      "Metabase",
      "React",
      "Angular",
      "Node.js",
    ],
  },
  contact: {
    particleWord: "hi",
    emailLabel: "Email",
    copy: "Copy email",
    copied: "Copied",
    links: {
      linkedin: "LinkedIn",
      github: "GitHub",
      resume: "Resume",
    },
    clockLabel: "São Paulo",
    backToTop: "Back to top",
  },
};
