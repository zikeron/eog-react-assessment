import { ApolloClient, InMemoryCache } from '@apollo/client';

const BASE_URL = 'https://react.eogresources.com/graphql';

export const client = () => {
  return new ApolloClient({
    uri: BASE_URL,
    cache: new InMemoryCache(),
  });
};
