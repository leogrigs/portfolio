import { ChevronRight } from "lucide-react";

interface AppBulletProps {
  bulletText: string;
}

export default function AppBullet({ bulletText }: AppBulletProps) {
  return (
    <div className="flex gap-4">
      <ChevronRight size={32} className="text-fontColor min-w-4" />
      <p className="text-md md:text-lg font-light text-muted-foreground">
        {bulletText}
      </p>
    </div>
  );
}
