import { useState } from 'react';
import Signup from './Components/Signup.jsx';
import Login from './Components/Login.jsx';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from './Components/Navbar.jsx';
import Hero from './Components/Hero.jsx';
import Footer from './Components/Footer.jsx';

function App() {
  // Layout component to wrap all routes with Navbar and Footer
const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-grow">
      <Outlet /> {/* Render matched route */}
    </div>
    <Footer />
  </div>
);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Hero /> },
        
      ]
    },
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
