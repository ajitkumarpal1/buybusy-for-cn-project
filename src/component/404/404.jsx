import { Link } from "react-router-dom";

export const PageNotFound = () => {
    return (
        <div className="bg-blue-900 min-h-screen flex items-center justify-center text-white">
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <h2 className="text-2xl mb-4">Page Not Found</h2>
                <p className="mb-8">Sorry, the page you are looking for does not exist.</p>
                <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};
