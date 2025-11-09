import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MdEmail } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { LuSparkles } from "react-icons/lu";
import { FaUser } from "react-icons/fa"

export default function SignUp() {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    useEffect(() => {
        const ValidateUser = () => {
            const token = localStorage.getItem('token')
            if (token) navigate("/")
        }
        ValidateUser()
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setUsernameError("");
        setEmailError("");
        setPasswordError("");
    }

    const handleValid = () => {
        if (!formData.email.includes("@")) {
            setEmailError("Please enter a valid email address");
            return false;
        }
        if (!formData.username.trim()) {
            setUsernameError("Please enter a username");
            return false;
        }
        if (!formData.password) {
            setPasswordError("Please enter a password");
            return false;
        }
        if (formData.password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            return false;
        }
        return true;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        setUsernameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");

        const isValid = handleValid();
        if (!isValid) return;

        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('🎉 Congratulations! Registered successfully.');
                setTimeout(() => navigate('/login'), 1500);
            } else {
                if (response.status === 400) {
                    setEmailError(data.message || "Invalid input");
                } else {
                    setEmailError(data.message || "Signup failed");
                }
            }
        } catch (error) {
            console.error("SignUp error:", error);
            setEmailError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col justify-center items-center overflow-hidden">
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

            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-8 sm:p-10">
                    <div className="flex flex-col items-center gap-4 mb-8">
                        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-4 shadow-lg shadow-cyan-500/30">
                            <LuSparkles size={32} className="text-white" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Welcome
                        </h1>
                        <p className="text-gray-400 text-sm">Sign Up to access your dashboard</p>
                    </div>

                    {successMessage.length > 0 && <p className="text-green-600 bg-green-400/10 backdrop-blur-2xl border border-green-600 p-2 rounded-lg">{successMessage}</p>}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="username" className="block text-white text-sm font-medium mb-2">Username</label>
                            <div className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 flex justify-between">
                                <input type="text"
                                    name="username"
                                    id="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="John Doe" className="w-full outline-none"
                                    required
                                />
                                <FaUser size={20} className="text-gray-400" />
                            </div>
                            {usernameError && <p className="text-red-500 text-sm mt-2">{usernameError}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                                Email
                            </label>
                            <div className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 flex justify-between">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full outline-none"
                                    required
                                />
                                <MdEmail size={20} className="text-gray-400" />
                            </div>
                            {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                                Password
                            </label>
                            <div className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 flex justify-between">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full outline-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 focus:outline-none">
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible size={20} />
                                    ) : (
                                        <AiOutlineEye size={20} />
                                    )}
                                </button>
                            </div>
                            {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-white text-sm font-medium mb-2">
                                Confirm Password
                            </label>
                            <div className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 flex justify-between">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full outline-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="text-gray-400 focus:outline-none">
                                    {showConfirmPassword ? (
                                        <AiOutlineEyeInvisible size={20} />
                                    ) : (
                                        <AiOutlineEye size={20} />
                                    )}
                                </button>
                            </div>
                            {confirmPasswordError && <p className="text-red-500 text-sm mt-2">{confirmPasswordError}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Registering..." : "Sign Up"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{" "}
                            <button
                                onClick={() => navigate("/login")}
                                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                            >
                                Sign In
                            </button>
                        </p>
                    </div>
                </div>
            </div>

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