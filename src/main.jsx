import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';

import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes';
import Provider from './Provider/Provider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
)
