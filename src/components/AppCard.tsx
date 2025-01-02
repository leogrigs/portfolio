import { ICard } from "@/interfaces/card.interface";
import { Check } from "lucide-react";

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
            className="no-underline hover:text-sky-400 after-line"
          >
            {card.cardTitle}
          </a>
        </h2>

        {/* Card Subtitle */}
        <p className="text-sm text-slate-400 mb-5">{card.cardSubtitle}</p>

        {/* Highlights List */}
        <ul className="space-y-2">
          {card.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-center text-sm text-foreground"
            >
              <Check className="text-sky-400 mr-2" size={16} />
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      <div>
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-6">
          {card.technologies.map((technology) => (
            <span
              key={technology}
              className="bg-muted text-muted-foreground text-xs font-medium px-3 py-1 rounded-full"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
