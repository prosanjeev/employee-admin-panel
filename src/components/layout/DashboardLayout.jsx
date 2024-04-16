import React from "react";
import TopNav from "../header/TopNav";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <TopNav />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
