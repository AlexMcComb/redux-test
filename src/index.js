import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import promiseMiddleware from "redux-promise-middleware";

import "./index.css";
import App from "./App.js";
import { reducer } from "./Store";

const store = createStore(reducer, applyMiddleware(promiseMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
