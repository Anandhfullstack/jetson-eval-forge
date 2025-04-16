import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-jetson-pink">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold mb-4 text-jetson-blue">404</h1>
        <p className="text-xl text-gray-700 mb-6">Oops! Page not found</p>
        <a href="/" className="px-4 py-2 bg-jetson-blue text-white rounded-md hover:bg-blue-600 transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
