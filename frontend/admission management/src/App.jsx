import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import MultiStepForm from "./Components/MultiStepForm.jsx";
import Hero from "./Components/Hero.jsx";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong:
        </h1>
        <pre className="text-gray-700 mb-4">{error.message}</pre>
        <button
          onClick={resetErrorBoundary}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

function App() {
  const Layout = () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => window.location.reload()}
        >
          <Outlet />
        </ErrorBoundary>
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
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/admission",
          element: <MultiStepForm />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
