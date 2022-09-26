import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { applyStyleIf } from 'utils';

export const Wrapper = styled.div`
  position: relative;
  margin-top: 10px;
  background: inherit;
`;

export const Label = styled.label(({ $error }: { $error: boolean }) => `
  position: absolute;
  top: 0;
  left: 6px;
  transform: translateY(-50%);

  padding: 0 5px;
  font-size: 11px;
  cursor: auto;

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0%;
    height: 58%;
    width: 100%;
    left: 0;
    background: white;
  }

  ${applyStyleIf($error, `
    color: var(--danger-color);
  `)}
`);

const Input = styled.input(({ $error }: { $error: boolean }) => `
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  outline: none;
  border: 1px solid #ccc;

  ${applyStyleIf($error, `
    color: var(--danger-color);
    border-color: var(--danger-color);
  `)}
`);

const Error = styled.p`
  position: absolute;
  top: 100%;
  left: 6px;
  margin-top: 1px;

  font-size: 10px;
  color: var(--danger-color);
`;

export default ({ label, value, onChange, error, ...props }: {
  label: string,
  value: string | number,
  onChange?: (s: string) => void,
  error?: string
} & Omit<JSX.IntrinsicElements["input"], "ref" | "onChange" | "value">) => {

  const [_error, setError] = useState<string>();

  useEffect(() => {
    setError(error);
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.value);
    setError(undefined);
  }

  return (
    <Wrapper>
      <Label $error={!!_error}>
        {label}
      </Label>

      <Input
        {...props}
        $error={!!_error}
        value={value}
        onChange={handleChange}
      />

      <Error>
        {_error}
      </Error>
    </Wrapper>
  )
}
