import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MdDashboard, MdLogout, MdMenu, MdClose } from "react-icons/md"
import { FaTasks, FaCalendar, FaChartLine, FaStickyNote, FaUser, FaCog } from "react-icons/fa"
import { BiTargetLock } from "react-icons/bi"
import { RiMoneyDollarCircleLine } from "react-icons/ri"

// Import feature components
import TaskManager from "../components/TaskManager"
import NotesManager from "../components/NotesManager"
import HabitsTracker from "../components/HabitsTracker"
import FinanceTracker from "../components/FinanceTracker"
import CalendarView from "../components/CalendarView"
import Overview from "../components/Overview"
import ProfileSettings from "../components/ProfileSettings"

export default function DashboardNew() {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeView, setActiveView] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false); // Hidden by default on mobile
    const [sidebarExpanded, setSidebarExpanded] = useState(true); // Expanded by default on desktop

    const menuItems = [
        { id: 'overview', name: 'Overview', icon: <MdDashboard /> },
        { id: 'tasks', name: 'Tasks', icon: <FaTasks /> },
        { id: 'calendar', name: 'Calendar', icon: <FaCalendar /> },
        { id: 'habits', name: 'Habits', icon: <BiTargetLock /> },
        { id: 'finance', name: 'Finance', icon: <RiMoneyDollarCircleLine /> },
        { id: 'notes', name: 'Notes', icon: <FaStickyNote /> },
        { id: 'analytics', name: 'Analytics', icon: <FaChartLine /> },
        { id: 'profile', name: 'Profile', icon: <FaUser /> },
    ];

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
        navigate("/");
    };

    const renderContent = () => {
        switch(activeView) {
            case 'overview': return <Overview user={user} />;
            case 'tasks': return <TaskManager />;
            case 'calendar': return <CalendarView />;
            case 'habits': return <HabitsTracker />;
            case 'finance': return <FinanceTracker />;
            case 'notes': return <NotesManager />;
            case 'analytics': return <div className="text-white text-center py-12">Analytics Coming Soon</div>;
            case 'profile': return <ProfileSettings user={user} setUser={setUser} />;
            default: return <Overview user={user} />;
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center">
                <div className="text-emerald-400 text-xl">Loading your dashboard...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-emerald-950 to-slate-950 relative overflow-hidden">
            {/* Animated background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full blur-3xl w-96 h-96 -top-20 -left-20"
                style={{
                    background: "radial-gradient(circle, rgba(16,185,129,0.15), transparent)",
                    animation: "float 8s ease-in-out infinite"
                }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full blur-3xl w-96 h-96 -bottom-20 -right-20"
                style={{
                    background: "radial-gradient(circle, rgba(52,211,153,0.15), transparent)",
                    animation: "float 10s ease-in-out infinite reverse"
                }}
            />

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Floating Rounded Sidebar - Fixed Position */}
            <aside className={`
                fixed top-6 left-6 bottom-6 z-50
                bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl
                border border-emerald-500/20
                flex flex-col overflow-hidden
                transition-all duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-[340px] lg:translate-x-0'}
                ${sidebarExpanded ? 'w-72' : 'w-20 lg:w-20'}
            `}>
                {/* Toggle Button - Desktop Only */}
                <div className="hidden lg:flex absolute -right-3 top-8 z-10">
                    <button
                        onClick={() => setSidebarExpanded(!sidebarExpanded)}
                        className="w-6 h-6 bg-emerald-500 hover:bg-emerald-600 rounded-full shadow-lg flex items-center justify-center transition-all"
                    >
                        {sidebarExpanded ? 
                            <MdClose className="text-white text-sm" /> : 
                            <MdMenu className="text-white text-sm" />
                        }
                    </button>
                </div>

                {/* User Profile Section */}
                <div className="p-6 border-b border-emerald-500/10">
                    {sidebarExpanded ? (
                        <div className="flex items-center gap-3">
                            {user.avatarUrl ? (
                                <img 
                                    src={user.avatarUrl} 
                                    alt={user.username}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                                />
                            ) : (
                                <div className="w-12 h-12 bg-linear-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">
                                        {user.username?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                </div>
                            )}
                            <div className="flex-1">
                                <p className="text-white font-semibold text-sm">{user.username}</p>
                                <p className="text-emerald-400 text-xs flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            {user.avatarUrl ? (
                                <img 
                                    src={user.avatarUrl} 
                                    alt={user.username}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
                                />
                            ) : (
                                <div className="w-10 h-10 bg-linear-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold">
                                        {user.username?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveView(item.id);
                                    if (window.innerWidth < 1024) setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                    activeView === item.id
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                        : 'text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10'
                                } ${!sidebarExpanded ? 'justify-center' : ''}`}
                                title={!sidebarExpanded ? item.name : ''}
                            >
                                <span className="text-xl">{item.icon}</span>
                                {sidebarExpanded && <span className="font-medium">{item.name}</span>}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-emerald-500/10">
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all border border-red-500/20 hover:border-red-500/30 ${!sidebarExpanded ? 'justify-center' : ''}`}
                        title={!sidebarExpanded ? 'Logout' : ''}
                    >
                        <MdLogout className="text-xl" />
                        {sidebarExpanded && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Floating Menu Button - Mobile */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-6 right-6 z-50 w-12 h-12 bg-emerald-500 hover:bg-emerald-600 rounded-full shadow-lg flex items-center justify-center transition-all"
            >
                {sidebarOpen ? <MdClose className="text-white text-2xl" /> : <MdMenu className="text-white text-2xl" />}
            </button>

            {/* Main Content */}
            <main className={`min-h-screen transition-all duration-300 ${sidebarExpanded ? 'lg:ml-80 lg:pl-8' : 'lg:ml-28 lg:pl-8'}`}>
                <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {menuItems.find(item => item.id === activeView)?.name || 'Dashboard'}
                        </h1>
                        <p className="text-gray-400">Welcome back, {user.username}!</p>
                    </div>

                    {/* Content Area */}
                    <div className="relative z-10">
                        {renderContent()}
                    </div>
                </div>
            </main>

            {/* Animations */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-20px) scale(1.05); }
                }
            `}</style>
        </div>
    );
}