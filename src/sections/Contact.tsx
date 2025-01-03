import AppSectionWrapper from "@/components/AppSectionWrapper";
import { CONTACTS } from "@/content/contact.const";

export default function Contact() {
  return (
    <AppSectionWrapper
      sectionId="contact"
      sectionNumber="05"
      sectionTitle="Contact"
    >
      <div className="w-full flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl">
          Whether you have a question or just want to say hi, feel free to reach
          out to me through any of the platforms below.
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
