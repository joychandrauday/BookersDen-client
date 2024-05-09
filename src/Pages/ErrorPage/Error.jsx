import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div style={{
            backgroundImage:"url('https://i.ibb.co/1Kcnnx0/4660872-2427653.jpg')",
            backgroundPosition:'center center',
            backgroundSize:'cover'
        }} className='min-h-screen flex items-end justify-end'>
            <Helmet>
                <title>Error | page not found.</title>
            </Helmet>
            <div className="wrapper pb-72 pr-48">
                <Link to={"/"} className="btn bg-basic capitalize font-bold rounded-none px-12">back to home</Link>
            </div>
        </div>
    );
};

export default Error;