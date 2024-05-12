import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import SingleBookCard from "../SingleBookCard/SingleBookCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";

const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [showAvailableBooks, setShowAvailableBooks] = useState(false);
  const [viewMode, setViewMode] = useState("card");  const {librarian}=useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    // Show toast after component mounts
    toast.success('To add book, join as librarian!', {
      autoClose: true,
      closeButton: false,
      closeOnClick: true,
      draggable: false,
      customId: 'custom-toast-id',
      onClick: () => handleToastClose()
    });
  }, []);
  
  const handleToastClose = () => {
    navigate('/librarian-registration')
  };

  useEffect(() => {
    axios.get("http://localhost:5000/allbooks").then((data) => {
      setAllBooks(data.data);
    });
  }, []);

  const toggleShowAvailableBooks = () => {
    setShowAvailableBooks(!showAvailableBooks);
  };

  const handleChangeViewMode = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="pt-32">
      <h1 className="text-3xl text-center capitalize font-bold">all books</h1>
      <div className="flex justify-center gap-4 my-4 mb-12">
        <button
          className="bg-blue-500 rounded-none hover:bg-blue-700 text-white font-bold py-2 px-4"
          onClick={toggleShowAvailableBooks}
        >
          {showAvailableBooks ? "Show All Books" :"Show Available Books"}
        </button>
        <div className="">
          <select
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-none"
            value={viewMode}
            onChange={(e) => handleChangeViewMode(e.target.value)}
          >
            <option value="card">Card View</option>
            <option value="table">Table View</option>
          </select>
        </div>
      </div>
      <div
        className={
          viewMode === "card"
            ? "lg:grid grid-cols-3 gap-4 container mx-auto"
            : "container mx-auto"
        }
      >
        {viewMode === "card" ? (
          allBooks
            .filter((book) => !showAvailableBooks || book.book_numbers > 0)
            .map((book) => (
              <SingleBookCard key={book._id} book={book}></SingleBookCard>
            ))
        ) : (
          <table className="table table-zebra w-full text-xl text-left">
            <thead>
              <tr className="text-xl">
                <th className="text-center">Index</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th className="text-center">Available Books</th>
              </tr>
            </thead>
            <tbody>
              {allBooks
                .filter((book) => !showAvailableBooks || book.book_numbers > 0) // Filter available books if showAvailableBooks is true
                .map((book, index) => (
                  <tr key={book._id}>
                    <th className="text-center">{index + 1}</th>
                    <td className="w-96">{book.book_name}</td>
                    <td>{book.author?.author_name}</td>
                    <td>{book.genre}</td>
                    <td className="text-center">{book.book_numbers}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      {
        librarian?
        '':<ToastContainer
        style={{ zIndex: "99999" }}
        closeButton={true}
        autoClose={5000} 
        pauseOnHover={true}
        closeOnClick={true} 
        draggable={true}
        position="top-right"
      />
      }
    </div>
  );
};

export default AllBooks;
