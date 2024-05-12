import Swal from "sweetalert2";
import { AuthContext } from "./../../Provider/Provider";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import "./style.css";
import axios from "axios";

const AddBook = () => {
  const { user } = useContext(AuthContext);

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

    const newAuthor = {
      author_name,
      author_image,
      author_details,
    };
    const newBook = {
      image,
      book_name,
      genre,
      book_numbers,
      short_description,
      author: newAuthor,
      rating,
      userEmail,
      userName,
    };

    axios
      .post("http://localhost:5000/allbooks", newBook)
      .then(function (response) {
        console.log(response);
        if (response.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Book has been added.",
            showConfirmButton: true,
          });
          form.reset();
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
        console.log(error);
      });
  };

  return (
    <div className=" lg:py-32 addNewPage">
      <Helmet>
        <title>Add A New Book</title>
      </Helmet>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl fo nt-extrabold capitalize text-center pb-8">
          Add a New Book
        </h1>
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
              required
            />
            <label className="mb-2">Book Name:</label>
            <input
              type="text"
              name="book_name"
              className="input input-bordered mb-4"
              placeholder="Enter Book Name"
              required
            />
            <label className="mb-2">Genre Of the Book:</label>
            <select name="genre" className="input input-bordered mb-4" required>
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
              required
            />
            <label className="mb-2">Short book Description:</label>
            <textarea
              name="short_description"
              className="input input-bordered mb-4"
              placeholder="Enter Short Description"
              required
            ></textarea>
            <label className="mb-2">Book Rating:</label>
            <input
              type="number"
              name="rating"
              className="input input-bordered mb-4"
              placeholder="Enter Book's rating (1-5)"
              min="1"
              max="5"
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
              required
            />
            <label className="mb-2">Author image:</label>
            <input
              type="text"
              name="author_image"
              className="input input-bordered mb-4"
              placeholder="Author image Link"
              required
            />
            <label className="mb-2">Author details:</label>
            <input
              type="text"
              name="author_details"
              className="input input-bordered mb-4"
              placeholder="Author Details"
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
              Add The Book To Library.
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
