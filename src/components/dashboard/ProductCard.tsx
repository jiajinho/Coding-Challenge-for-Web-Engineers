import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import config from 'config';
import { Product } from 'api/product';
import useViewportStore from 'stores/useViewportStore';

import Edit, { Wrapper as $Edit } from 'components/common/svg/Edit';
import Trash, { Wrapper as $Trash } from 'components/common/svg/Trash';

const Wrapper = styled.div`
  display: flex;
  background: white;

  border-radius: 8px;
  overflow: hidden;

  @media screen and (min-width: ${config.viewport.md}) {
    flex-direction: column;
    width: 250px;
  }
`;

const ImageContainer = styled.div`
  flex-shrink: 0;

  position: relative;
  aspect-ratio: 1/1;
  height: 80px;
  width: auto;
  background: red;

  @media screen and (min-width: ${config.viewport.md}) {
    width: 100%;
    height: auto;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 10px;

  display: flex;
  justify-content: space-between;
`;

const Data = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;

  p { margin-top: 5px }

  @media screen and (min-width: ${config.viewport.md}) {
    padding-bottom: 10px;
    p { margin-top: 10px }
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${config.viewport.sm}) {
    flex-direction: row;
    gap: 7px;
  }

`;

const ActionTab = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & svg { width: 16px }

  & path {
    fill: #ccc;
    transition: 0.25s fill;
  }

  ${$Edit}:hover path { fill: var(--primary-color) }
  ${$Trash}:hover path { fill: var(--danger-color) }
`;

export default ({ data, onDelete, onEdit }: {
  data: Product,
  onDelete?: (p: Product) => void,
  onEdit?: (p: Product) => void
}) => {

  const sm = useViewportStore(state => state.sm);

  const handleDelete = () => {
    onDelete && onDelete(data);
  }

  const handleEdit = () => {
    onEdit && onEdit(data);
  }

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
        <Data>
          <Title>
            <h3>#{data.sku}</h3>
            <h3>{data.title}</h3>
          </Title>

          {sm && <p>{data.description}</p>}
        </Data>

        <ActionTab>
          <Edit onClick={handleEdit} />
          <Trash onClick={handleDelete} />
        </ActionTab>
      </Content>
    </Wrapper>
  );
}