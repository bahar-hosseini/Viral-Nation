import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
