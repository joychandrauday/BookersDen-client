import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import { AuthContext } from "../../Provider/Provider";
import { getAuth } from "firebase/auth";
import app from "../../Firebase/firebase.config";
import axios from "axios";

const auth = getAuth(app);
const Header = () => {
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
  const { user, librarian, logOut } = useContext(AuthContext);

  const navLinksPrivate = (
    <>
      {librarian ? (
        <li>
          <NavLink to={"/add-book"}>Add Book</NavLink>
        </li>
      ) : null}
      <li>
        <NavLink to={"/all-books"}>All Books</NavLink>
      </li>
      <li>
        <NavLink to={"/borrowed-books"}>Borrowed Books</NavLink>
      </li>
    </>
  );

  const navLinks = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      {user ? <div className="lg:flex">{navLinksPrivate}</div> : null}
    </>
  );

  return (
    <div className="backdrop-blur-xl lg:fixed w-full z-[9999]">
      <div className="navbar container mx-auto py-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 p-2 shadow bg-base-100 rounded-box w-44 z-[99999]"
            >
              {navLinks}
            </ul>
          </div>
          <NavLink to={"/"} className="logo relative text-xl flex items-center">
            <h1 className="z-50 capitalize font-bold  lg:text-2xl">bookers den.</h1>
            <img
              src="https://i.ibb.co/x2bS9Fs/Animation-1715270691756.gif"
              alt=""
              className="absolute z-10 lg:left-24 "
            />
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          <label className="swap swap-rotate pr-8">
            <input type="checkbox" onChange={handleToggle} />
            <svg
              className="swap-on fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {/* Sun Icon */}
            </svg>
            <svg
              className="swap-off fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {/* Moon Icon */}
            </svg>
          </label>
          {user ? (
            <div className="dropdown dropdown-hover dropdown-end relative">
              <div tabIndex={0} role="button" className="m-1">
                <div className="w-12 relative">
                  <img alt="User" src={user.photoURL} />
                  {librarian ? (
                    <div className="badge badge-warning absolute top-0 rotate-12 skew-x-3 skew-y-3 capitalize font-bold left-5">
                      librarian
                    </div>
                  ) : null}
                </div>
              </div>
              <ul className="dropdown-content z-[99999] menu p-2 shadow bg-base-100 absolute w-32 rounded-none">
                <li>
                  <a onClick={() => logOut(auth)}>Log Out</a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="lg:relative absolute lg:right-0 right-16">
              <Link
                to={"/sign-up"}
                className="lg:btn p-3 lg:p-0 lg:bg-[#00008b] lg:text-white lg:rounded-full lg:px-7 hover:bg-blue-950"
              >
                Sign Up
              </Link>
              <Link
                to={"/sign-in"}
                className="lg:btn p-3 lg:p-0 lg:bg-transparent lg:border-[#00008b] lg:text-[#00008b] lg:rounded-full lg:px-7 hover:bg-blue-950 hover:text-white"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
