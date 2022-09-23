import React from 'react';
import styled from 'styled-components';

import MightyJaxx, { Wrapper as $MightyJaxx } from 'components/common/svg/MightyJaxx';

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  background: white;
  padding: 10px var(--page-h-padding);
  
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${$MightyJaxx} { width: 60px }
`;

const Logout = styled.button`
  padding: 5px;
  border: none;
  outline: none;

  background: inherit;
  cursor: pointer;
  transition: 0.25s color;

  &:hover { color: var(--primary-color) }
`;

export default () => {
  const handleLogout = () => {
    console.log("logout");
  }

  return (
    <Wrapper>
      <MightyJaxx />

      <Logout onClick={handleLogout}>
        Logout
      </Logout>
    </Wrapper>
  );
}