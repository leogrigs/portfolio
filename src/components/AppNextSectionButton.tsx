import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

interface AppNextSectionButtonProps {
  sectionId: string;
}

export default function AppNextSectionButton({
  sectionId,
}: AppNextSectionButtonProps) {
  return (
    <div className="flex justify-center">
      <Button asChild variant="ghost" className="rounded-full size-9">
        <a href={`#${sectionId}`}>
          <ChevronDown className="!w-9 !h-9" />
        </a>
      </Button>
    </div>
  );
}
