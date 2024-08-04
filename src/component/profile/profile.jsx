import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { clearUserSession } from "../../redux/reducer/userReducer"; // Assuming you have a clearUserSession action
import { PageNotFound } from "../404/404";

export function Profile() {
    const user = useSelector(state => state.userData);
    
    console.log(user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    if(!user.isLoggedIn){
        return <PageNotFound />
    }
    const handleLogout = () => {
        dispatch(clearUserSession()); // Clear user data in Redux
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        toast.success("Logged out successfully");
        navigate("/"); // Redirect to login page
    };

    return (
        <div className="profile-container">
            {user ? (
                <div className="profile-card bg-blue-600 p-6 shadow-lg shadow-blue-950 rounded-3xl text-white">
                    <h2 className="text-2xl font-bold mb-4">User Profile</h2>
                    <p className="mb-2"><strong>Name:</strong> {user?.userLoggedIn?.name}</p>
                    <p className="mb-2"><strong>Email:</strong> {user?.userLoggedIn?.email}</p>
                    
                    <div className="mt-6">
                        <button 
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}
