import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "apollo-link-context";

import App from "./App.js";

const serverLink = createHttpLink({
    uri: "http://localhost:4000"
});

const authLink = setContext(() => {
    const token = localStorage.getItem("jwtToken");
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ""
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(serverLink),
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
