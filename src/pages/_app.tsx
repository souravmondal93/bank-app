import  {ReactElement, ReactNode} from 'react';
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from "@apollo/client";
import { Plus_Jakarta_Sans } from '@next/font/google';
import Head from 'next/head';

import client from "../../apollo-client";
import '../styles/globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <style jsx global>{`
          html {
            font-family: ${plusJakartaSans.style.fontFamily};
          }
        `}</style>
      {/* <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons" />
      </Head> */}
      <ChakraProvider>
        <ApolloProvider client={client}>
          {getLayout(<Component {...pageProps} />)}
        </ApolloProvider>
      </ChakraProvider>
    </>
  );
}
