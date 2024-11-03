import {ApolloClient, gql, InMemoryCache} from '@apollo/client';

export function initializeApollo() {
    const client = new ApolloClient({
        uri: process.env.NEXT_PUBLIC_WORDPRESS_API_ENDPOINT,
        cache: new InMemoryCache()
    });

    return client;
}