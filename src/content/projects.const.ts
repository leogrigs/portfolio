import { ICard } from "@/interfaces/card.interface";

export const PROJECTS: ICard[] = [
  {
    cardTitle: "Easy Cards",
    cardSubtitle: "A Free Flashcard Application for Smarter Studying",
    cardTitleLink: "https://easy-cards.vercel.app/",
    highlights: [
      "Enabled efficient learning with customizable flashcards and interactive features.",
      "Built with an intuitive interface to enhance user engagement and learning experience.",
      "Completely free and accessible, empowering students and professionals to master material effortlessly.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "Firebase",
      "Tailwind CSS",
      "shadcn/ui",
      "Jest",
    ],
  },
  {
    cardTitle: "Easy Budget",
    cardSubtitle: "Simplifying Personal Finance Management",
    cardTitleLink: "https://easy-budget-murex.vercel.app/",
    highlights: [
      "Streamlined expense tracking and budgeting with an intuitive interface.",
      "Developed a visually engaging platform to provide insights into spending habits.",
      "Free, efficient, and accessible, designed to fill a gap in personal finance tools.",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Firebase"],
  },
  {
    cardTitle: "Easy Focus",
    cardTitleLink: "https://leogrigs.github.io/easy-focus/",
    cardSubtitle: "Pomodoro Tracker for Focused Studying",
    highlights: [
      "Boosted study productivity with a simple and effective Pomodoro tracker.",
      "Integrated relaxing music to create a focused learning environment.",
      "User-friendly design for seamless use in study sessions.",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "React", "Vercel", "Vitest"],
  },
];
