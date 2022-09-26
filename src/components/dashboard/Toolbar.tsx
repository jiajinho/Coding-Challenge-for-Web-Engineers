import React from 'react';
import styled from 'styled-components';

import config from 'config';
import locale from 'locale';
import Input, { Wrapper as $Input, Label as $Input_Label } from 'components/common/Input';
import Button, { Button as $Button } from 'components/common/Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  ${$Input_Label}:after { top: 50% }

  @media screen and (min-width: ${config.viewport.sm}) {
    ${$Input} { width: 250px }
  }
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 { font-size: 24px }

  ${$Button} { width: fit-content }

  @media screen and (min-width: ${config.viewport.md}) { 
    h1 { font-size: 36px }
  }
`;

export default ({ onAdd, title }: {
  onAdd: () => void,
  title: [string, (s: string) => void]
}) => {


  return (
    <Wrapper>
      <Title>
        <h1>{locale.dashboard.toolbar.title}</h1>

        <Button onClick={onAdd}>
          {locale.dashboard.toolbar.addButton}
        </Button>
      </Title>

      <Input
        label="Search by title"
        value={title[0]}
        onChange={s => title[1](s)}
      />
    </Wrapper>
  );
}