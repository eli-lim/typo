import words from "./words.json";
import sampleSize from 'lodash-es/sampleSize';
import { Difficulty } from "../types";

function makeWords(difficulty: Difficulty, n: number = 100): string[] {
  switch (difficulty) {
    case Difficulty.Normal:
      return sampleSize(words.normal, n);
    case Difficulty.Hard:
      return sampleSize(words.hard, n);
    case Difficulty.God:
      return sampleSize(words.god, n);
  }
}

export default makeWords;