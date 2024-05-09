import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

import { AuthContext } from "../../Provider/Provider";
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const SignIn = () => {
  const location=useLocation()
  const {
    user,
    setUser,
    setReload,
    userSignUp,
    updateUser,
    signInUser,
    loading,
    logOut,
    googleSignIn,
    githubSignIn,
  } = useContext(AuthContext);
  const navigate=useNavigate()
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInUser(email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        if (user) {
          const user={email};
          
          //access token
          axios.post('http://localhost:5000/jwt',user,{withCredentials:true})
          .then(res=>{
            console.log(res.data)
            if (res.data.success) {
              navigate(location?.state ? location.state : "/");
              
            }
          })

          Swal.fire({
            position: "center",
            icon: "success",
            title: "You are signed in!!",
            showConfirmButton: true,
          });
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong email or password.",
          });
        }
        // ..
      });
  };
  const handleGoogleLogin=()=>{
    googleSignIn()
    .then((res) => {
      navigate(location?.state ? location.state : "/");
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong.",
      });
    });
  }
  const handleGitLogin=()=>{
    githubSignIn()
    .then((res) => {
      navigate(location?.state ? location.state : "/");
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong.",
      });
    });
  }
  return (
    <div className="items-center">
      <Helmet>
        <title>Sign in to Continue.</title>
      </Helmet>
      <div className="hero bg-basic-bg lg:min-h-screen">
        {
          user? <div className="p-4 backdrop-blur-sm glass"><h1 className="text-3xl font-extrabold uppercase 
          ">You are already signed in,<span className="text-yellow-400">{user.displayName}</span></h1></div>
          :<div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left basis-1/2 c card shrink-0 w-full shadow-2xl bg-base-100 p-8 py-12 ">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6 capitalize">
              to enjoy its blend of innovation, user-centric design, and a
              commitment to sustainable travel practices, WanderEase aims to
              redefine the way people explore the world, making every journey an
              unforgettable experience.
            </p>
            <ul className="menu menu-horizontal rounded-box items-center lg:text-xl lg:gap-4">
              <h1 className="capitalize font-bold">or, continue with: </h1>
              <li>
                <a className="tooltip text-2xl" data-tip="Google" onClick={handleGoogleLogin}>
                  <FaGoogle />
                </a>
              </li>
              <li>
                <a className="tooltip text-2xl" data-tip="Github" onClick={handleGitLogin}>
                  <FaGithub />
                </a>
              </li>
            </ul>
          </div>
          <div className="basis-1/2 card shrink-0 w-full shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSignIn}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
        }
      </div>
    </div>
  );
};

export default SignIn;
