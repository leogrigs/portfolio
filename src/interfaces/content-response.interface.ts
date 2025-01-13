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
  projects: {
    title: string;
    cards: ICard[];
  };
}
