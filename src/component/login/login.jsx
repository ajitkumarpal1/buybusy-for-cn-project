import { Link } from "react-router-dom"

export const Login = () => {
    return (
    <div className="bg-blue-900 flex items-center justify-center h-screen text-white">
        <div className="w-full max-w-md">
            <div className="bg-blue-600 p-4 shadow-lg shadow-blue-950 rounded-3xl px-8 py-8 pt-8">
                <div className="px-4 pb-4">
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                </div>
                <form action="#">
                    <div className="px-4 pb-4">
                        <label htmlFor="email" className="text-sm block font-bold pb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-transparent border-b border-white focus:outline-none focus:border-blue-300 text-white placeholder-white w-full py-2 px-3 leading-tight  focus:shadow-outline"
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
                            className="bg-transparent border-b border-white focus:outline-none focus:border-blue-300 text-white placeholder-white w-full py-2 px-3 leading-tight  focus:shadow-outline"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="px-4 pb-4">
                        <label className="bloc font-bold">
                            <input className="mr-2 leading-tight" type="checkbox" />
                            <span className="text-sm">Remember Me</span>
                        </label>
                    </div>
                    <div className="px-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="button"
                        >
                            Login
                        </button>
                    </div>
                    <div className="px-4 pt-4 text-center">
                        <p className="text-sm text-blue-900">
                            Don't have an account?{" "} &nbsp;
                            <Link to="/signup" className="text-white hover:text-blue-700 font-bold underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>

    </div>)

} 