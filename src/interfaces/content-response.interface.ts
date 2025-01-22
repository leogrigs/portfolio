import { ICard } from "./card.interface";

export interface ContentResponse {
  title: string;
  welcome: {
    role: string;
    lastName: string;
    firstName: string;
    paragraph: string;
    introduction: string;
  };
  about: {
    bullets: string[];
  };
  profilePicture: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  experience: {
    company: string;
    description: string;
    period: string;
    projects: ICard[];
    role: string;
  }[];
  projects: {
    paragraph: string;
    projects: ICard[];
  };
  resumeLink: string;
  others: {
    resumeButton: string;
    links: { href: string; text: string }[];
    sections: {
      [key: string]: string;
    };
    loaderMessage: string;
  };
}
