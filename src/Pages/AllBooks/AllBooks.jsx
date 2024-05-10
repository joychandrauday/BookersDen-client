import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SingleBookCard from '../SingleBookCard/SingleBookCard';

const AllBooks = () => {
    const [allbooks,setAllBooks]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:5000/allbooks")
        .then(data=>{
            setAllBooks(data.data);
        })
    },[])
    return (
        <div className='pt-32'>
            <h1 className="text-3xl text-center capitalize font-bold">all books</h1>
            <div className="lg:grid grid-cols-3 gap-4 container mx-auto">
                {
                    allbooks.map(book=><SingleBookCard key={book._id} book={book}></SingleBookCard>)
                }
            </div>
        </div>
    );
};

export default AllBooks;