import React from "react";
import styled from "@emotion/styled";
import { Stat } from "../types";

interface Props {
  id?: string,
  stats: Stat[],
}

const TypingStats: React.FC<Props> = ({
  id,
  stats,
}) => {
  return (
    <div id={id}>
      {
        stats.map(stat =>
          <StyledSpan
            key={'stat' + stat.name}
            className="ml-2 text-dracula-pink relative overflow-hidden"
          >
            <Accent />
            {stat.name}: <strong>{stat.value}</strong>
          </StyledSpan>
        )
      }
    </div>
  )
}

const StyledSpan = styled.span`
  border-radius: 2px;
  padding: 8px 8px 8px 14px;
  border: 1px solid #9a62f5;
`

const Accent = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  background: #be93ff;
  width: 6px;
  height: 100%;
`

export default TypingStats;