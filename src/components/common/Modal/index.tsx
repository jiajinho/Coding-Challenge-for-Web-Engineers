import React from 'react';
import styled from 'styled-components';
import LoadingMask from '../LoadingMask';
import useAnimation from './useAnimation';

export const Mask = styled.div`
  position: fixed;
  z-index: 100;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  overflow: auto;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #0007;
  opacity: 0;
`;

export const Wrapper = styled.div`
  padding: 15px;
  background: white;
  border-radius: 8px;
`;

export default ({ children, visible }: {
  children: JSX.Element,
  visible: [boolean, (b: boolean) => void]
}) => {
  const mask = useAnimation(visible);

  const handleClose = () => { visible[1](false) }
  const handleStopBubble = (e: React.MouseEvent) => { e.stopPropagation() }

  return (
    <Mask ref={mask} onMouseDown={handleClose}>
      <Wrapper onMouseDown={handleStopBubble}>
        {children}
      </Wrapper>
    </Mask>
  );
}