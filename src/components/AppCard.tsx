import { ICard } from "@/interfaces/card.interface";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "./ui/badge";

type CardVariant = "default" | "featured";

interface AppCardProps {
  card: ICard;
  variant?: CardVariant;
  className?: string;
}

export default function AppCard({
  card,
  variant = "default",
  className = "",
}: AppCardProps) {
  const isFeatured = variant === "featured";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative h-full ${className}`}
    >
      <div
        aria-hidden
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-from to-accent-to blur-[1px]"
      />
      <div
        className={`relative flex flex-col justify-between h-full rounded-2xl bg-surface-1 border border-border p-5 md:p-6 overflow-hidden ${
          isFeatured ? "min-h-[320px]" : "min-h-[240px]"
        }`}
      >
        {card.image && (
          <div
            className={`-mx-5 -mt-5 md:-mx-6 md:-mt-6 mb-5 overflow-hidden border-b border-border bg-surface-2 ${
              isFeatured ? "h-48 md:h-64" : "h-32"
            }`}
          >
            <img
              src={card.image}
              alt={card.cardTitle}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-snappy group-hover:scale-105"
            />
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <h3
              className={`font-semibold text-foreground leading-tight ${
                isFeatured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
              }`}
            >
              <a
                href={card.cardTitleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline inline-flex items-center gap-1.5 hover:text-fontColor transition-colors"
              >
                {card.cardTitle}
                <ArrowUpRight
                  size={isFeatured ? 22 : 18}
                  className="text-muted-foreground group-hover:text-fontColor transition-colors"
                />
              </a>
            </h3>
          </div>

          <p
            className={`text-muted-foreground ${
              isFeatured ? "text-base" : "text-sm"
            }`}
          >
            {card.cardSubtitle}
          </p>

          <ul className="space-y-1.5 mt-1">
            {card.highlights.map((highlight, i) => (
              <li
                key={highlight}
                className="flex gap-2.5 text-sm text-foreground/90"
              >
                <span
                  aria-hidden
                  className="font-display text-fontColor leading-none mt-1 select-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-border/60">
          {card.technologies.map((technology) => (
            <Badge variant="outline" key={technology} className="font-normal">
              {technology}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
