import React from "react";
import { useSprings, animated, config } from "react-spring";
import { useDrag } from "@use-gesture/react";
import { Check, X, ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { Character } from "./types/character";

interface FlashcardProps {
  character: Character;
  nextCard: () => void;
  onCorrect: () => void;
  onWrong: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ character, nextCard, onCorrect, onWrong }) => {
  // Return early if character is not defined
  if (!character) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const [phase, setPhase] = React.useState(1);
  const [feedback, setFeedback] = React.useState<"correct" | "wrong" | null>(null);
  const [wrongAttempts, setWrongAttempts] = React.useState(0);

  // Randomly decide if correct answer should be first or second
  const isCorrectFirst = React.useMemo(() => Math.random() < 0.5, [character, phase]);
  
  const options = React.useMemo(() => {
    const distractor = phase === 1 
      ? character.distractors.pinyin[wrongAttempts % character.distractors.pinyin.length]
      : character.distractors.meaning[wrongAttempts % character.distractors.meaning.length];
    const correct = phase === 1 ? character.pinyin : character.meaning;
    return isCorrectFirst ? [correct, distractor] : [distractor, correct];
  }, [character, phase, wrongAttempts, isCorrectFirst]);

  const correct = phase === 1 ? character.pinyin : character.meaning;

  const [springs, api] = useSprings(2, i => ({
    x: 0,
    scale: 1,
    rotate: 0,
    zIndex: i === 0 ? 2 : 1,
    config: { ...config.gentle }
  }));

  const bind = useDrag(({ args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
    const trigger = vx > 0.2;
    const isCorrect = options[index] === correct;
    const dir = xDir < 0 ? -1 : 1;

    if (!active && trigger) {
      api.start(i => {
        if (i === index) {
          // Consider it correct if:
          // 1. The answer is correct and swiped right (dir > 0)
          // 2. The answer is incorrect and swiped left (dir < 0)
          const isCorrectAction = (isCorrect && dir > 0) || (!isCorrect && dir < 0);
          setFeedback(isCorrectAction ? "correct" : "wrong");
          
          if (isCorrectAction) {
            onCorrect();
            setTimeout(() => {
              setFeedback(null);
              setWrongAttempts(0);
              if (phase === 1) {
                setPhase(2);
              } else {
                setPhase(1);
                nextCard();
              }
              api.start({ x: 0, scale: 1, rotate: 0 });
            }, 1000);
          } else {
            onWrong();
            setWrongAttempts(prev => prev + 1);
            setTimeout(() => {
              setFeedback(null);
              api.start({ x: 0, scale: 1, rotate: 0 });
            }, 1000);
          }
          return {
            x: (200 + window.innerWidth) * dir,
            scale: 0.5,
            rotate: 45 * dir,
          };
        }
        return undefined;
      });
    } else {
      api.start(i => {
        if (i === index) {
          return {
            x: active ? mx : 0,
            scale: active ? 1.1 : 1,
            rotate: active ? (mx / 100) * 20 : 0,
            immediate: active,
          };
        }
        return undefined;
      });
    }
  });

  return (
    <div className={`bg-white rounded-xl shadow-lg p-8 relative transition-colors duration-500 ${
      feedback === "correct" ? "bg-green-50" : feedback === "wrong" ? "bg-red-50" : ""
    }`}>
      <div className="text-center mb-8">
        <span className="text-6xl block mb-4">{character.hanzi}</span>
        <p className="text-gray-600">
          {phase === 1 ? "What's the pinyin?" : "What's the meaning?"}
        </p>
        <div className="flex justify-center items-center gap-2 mt-4">
          <ArrowLeftCircle className="text-red-500" size={24} />
          <p className="text-sm text-gray-500">
            Swipe left for wrong answers, right for correct ones
          </p>
          <ArrowRightCircle className="text-green-500" size={24} />
        </div>
      </div>

      <div className="relative h-32">
        {springs.map((props, i) => (
          <animated.div
            key={i}
            {...bind(i)}
            style={{
              ...props,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              touchAction: "none",
            }}
          >
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm cursor-grab active:cursor-grabbing mx-auto max-w-xs text-center">
              {options[i]}
            </div>
          </animated.div>
        ))}
      </div>

      {feedback && (
        <div className={`mt-6 flex items-center justify-center gap-2 text-lg font-semibold
          ${feedback === "correct" ? "text-green-600" : "text-red-600"}`}
        >
          {feedback === "correct" ? (
            <>
              <Check size={24} className="animate-bounce" />
              <span>Correct!</span>
            </>
          ) : (
            <>
              <X size={24} className="animate-shake" />
              <span>Try again!</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Flashcard;