import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUser } from "../api/auth"; 
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
// import useStore  from "../components/useStore";


const schema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const onSubmit = async (data) => {
        setLoading(true);
        setError("");
    
        try {
            const response = await loginUser(data); // Call login API
            sessionStorage.setItem("token", response.token); // Store JWT token
            // useStore.getState().triggerUpdate();
            setTimeout(() => {
                navigate("/dashboardAdmin"); // Redirect to dashboard after login
            }, 1000);
            
            
            // Redirect to dashboard after login
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-green-50 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-black to-green-700 px-8 py-6">
                        <h2 className="text-2xl font-bold text-white text-center">Welcome Back</h2>
                        <p className="text-green-100 text-center mt-2 text-sm">Sign in to your account</p>
                    </div>
                    
                    {/* Form Section */}
                    <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                <input 
                                    {...register("email")} 
                                    type="email" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none" 
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                <input 
                                    {...register("password")} 
                                    type="password" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none" 
                                    placeholder="Enter your password"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full mt-8 bg-gradient-to-r from-black to-green-700 text-white py-3 rounded-lg font-semibold hover:from-gray-800 hover:to-green-800 transform hover:scale-[1.02] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                        
                        <div className="text-center mt-6">
                            <p className="text-gray-600 text-sm">
                                Don't have an account?{" "}
                                <Link 
                                    to="/signup" 
                                    className="text-green-700 hover:text-green-800 font-semibold hover:underline transition duration-200"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
