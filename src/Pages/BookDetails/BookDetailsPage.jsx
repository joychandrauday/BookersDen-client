import axios from "axios";
import  { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "./styles.css";
import "@smastrom/react-rating/style.css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { AuthContext } from "../../Provider/Provider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';

const options = {
   // default is `save`
   method: 'open',
   // default is Resolution.MEDIUM = 3, which should be enough, higher values
   // increases the image quality but also the size of the PDF, so be careful
   // using values higher than 10 when having multiple pages generated, it
   // might cause the page to crash or hang.
   resolution: Resolution.HIGH,
   page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.SMALL,
      // default is 'A4'
      format: 'letter',
      // default is 'portrait'
      orientation: 'landscape',
   },
   canvas: {
      // default is 'image/jpeg' for better size performance
      mimeType: 'image/png',
      qualityRatio: 1
   },
   // Customize any value passed to the jsPDF instance and html2canvas
   // function. You probably will not need this and things can break, 
   // so use with caution.
   overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
         compress: true
      },
      // see https://html2canvas.hertzen.com/configuration for more options
      canvas: {
         useCORS: true
      }
   },
};

// you can use a function to return the target element besides using React refs
const getTargetElement = () => document.getElementById('content-id');

const BookDetailsPage = () => {
  const bookId = useParams();
  const [book, setBook] = useState([]);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [bookNumbers, setBookNumbers] = useState(0);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [borrowedTrue, setBorrowedTrue] = useState(false);
  useEffect(() => {
    axios
      .get(`https://bookersdenserver.vercel.app/borrowed-books-of?email=${user?.email}`,{
        withCredentials:true
      })
      .then((response) => {
        console.log(response.data);
        const borrowedBooks = response.data;
        const isIdPresent = borrowedBooks.some((book) => book?.book._id === id);
        setBorrowedTrue(isIdPresent);
        setBorrowedBooks(borrowedBooks);
      })
      .catch((error) => {
        console.error("Error fetching borrowed books:", error);
      });
  }, [id, user?.email]);
  console.log(borrowedBooks,user.email);
  useEffect(() => {
    axios.get(`https://bookersdenserver.vercel.app/book/${bookId.id}`,{
      withCredentials:true
    }).then((data) => {
      setBook(data.data);
      setBookNumbers(data.data.book_numbers);
    });
  }, []);

  

  const {
    image,
    book_name,
    genre,
    short_description,
    author_name,
    rating,
    author,
  } = book;

  const handleBorrowBook = (book, e) => {
    e.preventDefault(); // Prevent form submission

    const form = e.target;
    const email = form.userEmail.value;
    const userName = form.userName.value;
    const returnDate = form.date.value;
    const borrowedDate = new Date().toISOString();
    const bookId = book._id;
    const borrowedDetails = {
      email,
      userName,
      borrowedDate,
      returnDate,
      book,
    };

    axios
      .post("https://bookersdenserver.vercel.app/borrowed-books", borrowedDetails)
      .then(function (response) {
        if (response.data.insertedId) {
          // Update book numbers
          axios
            .patch(`https://bookersdenserver.vercel.app/book/${bookId}`, {
              book_numbers: bookNumbers - 1,
            })
            .then((response) => {
              // Log the updated book numbers
              // console.log("Updated Book Numbers:", bookNumbers - 1);
              // Update the state with the new book numbers
              setBookNumbers(bookNumbers - 1);
            })
            .catch((error) =>
              console.error("Error updating book numbers:", error)
            );

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Book has been borrowed.",
            showConfirmButton: true,
          }).then(() => {});
          form.reset(); // Reset form fields
          const modal = document.getElementById("my_modal_3");
          setBorrowedTrue(true);
          if (modal) {
            modal.close(); // Close the modal
          }
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
    <div className="lg:pt-32 pb-8">
      <Helmet>
        <title>{book?.book_name }</title>
      </Helmet>
      <div className="lg:flex  gap-4 container mx-auto">
        <div className="text-center pb-8 justify-center basis-1/3 px-16">
          <div className="flex justify-center ralative">
            <img src={image} alt="" className="w-72" />
            <span className="badge badge absolute left-16 lg:-rotate-45">
              copies left {bookNumbers}
            </span>
          </div>
          <div className="flex items-center py-4 justify-center">
            <h1 className="capitalize font-bold text-xl">rating:</h1>
            <Rating style={{ maxWidth: 120 }} value={rating} readOnly />
          </div>
          <AwesomeButton
            type="primary"
            className="w-full"
            disabled={borrowedTrue || borrowedBooks.length >= 3 || bookNumbers < 1}
            onPress={() => document.getElementById("my_modal_3").showModal()}
          >
            Borrow Book
          </AwesomeButton>
          {borrowedTrue ? (
            <h2 className="capitalize badge">
              you have already borrowed the book.
            </h2>
          ) : (
            ""
          )}
          {borrowedBooks.length >= 3 ? (
            <h2 className="capitalize badge">
              you have already borrowed three books.
            </h2>
          ) : (
            ""
          )}
          {bookNumbers < 1 ? (
            <h2 className="capitalize badge">
              the book is out of stock.
            </h2>
          ) : (
            ""
          )}
          {/* modal */}
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              {bookNumbers > 0 ? (
                <form
                  onSubmit={(e) => handleBorrowBook(book, e)}
                  method="dialog"
                  className="flex flex-col text-left"
                >
                  <input
                    type="email"
                    name="userEmail"
                    defaultValue={user?.email}
                    className="input input-bordered mb-4"
                    readOnly
                  />
                  <input
                    type="text"
                    name="userName"
                    defaultValue={user?.displayName}
                    className="input input-bordered mb-4"
                    readOnly
                  />
                  <label className="mb-2">Return Date</label>
                  <input
                    type="date"
                    name="date"
                    className="input input-bordered mb-4"
                    required
                  />
                  <AwesomeButton type="primary" className="w-full">
                    Borrow this Book
                  </AwesomeButton>
                </form>
              ) : (
                <h2 className="capitalize">
                  the book is out of stock.{" "}
                  <div className="badge">press esc to close.</div>{" "}
                </h2>
              )}
            </div>
          </dialog>
          {/* modal */}
        </div>
        <div className="basis-2/3 p-4">
          <div role="tablist" className="tabs tabs-lifted">
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab tabSwap"
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
              className="tab tabSwap"
              aria-label={author?.author_name}
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              <div className="author lg:flex">
                <div className="w-72 h-72 basis-1/3 rounded-full">
                  <img src={author?.author_image} alt="" />
                </div>
                <div className="text-left basis-2/3">
                  <h1 className="text-2xl font-bold">{author?.author_name}</h1>
                  <p>{author?.author_details}</p>
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
