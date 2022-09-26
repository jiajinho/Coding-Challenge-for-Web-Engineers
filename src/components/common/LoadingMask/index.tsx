import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

import useAnimation from './useAnimation';

const Wrapper = styled.div`
  position: absolute;
  z-index: 200;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #fffb;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1/1;
  height: 40px;
  width: auto;
`;

export default ({ visible }: {
  visible: boolean
}) => {
  const { mask, spinner } = useAnimation(visible);

  return (
    <Wrapper ref={mask}>
      <ImageContainer ref={spinner}>
        <Image
          src="/static/hourglass.png"
          layout="fill"
        />
      </ImageContainer>
    </Wrapper>
  );
}