import { useGlobalState } from "../context/GlobalState";
import { useState, useRef } from "react";
import user from '../assets/user.svg';
import { useToast } from "../components/ToastProvider";

function Account(){
    const { user: globalUser } = useGlobalState();
    const { showSuccess, showError, showWarning, showInfo } = useToast();
    const [isEditing, setIsEditing] = useState({
        name: false,
        email: false,
        password: false
    });
    const [formData, setFormData] = useState({
        name: globalUser?.name || "John Doe",
        email: globalUser?.email || "john.doe@example.com",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleEdit = (field) => {
        setIsEditing(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (field) => {
        // Here you would typically make an API call to update the user data
        showSuccess(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
        setIsEditing(prev => ({
            ...prev,
            [field]: false
        }));
    };

    const handlePasswordSave = () => {
        if (formData.newPassword !== formData.confirmPassword) {
            showError("New passwords don't match! Please check and try again.");
            return;
        }
        // Here you would typically make an API call to update the password
        showSuccess("Password updated successfully!");
        setFormData(prev => ({
            ...prev,
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        }));
        setIsEditing(prev => ({
            ...prev,
            password: false
        }));
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            // Here you would typically make an API call to delete the account
            showInfo("Account deletion process initiated. Please check your email for further instructions.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Account Settings</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Picture Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-100">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Profile Picture</h2>
                            <div className="flex flex-col items-center">
                                <div className="relative mb-4">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-400 to-green-600 p-1">
                                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                            {profileImage ? (
                                                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <img src={user} alt="Default Avatar" className="w-16 h-16" />
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute bottom-0 right-0 bg-gradient-to-r from-green-500 to-green-600 text-white p-2 rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <p className="text-gray-600 text-sm text-center">
                                    Click the + button to upload a new profile picture
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Account Details Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-100">
                            <div className="bg-gradient-to-r from-black to-green-700 -m-6 mb-6 p-6 rounded-t-2xl">
                                <h2 className="text-2xl font-semibold text-white">Account Details</h2>
                            </div>
                            
                            {/* Name Section */}
                            <div className="mb-6">
                                <label className="block text-green-700 text-sm font-medium mb-2">Full Name</label>
                                <div className="flex items-center space-x-3">
                                    {isEditing.name ? (
                                        <>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            />
                                            <button
                                                onClick={() => handleSave('name')}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => handleEdit('name')}
                                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <span className="flex-1 text-gray-800 text-lg">{formData.name}</span>
                                            <button
                                                onClick={() => handleEdit('name')}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                            >
                                                Edit
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Email Section */}
                            <div className="mb-6">
                                <label className="block text-green-700 text-sm font-medium mb-2">Email Address</label>
                                <div className="flex items-center space-x-3">
                                    {isEditing.email ? (
                                        <>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            />
                                            <button
                                                onClick={() => handleSave('email')}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => handleEdit('email')}
                                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <span className="flex-1 text-gray-800 text-lg">{formData.email}</span>
                                            <button
                                                onClick={() => handleEdit('email')}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                            >
                                                Edit
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Password Section */}
                            <div className="mb-8">
                                <label className="block text-green-700 text-sm font-medium mb-2">Password</label>
                                {isEditing.password ? (
                                    <div className="space-y-3">
                                        <input
                                            type="password"
                                            placeholder="Current Password"
                                            value={formData.currentPassword}
                                            onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            value={formData.newPassword}
                                            onChange={(e) => handleInputChange('newPassword', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <input
                                            type="password"
                                            placeholder="Confirm New Password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={handlePasswordSave}
                                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                                            >
                                                Update Password
                                            </button>
                                            <button
                                                onClick={() => handleEdit('password')}
                                                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <span className="flex-1 text-gray-800 text-lg">••••••••••••</span>
                                        <button
                                            onClick={() => handleEdit('password')}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                        >
                                            Change Password
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Danger Zone */}
                            <div className="border-t border-red-200 pt-6">
                                <h3 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h3>
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <p className="text-red-700 mb-4">
                                        Once you delete your account, there is no going back. Please be certain.
                                    </p>
                                    <button
                                        onClick={handleDeleteAccount}
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg"
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Account;


