import React from "react";
import styled from "@emotion/styled";
import { Difficulty } from "../types";

interface Props {
  id?: string,
  onChange: (difficulty: Difficulty) => void,
  value: Difficulty
}

const DifficultySelect: React.FC<Props> = ({
  id,
  onChange,
  value,
}) => {
  const options = [];
  for (let difficulty in Difficulty) {
    options.push(<option key={difficulty}>{ difficulty }</option>);
  }
  return (
    <StyledSelect
      id={id}
      onChange={event => onChange(event.target.value as Difficulty)}
      value={value}
      className="rounded p-2 text-dracula-cyan"
    >
      { options }
    </StyledSelect>
  );
}

const StyledSelect = styled.select`
  background: none;
`;

export default DifficultySelect;