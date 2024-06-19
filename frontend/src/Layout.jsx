import React from "react";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";

function Layout() {
  return (
    <div className="container m-auto">
      <Header />
      <div className="h-[calc(100vh-100px)] ">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
