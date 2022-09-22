import '../globals.css';
import type { AppProps } from 'next/app';
import styled from 'styled-components';

import useResponsive from 'src/hooks/useResponsive';

const Wrapper = styled.main`
  background: var(--bg-color);
  min-height: 600px;
  height: 100vh;
`;

function MyApp({ Component, pageProps }: AppProps) {

  useResponsive();

  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  );
}

export default MyApp
