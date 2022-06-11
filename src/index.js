import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./Store";
import { QueryClient, QueryClientProvider } from "react-query";
import Transition from "./Transition";

import Shop2 from "./Shop2";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <QueryClientProvider client={queryClient}>
  //   <Provider store={Store}>

  <BrowserRouter>
    <Shop2 />
  </BrowserRouter>

  //   </Provider>
  // </QueryClientProvider>
);
