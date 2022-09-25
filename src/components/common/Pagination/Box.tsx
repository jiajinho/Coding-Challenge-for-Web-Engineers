import React from 'react';
import styled from 'styled-components';

import { applyStyleIf } from 'utils';

const Wrapper = styled.div(({ $active, $clickable }: {
  $active: boolean,
  $clickable: boolean
}) => `
  width: 32px;
  height: 38px;

  border-radius: 4px;
  border: 2px solid var(--primary-color);
  position: relative;
  font-weight: 600;

  background: ${$active ? 'var(--primary-color)' : 'transparent'};
  color: ${$active ? 'white' : 'var(--primary-color)'};
  cursor: ${$clickable ? 'pointer' : 'auto'};

  ${applyStyleIf(!$clickable, `
  background: transparent;
  border-color: transparent;
  `)}
`);

const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: 12px;
`;

export default ({ children, onClick, active }: {
  children: string | number,
  onClick?: () => void,
  active: boolean
}) => (
  <Wrapper
    onClick={onClick}
    $active={active}
    $clickable={!!onClick}
  >
    <Text>
      {children}
    </Text>
  </Wrapper>
);