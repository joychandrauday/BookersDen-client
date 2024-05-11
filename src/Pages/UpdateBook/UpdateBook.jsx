import React, { useContext } from "react";
import { AuthContext } from "../../Provider/Provider";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateBook = () => {
  const { user } = useContext(AuthContext);
  const book = useLoaderData();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.value;
    const book_name = form.book_name.value;
    const genre = form.genre.value;
    const book_numbers = form.book_numbers.value;
    const short_description = form.short_description.value;
    const author_name = form.author_name.value;
    const author_image = form.author_image.value;
    const author_details = form.author_details.value;
    const rating = form.rating.value;
    const userEmail = form.userEmail.value;
    const userName = form.userName.value;

    const updatedAuthor = {
      author_name,
      author_image,
      author_details,
    };
    const updatedBook = {
      image,
      book_name,
      genre,
      book_numbers,
      short_description,
      author: updatedAuthor,
      rating,
      userEmail,
      userName,
    };

    fetch(
      `http://localhost:5000/book/update/${book._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      }
    )
    .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your destination has been updated successfully.",
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
      });
  };
  return (
    <div>
      <div className="container mx-auto pt-32">
        <form
          onSubmit={handleSubmit}
          className="lg:flex gap-8"
          encType="multipart/form-data"
        >
          <div className=" flex flex-col lg:w-1/2">
            <label className="mb-2">Book Image URL:</label>
            <input
              type="text"
              name="image"
              className="input input-bordered mb-4"
              placeholder="Enter Book Image URL"
              defaultValue={book.image}
              required
            />
            <label className="mb-2">Book Name:</label>
            <input
              type="text"
              name="book_name"
              className="input input-bordered mb-4"
              placeholder="Enter Book Name"
              defaultValue={book.book_name}
              required
            />
            <label className="mb-2">Genre Of the Book:</label>
            <select
              name="genre"
              className="input input-bordered mb-4"
              required
              defaultValue={book?.genre}
            >
              <option value="">Select Genre</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="mystery">Mystery</option>
              <option value="fantasy">Fantasy</option>
              <option value="romance">Romance</option>
              <option value="science-fiction">Science Fiction</option>
              <option value="thriller">Thriller</option>
              <option value="horror">Horror</option>
              <option value="biography">Biography</option>
              <option value="historical-fiction">Historical Fiction</option>
              <option value="self-help">Self-Help</option>
              <option value="poetry">Poetry</option>
            </select>
            <label className="mb-2">Copy Of Book:</label>
            <input
              type="number"
              name="book_numbers"
              className="input input-bordered mb-4"
              placeholder="Enter Book numbers"
              defaultValue={book.book_numbers}
              required
            />
            <label className="mb-2">Short book Description:</label>
            <textarea
              name="short_description"
              className="input input-bordered mb-4"
              placeholder="Enter Short Description"
              defaultValue={book.short_description}
              required
            ></textarea>
            <label className="mb-2">Book Rating:</label>
            <input
              type="number"
              name="rating"
              className="input input-bordered mb-4"
              placeholder="Enter Book's rating."
              defaultValue={book.rating}
              required
            />
            {/* <label className="mb-2">Average Cost:</label>
            <input
              type="number"
              name="average_cost"
              className="input input-bordered mb-4"
              placeholder="Enter Average Cost"
              required
            /> */}
          </div>
          <div className="flex flex-col lg:w-1/2">
            <label className="mb-2">Author name:</label>
            <input
              type="text"
              name="author_name"
              className="input input-bordered mb-4"
              placeholder="Author name"
              defaultValue={book?.author.author_name}
              required
            />
            <label className="mb-2">Author image:</label>
            <input
              type="text"
              name="author_image"
              className="input input-bordered mb-4"
              placeholder="Author image"
              defaultValue={book?.author.author_image}
              required
            />
            <label className="mb-2">Author details:</label>
            <input
              type="text"
              name="author_details"
              className="input input-bordered mb-4"
              placeholder="Author details"
              defaultValue={book?.author.author_details}
              required
            />

            {/* <label className="mb-2">Total Visitors Per Year:</label>
            <input
              type="number"
              name="totalVisitorsPerYear"
              className="input input-bordered mb-4"
              placeholder="Enter Total Visitors Per Year"
              required
            /> */}
            <label className="mb-2">User Email:</label>
            <input
              type="email"
              name="userEmail"
              defaultValue={user.email}
              className="input input-bordered mb-4"
              readOnly
            />
            <label className="mb-2">User Name:</label>
            <input
              type="text"
              name="userName"
              defaultValue={user.displayName}
              className="input input-bordered mb-4"
              readOnly
            />
            <button
              type="submit"
              className="btn btn-primary self-center w-full"
            >
              Update The Book.
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
