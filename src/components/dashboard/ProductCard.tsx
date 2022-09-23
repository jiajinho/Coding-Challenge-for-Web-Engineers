import React from 'react';
import styled from 'styled-components';

import { Product } from 'api/product';
import Image from 'next/image';
import Edit, { Wrapper as $Edit } from 'components/common/svg/Edit';
import Trash, { Wrapper as $Trash } from 'components/common/svg/Trash';

const Wrapper = styled.div`
  display: flex;
  
`;

const ImageContainer = styled.div`
  flex-shrink: 0;

  position: relative;
  aspect-ratio: 1/1;
  height: 80px;
  width: auto;
  background: red;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const ActionTab = styled.div`
  ${$Edit} { width: 16px }
  ${$Edit} path { fill: red }

  ${$Trash} { width: 16px }
`;

export default (data: Product) => {


  return (
    <Wrapper>
      <ImageContainer>
        {data.imageB64 &&
          <Image
            src={data.imageB64}
            layout="fill"
            objectFit="cover"
          />
        }
      </ImageContainer>

      <Content>
        <h2>#{data.sku} {data.title}</h2>
        <p>{data.description}</p>
      </Content>

      <ActionTab>
        <Edit />
        <Trash />
      </ActionTab>
    </Wrapper>
  );
}