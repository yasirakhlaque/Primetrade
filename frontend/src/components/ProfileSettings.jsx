import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaUser, FaImage } from "react-icons/fa"
import { MdCheckCircle } from "react-icons/md"

export default function ProfileSettings({ user, setUser }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return navigate('/login');
        
        try {
            const response = await fetch(`${API_URL}/auth/profile/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    username: user.username, 
                    bio: user.bio, 
                    avatarUrl: user.avatarUrl 
                }),
            });
            
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    return navigate('/login');
                }
                throw new Error('Failed to update profile');
            }
            
            const updated = await response.json();
            setUser(updated.user || user);
            localStorage.setItem('user', JSON.stringify(updated.user || user));
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error in profile update:", error);
            alert("Failed to update profile. Please try again.");
        }
    };

    if (!user) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="max-w-2xl">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-emerald-500/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <FaUser className="text-emerald-400" />
                    Profile Settings
                </h2>

                <form onSubmit={handleProfileUpdate} className="space-y-6">
                    {/* Avatar Preview */}
                    {user.avatarUrl && (
                        <div className="flex justify-center">
                            <img 
                                src={user.avatarUrl} 
                                alt="Avatar" 
                                className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500"
                            />
                        </div>
                    )}

                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-white text-sm font-medium mb-2">
                            Username
                        </label>
                        <div className="flex items-center gap-3 bg-slate-800/50 border border-emerald-500/30 rounded-lg px-4 py-3">
                            <FaUser className="text-gray-400" />
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={user.username}
                                onChange={handleChange}
                                className="flex-1 bg-transparent text-white outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Email (Read-only) */}
                    <div>
                        <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                            Email (Read-only)
                        </label>
                        <div className="flex items-center gap-3 bg-slate-800/30 border border-slate-600/50 rounded-lg px-4 py-3 cursor-not-allowed">
                            <MdCheckCircle className="text-gray-500" />
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={user.email}
                                className="flex-1 bg-transparent text-gray-500 outline-none cursor-not-allowed"
                                disabled
                            />
                        </div>
                    </div>

                    {/* Avatar URL */}
                    <div>
                        <label htmlFor="avatarUrl" className="block text-white text-sm font-medium mb-2">
                            Avatar URL
                        </label>
                        <div className="flex items-center gap-3 bg-slate-800/50 border border-emerald-500/30 rounded-lg px-4 py-3">
                            <FaImage className="text-gray-400" />
                            <input
                                type="url"
                                name="avatarUrl"
                                id="avatarUrl"
                                value={user.avatarUrl || ""}
                                onChange={handleChange}
                                placeholder="https://example.com/avatar.jpg"
                                className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label htmlFor="bio" className="block text-white text-sm font-medium mb-2">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            id="bio"
                            value={user.bio || ""}
                            onChange={handleChange}
                            placeholder="Tell us about yourself..."
                            rows="4"
                            className="w-full bg-slate-800/50 border border-emerald-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-linear-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}
