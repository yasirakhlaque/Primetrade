import { useNavigate } from "react-router-dom"
import { FaRocket, FaTasks, FaCalendar, FaChartLine, FaStickyNote, FaCheckCircle } from "react-icons/fa"
import { MdDashboard, MdTrendingUp } from "react-icons/md"
import { BiTargetLock } from "react-icons/bi"

export default function Landing() {
    const navigate = useNavigate();

    const features = [
        {
            icon: <FaTasks />,
            title: "Task Management",
            description: "Organize your daily tasks with smart categorization and priority tracking."
        },
        {
            icon: <FaCalendar />,
            title: "Calendar & Events",
            description: "Never miss an important date with our intuitive calendar system."
        },
        {
            icon: <BiTargetLock />,
            title: "Habit Tracking",
            description: "Build better habits with daily tracking and streak monitoring."
        },
        {
            icon: <FaChartLine />,
            title: "Finance Manager",
            description: "Track your expenses and income to achieve your financial goals."
        },
        {
            icon: <FaStickyNote />,
            title: "Quick Notes",
            description: "Capture ideas instantly with our lightning-fast note-taking system."
        },
        {
            icon: <MdTrendingUp />,
            title: "Progress Analytics",
            description: "Visualize your productivity with beautiful charts and insights."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 relative overflow-hidden">
            {/* Animated background orbs */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full blur-3xl w-96 h-96 -top-20 -left-20"
                style={{
                    background: "radial-gradient(circle at 30% 30%, rgba(16,185,129,0.3), rgba(5,150,105,0.1))",
                    animation: "float 8s ease-in-out infinite"
                }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full blur-3xl w-96 h-96 -bottom-20 -right-20"
                style={{
                    background: "radial-gradient(circle at 70% 70%, rgba(52,211,153,0.25), rgba(16,185,129,0.1))",
                    animation: "float 10s ease-in-out infinite reverse"
                }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full blur-3xl w-64 h-64 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                    background: "radial-gradient(circle, rgba(34,197,94,0.15), transparent)",
                    animation: "pulse 6s ease-in-out infinite"
                }}
            />

            {/* Navigation */}
            <nav className="relative z-10 flex justify-between items-center px-6 md:px-12 py-6">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-lg flex items-center justify-center">
                        <MdDashboard className="text-white text-xl" />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                        PrimeTrade
                    </h1>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="px-6 py-2 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all shadow-lg shadow-emerald-500/30"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-32">
                <div className="text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium">
                        <FaRocket className="text-emerald-400" />
                        <span>Your Personal Productivity Hub</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        <span className="block text-white">PrimeTrade is Your Life</span>
                        <span className="block bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                            Evolved for Productivity
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        PrimeTrade is a comprehensive platform designed to supercharge your daily life. 
                        Manage tasks, track habits, monitor finances, and achieve your goals — all in one beautiful interface.
                    </p>

                    <div className="flex gap-4 justify-center pt-4">
                        <button
                            onClick={() => navigate('/signup')}
                            className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all shadow-xl shadow-emerald-500/30 flex items-center gap-2"
                        >
                            Start Free Today
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-emerald-500/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
                        >
                            View Demo
                        </button>
                    </div>

                    {/* Social proof */}
                    <div className="flex items-center justify-center gap-8 pt-12">
                        <div className="flex -space-x-2">
                            {[1,2,3,4,5].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 border-2 border-slate-950 flex items-center justify-center text-white font-semibold text-sm">
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                        </div>
                        <div className="text-left">
                            <div className="flex items-center gap-1 text-emerald-400">
                                {[1,2,3,4,5].map(i => <FaCheckCircle key={i} className="w-4 h-4" />)}
                            </div>
                            <p className="text-sm text-gray-400 mt-1">Trusted by 10,000+ users</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Everything You Need, One Platform
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Powerful features to help you stay organized and productive
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 bg-slate-900/50 backdrop-blur-xl border border-emerald-500/10 rounded-2xl hover:border-emerald-500/30 transition-all duration-300 hover:transform hover:-translate-y-2"
                        >
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-green-600/20 rounded-xl flex items-center justify-center text-emerald-400 text-2xl mb-4 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 pb-32">
                <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-12 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Ready to Transform Your Life?
                    </h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Join thousands of users who are already achieving more every day.
                    </p>
                    <button
                        onClick={() => navigate('/signup')}
                        className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all shadow-xl shadow-emerald-500/30 text-lg"
                    >
                        Get Started — It's Free
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 border-t border-emerald-500/10 py-8">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center text-gray-500 text-sm">
                    <p>© 2025 PrimeTrade. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
                        <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-20px) scale(1.05); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }
            `}</style>
        </div>
    );
}
