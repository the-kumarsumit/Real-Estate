import React, { useState } from "react";
import { Link } from "react-router-dom";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="text-white rounded w-10 h-10 relative focus:outline-none bg-gray-500"
        onClick={toggleMenu}
      >
        <div className="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
          <span
            aria-hidden="true"
            className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
              isOpen ? "rotate-45" : "-translate-y-1.5"
            }`}
          ></span>
          <span
            aria-hidden="true"
            className={`block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            aria-hidden="true"
            className={`block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out ${
              isOpen ? "-rotate-45" : "translate-y-1.5"
            }`}
          ></span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
          <Link
            to="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Home
          </Link>
          <Link
            to="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            About
          </Link>
          <Link
            to="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Services
          </Link>
          
          <Link
            to="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Contact
          </Link>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
