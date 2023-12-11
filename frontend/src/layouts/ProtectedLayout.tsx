import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const ProtectedLayout = () => {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  if (!basicUserInfo) {
    return <Navigate replace to={"/login"} />;
  }

  return (
    <>
      <Navbar/>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
