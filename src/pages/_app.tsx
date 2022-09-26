import '../globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

import useResponsive from 'hooks/useResponsive';
import useCheckLogin from 'hooks/useCheckLogin';

if (!process.env.NEXT_PUBLIC_API_ENDPOINT) throw Error("NEXT_PUBLIC_API_ENDPOINT not defined");

const queryClient = new QueryClient();

const Wrapper = styled.main`
  background: var(--bg-color);
  min-height: 100vh;
`;

export default ({ Component, pageProps }: AppProps) => {

  useCheckLogin();
  useResponsive();

  return (
    <Wrapper>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>

      <ToastContainer />
    </Wrapper>
  );
}