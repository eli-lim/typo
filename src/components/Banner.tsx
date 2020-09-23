import React from "react";
import styled from "@emotion/styled";

const Banner: React.FC = () => {
  return (
    <StyledBanner className="flex flex-col items-center">
      <h1>
        typo
      </h1>
      <span>
        Inspired by <a className="text-dracula-cyan" href="https://typings.gg">typings.gg</a><br/>
      </span>
    </StyledBanner>
  )
}

const StyledBanner = styled.div`
  position: absolute;
  top: 12px;
  color: hotpink;
  
  h1 {
    font-size: 2em;
  }
  
  span {
    font-size: 0.8em;
  }
`;

export default Banner;