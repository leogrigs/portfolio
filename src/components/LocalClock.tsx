import type { Locale } from "@/content";
import { useEffect, useMemo, useState } from "react";

export function LocalClock({
  label,
  locale,
  timeZone = "America/Sao_Paulo",
}: {
  label: string;
  locale: Locale;
  timeZone?: string;
}) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  const format = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
      }),
    [locale, timeZone]
  );

  return (
    <span>
      {label}{" "}
      <time dateTime={now.toISOString()} className="tabular-nums text-foreground">
        {format.format(now)}
      </time>
    </span>
  );
}
