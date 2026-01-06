import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  from
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import CssBaseline from "@mui/material/CssBaseline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { Layout } from "./Layout";
import LoadingSkeleton from "../../utils/LoadingSkeleton";

const RootApp = (prop) => {
  const [clientApollo, setClientApollo] = useState<ApolloClient<NormalizedCacheObject>>();
  const { data: session, status } = useSession();
  
  const router = useRouter();


  useEffect(() => {
    const fetchToken = async () => {
      if (session) {
        const token = await fetchAuthToken();
        const client = inicializarApollo(token);
        setClientApollo(client);
      }
    };
  
    fetchToken();
  }, [session]);

  const isAuthPage = router.pathname.startsWith('/auth/');

  if (status === "loading") {
    return <LoadingSkeleton />;
  }

  if (!session && !isAuthPage) {
    router.push('/auth/signin');
    return <div>Usuario sin autenticar...</div>;
  }

  if (session && isAuthPage) {
    router.push('/');
    return <LoadingSkeleton />;
  }

  if (!clientApollo && session) {
    return <LoadingSkeleton />;
  }

  if (!session && isAuthPage) {
    return <prop.Component {...prop} />;
  }

  if(!clientApollo){
    return <LoadingSkeleton />;
  }

  return (
    <>
      <CssBaseline />
      <ApolloProvider client={clientApollo}>
        <Layout>
          <prop.Component {...prop} />
        </Layout>
      </ApolloProvider>
    </>
  );
};

export default memo(RootApp);

const fetchAuthToken = async () => {
  const response = await fetch("/api/token");
  const data = await response.json();
  return data?.token || "";
};

function inicializarApollo(token: string) {
  const authLink = setContext((_, { headers }) => {
    return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",

    },
    };
  });

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_CONSULTORIO_API,
  });

  return new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
  });
}