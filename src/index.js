import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import App from "./App";
import { DarkModeProvider } from "./providers/DarkModeProvider";
import "./index.css";

const client = new ApolloClient({
  uri: "https://api.poc.graphql.dev.vnplatform.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: process.env.REACT_APP_TOKEN,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </DarkModeProvider>
  </React.StrictMode>
);
