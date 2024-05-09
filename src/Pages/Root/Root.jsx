import React from 'react';
import Header from '../../Components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';

const Root = () => {
    return (
        <div>
            <div className="absolute w-full z-[99999] ">
                <Header></Header>
            </div>
            <Outlet></Outlet>
            <div className="py-16">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;