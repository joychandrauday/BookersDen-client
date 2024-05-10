import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from './../../Provider/Provider';
import BorrowedBookCard from "./BorrowedBookCard";
const BorrowedBooks = () => {
    const {user}=useContext(AuthContext)
    const [borrowedBooks,setBorrowedBooks]=useState([])
  useEffect(() => {
    axios(`http://localhost:5000/borrowed-books?email=${user?.email}`).then(
      (data) => {
        setBorrowedBooks(data?.data)
        console.log(borrowedBooks);
      }
    );
  }, []);
  return (
    <div>
        <div className="pt-32">
            <h1 className="text-center font-bold text-3xl">Borrowed Books</h1>
            <div className="lg:grid grid-cols-3 gap-4 container mx-auto">
                {
                    borrowedBooks.map(book=><BorrowedBookCard key={book._id} book={book?.book}></BorrowedBookCard>)
                }
            </div>

        </div>
    </div>
  );
};

export default BorrowedBooks;
