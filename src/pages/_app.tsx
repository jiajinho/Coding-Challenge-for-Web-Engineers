import '../globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

import useResponsive from 'hooks/useResponsive';

const Wrapper = styled.main`
  background: var(--bg-color);
  min-height: 100vh;
`;

function MyApp({ Component, pageProps }: AppProps) {

  useResponsive();

  return (
    <Wrapper>
      <Component {...pageProps} />

      <ToastContainer />
    </Wrapper>
  );
}

export default MyApp
