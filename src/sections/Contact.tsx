import AppSectionWrapper from "@/components/AppSectionWrapper";
import FadeIn from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/button";
import { CONTACTS } from "@/consts/contact.const";
import { RootState } from "@/store/store";
import { ArrowUpRight, Mail } from "lucide-react";
import { shallowEqual, useSelector } from "react-redux";

const EMAIL = "leo.grigorio16@gmail.com";

export default function Contact() {
  const contactData = useSelector(
    (state: RootState) => ({
      sectionTitle: state.content.data?.others.sections.contact,
      sectionSubtitle: state.content.data?.others.contact.title,
      sectionParagraph: state.content.data?.others.contact.paragraph,
    }),
    shallowEqual
  );

  return (
    <AppSectionWrapper
      sectionId="contact"
      sectionNumber="05"
      sectionTitle={contactData.sectionTitle ?? "Contact"}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
        <FadeIn className="lg:col-span-3">
          <h3 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            {contactData.sectionSubtitle ?? "Let's build something."}
          </h3>
          <p className="text-base md:text-lg text-muted-foreground mt-6 max-w-xl">
            {contactData.sectionParagraph}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full group h-12 pl-5 pr-4"
            >
              <a href={`mailto:${EMAIL}`}>
                <Mail className="mr-1" />
                {EMAIL}
                <ArrowUpRight className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </div>
        </FadeIn>

        <Stagger className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 w-full">
          {CONTACTS.map((link) => (
            <StaggerItem key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 p-4 rounded-xl border border-border bg-surface-1 hover:bg-surface-2 transition-colors"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-background border border-border text-foreground group-hover:text-fontColor transition-colors shrink-0 [&_svg]:size-5">
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {link.label}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {link.href.replace(/^(https?:\/\/|mailto:)/, "")}
                  </p>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-fontColor transition-colors shrink-0" />
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </AppSectionWrapper>
  );
}
