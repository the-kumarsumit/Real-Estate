import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "/logo.png";
import HamburgerMenu from "./HamburgerMenu";

function Header() {
  return (
    <>
      <nav className="m-auto flex justify-between h-[100px] px-2">
        <div className="flex-[3] flex gap-10 items-center ">
          <div className="flex gap-[10px]">
            <Link className="m-auto" to="/">
              <img className="w-[32px] rounded-[3px]" src={logo} alt="" />
            </Link>
            <Link className="font-semibold text-xl font-lato m-auto">
              Mern Estate
            </Link>
          </div>
          
          <NavLink
            to="/"
            className={({ isActive }) =>
              `
        ${
          isActive ? "text-orange-600" : "text-gray-800"
        } hover:text-blue-700 hover:scale-105 hover:ease-in hidden sm:block`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `
        ${
          isActive ? "text-orange-600" : "text-gray-800"
        } hover:text-blue-700 hover:scale-105 hover:ease-in hidden sm:block`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `
        ${
          isActive ? "text-orange-600" : "text-gray-800"
        } hover:text-blue-700 hover:scale-105 hover:ease-in hidden sm:block`
            }
          >
            Contact
          </NavLink>
        </div>
        <div className="flex-[2] flex gap-[10px] justify-end items-center">
          <Link
            className="hover:text-blue-700 hover:scale-105 hover:ease-in hidden sm:block" 
            to="/login"
          >
            Login
          </Link>
          <Link className="bg-lime-500 p-2 rounded text-white font-medium hover:bg-lime-600 hidden sm:block" to="/register">
            Register
          </Link>
        <span className="md:hidden"><HamburgerMenu/></span>
        </div>
      </nav>
    </>
  );
}

export default Header;
