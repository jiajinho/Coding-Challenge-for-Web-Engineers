import '../globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

import useResponsive from 'hooks/useResponsive';
import useCheckLogin from 'hooks/useCheckLogin';

if (!process.env.NEXT_PUBLIC_API_ENDPOINT) throw Error("NEXT_PUBLIC_API_ENDPOINT not defined");

const Wrapper = styled.main`
  background: var(--bg-color);
  min-height: 100vh;
`;

export default ({ Component, pageProps }: AppProps) => {

  useCheckLogin();
  useResponsive();

  return (
    <Wrapper>
      <Component {...pageProps} />

      <ToastContainer />
    </Wrapper>
  );
}