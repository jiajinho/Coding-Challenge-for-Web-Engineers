import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';

import locale from 'locale';
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
  }, [countdown, router]);

  return (
    <Wrapper>
      <Header />

      <Content>
        <ImageContainer>
          <Image
            alt="404"
            src="/static/404.png"
            layout="fill"
          />
        </ImageContainer>

        <Text>
          <h4>{locale[404].title}</h4>
          <h2>{locale[404].subtitle}</h2>
        </Text>

        <p>{locale[404].countdown.replace("{{ 1 }}", countdown.toString())}</p>
      </Content>
    </Wrapper>
  );
}