export interface PortfolioContent {
  navbar: Navbar;
  home: Home;
  about: About;
  experience: Experience;
  projects: Projects;
  contact: Contact;
  links: Links;
  footer: Footer;
}

export interface Navbar {
  menu: Menu[];
  resume: string;
  language: Language;
}

export interface Menu {
  label: string;
  id: string;
}

export interface Language {
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
  main_technologies: BulletList;
  picture_url: string;
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
  title: string;
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

export interface Footer {
  made_by: string;
}
