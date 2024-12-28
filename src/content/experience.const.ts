import { ICard } from "@/interfaces/card.interface";

export const EXPERIENCES: ICard[] = [
  {
    cardTitle: "AWS Modernization Project",
    cardSubtitle: "NTT DATA – Itaú Unibanco",
    highlights: [
      "Achieved an 800% increase in agency map access within one year (400k users/month).",
      "Boosted user engagement rate by 400% (pending verification).",
      "Reduced content management time from 5 days to a few hours through CMS implementation.",
      "Delivered 100% accessibility compliance with Banco Central regulations.",
    ],
    technologies: [
      "Angular",
      "Node.js",
      "AWS",
      "Contentstack",
      "Jasmine",
      "Karma",
      "RxJS",
      "Google Analytics",
    ],
  },
  {
    cardTitle: "Itaú Private Banking Application",
    cardSubtitle: "NTT DATA – Itaú Unibanco",
    highlights: [
      "Enhanced platform for 5k high-net-worth clients with assets of $1.5M+.",
      "Migrated from a third-party system, achieving significant cost savings (metrics pending).",
      "Delivered multilingual support in English, Spanish, and Portuguese.",
      "Reduced risk with robust OAuth-based JWT authentication and MFA.",
    ],
    technologies: [
      "Angular",
      "Nx",
      "NgRx",
      "Jest",
      "AWS ECS",
      "RDS (MySQL)",
      "Datadog",
      "C# (.NET)",
    ],
  },
];
