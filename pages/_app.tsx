import type { AppProps } from "next/app";

// ******************************************* //
import Head from "next/head";
import RootApp from "../components/layout/RootApp";
import React from "react";
import { SessionProvider } from "next-auth/react";


function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
    <SessionProvider session={session}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      
      <RootApp
        Component={Component}
        pageProps={pageProps}
        
      />
      </SessionProvider>
    </>
  );
}

export default App;
