import { Link } from "react-router-dom";
import { createUserThunk } from "../../redux/reducer/userReducer";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {
  const dispatch = useDispatch();
  // ref variables for name, email, password
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  // navigation variable
  const navigate = useNavigate();

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if(passwordConfirmRef.current.value !== passwordRef.current.value){
      toast.error("Pasword not Matched")
      return
    }
    // storing user's data
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    // creating user
    dispatch(createUserThunk(data)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("you are Registerd")
        navigate("/login");
      }else{
        toast.error("Email address already in use!");
      }
    });
  };

  return (
    <div className="bg-blue-900 flex items-center justify-center h-screen text-white">
      <ToastContainer />
      <div className="w-full max-w-md">
        <div className="bg-blue-600 p-4 shadow-lg shadow-blue-950 rounded-3xl px-8 py-8 pt-8">
          <div className="px-4 pb-4">
            <h1 className="text-2xl font-bold text-center">Sign Up</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="px-4 pb-4">
              <label htmlFor="username" className="text-sm block font-bold pb-2 ">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                ref={nameRef}
                className="bg-transparent border-b border-white focus:outline-none focus:border-blue-300 text-white placeholder-white w-full py-2 px-3 leading-tight focus:shadow-outline"
                placeholder="Enter your username"
              />
            </div>
            <div className="px-4 pb-4">
              <label htmlFor="email" className="text-sm block font-bold pb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                ref={emailRef}
                className="bg-transparent border-b border-white focus:outline-none focus:border-blue-300 text-white placeholder-white w-full py-2 px-3 leading-tight focus:shadow-outline"
                placeholder="Enter your email"
              />
            </div>
            <div className="px-4 pb-4">
              <label htmlFor="password" className="text-sm block font-bold pb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                ref={passwordRef}
                className="bg-transparent border-b border-white focus:outline-none focus:border-blue-300 text-white placeholder-white w-full py-2 px-3 leading-tight focus:shadow-outline"
                placeholder="Enter your password"
              />
            </div>
            <div className="px-4 pb-4">
              <label htmlFor="confirm-password" className="text-sm block font-bold pb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                ref={passwordConfirmRef}
                className="bg-transparent border-b border-white focus:outline-none focus:border-blue-300 text-white placeholder-white w-full py-2 px-3 leading-tight focus:shadow-outline"
                placeholder="Confirm your password"
              />
            </div>
            <div className="px-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Sign Up
              </button>
            </div>
            <div className="px-4 pt-4 text-center">
              <p className="text-sm text-blue-300">
                Already have an account?{" "} &nbsp;
                <Link to="/login" className="text-white hover:text-blue-700 font-bold underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
