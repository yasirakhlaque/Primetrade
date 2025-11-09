import { MdOutlineLogout, MdCheckCircle } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { FaUser, FaImage } from "react-icons/fa"
import { useEffect, useState } from "react"
import TaskManager from "../components/TaskManager"

export default function Dashboard() {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return navigate("/login");
            try {
                const response = await fetch(`${API_URL}/auth/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        return navigate("/login");
                    }
                    throw new Error(`Failed to fetch profile: ${response.status}`);
                }
                const data = await response.json();
                setUser(data.user);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

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
        }
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading your dashboard...
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col justify-center items-center overflow-hidden p-8 gap-4">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full blur-3xl transform-gpu
                           w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96
                           -top-16 -left-16 sm:-top-24 sm:-left-8 md:-top-10 md:-left-20"
                style={{
                    background: "radial-gradient(circle at 30% 30%, rgba(6,182,212,0.25), rgba(125,211,252,0.05))",
                    opacity: 0.8,
                    animation: "float 8s ease-in-out infinite, softPulse 5s ease-in-out infinite"
                }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full blur-3xl transform-gpu
                           w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96
                           -bottom-16 -right-16 sm:-bottom-24 sm:-right-8 md:-bottom-10 md:-right-20"
                style={{
                    background: "radial-gradient(circle at 70% 70%, rgba(139,92,246,0.22), rgba(168,85,247,0.05))",
                    opacity: 0.75,
                    animation: "float 10s ease-in-out infinite reverse, softPulse 6s ease-in-out infinite"
                }}
            />
            <div className="flex justify-between items-center w-full">
                <div>
                    <h1 className="text-3xl md:text-4xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-bold">Dashboard</h1>
                    <p className="text-gray-400 font-medium text-xs sm:text-sm">Hi {user.username}! Welcome to your dashboard</p>
                </div>
                <button className="text-xs sm:text-sm text-nowrap bg-transparent text-red-500 border border-red-500 rounded-lg px-4 py-2 flex gap-2 items-center font-semibold hover:bg-gray-200/10 transition-all duration-300"
                    onClick={handleLogout}>Log out <MdOutlineLogout /> </button>
            </div>
            <div className="relative z-10 w-full mx-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Section */}
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-8 sm:p-10">
                    <h2 className="text-lg md:text-xl font-bold mb-4 flex gap-2 items-center text-white">
                        <span className="text-white p-2 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-500">
                            <FaUser />
                        </span>
                        Profile Information
                    </h2>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-white text-xs sm:text-sm font-medium mb-2">Username</label>
                            <div className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 sm:py-3 text-white placeholder-gray-500 flex items-center gap-2 text-xs sm:text-sm">
                                <FaUser size={18} className="text-gray-400" />
                                <input type="text"
                                    name="username"
                                    id="username"
                                    value={user.username}
                                    onChange={handleChange}
                                    className="w-full outline-none bg-transparent"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="avatarUrl" className="block text-white text-xs sm:text-sm font-medium mb-2">Avatar URL</label>
                            <div className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 sm:py-3 text-white placeholder-gray-500 flex items-center gap-2 text-xs sm:text-sm">
                                <FaImage size={18} className="text-gray-400" />
                                <input type="url"
                                    name="avatarUrl"
                                    id="avatarUrl"
                                    value={user.avatarUrl || ""}
                                    onChange={handleChange}
                                    placeholder="https://example.com/avatar.jpg"
                                    className="w-full outline-none bg-transparent"
                                />
                            </div>
                            {user.avatarUrl && (
                                <div className="mt-2">
                                    <img src={user.avatarUrl} alt="Avatar preview" className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500" />
                                </div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="bio" className="block text-white text-xs sm:text-sm font-medium mb-2">Bio</label>
                            <textarea
                                name="bio"
                                id="bio"
                                value={user.bio || ""}
                                onChange={handleChange}
                                placeholder="Tell us about yourself..."
                                rows="3"
                                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 sm:py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-500 text-xs sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-white text-xs sm:text-sm font-medium mb-2">Email (Read-only)</label>
                            <div className="w-full bg-slate-700/30 border border-slate-600/50 rounded-lg px-4 py-2 sm:py-3 text-gray-400 flex items-center gap-2 cursor-not-allowed text-xs sm:text-sm">
                                <MdCheckCircle size={18} className="text-gray-500" />
                                <input type="email"
                                    name="email"
                                    id="email"
                                    value={user.email}
                                    className="w-full outline-none bg-transparent cursor-not-allowed"
                                    disabled
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 text-xs sm:text-sm"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>

                {/* Task Management Section */}
                <TaskManager />
            </div>

            {/* Animations */}
            <style>{`
                @keyframes float {
                    0% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-20px) scale(1.05); }
                    100% { transform: translateY(0) scale(1); }
                }
                @keyframes softPulse {
                    0% { opacity: 0.6; }
                    50% { opacity: 0.9; }
                    100% { opacity: 0.6; }
                }
            `}</style>
        </div>
    )
}