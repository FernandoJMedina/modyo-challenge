import { useCallback, useEffect, useState } from "react";
import { NewGameModal } from "./components/new-game-modal";
import { useCards } from "./hooks/useCards";
import { Card as CardType } from "./types";
import { Card } from "./components/card";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

function App() {
  const [showModal, setShowModal] = useState(true);
  const { data = [] } = useCards(6);
  const [cards, setCards] = useState<CardType[]>([]);
  const [firstChoice, setFirstChoice] = useState<CardType | null>(null);
  const [secondChoice, setSecondChoice] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [hits, setHits] = useState(0);
  const [fails, setFails] = useState(0);
  const [win, setWin] = useState(false);
  const [player] = useState(() => localStorage.getItem("player"));

  const handleNewGame = useCallback(() => {
    setShowModal((prev) => !prev);
    const cardImages = data?.map((item) => ({
      src: item.fields.image.url,
      animal: item.fields.image.title,
      matched: false,
    }));
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
  }, [data]);

  const handleChoice = (card: CardType) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.animal === secondChoice.animal) {
        setHits((prev) => prev + 1);
        setCards((prev) => {
          return prev.map((card) => {
            if (card.animal === firstChoice.animal) {
              console.log("entra?");
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setFails((prev) => prev + 1);
        timeout = setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
    return () => clearTimeout(timeout);
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    const handleWin = () => {
      if (cards.length > 0) {
        setWin(cards.every((item) => item.matched));
      }
    };
    handleWin();
  }, [cards]);

  return (
    <>
      <main className="min-h-[100dvh] w-full p-4 sm:p-10 bg-gradient-to-r from-green-400 to-green-200">
        <div className="mx-auto max-w-5xl text-white">
          <h1 className="text-center font-semibold text-2xl sm:text-3xl">
            Memodyo
          </h1>
          {win && (
            <p className="text-center text-3xl sm:text-7xl">
              You have won {player}!!
            </p>
          )}
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">Score</p>
            <span>Hits: {hits}</span>
            <span>Fails: {fails}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  key={card.id}
                  card={card}
                  handleChoice={handleChoice}
                  flipped={
                    card === firstChoice ||
                    card === secondChoice ||
                    card.matched
                  }
                  disabled={disabled}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <NewGameModal visible={showModal} onClose={handleNewGame} />
      </main>
      {win && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </>
  );
}

export default App;
