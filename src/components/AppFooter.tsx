import { RootState } from "@/store/store";
import { ArrowUp } from "lucide-react";
import { useSelector } from "react-redux";

export default function AppFooter() {
  const footer = useSelector((state: RootState) => state.contentV2.data.footer);

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
        <p>{footer.made_by}</p>
        <a
          href="#home"
          className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          Back to top
          <ArrowUp className="size-4" aria-hidden />
        </a>
      </div>
    </footer>
  );
}
