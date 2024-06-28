import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "/logo.png";
import HamburgerMenu from "./HamburgerMenu";
import UserContext from "../../context/UserContext";

function Header() {
  const {user}=useContext(UserContext)

  return (
    <>
      <nav className="m-auto flex justify-between h-[100px] px-2">
        <div className="flex-[3] flex gap-10 items-center ">
          <div className="flex gap-[10px]">
            <Link className="m-auto" to="/">
              <img className="w-[32px] rounded-[3px]" src={logo} alt="Logo" />
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
        <div className="flex-[2] flex gap-[10px] justify-end items-center ">
          {user ? (
            <div className="sm:flex items-center font-bold pe-2 hidden">
              <img
                className="w-10 h-10 rounded-full object-cover me-2"
                src={user.avatar || "/noavatar.jpg"}
                alt="User"
              />
              <span className="hidden sm:flex me-2">{user?.username}</span>
              <Link
                to="/profile"
                className="py-3 px-6 bg-[#fece51] cursor-pointer border-0 relative "
              >
                <div className="absolute top-[-8px] right-[-8px] bg-red-600 text-white rounded-full w-[26px] h-[26px] flex items-center justify-center">
                  3
                </div>
                <span>Profile</span>
              </Link>
            </div>
          ) : (
            <div className="pe-2 flex items-center gap-5">
              <Link
                className="hover:text-blue-700 hover:scale-105 hover:ease-in hidden sm:block"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="bg-lime-500 p-2 rounded text-white font-medium hover:bg-lime-600 hover:scale-110 hidden sm:block"
                to="/register"
              >
                Register
              </Link>
            </div>
          )}
          <span className="md:hidden ">
            <HamburgerMenu />
          </span>
        </div>
      </nav>
    </>
  );
}

export default Header;
