import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import SingleBookCard from '../SingleBookCard/SingleBookCard';

const GenreWiseBooks = () => {
    const books=useLoaderData();
    const genreName=useParams()
    console.log(books)
    return (
        <div >
            <div className="container mx-auto py-32">
                <h1 className="font-bold capitalize text-bold text-3xl py-5">
                    all {genreName?.name} books.
                </h1>
                <div className="lg:grid grid-cols-3 gap-4">
                    {
                        books.map(book => <SingleBookCard key={book._id} book={book}></SingleBookCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default GenreWiseBooks;