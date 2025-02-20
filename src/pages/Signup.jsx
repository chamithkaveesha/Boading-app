import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signupUser } from "../api/auth"; // Import API function
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const schema = yup.object().shape({
    name: yup.string().min(3).max(50).required("Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(6).required("Password is required"),
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
        <div className="flex items-center justify-center mt-10">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4">Sign Up</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error.message}</p>}
                {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

                <div className="mb-4">
                    <label className="block text-sm font-medium">Name</label>
                    <input {...register("name")} className="w-full px-3 py-2 border rounded" />
                    <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <input {...register("email")} type="email" className="w-full px-3 py-2 border rounded" />
                    <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Password</label>
                    <input {...register("password")} type="password" className="w-full px-3 py-2 border rounded" />
                    <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded" disabled={loading}>
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
}

export default Signup;
