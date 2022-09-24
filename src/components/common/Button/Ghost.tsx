import React from 'react';
import styled from 'styled-components';

import { Wrapper as $Wrapper, Backdrop as $Backdrop, Button as $Button } from './styled';

export const Wrapper = $Wrapper;
export const Backdrop = $Backdrop;

export const Button = styled($Button)`
  background: white;
  color: var(--primary-color);
`;

export default ({ children, ...props }: {
  children: string
} & Omit<JSX.IntrinsicElements["button"], "ref">) => {


  return (
    <Wrapper>
      <Backdrop />

      <Button {...props}>
        {children}
      </Button>
    </Wrapper>
  );
}