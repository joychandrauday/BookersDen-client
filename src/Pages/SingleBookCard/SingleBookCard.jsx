import React, { useContext } from "react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";

const SingleBookCard = ({ book }) => {
  const {
    _id,
    image,
    book_name,
    genre,
    book_numbers,
    short_description,
    author,
    rating,
    userEmail,
    userName,
  } = book;
  const {librarian}=useContext(AuthContext);
  return (
    <div>
      <div className="card border cursor-pointer bg-white relative rounded-none shadow-xl">
        <figure className="bg-white hover:bg-gray-100 p-4">
          <img
            src={image}
            alt="book image"
            className="w-44 shadow-md  shadow-black"
          />
        </figure>
        <Link to={`/genre/${genre}`} className="badge badge-warning font-semibold rounded-none absolute capitalize">
          {genre}
        </Link>
        <div className="badge badge-accent font-semibold rounded-none absolute top-6 capitalize">
          {book_numbers} books left.
        </div>
        <div className="card-body">
          <h2 className="card-title text-black">{book_name}</h2>
          <p>
            by: <span className="text-blue-950">{author?.author_name}</span>{" "}
          </p>
          <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
          <div className="flex gap-2 justify-between">
            <AwesomeButton className="w-full" type="primary">
              <Link to={`/book/${_id}`}>View details</Link>
            </AwesomeButton>
            <AwesomeButton disabled={!librarian} className="w-full" type="primary">
            <Link to={librarian?`/book/update/${_id}`:''}>Update Book</Link>
            </AwesomeButton>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBookCard;
