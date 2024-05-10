import React from "react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { Link } from "react-router-dom";

const SingleBookCard = ({ book }) => {
  const {
    _id,
    image,
    book_name,
    genre,
    book_numbers,
    short_description,
    author_name,
    rating,
    userEmail,
    userName,
  } = book;

  return (
    <div>
      <div className="card bg-white relative rounded-none shadow-xl">
        <figure className="bg-white p-4">
          <img
            src={image}
            alt="book image"
            className="w-44 shadow-md  shadow-black"
          />
        </figure>
        <div className="badge badge-warning font-semibold rounded-none absolute capitalize">
          {genre}
        </div>
        <div className="card-body">
          <h2 className="card-title text-black">{book_name}</h2>
          <p>
            by: <span className="text-blue-950">{author_name}</span>{" "}
          </p>
          <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
          <div className="flex gap-2 justify-between">
            <AwesomeButton className="w-full" type="primary">
              <Link to={`/book/${_id}`}>View details</Link>
            </AwesomeButton>
            <AwesomeButton className="w-full" size="small" type="primary">
            <Link to={`/book/${_id}`}>Edit</Link>
            </AwesomeButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBookCard;
