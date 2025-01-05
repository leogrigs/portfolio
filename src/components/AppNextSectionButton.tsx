import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

interface AppNextSectionButtonProps {
  sectionId?: string;
}

export default function AppNextSectionButton({
  sectionId = "welcome",
}: AppNextSectionButtonProps) {
  return (
    <div className="flex justify-center">
      <Button
        asChild
        variant="ghost"
        className="rounded-full size-8 hover:text-fontColor"
      >
        <a href={`#${sectionId}`}>
          {sectionId === "welcome" ? (
            <ChevronUp className="!size-6" />
          ) : (
            <ChevronDown className="!size-6" />
          )}
        </a>
      </Button>
    </div>
  );
}
