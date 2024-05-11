import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SingleBookCard from '../SingleBookCard/SingleBookCard';

const AllBooks = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [showAvailableBooks, setShowAvailableBooks] = useState(false);
    const [viewMode, setViewMode] = useState('card'); // Default view mode is card

    useEffect(() => {
        axios.get("http://localhost:5000/allbooks")
            .then(data => {
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
        <div className='pt-32'>
            <h1 className="text-3xl text-center capitalize font-bold">all books</h1>
            <div className="flex justify-center my-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleShowAvailableBooks}>
                    {showAvailableBooks ? "Show All Books" : "Show Available Books"}
                </button>
                <div className="ml-4">
                    <span className="mr-2">View Mode:</span>
                    <select
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        value={viewMode}
                        onChange={(e) => handleChangeViewMode(e.target.value)}
                    >
                        <option value="card">Card View</option>
                        <option value="table">Table View</option>
                    </select>
                </div>
            </div>
            <div className="lg:grid grid-cols-3 gap-4 container mx-auto">
                {
                    viewMode === 'card' ?
                        allBooks
                            .filter(book => !showAvailableBooks || book.book_numbers > 0) // Filter available books if showAvailableBooks is true
                            .map(book => <SingleBookCard key={book._id} book={book}></SingleBookCard>)
                        :
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Genre</th>
                                    <th>Book Numbers</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allBooks
                                    .filter(book => !showAvailableBooks || book.book_numbers > 0) // Filter available books if showAvailableBooks is true
                                    .map(book => (
                                        <tr key={book._id}>
                                            <td>{book.book_name}</td>
                                            <td>{book.author?.author_name}</td>
                                            <td>{book.genre}</td>
                                            <td>{book.book_numbers}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                }
            </div>
        </div>
    );
};

export default AllBooks;
