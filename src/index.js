import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';

import { defaults, resolvers} from './resolvers';

const httpLink = createHttpLink({
    uri: 'https://eu1.prisma.sh/syd/edtech/dev'
});

const cache = new InMemoryCache();
const client = new ApolloClient({
    link: httpLink,
    cache: cache,
    resolvers: resolvers
});

cache.writeData({
    data: defaults
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
