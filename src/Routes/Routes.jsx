import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from '../Pages/Root/Root';
import Error from '../Pages/ErrorPage/Error';

import Home from '../Pages/Home/Home';
import AllTouristSpots from './../Pages/All tourist spot/AllTouristSpots';
import AddNewDestination from '../Pages/AddNewDestination/AddNewDestination';
import MyList from '../Pages/My-List/MyList';
import Contact from './../Pages/Contact/Contact';
import SignIn from '../Pages/Sign In/SignIn';
import SignUp from '../Pages/SignUp/SignUp';
import SingleSpotDetails from '../Pages/Single Details/SingleSpotDetails';
import PrivateRoute from '../Components/Private Route/PrivateRoute';
import UpdateDestination from '../Pages/UpdateDestination/UpdateDestination';
import Countrywisecard from '../Pages/Countrywise/Countrywisecard';

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
          path: "/all-spots",
          element: <AllTouristSpots></AllTouristSpots>,
          loader:()=>fetch('https://travelpulseserver.vercel.app/destinations'),
        },
        {
          path: "/add-spot",
          element:<PrivateRoute><AddNewDestination></AddNewDestination></PrivateRoute> ,
        },
        {
          path: "/my-list/:email",
          element:<PrivateRoute><MyList></MyList></PrivateRoute> ,
          loader:({params})=>fetch(`https://travelpulseserver.vercel.app/my-list/${params.email}`),
        },
        {
          path: "/contact",
          element: <Contact></Contact>,
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
          path: "/single-destination",
          element:<PrivateRoute><SingleSpotDetails></SingleSpotDetails></PrivateRoute> ,
        },
        {
          path: "/destination/:id",
          element:<PrivateRoute><SingleSpotDetails></SingleSpotDetails></PrivateRoute> ,
          loader:({params})=>fetch(`https://travelpulseserver.vercel.app/destination/${params.id}`)
        },
        {
          path: "/destination/update/:id",
          element:<PrivateRoute><UpdateDestination></UpdateDestination></PrivateRoute> ,
          loader:({params})=>fetch(`https://travelpulseserver.vercel.app/destination/${params.id}`)
        },
        {
          path: "/countries/:name",
          element:<Countrywisecard></Countrywisecard> ,
          loader:({params})=>fetch(`https://travelpulseserver.vercel.app/countries/${params.name}`),
        },
      ],
    },
  ]);

export default router;