import DOMPurify from "dompurify";
import { ChevronRight, LucideIcon } from "lucide-react";

interface AppBulletProps {
  bulletText: string;
  icon?: LucideIcon;
}

export default function AppBullet({
  bulletText,
  icon: Icon = ChevronRight,
}: AppBulletProps) {
  const sanitize = (text: string) => DOMPurify.sanitize(text);
  return (
    <div className="flex items-start gap-4">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-1 border border-border shrink-0 mt-0.5">
        <Icon size={16} className="text-fontColor" />
      </div>
      <p
        dangerouslySetInnerHTML={{ __html: sanitize(bulletText) }}
        className="text-sm md:text-lg font-light text-muted-foreground [&>strong]:text-foreground pt-1"
      ></p>
    </div>
  );
}
