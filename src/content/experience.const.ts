import { ICard } from "@/interfaces/card.interface";

export const EXPERIENCES: ICard[] = [
  {
    cardTitle: "AWS Modernization Project",
    cardTitleLink: "https://www.itau.com.br/",
    cardSubtitle: "NTT DATA – Itaú Unibanco",
    highlights: [
      "Increased agency map access by 800% in one year, reaching 400k users/month.",
      "Delivered 100% accessible pages, ensuring compliance with Banco Central regulations and digital inclusion.",
      "Designed a scalable microfrontend architecture using web components.",
      "Achieved CI/CD compliance with 80%+ unit test coverage using Jasmine and Karma.",
    ],
    technologies: [
      "Angular",
      "Node.js",
      "AWS",
      "Contentstack",
      "Google Analytics 4",
    ],
  },
  {
    cardTitle: "Itaú Private Banking Project",
    cardTitleLink: "https://www.itauprivatebank.com/",
    cardSubtitle: "NTT DATA – Itaú Unibanco",
    highlights: [
      "Enhanced user experience for 5k high-net-worth clients with $1.5M+ in assets.",
      "Delivered a multilingual Single Page Application (SPA) in English, Spanish, and Portuguese using ngx-translate.",
      "Integrated secure OAuth-based JWT authentication, session management, and MFA for improved security.",
      "Implemented a CMS with Contentstack, reducing content management time from days to minutes.",
    ],
    technologies: ["Angular", "NgRx", "Nx", "Jest", "Datadog"],
  },
];
