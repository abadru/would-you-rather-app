import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./components/App";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import ScrollToTop from "./components/common/ScrollToTop";

export const history = createBrowserHistory();

const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById("root")
);
