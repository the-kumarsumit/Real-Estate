import React from "react";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./assets/context/UserContext";

function Layout() {
  return (
    <UserProvider>
      <div className="container m-auto">
        <Header />
        <div className="h-[calc(100vh-100px)] ">
          <Outlet />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition:Bounce
          />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </UserProvider>
  );
}

export default Layout;
