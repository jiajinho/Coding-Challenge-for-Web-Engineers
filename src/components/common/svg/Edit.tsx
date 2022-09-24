import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.svg`
  aspect-ratio: 1/1;
  height: auto;
  width: auto;
  cursor: pointer;
`;

export default ({ color = "black", ...props }: {
  color?: string
} & Omit<JSX.IntrinsicElements["svg"], "ref">) => (
  <Wrapper
    {...props}
    width={330}
    height={330}
    viewBox="0 0 330 330"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M265.606 4.394C262.794 1.581 258.978 0 255 0C251.021 0 247.206 1.581 244.394 4.394L79.395 169.394C76.58 172.207 75 176.022 75 180V240C75 248.284 81.717 255 90 255H150C153.979 255 157.794 253.419 160.607 250.606L325.606 85.606C331.464 79.748 331.464 70.251 325.606 64.393L265.606 4.394Z"
      fill={color}
    />
    <path
      d="M315 150.001C306.716 150.001 300 156.717 300 165.001V300H30V30H165C173.284 30 180 23.284 180 15C180 6.716 173.284 0 165 0H15C6.717 0 0 6.716 0 15V315C0 323.284 6.717 330 15 330H315C323.284 330 330 323.284 330 315V165.001C330 156.716 323.284 150.001 315 150.001Z"
      fill={color}
    />
  </Wrapper>
)