import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.input`

`;

export default ({ onChange, ...props }: {
  onChange?: (s: string) => void
} & Omit<JSX.IntrinsicElements["input"], "ref" | "onChange">) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.value);
  }

  return (
    <Wrapper
      {...props}
      onChange={handleChange}
    />
  )
}
