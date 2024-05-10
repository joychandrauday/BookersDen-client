import React from 'react';

const BorrowedBookCard = ({book}) => {
    console.log(book)
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
            by: <span className="text-blue-950">{author?.author_name}</span>{" "}
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

export default BorrowedBookCard;