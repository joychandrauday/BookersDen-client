import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from './../../Provider/Provider';
import BorrowedBookCard from "./BorrowedBookCard";
import { Link } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Books you have borrowed.</title>
      </Helmet>
        <div className={borrowedBooks.length>0 ?"lg:pt-32 pb-8":''}>
            {
              borrowedBooks.length>0 ? 
              <div>
                  <h1 className="text-center font-bold text-3xl pb-8">Books You Have Borrowed.({borrowedBooks.length})</h1>
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-4 gap-4 container mx-auto">
                  {
                      borrowedBooks.map(book=><BorrowedBookCard key={book._id} book={book}></BorrowedBookCard>)
                  }
              </div>
                </div>
              :<div className='flex p-12 lg:min-h-screen text-center  items-center flex-col justify-center'>
                <img src="https://i.ibb.co/McLzr4x/2.gif" alt="" className='w-44 mx-auto rounded '/>
                <h1 className="capitalize font-bold lg:text-4xl text-2xl text-white py-3">you didn't borrow any book.</h1>
                <AwesomeButton className='capitalize'>
                        <Link to={'/all-books'}>
                            borrow now
                        </Link>
                    </AwesomeButton>
              </div>
            }

        </div>
    </div>
  );
};

export default BorrowedBooks;
