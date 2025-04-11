import { useState } from 'react';

import Signup from './Components/Signup.jsx';
import Login from './Components/Login.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path: "/login",
      element: <Login/>
    },
  ]);
  

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
