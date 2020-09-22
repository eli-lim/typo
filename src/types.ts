export interface Stat {
  name: string,
  value: number | string,
}

export enum Difficulty {
  Normal = "Normal",
  Hard = "Hard",
  God = "God"
}

export interface CompletedWord {
  isCorrect: boolean,
  text: string,
}