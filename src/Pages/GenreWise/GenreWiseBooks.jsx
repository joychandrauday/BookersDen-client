import React, { useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import SingleBookCard from '../SingleBookCard/SingleBookCard';
import { AwesomeButton } from 'react-awesome-button';

const GenreWiseBooks = () => {
    const books=useLoaderData();
    const genreName=useParams()
    const [librarian,setLibrarian]=useState(true)
    //console.log(books)
    return (
        <div >
            {
                books.length>0? 
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
                :<div className='flex min-h-screen items-center flex-col justify-center'>
                    <img src="https://i.ibb.co/McLzr4x/2.gif" alt="" className='w-44 mx-auto rounded '/>
                    <h1 className="capitalize font-bold text-4xl text-white py-3">no books found in this genre</h1>
                    {
                        librarian?
                        <AwesomeButton className='capitalize'>
                            <Link to={'/add-book'}>
                                add books
                            </Link>
                        </AwesomeButton>
                        :''
                    }
                </div>
            }
        </div>
    );
};

export default GenreWiseBooks;