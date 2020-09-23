import React, {useCallback, useEffect, useState} from "react";
import TestText from "./TestText";
import { Difficulty, Stat, CompletedWord } from "../types";
import makeWords from "../text";

interface Props {
  difficulty: Difficulty,
  onStatsChange: (stats: Stat[]) => void
}

const TypingTest: React.FC<Props> = ({
  difficulty,
  onStatsChange,
}) => {

  const [completedWords, setCompletedWords] = useState<CompletedWord[]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [remainingWords, setRemainingWords] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [startTimestamp, setStartTimestamp] = useState<number>(0);
  const isComplete = startTimestamp !== 0 && remainingWords.length === 0;

  const resetState = useCallback(() => {
    const words = makeWords(difficulty, 100);
    setCompletedWords([]);
    setCurrentWord(words.shift() || '');
    setRemainingWords(words);
    setStartTimestamp(0);
    setCorrectCount(0);
    setInputText('');
    onStatsChange([
      { name: 'WPM', value: 0 },
      { name: 'ACC', value: '0.00%' },
    ]);
  }, [difficulty, onStatsChange]);

  const startTiming = useCallback(() => {
    if (inputText !== '' && startTimestamp === 0) {
      setStartTimestamp(Date.now())
    }
  }, [inputText, startTimestamp])

  const onTestFinish = useCallback(() => {
    if (isComplete) {
      const accuracy = correctCount / (completedWords.length || 1) * 100;
      const minutesTaken = (Date.now() - startTimestamp) / 1000 / 60;
      const wpm = completedWords.length / minutesTaken;

      onStatsChange([
        { name: 'WPM', value: wpm.toFixed(2) },
        { name: 'ACC', value: accuracy.toFixed(2) + '%' },
      ])
    }
  }, [isComplete])

  useEffect(resetState, [resetState]);
  useEffect(startTiming, [startTiming]);
  useEffect(startTiming, [startTiming]);
  useEffect(onTestFinish, [onTestFinish]);

  const moveWords = useCallback(() => {
    const isCorrect = inputText === currentWord;

    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }

    setCompletedWords([...completedWords,  { isCorrect, text: currentWord }]);
    setCurrentWord(remainingWords[0]);
    setRemainingWords(remainingWords.filter((_, i) => i !== 0));
  }, [inputText, completedWords, currentWord, remainingWords]);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.endsWith(' ')) {
      moveWords();
      setInputText('');
    } else {
      setInputText(value);
    }
  }, [moveWords]);

  const isWrongInput = inputText && !currentWord.startsWith(inputText);

  return (
    <div
      id="test-container"
      className="p-4 rounded shadow-lg bg-dracula-white hover:shadow-2xl
        flex flex-col justify-between items-center"
    >
      <TestText
        completedWords={completedWords}
        currentWord={currentWord}
        remainingWords={remainingWords}
      />
      <div className="w-full flex items-center">
        <input
          className={
            "flex-1 shadow-lg rounded outline-none p-2 text-white " +
            (isWrongInput ? "bg-red-700 " : " ") +
            (isComplete ? "bg-gray-200 " : "bg-gray-800 ")
          }
          value={inputText}
          onChange={handleInputChange}
          disabled={isComplete}
        />
        <button
          id="reset-btn"
          className={`
            p-2 ml-2 rounded shadow-lg text-dracula-white focus:outline-none 
            ${isComplete 
              ? 'bg-green-600 hover:bg-green-500'
              : 'bg-purple-600 hover:bg-purple-500'}
          `}
          onClick={resetState}
        >
          { isComplete ? 'AGAIN' : 'RESET' }
        </button>
      </div>
    </div>
  );
}

export default TypingTest;