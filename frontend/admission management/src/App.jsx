import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Hero from './Components/Hero';
import About from './Components/About';
import Dashboard from './Components/Dashboard';
import Signup from './Components/Signup';
import Login from './Components/Login';
import './App.css';

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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Hero /> },
        { path: "/about", element: <About /> },
        { path: "/dashboard", element: <Dashboard /> },
      ]
    },
    


    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
