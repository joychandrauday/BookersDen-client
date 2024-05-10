import React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import { Link } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating';

const BorrowedBookCard = ({book}) => {
    
    const parsedBorrowedDate = new Date(book?.borrowedDate);

    // Format the date to display only the date part (YYYY-MM-DD)
    const formattedBorrowedDate = parsedBorrowedDate.toISOString().split('T')[0];

    const handleReturnBook = (bookId) => {
        console.log(bookId);
        
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
                <div className="badge badge-warning font-semibold rounded-none absolute capitalize">
                    {book?.book.genre}
                </div>
                <div className="card-body">
                    <h2 className="card-title text-black">{book?.book.book_name}</h2>
                    <p>
                        by: <span className="text-blue-950">{book?.book.author?.author_name}</span>{" "}
                    </p>
                    <div className="flex justify-between items-center">
                        <div>
                            Borrowed Date:<br></br> <div className="span text-black">{formattedBorrowedDate}</div>
                        </div>
                        <div>
                            Please Return by:<br></br><div className="span text-black">{book.returnDate}</div>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-between">
                        <AwesomeButton className="w-full" type="primary"
                        onPress={()=>handleReturnBook(book._id)}
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
