import { Link } from "react-router-dom";

const NotFound = () => (
  <div className=" flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Page Not Found
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
      <div className="mt-8">
        <Link
          to="/"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Go back to home
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
