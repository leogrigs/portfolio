import DOMPurify from "dompurify";
import { ChevronRight } from "lucide-react";

interface AppBulletProps {
  bulletText: string;
}

export default function AppBullet({ bulletText }: AppBulletProps) {
  const sanitize = (text: string) => DOMPurify.sanitize(text);
  return (
    <div className="flex items-start gap-4">
      <div>
        <ChevronRight size={18} className="text-fontColor mt-1" />
      </div>
      <p
        dangerouslySetInnerHTML={{ __html: sanitize(bulletText) }}
        className="text-sm md:text-lg font-light text-muted-foreground [&>strong]:text-foreground"
      ></p>
    </div>
  );
}
