import GitHubIcon from "@/components/icon/GitHubIcon";
import LinkedInIcon from "@/components/icon/LinkedInIcon";
import { Mail } from "lucide-react";

export const CONTACTS = [
  {
    href: "https://github.com/leogrigs",
    icon: <GitHubIcon />,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/leonardo-grigorio-ferreira",
    icon: <LinkedInIcon />,
    label: "LinkedIn",
  },
  {
    href: "mailto:leo.grigorio16@gmail.com",
    icon: <Mail size={40} />,
    label: "Email",
  },
];
