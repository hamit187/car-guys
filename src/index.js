import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.module.scss";
import App from "./App";
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<BrowserRouter basename="/car-guys" ><Provider store={store}><App /></Provider></BrowserRouter>);