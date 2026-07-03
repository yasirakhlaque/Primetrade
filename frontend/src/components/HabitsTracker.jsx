import { useState, useEffect } from "react"
import { MdAdd, MdDelete, MdClose } from "react-icons/md"
import { FaFire, FaCheckCircle } from "react-icons/fa"
import { BiTargetLock } from "react-icons/bi"

export default function HabitsTracker() {
    const [habits, setHabits] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newHabit, setNewHabit] = useState({ name: "", target: 1, frequency: "daily" });

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('habits') || '[]');
        setHabits(saved);
    }, []);

    const saveHabits = (updated) => {
        localStorage.setItem('habits', JSON.stringify(updated));
        setHabits(updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const habit = {
            ...newHabit,
            id: Date.now(),
            streak: 0,
            completions: [],
            createdAt: new Date().toISOString()
        };
        saveHabits([...habits, habit]);
        setNewHabit({ name: "", target: 1, frequency: "daily" });
        setShowForm(false);
    };

    const toggleCompletion = (habitId) => {
        const today = new Date().toDateString();
        const updated = habits.map(habit => {
            if (habit.id === habitId) {
                const completions = habit.completions || [];
                const todayIndex = completions.findIndex(c => new Date(c).toDateString() === today);
                
                if (todayIndex >= 0) {
                    // Remove today's completion
                    return { ...habit, completions: completions.filter((_, i) => i !== todayIndex), streak: Math.max(0, habit.streak - 1) };
                } else {
                    // Add today's completion
                    return { ...habit, completions: [...completions, new Date().toISOString()], streak: (habit.streak || 0) + 1 };
                }
            }
            return habit;
        });
        saveHabits(updated);
    };

    const deleteHabit = (id) => {
        if (confirm("Delete this habit?")) {
            saveHabits(habits.filter(h => h.id !== id));
        }
    };

    const isCompletedToday = (habit) => {
        const today = new Date().toDateString();
        return (habit.completions || []).some(c => new Date(c).toDateString() === today);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <BiTargetLock className="text-emerald-400" />
                    Habit Tracker
                </h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all flex items-center gap-2"
                >
                    {showForm ? <MdClose /> : <MdAdd />}
                    {showForm ? 'Cancel' : 'New Habit'}
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-xl border border-emerald-500/10 rounded-2xl p-6 space-y-4">
                    <input
                        type="text"
                        placeholder="Habit name (e.g., Exercise, Read, Meditate)"
                        value={newHabit.name}
                        onChange={(e) => setNewHabit({...newHabit, name: e.target.value})}
                        className="w-full bg-slate-800/50 border border-emerald-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Daily target"
                            value={newHabit.target}
                            onChange={(e) => setNewHabit({...newHabit, target: parseInt(e.target.value)})}
                            min="1"
                            className="bg-slate-800/50 border border-emerald-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <select
                            value={newHabit.frequency}
                            onChange={(e) => setNewHabit({...newHabit, frequency: e.target.value})}
                            className="bg-slate-800/50 border border-emerald-500/30 rounded-lg px-4 py-3 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-3 bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all font-semibold"
                    >
                        Create Habit
                    </button>
                </form>
            )}

            {/* Habits List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {habits.map(habit => {
                    const completed = isCompletedToday(habit);
                    return (
                        <div
                            key={habit.id}
                            className={`bg-slate-900/50 backdrop-blur-xl border ${completed ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-slate-700/50'} rounded-2xl p-6 hover:scale-105 transition-transform`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-white mb-1">{habit.name}</h3>
                                    <p className="text-sm text-gray-400 capitalize">{habit.frequency} • Target: {habit.target}x</p>
                                </div>
                                <button
                                    onClick={() => deleteHabit(habit.id)}
                                    className="text-red-400 hover:text-red-300"
                                >
                                    <MdDelete size={20} />
                                </button>
                            </div>

                            {/* Streak */}
                            <div className="flex items-center gap-2 mb-4">
                                <FaFire className="text-orange-500" />
                                <span className="text-white font-bold">{habit.streak || 0}</span>
                                <span className="text-gray-400 text-sm">day streak</span>
                            </div>

                            {/* Check Button */}
                            <button
                                onClick={() => toggleCompletion(habit.id)}
                                className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                                    completed
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                        : 'bg-slate-800/50 text-gray-400 border border-slate-700 hover:border-emerald-500/30'
                                }`}
                            >
                                <FaCheckCircle />
                                {completed ? 'Completed Today!' : 'Mark as Done'}
                            </button>
                        </div>
                    );
                })}
            </div>

            {habits.length === 0 && !showForm && (
                <div className="text-center py-12 text-gray-500">
                    No habits yet. Start building better habits today!
                </div>
            )}
        </div>
    );
}
