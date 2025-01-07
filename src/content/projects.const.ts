import { ICard } from "@/interfaces/card.interface";

export const PROJECTS: ICard[] = [
  {
    cardTitle: "Easy Cards",
    cardSubtitle:
      "Enabled efficient learning with customizable flashcards and interactive features.",
    cardTitleLink: "https://easy-cards.vercel.app/",
    highlights: [
      "Code Coverage 80%+.",
      "Automated testing and deployment using GitHub Actions.",
      "Deployed on Vercel.",
      "Authentication using Google OAuth provider.",
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
    cardSubtitle:
      "Streamlined expense tracking and budgeting with an intuitive interface.",
    cardTitleLink: "https://easy-budget-murex.vercel.app/",
    highlights: [
      "Code Coverage 80%+.",
      "Automated testing and deployment using GitHub Actions.",
      "Deployed on Vercel.",
      "Authentication using Google OAuth provider.",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Firebase"],
  },
  {
    cardTitle: "Easy Focus",
    cardTitleLink: "https://easy-focus.vercel.app/",
    cardSubtitle: "Pomodoro Tracker for Focused Studying and Relaxation.",
    highlights: [
      "Boosted study productivity with a simple and effective Pomodoro tracker.",
      "Integrated relaxing music to create a focused learning environment.",
      "Deployed on GitHub Pages.",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "React", "GitHub Pages"],
  },
];
