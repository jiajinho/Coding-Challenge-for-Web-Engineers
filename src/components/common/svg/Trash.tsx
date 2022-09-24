import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.svg`
  aspect-ratio: 1/1;
  height: auto;
  width: auto;
  cursor: pointer;
`;

export default ({ color = "var(--danger-color)", ...props }: {
  color?: string
} & Omit<JSX.IntrinsicElements["svg"], "ref">) => (
  <Wrapper
    {...props}
    width={512}
    height={512}
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M432 96H384V32C384 14.328 369.672 0 352 0H160C142.328 0 128 14.328 128 32V96H80C62.328 96 48 110.328 48 128V160H464V128C464 110.328 449.672 96 432 96ZM192 96V64H320V96H192Z"
      fill={color}
    />
    <path
      d="M80 480.004C80 497.676 94.324 512 111.996 512H400.008C417.676 512 432 497.676 432 480.008V480.004V192H80V480.004ZM320 272C320 263.164 327.164 256 336 256C344.836 256 352 263.164 352 272V432C352 440.836 344.836 448 336 448C327.164 448 320 440.836 320 432V272ZM240 272C240 263.164 247.164 256 256 256C264.836 256 272 263.164 272 272V432C272 440.836 264.836 448 256 448C247.164 448 240 440.836 240 432V272ZM160 272C160 263.164 167.164 256 176 256C184.836 256 192 263.164 192 272V432C192 440.836 184.836 448 176 448C167.164 448 160 440.836 160 432V272Z"
      fill={color}
    />
  </Wrapper>
)