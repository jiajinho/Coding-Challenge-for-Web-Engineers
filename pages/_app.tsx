import '../styles/globals.css';
import type { AppProps } from 'next/app';

import useResponsive from 'hooks/useResponsive';

function MyApp({ Component, pageProps }: AppProps) {

  useResponsive();

  return <Component {...pageProps} />
}

export default MyApp
