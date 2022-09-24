import React, { useRef, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import UploadCloud, { Wrapper as $UploadCloud } from './svg/UploadCloud';
import Refresh, { Wrapper as $Refresh } from './svg/Refresh';
import { toBase64 } from 'utils';

export const Wrapper = styled.div`
  position: relative;
  aspect-ratio: 1/1;
  max-width: 250px;
  width: 100%;
  height: auto;
  
  border-radius: 8px;
  overflow: hidden;
`;

const Backdrop = styled.div`
  height: 100%;
  width: 100%;
  background: #f2f2f2;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  ${$UploadCloud} {
    width: 35%;
    min-width: 40px;
  }

  p { 
    color: var(--primary-color);
    font-weight: bold; 
  }
`;

const Input = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #0007;
  opacity: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.25s opacity;
  &:hover { opacity: 1 }

  ${$Refresh} {
    user-select: none;
    width: 50px;
  }
`;

export default ({ value, onChange, maxKb = 512 }: {
  value?: string,
  onChange?: (b64: string) => void,
  maxKb?: number
}) => {
  const input = useRef<HTMLInputElement>(null);

  const triggerImageChange = () => {
    input.current?.click();
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;

    const file = e.target.files[0];

    if (file.size / 1000 > maxKb) {
      toast.error(`Image size cannot exceed ${maxKb}kb`);
    }
    else {
      const b64 = await toBase64(file);
      onChange && onChange(b64);
    }
  }

  return (
    <Wrapper>
      {!value &&
        <Backdrop onClick={triggerImageChange}>
          <UploadCloud />
          <p>Upload image</p>
        </Backdrop>
      }

      {value &&
        <ImageContainer onClick={triggerImageChange}>
          <Image
            src={value}
            layout="fill"
            objectFit="cover"
          />

          <Mask>
            <Refresh />
          </Mask>
        </ImageContainer>
      }

      <Input
        ref={input} type="file"
        accept="image/*" onChange={handleImageChange}
      />
    </Wrapper>
  );
}