import React from 'react';
import styled from "@emotion/styled";
import GitHubButton from "react-github-btn";

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <GitHubButton
        href="https://github.com/elihuansen"
        data-size="large"
        aria-label="Follow @elihuansen on GitHub"
      >
        Follow @elihuansen
      </GitHubButton>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 12px;
`;

export default Footer;