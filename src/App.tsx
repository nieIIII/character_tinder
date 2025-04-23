import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import { AddCharacter } from "./components/AddCharacter";
import { ArrowRight, Infinity, BarChart3, Timer, Plus } from "lucide-react";
import { Character, CharacterSet } from "./types/character";
import { characterSets, getCharacterSet } from "./lib/characters";

type Mode = "normal" | "endless" | "stats" | "add";
type CharacterStats = Record<string, { correct: number; attempts: number }>;

const TIMER_DURATION = 120; // 2 minutes in seconds

export default function App() {
  const [mode, setMode] = useState<Mode>("normal");
  const [selectedSet, setSelectedSet] = useState<CharacterSet>("hsk1");
  const [index, setIndex] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0 });
  const [endlessStats, setEndlessStats] = useState({ correct: 0, incorrect: 0 });
  const [highScores, setHighScores] = useState<Record<CharacterSet, number>>(() => {
    const saved = localStorage.getItem('highScores');
    return saved ? JSON.parse(saved) : { hsk1: 0, hsk2: 0, hsk3: 0, custom: 0 };
  });
  const [stats, setStats] = useState<CharacterStats>(() => {
    const saved = localStorage.getItem('characterStats');
    return saved ? JSON.parse(saved) : {};
  });
  
  const characters = getCharacterSet(selectedSet);
  const [endlessCharacters, setEndlessCharacters] = useState<Character[]>([]);

  useEffect(() => {
    localStorage.setItem('highScores', JSON.stringify(highScores));
    localStorage.setItem('characterStats', JSON.stringify(stats));
  }, [highScores, stats]);

  useEffect(() => {
    if (mode === "endless") {
      setEndlessCharacters([...characters].sort(() => Math.random() - 0.5));
      setEndlessStats({ correct: 0, incorrect: 0 });
    } else {
      setTimeLeft(TIMER_DURATION);
      setIsTimerRunning(false);
      setSessionStats({ correct: 0, incorrect: 0 });
    }
  }, [mode, selectedSet]);

  useEffect(() => {
    let timer: number;
    if (isTimerRunning && timeLeft > 0 && mode === "normal") {
      timer = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft, mode]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
  }, [timeLeft]);

  const startTimer = () => {
    setIsTimerRunning(true);
    setTimeLeft(TIMER_DURATION);
    setSessionStats({ correct: 0, incorrect: 0 });
    setIndex(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const nextCard = () => {
    if (mode === "endless") {
      if (endlessCharacters.length < 5) {
        setEndlessCharacters(prev => [
          ...prev,
          ...characters.sort(() => Math.random() - 0.5)
        ]);
      }
      setEndlessCharacters(prev => prev.slice(1));
    } else {
      if (!isTimerRunning) {
        startTimer();
      }
      setIndex((prev) => (prev + 1) % characters.length);
    }
  };

  const updateStats = (character: Character, isCorrect: boolean) => {
    setStats(prev => {
      const current = prev[character.hanzi] || { correct: 0, attempts: 0 };
      return {
        ...prev,
        [character.hanzi]: {
          correct: current.correct + (isCorrect ? 1 : 0),
          attempts: current.attempts + 1
        }
      };
    });

    if (mode === "normal") {
      setSessionStats(prev => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        incorrect: prev.incorrect + (!isCorrect ? 1 : 0)
      }));
    } else if (mode === "endless") {
      setEndlessStats(prev => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        incorrect: prev.incorrect + (!isCorrect ? 1 : 0)
      }));
    }
  };

  const handleCorrectAnswer = () => {
    const newStreak = currentStreak + 1;
    setCurrentStreak(newStreak);
    updateStats(mode === "endless" ? endlessCharacters[0] : characters[index], true);
    
    if (newStreak > highScores[selectedSet]) {
      setHighScores(prev => ({
        ...prev,
        [selectedSet]: newStreak
      }));
    }
  };

  const handleWrongAnswer = () => {
    setCurrentStreak(0);
    updateStats(mode === "endless" ? endlessCharacters[0] : characters[index], false);
  };

  const handleSetChange = (newSet: CharacterSet) => {
    setSelectedSet(newSet);
    setIndex(0);
    setCurrentStreak(0);
    setTimeLeft(TIMER_DURATION);
    setIsTimerRunning(false);
    setSessionStats({ correct: 0, incorrect: 0 });
    setEndlessStats({ correct: 0, incorrect: 0 });
    if (mode === "endless") {
      setEndlessCharacters(getCharacterSet(newSet).sort(() => Math.random() - 0.5));
    }
  };

  if (mode === "add") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Add Custom Characters</h1>
            <button
              onClick={() => setMode("normal")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to Cards
            </button>
          </div>
          <AddCharacter onAdd={() => {
            // Force a refresh of the characters
            setSelectedSet("custom");
          }} />
        </div>
      </div>
    );
  }

  if (mode === "stats") {
    const currentCharacters = getCharacterSet(selectedSet);
    const sortedStats = currentCharacters
      .map(char => ({
        character: char,
        stats: stats[char.hanzi] || { correct: 0, attempts: 0 }
      }))
      .sort((a, b) => 
        (b.stats.correct / (b.stats.attempts || 1)) - 
        (a.stats.correct / (a.stats.attempts || 1))
      );

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Statistics</h1>
            <button
              onClick={() => setMode("normal")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to Cards
            </button>
          </div>

          <div className="mb-4">
            <select 
              value={selectedSet}
              onChange={(e) => handleSetChange(e.target.value as CharacterSet)}
              className="block rounded-md border-gray-300 shadow-sm px-4 py-2 bg-white"
            >
              {Object.keys(characterSets).map((set) => (
                <option key={set} value={set}>
                  {set.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {sortedStats.map(({ character, stats }) => (
                <div key={character.hanzi} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{character.hanzi}</span>
                    <span className="text-gray-600">
                      {character.pinyin} ({character.meaning})
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      Success rate: {stats.attempts ? Math.round((stats.correct / stats.attempts) * 100) : 0}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {stats.correct}/{stats.attempts} correct
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "normal" && timeLeft === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Time's Up!</h2>
            <div className="text-lg mb-6">
              <p>Correct answers: <span className="font-bold text-green-600">{sessionStats.correct}</span></p>
              <p>Incorrect answers: <span className="font-bold text-red-600">{sessionStats.incorrect}</span></p>
              <p className="mt-2">
                Success rate: {Math.round((sessionStats.correct / (sessionStats.correct + sessionStats.incorrect || 1)) * 100)}%
              </p>
            </div>
            <button
              onClick={() => startTimer()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Play Again
            </button>
            <button
              onClick={() => setMode("endless")}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors ml-4"
            >
              Try Endless Mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setMode(mode === "normal" ? "endless" : "normal")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              {mode === "normal" ? <Infinity size={18} /> : <ArrowRight size={18} />}
              {mode === "normal" ? "Endless Mode" : "Normal Mode"}
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setMode("add")}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <Plus size={18} />
                Add Characters
              </button>
              <button
                onClick={() => setMode("stats")}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <BarChart3 size={18} />
                Statistics
              </button>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">Chinese Flashcards</h1>
          
          <div className="mb-4">
            <select 
              value={selectedSet}
              onChange={(e) => handleSetChange(e.target.value as CharacterSet)}
              className="mt-2 block rounded-md border-gray-300 shadow-sm px-4 py-2 bg-white"
            >
              {Object.keys(characterSets).map((set) => (
                <option key={set} value={set}>
                  {set.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center gap-8 mb-4">
            <div className="text-gray-600">
              <span className="font-semibold">Current Streak:</span> {currentStreak}
            </div>
            <div className="text-gray-600">
              <span className="font-semibold">Best Streak:</span> {highScores[selectedSet]}
            </div>
            {mode === "normal" && (
              <div className="text-gray-600 flex items-center gap-2">
                <Timer size={18} />
                <span className="font-semibold">{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>

          {mode === "normal" && !isTimerRunning && timeLeft === TIMER_DURATION && (
            <button
              onClick={startTimer}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mb-4"
            >
              Start Timer
            </button>
          )}

          {mode === "normal" && isTimerRunning && (
            <div className="flex justify-center gap-4 mb-4">
              <div className="text-gray-600">
                <span className="font-semibold">Correct:</span> {sessionStats.correct}
              </div>
              <div className="text-gray-600">
                <span className="font-semibold">Incorrect:</span> {sessionStats.incorrect}
              </div>
            </div>
          )}

          {mode === "endless" && (
            <div className="flex justify-center gap-4 mb-4">
              <div className="text-gray-600">
                <span className="font-semibold">Correct:</span> {endlessStats.correct}
              </div>
              <div className="text-gray-600">
                <span className="font-semibold">Incorrect:</span> {endlessStats.incorrect}
              </div>
            </div>
          )}
        </div>
        
        {(mode === "endless" || isTimerRunning || (!isTimerRunning && timeLeft === TIMER_DURATION)) && (
          <>
            <Flashcard 
              character={mode === "endless" ? endlessCharacters[0] : characters[index]} 
              nextCard={nextCard}
              onCorrect={handleCorrectAnswer}
              onWrong={handleWrongAnswer}
            />

            <div className="mt-8 text-center">
              <button
                onClick={nextCard}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Skip Card
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">High Scores</h2>
          <div className="space-y-2">
            {Object.entries(highScores).map(([set, score]) => (
              <div key={set} className="flex justify-between items-center">
                <span className="text-gray-700">{set.toUpperCase()}</span>
                <span className="font-semibold">{score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}