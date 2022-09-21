import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: white;
`;

const Button = styled.button`
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 12px 20px;
  border: none;
  outline: none;

  background: #1C64F2;
  color: white;
  cursor: pointer;

  transition: 0.25s opacity;

  &:hover { opacity: 0.85 }
`;

export default ({ children, ...props }: {
  children: string
} & Omit<JSX.IntrinsicElements["button"], "ref">) => (
  <Wrapper>
    <Backdrop />

    <Button {...props}>
      {children}
    </Button>
  </Wrapper>
);
