import React from 'react';
import styled from 'styled-components';

import EmptyBox, { Wrapper as $EmptyBox } from 'components/common/svg/EmptyBox';
import locale from 'locale';

const Wrapper = styled.div`
  margin: 30px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  text-align: center;

  ${$EmptyBox} {
    opacity: 0.3;
    width: 80%;
    max-width: 250px;
    opacity: 0.2px;
  }
`;

const Text = styled.div`
  color: #bbb;
  margin: 8px 0;
  
  & * {
    margin: 5px 0; 
    font-weight: normal;
  }
`;

export default () => (
  <Wrapper>
    <EmptyBox />

    <Text>
      <h4>{locale.dashboard.emptyProduct.title}</h4>
      <h4>{locale.dashboard.emptyProduct.subtitle}</h4>
    </Text>
  </Wrapper>
)