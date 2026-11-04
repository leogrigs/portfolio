import { ChapterHeader } from "@/components/ChapterHeader";
import { DisplayWord } from "@/components/display/DisplayWord";
import { LocalClock } from "@/components/LocalClock";
import { Magnetic } from "@/components/Magnetic";
import { LINKS } from "@/content";
import { useLocale } from "@/i18n/context";
import { Check, Copy, ArrowUpRight, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

function CopyEmail({ label, done }: { label: string; done: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard?.writeText(LINKS.email);
      setCopied(true);
    } catch {
      // clipboard can be blocked; the mailto link still works
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:border-foreground hover:text-foreground"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}

export default function Contact() {
  const { content, locale } = useLocale();
  const { contact, nav, hero } = content;
  const links = [
    { href: LINKS.linkedin, label: contact.links.linkedin },
    { href: LINKS.github, label: contact.links.github },
    { href: LINKS.resume, label: contact.links.resume },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative z-10 flex min-h-[100svh] flex-col px-5 pb-6 pt-28 md:px-10 md:pt-40"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2">
        <DisplayWord
          word={contact.greeting}
          testId="contact-greeting"
          className="text-foreground/[0.07]"
        />
      </div>

      <ChapterHeader index={3} id="contact-title" title={nav.chapters.contact} />

      <div className="my-auto py-16">
        <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          <span aria-hidden className="live-dot size-1.5 rounded-full bg-accent" />
          {contact.emailLabel}
        </p>
        <Magnetic className="mt-5 block w-fit">
          <a
            href={`mailto:${LINKS.email}`}
            className="group relative inline-block break-all font-display text-[clamp(1.4rem,6.2vw,6.4rem)] font-medium leading-none tracking-tighter sm:whitespace-nowrap sm:break-normal"
          >
            {LINKS.email}
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-2 h-[2px] origin-right scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100"
            />
          </a>
        </Magnetic>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          <CopyEmail label={contact.copy} done={contact.copied} />
          <ul className="contents">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 transition-colors hover:bg-foreground hover:text-background"
                >
                  {link.label}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="grid gap-3 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:grid-cols-3 md:items-center">
        <span>
          © {new Date().getFullYear()} {hero.name}
        </span>
        <span className="md:justify-self-center">
          <LocalClock label={contact.clockLabel} locale={locale} />
        </span>
        <a
          href="#home"
          className="inline-flex items-center gap-2 transition-colors hover:text-foreground md:justify-self-end"
        >
          {contact.backToTop}
          <ArrowUp size={13} />
        </a>
      </footer>
    </section>
  );
}
