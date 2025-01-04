import { ICard } from "@/interfaces/card.interface";
import { Check } from "lucide-react";
import { Badge } from "./ui/badge";

interface AppCardProps {
  card: ICard;
}

export default function AppCard({ card }: AppCardProps) {
  return (
    <div className="bg-background flex flex-col justify-between border border-border h-96 w-full rounded-lg shadow-lg py-8 px-4 transition-transform hover:scale-105">
      {/* Card Title */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-3">
          <a
            href={card.cardTitleLink}
            target="_blank"
            className="no-underline hover:text-fontColor after-line"
          >
            {card.cardTitle}
          </a>
        </h2>

        {/* Card Subtitle */}
        <p className="text-sm text-muted-foreground mb-5">
          {card.cardSubtitle}
        </p>

        {/* Highlights List */}
        <ul className="space-y-2">
          {card.highlights.map((highlight) => (
            <li key={highlight} className="flex text-sm text-foreground">
              <span>
                <Check className="text-fontColor mr-2 mt-1" size={12} />
              </span>

              {highlight}
            </li>
          ))}
        </ul>
      </div>

      <div>
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-6">
          {card.technologies.map((technology) => (
            <Badge variant={"outline"} key={technology}>
              {technology}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
