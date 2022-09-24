import React from 'react';

import { Wrapper as $Wrapper, Backdrop as $Backdrop, Button as $Button } from './styled';
import Ghost from './Ghost';

export const Wrapper = $Wrapper;
export const Backdrop = $Backdrop;
export const Button = $Button;

const _Button = ({ children, ...props }: {
  children: string
} & Omit<JSX.IntrinsicElements["button"], "ref">) => {

  return (
    <Wrapper>
      <Backdrop />

      <Button {...props}>
        {children}
      </Button>
    </Wrapper>
  )
};

_Button.Ghost = Ghost;

export default _Button;
