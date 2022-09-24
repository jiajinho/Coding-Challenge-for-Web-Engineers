import React, { useState } from 'react';
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

type Validation = {
  regex: RegExp,
  errMessage: string
}

export default ({ label, validations, value, onChange, onError, ...props }: {
  label: string,
  validations?: Validation[],
  value: string | number,
  onChange?: (s: string) => void,
  onError?: (v: Validation | undefined) => void,
} & Omit<JSX.IntrinsicElements["input"], "ref" | "onChange" | "value">) => {

  const [error, setError] = useState<string>()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.value);
    setError(undefined);
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    props.onBlur && props.onBlur(e);

    if (!validations || !validations.length) return;

    for (let i = 0; i < validations.length; i++) {
      const v = validations[i];

      if (!v.regex.test(value.toString())) {
        setError(v.errMessage);
        onError && onError(v);
        break;
      } else {
        setError(undefined);
        onError && onError(undefined);
      }
    }
  }

  return (
    <Wrapper>
      <Label $error={!!error}>
        {label}
      </Label>

      <Input
        {...props}
        $error={!!error}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <Error>
        {error}
      </Error>
    </Wrapper>
  )
}
