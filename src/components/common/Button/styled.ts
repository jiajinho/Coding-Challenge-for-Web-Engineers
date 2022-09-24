import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`;

export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: white;
`;

export const Button = styled.button`
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid var(--primary-color);
  outline: none;

  background: var(--primary-color);
  color: white;
  cursor: pointer;

  transition: 0.25s opacity;

  &:hover { opacity: 0.85 }
`;