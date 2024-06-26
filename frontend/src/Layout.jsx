import React, { useContext } from "react";
import Header from "./components/header/Header";
import { Outlet, Navigate } from "react-router-dom";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./context/UserContext";

function Layout() {
  return (
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
  );
}
function RequireAuth() {
  const {user} = useContext(UserContext)

  if(!user)return <Navigate to="/login"/>
  else return (
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
  );
}

export  {Layout,RequireAuth};
