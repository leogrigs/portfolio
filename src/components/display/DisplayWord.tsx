import { useFitFontSize } from "@/hooks/useFitFontSize";
import { useProximityWeight } from "@/hooks/useProximityWeight";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { Letters } from "./Letters";

/**
 * A single big decorative word in the display face. Letters near the pointer
 * thin out and their outline lights up.
 */
export function DisplayWord({
  word,
  className,
  ratio = 0.8,
  maxViewportHeight = 0.45,
  testId,
}: {
  word: string;
  className?: string;
  ratio?: number;
  maxViewportHeight?: number;
  testId?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const fontSize = useFitFontSize(ref, [word], { ratio, maxViewportHeight });
  useProximityWeight(ref, { enabled: !reduced });

  return (
    <div
      ref={ref}
      aria-hidden
      data-testid={testId}
      style={fontSize ? { fontSize } : undefined}
      className="relative grid select-none whitespace-nowrap text-center font-name leading-[0.9]"
    >
      <div className={cn("col-start-1 row-start-1", className)}>
        <Letters word={word} />
      </div>
      <div className="rim-light col-start-1 row-start-1">
        <Letters word={word} />
      </div>
    </div>
  );
}
