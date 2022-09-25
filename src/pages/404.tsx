import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';

import Header from 'components/dashboard/Header';

const Wrapper = styled.div`
  height: 100%;
`;

const Content = styled.section`
  padding: 20px var(--page-h-padding);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 77/72;
  width: 80%;
  max-width: 400px;
  height: auto;
`;

const Text = styled.div`
  margin: 15px 0;
  text-align: center;

  h4 { 
    margin-bottom: 5px;
    color: var(--primary-color);
  }
`;

export default () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const t = setInterval(() => { setCountdown(prev => --prev) }, 1000);

    return () => { clearInterval(t) }
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.back();
    }
  }, [countdown]);

  return (
    <Wrapper>
      <Header />

      <Content>
        <ImageContainer>
          <Image
            src="/static/404.png"
            layout="fill"
          />
        </ImageContainer>

        <Text>
          <h4>404 Not Found</h4>
          <h2>Whoops! That page doesn't exist.</h2>
        </Text>

        <p>You will be redirected back to previous page in {countdown} second.</p>
      </Content>
    </Wrapper>
  )
}