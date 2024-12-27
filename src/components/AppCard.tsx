import { ICard } from "@/interfaces/card.interface";
import { Check } from "lucide-react";

interface AppCardProps {
  card: ICard;
}

export default function AppCard({ card }: AppCardProps) {
  return (
    <div className="bg-background border border-border rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">
        <a href="#" className="no-underline after-line">
          {card.cardTitle}
        </a>
      </h2>
      <p className="text-sm text-gray-400 mb-4">{card.cardSubtitle}</p>
      <div className="flex flex-wrap -m-1">
        {/* Ul highlight list */}
        <ul className="text-sm text-gray-400 mb-4">
          {card.highlights.map((highlight) => (
            <li key={highlight} className="flex items-center">
              <span className="material-icons text-sky-400 text-sm mr-2">
                <Check />
              </span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap -m-1 mt-4">
        {card.technologies.map((technology) => (
          <span
            key={technology}
            className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full m-1"
          >
            {technology}
          </span>
        ))}
      </div>
    </div>
  );
}
