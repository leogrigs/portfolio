import AppSectionWrapper from "@/components/AppSectionWrapper";
import { CONTACTS } from "@/content/contact.const";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Contact() {
  const contactData = useSelector((state: RootState) => {
    if (!state.content.data) return null;
    return {
      sectionTitle: state.content.data.others.sections.contact,
      sectionSubtitle: state.content.data.others.contact.title,
      sectionParagraph: state.content.data.others.contact.paragraph,
    };
  });

  if (!contactData) {
    return (
      <AppSectionWrapper sectionId="about" nextSectionId="experience">
        <div className="flex flex-col justify-center">
          <p>Loading...</p>
        </div>
      </AppSectionWrapper>
    );
  }

  return (
    <AppSectionWrapper
      sectionId="contact"
      sectionNumber="05"
      sectionTitle={contactData.sectionSubtitle}
    >
      <div className="w-full flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold mb-6">{contactData.sectionTitle}</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl">
          {contactData.sectionParagraph}
        </p>
        <div className="flex flex-wrap justify-center gap-8 w-full">
          {CONTACTS.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group text-foreground hover:text-fontColor transform transition-transform hover:scale-110"
            >
              <div className="p-4 flex items-center justify-center">
                {link.icon}
              </div>
              <span className="text-sm mt-2">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </AppSectionWrapper>
  );
}
