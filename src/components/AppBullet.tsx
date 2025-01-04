import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface AppBulletProps {
  bulletText: ReactNode;
}

export default function AppBullet({ bulletText }: AppBulletProps) {
  return (
    <div className="flex items-start gap-4">
      <div>
        <ChevronRight size={18} className="text-fontColor mt-1" />
      </div>
      <p className="text-sm md:text-lg font-light text-muted-foreground [&>strong]:text-foreground">
        {bulletText}
      </p>
    </div>
  );
}
