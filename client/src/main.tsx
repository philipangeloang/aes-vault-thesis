import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Hero from "./components/hero.tsx";
import Navbar from "./components/navbar.tsx";
import HeroDRS from "./components/herodrs.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Hero />
      </div>
    ),
  },
  {
    path: "drs",
    element: (
      <div>
        <Navbar />
        <HeroDRS />
      </div>
    ),
  },
]);

const client = new ApolloClient({
  uri: "https://aes-vault-server.onrender.com",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
