import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import Register from "./pages/Register";
import DefaultLayout from "./layouts/DefaultLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Profile from "./pages/Profile";
import TransactionPage from "./pages/Transaction";
import NotificationBar from "./components/notification/NotificationBar";
import CreateTransaction from "./pages/CreateTransaction";


function App() {
  return (
    <>
      <NotificationBar />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transactions" element={<TransactionPage />} />
          <Route path="/transaction" element={<CreateTransaction />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;

