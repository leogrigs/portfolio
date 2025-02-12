export interface PortfolioContent {
  navbar: Navbar;
  home: Home;
  about: About;
  experience: Experience;
  projects: Projects;
  contact: Contact;
  madeBy: string;
  links: Links;
}

export interface Navbar {
  home: string;
  about: string;
  experience: string;
  projects: string;
  contact: string;
  resume: string;
  english: string;
  portuguese: string;
}

export interface Home {
  name: string;
  description: string;
}

export interface BulletList {
  title: string;
  bullets: string[];
}

export interface About {
  title: string;
  featured: BulletList;
  mainTechnologies: BulletList;
  pictureUrl: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface Experience {
  title: string;
  experiences: ExperienceEntry[];
}

export interface Project {
  title: string;
  description: string;
  bullets: string[];
  technologies: string[];
  url: string;
}

export interface Projects {
  title: string;
  projects: Project[];
}

export interface Contact {
  getInTouch: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface Links {
  resume: string;
  github: string;
  linkedin: string;
  email: string;
}
