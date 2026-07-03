import { useState, useEffect } from "react"
import { FaTasks, FaCheckCircle, FaClock, FaFire } from "react-icons/fa"
import { MdTrendingUp } from "react-icons/md"
import { BiTargetLock } from "react-icons/bi"

export default function Overview({ user }) {
    const [stats, setStats] = useState({
        tasksCompleted: 0,
        totalTasks: 0,
        habitsStreak: 0,
        notesCount: 0
    });

    useEffect(() => {
        // Fetch stats from localStorage or API
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const habits = JSON.parse(localStorage.getItem('habits') || '[]');
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        
        setStats({
            tasksCompleted: tasks.filter(t => t.status === 'completed').length,
            totalTasks: tasks.length,
            habitsStreak: habits.filter(h => h.streak > 0).length,
            notesCount: notes.length
        });
    }, []);

    const statCards = [
        {
            title: 'Total Tasks',
            value: stats.totalTasks,
            icon: <FaTasks />,
            color: 'from-emerald-500 to-green-600',
            bgColor: 'bg-emerald-500/10',
            borderColor: 'border-emerald-500/30'
        },
        {
            title: 'Completed Today',
            value: stats.tasksCompleted,
            icon: <FaCheckCircle />,
            color: 'from-green-500 to-teal-600',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/30'
        },
        {
            title: 'Active Habits',
            value: stats.habitsStreak,
            icon: <FaFire />,
            color: 'from-orange-500 to-red-600',
            bgColor: 'bg-orange-500/10',
            borderColor: 'border-orange-500/30'
        },
        {
            title: 'Quick Notes',
            value: stats.notesCount,
            icon: <BiTargetLock />,
            color: 'from-purple-500 to-pink-600',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/30'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-linear-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Welcome back, {user?.username}! 🎉
                </h2>
                <p className="text-gray-300">
                    Here's your productivity overview for today. Keep up the great work!
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, index) => (
                    <div
                        key={index}
                        className={`${card.bgColor} backdrop-blur-xl border ${card.borderColor} rounded-2xl p-6 hover:scale-105 transition-transform`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 bg-linear-to-br ${card.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                                {card.icon}
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm mb-1">{card.title}</p>
                            <p className="text-3xl font-bold text-white">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-emerald-500/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <FaClock className="text-emerald-400" />
                        Recent Activity
                    </h3>
                    <div className="space-y-3">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-white text-sm">Task completed</p>
                                    <p className="text-gray-500 text-xs">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress Chart */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-emerald-500/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <MdTrendingUp className="text-emerald-400" />
                        Weekly Progress
                    </h3>
                    <div className="space-y-3">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-gray-400 text-sm w-12">{day}</span>
                                <div className="flex-1 bg-slate-800/50 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-linear-to-r from-emerald-500 to-green-600 h-full rounded-full"
                                        style={{ width: `${Math.random() * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
