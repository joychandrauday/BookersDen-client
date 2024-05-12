import React from "react";
import { AwesomeButton } from "react-awesome-button";
import { Link, useNavigate } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import axios from "axios";
import Swal from "sweetalert2";

const BorrowedBookCard = ({ book }) => {
  const bookNumbers = book?.book.book_numbers;
  const book_id = book?.book._id;
  const parsedBorrowedDate = new Date(book?.borrowedDate);
  const navigate=useNavigate()

  // Format the date to display only the date part (YYYY-MM-DD)
  const formattedBorrowedDate = parsedBorrowedDate.toISOString().split("T")[0];

  const handleReturnBook = (bookId) => {
    console.log(bookId);
    axios
      .delete(`http://localhost:5000/borrowed-book/${bookId}`)
      .then(function (response) {
        if (response.data.deletedCount > 0) {
          // Update book numbers
          axios.patch(`http://localhost:5000/book/${book_id}`, {
              book_numbers: bookNumbers,
            })
            .then((response) => {
              // Log the updated book numbers

                console.log("Updated Book Numbers:", bookNumbers + 1);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your Book has been returned.",
                    showConfirmButton: true,
                  });
                  
                  window.location.reload()
              // Update the state with the new book numbers
            })
            .catch((error) =>
              console.error("Error updating book numbers:", error)
            );

        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Something went wrong.",
            showConfirmButton: true,
          });
        }
      })
      .catch(function (error) {
        console.error("Error borrowing book:", error);
      });
  };
  return (
    <div>
      <div className="card bg-white relative rounded-none shadow-xl">
        <figure className="bg-white p-4">
          <img
            src={book?.book.image}
            alt="book image"
            className="w-44 shadow-md  shadow-black"
          />
        </figure>
        <Link to={`/genre/${book?.book.genre}`} className="badge badge-warning font-semibold rounded-none absolute capitalize">
          {book?.book.genre}
        </Link>
        <div className="card-body">
          <h2 className="card-title text-black">{book?.book.book_name}</h2>
          <p>
            by:{" "}
            <span className="text-blue-950">
              {book?.book.author?.author_name}
            </span>{" "}
          </p>
          <div className="flex justify-between items-center">
            <div>
              Borrowed Date:<br></br>{" "}
              <div className="span text-black">{formattedBorrowedDate}</div>
            </div>
            <div>
              Please Return by:<br></br>
              <div className="span text-black">{book.returnDate}</div>
            </div>
          </div>
          <div className="flex gap-2 justify-between">
            <AwesomeButton
              className="w-full"
              type="primary"
              onPress={() => handleReturnBook(book._id)}
            >
              Return Now
            </AwesomeButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowedBookCard;
