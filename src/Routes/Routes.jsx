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

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<Error></Error>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
          loader:()=>fetch('https://travelpulseserver.vercel.app/destinations'),
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
          path: "/destination/update/:id",
          element:<PrivateRoute><AddBook></AddBook></PrivateRoute> ,
          loader:({params})=>fetch(`https://travelpulseserver.vercel.app/destination/${params.id}`)
        },
      ],
    },
  ]);

export default router;