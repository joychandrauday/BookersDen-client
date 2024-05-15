import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/Provider";
import { AwesomeButton } from "react-awesome-button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const LibrarianReg = () => {
  const { user, librarian } = useContext(AuthContext);
  useEffect(() => {
    // Show toast after component mounts
    toast.success('Welcome back librarian.', {
      autoClose: true,
      closeButton: false,
      closeOnClick: true,
      draggable: false,
      customId: 'custom-toast-id',
    });
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const formSumit = async (newLibrarian) => {
    try {
      // Create the user
      const { email, Name, photoURL } = newLibrarian;
      axios
        .post("https://bookersdenserver.vercel.app/librarians", newLibrarian)
        .then(function (response) {
          //console.log(response);
          if (response.data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "You are registered as a librarian!!!",
              showConfirmButton: true,
            });
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "something went wrong..",
              showConfirmButton: true,
            });
          }
        })
        .catch(function (error) {
          // console.log(error);
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went Wrong.",
      });
    }
  };
  return (
    <div>
      <div className="lg:pt-32 container mx-auto pb-12">
        <form
          className="card-body lg:w-2/5 mx-auto bg-white rounded text-center"
          onSubmit={handleSubmit(formSumit)}
        >
          <div className="form-control">
            <img
              src={user?.photoURL}
              className="rounded-full w-24 mx-auto"
              alt=""
            />
          </div>
          <div className="form-control ">
            <input
              type="text"
              defaultValue={user?.displayName}
              placeholder="Name"
              className="input input-bordered text-center capitalize rounded-none bg-transparent text-black"
              required
              {...register("Name")}
              readOnly
            />
          </div>
          <div className="form-control ">
            <input
              type="email"
              placeholder="email"
              className="input input-bordered text-center rounded-none bg-transparent "
              defaultValue={user?.email}
              {...register("email")}
              readOnly
            />
          </div>
          <div className="form-control mt-2">
            <button
              disabled={librarian}
              className={
                librarian
                  ? "btn hover:text-basic bg-blue-950 text-black w-full capitalize"
                  : "btn hover:text-basic bg-blue-950 w-full capitalize "
              }
            >
              register as librarian.
            </button>
          </div>
          {librarian ? (
            <ToastContainer
            style={{ zIndex: "99999" }}
            autoClose={5000}
            pauseOnHover={true}
            closeOnClick={true}
            draggable={true}
            position="top-right"
          />
          ) : (
            ''
          )}
        </form>
      </div>
    </div>
  );
};

export default LibrarianReg;
