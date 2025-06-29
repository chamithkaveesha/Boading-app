import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signupUser } from "../api/auth"; // Import API function
import { useState } from "react";
import { useNavigate ,Link} from "react-router-dom"; // Import useNavigate

const schema = yup.object().shape({
    name: yup.string().min(3, "Name must be at least 3 characters").max(50, "Name must be less than 50 characters").required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], "Passwords must match")
        .required("Please confirm your password"),
});

function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate(); // Initialize the navigate function

    const onSubmit = async (data) => {
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await signupUser(data); // Call the API to create an account
            setSuccess("Account created successfully!");
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (err) {
            setError(err.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-green-50 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-black to-green-700 px-8 py-6">
                        <h2 className="text-2xl font-bold text-white text-center">Create Account</h2>
                        <p className="text-green-100 text-center mt-2 text-sm">Join us to get started</p>
                    </div>
                    
                    {/* Form Section */}
                    <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">
                                {success}
                            </div>
                        )}

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                <input 
                                    {...register("name")} 
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none" 
                                    placeholder="Enter your full name"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>}
                            </div>
                            
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
                                    placeholder="Create a password"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                                <input 
                                    {...register("confirmPassword")} 
                                    type="password" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none" 
                                    placeholder="Confirm your password"
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-2">{errors.confirmPassword.message}</p>}
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
                                    Creating account...
                                </span>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                        
                        <div className="text-center mt-6">
                            <p className="text-gray-600 text-sm">
                                Already have an account?{" "}
                                <Link 
                                    to="/login" 
                                    className="text-green-700 hover:text-green-800 font-semibold hover:underline transition duration-200"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
