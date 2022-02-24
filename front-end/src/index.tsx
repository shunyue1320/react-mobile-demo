import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { HistoryRouter } from "redux-first-history/rr6";
import { PersistGate } from "redux-persist/integration/react";
import { store, history, persistor } from "./store";
import { Spin } from "antd";

import "./style/common.less";
import Tabs from "./components/Tabs";
const Home = React.lazy(() => import("./routes/Home"));
const Cart = React.lazy(() => import("./routes/Cart"));
const Profile = React.lazy(() => import("./routes/Profile"));
const Register = React.lazy(() => import("./routes/Register"));
const Login = React.lazy(() => import("./routes/Login"));
const Detail = React.lazy(() => import("./routes/Detail"));

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Spin />} persistor={persistor}>
      <HistoryRouter history={history}>
        <main className="main-container">
          <React.Suspense fallback={<Spin />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/detail/:id" element={<Detail />} />
            </Routes>
          </React.Suspense>
        </main>
        <Tabs />
      </HistoryRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
