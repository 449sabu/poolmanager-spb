import { ChakraProvider } from '@chakra-ui/react';
import { MeshProvider } from '@meshsdk/react';
import type { AppProps } from 'next/app';
// import Navigation from '../components/Navigation/Navigation';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MeshProvider>
        {/* <Navigation /> */}
        <Component {...pageProps} />
      </MeshProvider>
    </ChakraProvider>
  );
}

export default MyApp;
