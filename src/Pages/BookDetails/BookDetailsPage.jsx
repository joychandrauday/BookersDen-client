import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
const BookDetailsPage = () => {
  const bookId = useParams();
  const [book, setBook] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/book/${bookId.id}`).then((data) => {
      setBook(data.data);
      console.log(book);
    });
  }, []);
  const {
    image,
    book_name,
    genre,
    book_numbers,
    short_description,
    author_name,
    rating,
    author,
    userEmail,
    userName,
  } = book;
  return (
    <div className="pt-32 ">
      <div className="lg:flex gap-4 container mx-auto">
        <div className="text-center justify-center basis-1/3">
          <div className="flex justify-center">
            <img src={image} alt="" className="w-72" />
          </div>
          <div className="flex items-center py-4 justify-center">
            <h1 className="capitalize font-bold text-xl">rating:</h1>
            <Rating style={{ maxWidth: 120 }} value={rating} readOnly />
          </div>
        </div>
        <div className="basis-2/3">
          <div role="tablist" className="tabs tabs-lifted">
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab w-max"
              aria-label={book_name}
              checked
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              <h1 className="capitalize text-2xl font-bold">{book_name}</h1>
              <p className="capitalize py-4">{short_description}</p>
              <p className="capitalize">
                Genre: <span className="">{genre}</span>
              </p>
              <p>
                Writer: <span className="">{author?.author_name}</span>
              </p>
            </div>

            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label={author?.author_name}
              
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
                <div className="author">
                    <div className="w-72 h-72 rounded-full">
                    <img src={author?.author_image} alt="" />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
