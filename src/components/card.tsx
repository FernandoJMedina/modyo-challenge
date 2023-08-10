import { memo } from "react";
import { Card as CardType } from "../types";
import { cn } from "../lib/utils";

interface CardProps {
  card: CardType;
  handleChoice: (card: CardType) => void;
  flipped: boolean;
  disabled: boolean;
}

export const Card = memo(
  ({ card, handleChoice, flipped, disabled }: CardProps) => {
    function handleClick() {
      if (!disabled) {
        handleChoice(card);
      }
    }

    return (
      <div className="relative">
        <div
          className={cn(
            "transition-all",
            flipped && "[transform:rotateY(0deg)]"
          )}
        >
          <img
            className={cn(
              "aspect-video object-cover rounded-xl border-green-600 absolute border-2 [transform:rotateY(90deg)] transition-all delay-300",
              flipped && "[transform:rotateY(0deg)]"
            )}
            src={card.src}
            alt={card.animal}
          />

          <div
            onClick={handleClick}
            className={cn(
              "aspect-video object-cover rounded-xl transition-all [transform:rotateY(0deg)] delay-100 border-green-600 border-2 cursor-pointer bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-green-200 via-green-400 to-green-500 block",
              flipped && "[transform:rotateY(-90deg)]"
            )}
          />
        </div>
      </div>
    );
  }
);
