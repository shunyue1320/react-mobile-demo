import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { HistoryRouter } from "redux-first-history/rr6";
import { store, history } from "./store";
import "./style/common.less";

import Tabs from "./components/Tabs";
import Home from "./routes/Home";
import Cart from "./routes/Cart";
import Profile from "./routes/Profile";

ReactDOM.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Tabs />
    </HistoryRouter>
  </Provider>,
  document.getElementById("root")
);
