import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from '../Pages/Root/Root';
import Error from '../Pages/ErrorPage/Error';

import Home from '../Pages/Home/Home';
import SignIn from '../Pages/Sign In/SignIn';
import SignUp from '../Pages/SignUp/SignUp';
import AddBook from '../Pages/AddBook/AddBook';
import PrivateRoute from './../Private Route/PrivateRoute';
import AllBooks from '../Pages/AllBooks/AllBooks';
import BorrowedBooks from '../Pages/BorrowedBooks/BorrowedBooks';
import LibrarianReg from '../Pages/LibrarianRegister/LibrarianReg';
import BookDetailsPage from '../Pages/BookDetails/BookDetailsPage'
import UpdateBook from '../Pages/UpdateBook/UpdateBook';
import GenreWiseBooks from '../Pages/GenreWise/GenreWiseBooks';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<Error></Error>,
      children: [
        {
          path: "/",
          element: <Home></Home>
        },
        {
          path: "/sign-in",
          element: <SignIn></SignIn>,
        },
        {
          path: "/sign-up",
          element: <SignUp></SignUp>,
        },
        {
          path: "/librarian-registration",
          element: <PrivateRoute><LibrarianReg></LibrarianReg></PrivateRoute>,
        },
        {
          path: "/book/:id",
          element: <PrivateRoute><BookDetailsPage></BookDetailsPage></PrivateRoute>,
        },
        {
          path: "/book/update/:id",
          element: <PrivateRoute><UpdateBook></UpdateBook></PrivateRoute>,
          loader:({params})=>fetch(`https://bookersdenserver.vercel.app/book/${params.id}`)
        },
        {
          path: "/all-books",
          element:<PrivateRoute><AllBooks></AllBooks></PrivateRoute> ,
        },
        {
          path: "/add-book",
          element:<PrivateRoute><AddBook></AddBook></PrivateRoute> ,
        },
        {
          path: "/borrowed-books",
          element:<PrivateRoute><BorrowedBooks></BorrowedBooks></PrivateRoute> ,
        },
        {
          path: "/genre/:name",
          element:<GenreWiseBooks></GenreWiseBooks>,
          loader:({params})=>fetch(`https://bookersdenserver.vercel.app/genre/${params.name}`),
        },
      ],
    },
  ]);

export default router;