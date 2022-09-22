import React from 'react';
import styled from 'styled-components';

import api from 'src/api';

const Wrapper = styled.div`

`;

export default () => {

  (async () => {
    const x = await api.user.get();
    const y = await api.product.get();

    console.log(x, y);
  })();

  return (
    <Wrapper>
    </Wrapper>
  );
}