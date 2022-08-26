import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style/index.css";

import HomePage from "./pages/Home";
import StockPage from "./pages/Stock";
import CategoryPage from "./pages/Categories";
import WarehousesPage from "./pages/Warehouses";
import SuppliersPage from "./pages/Suppliers";
import UsersPage from "./pages/Users";
import RegisterPage from "./pages/Register";
import CompanySetup from "./pages/CompanySetup";
import LandingPage from "./pages/Landing";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/app/" element={<HomePage />} />
      <Route path="/app/stock" element={<StockPage />} />
      <Route path="/app/categories" element={<CategoryPage />} />
      <Route path="/app/warehouses" element={<WarehousesPage />} />
      <Route path="/app/suppliers" element={<SuppliersPage />} />
      <Route path="/app/users" element={<UsersPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/profile-setup/:email/:uuid" element={<CompanySetup />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LandingPage />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
