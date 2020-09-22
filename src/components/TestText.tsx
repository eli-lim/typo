import React from "react";
import styled from "@emotion/styled";
import { CompletedWord } from "../types";

interface Props {
  completedWords: CompletedWord[],
  currentWord: string,
  remainingWords: string[],
}

const TestText: React.FC<Props> = ({
  completedWords,
  currentWord,
  remainingWords,
}) => {
  return (
    <StyledDiv id="test-text" className="flex-1 mb-2 mt-2 w-full p-4 rounded bg-gray-700">
      {
        completedWords.map(({ isCorrect, text }, i) =>
          <span
            key={text + '-' + i}
            className={'w-completed inline-block ' + (isCorrect ? 'w-correct text-green-400' : 'w-wrong text-dracula-red')}>
            { text }&nbsp;
          </span>
        )
      }
      <span className="w-current text-dracula-yellow inline-block">
        { currentWord }&nbsp;
      </span>
      {
        remainingWords.map((text, i) =>
          <span
            key={text + '-' + i}
            className="w-remaining text-dracula-white inline-block">{ text }&nbsp;</span>
        )
      }
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  box-shadow: inset 4px 4px 6px #3e3e4a;
`;

export default TestText;