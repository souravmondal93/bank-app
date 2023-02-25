import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import getConfig from 'next/config';
import { setContext } from '@apollo/client/link/context';
import { useRouter } from 'next/router';

const { publicRuntimeConfig } = getConfig();
const { GRAPHQL_API_URL } = publicRuntimeConfig;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    console.log('Errors: ', graphQLErrors);
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );

      if (extensions?.response?.statusCode) {
        window.location.href = '/auth/login'
      }
    });


  if (networkError) console.error(`[Network error]: ${networkError}`);
});

export const httpLink = new HttpLink({
  uri: GRAPHQL_API_URL,
});

export const setAuthToken = (token: string) => setContext((_,
  { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    }
  }))

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
