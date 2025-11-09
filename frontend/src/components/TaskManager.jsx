import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MdEdit, MdDelete, MdAdd, MdClose } from "react-icons/md"
import { FaTasks } from "react-icons/fa"
import { BiTask } from "react-icons/bi"
import { LuCircleArrowDown } from "react-icons/lu"

export default function TaskManager() {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        status: "pending",
        type: "medium"
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            const response = await fetch(`${API_URL}/tasks/get-tasks`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                setTasks(data);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleTaskChange = (e) => {
        const { name, value } = e.target;
        if (editingTask) {
            setEditingTask(prev => ({ ...prev, [name]: value }));
        } else {
            setNewTask(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return navigate('/login');
        try {
            const response = await fetch(`${API_URL}/tasks/create-task`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newTask),
            });
            if (response.ok) {
                const data = await response.json();
                setTasks([...tasks, data.task]);
                setNewTask({ title: "", description: "", status: "pending", type: "medium" });
                setShowTaskForm(false);
            }
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token || !editingTask) return;
        try {
            const response = await fetch(`${API_URL}/tasks/update-task/${editingTask._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: editingTask.title,
                    description: editingTask.description,
                    status: editingTask.status,
                    type: editingTask.type
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setTasks(tasks.map(t => t._id === editingTask._id ? data.task : t));
                setEditingTask(null);
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        const token = localStorage.getItem("token");
        if (!token) return;
        if (!confirm("Are you sure you want to delete this task?")) return;
        try {
            const response = await fetch(`${API_URL}/tasks/delete-task/${taskId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                setTasks(tasks.filter(t => t._id !== taskId));
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "completed": return "bg-green-500/20 text-green-400 border-green-500";
            case "in-progress": return "bg-blue-500/20 text-blue-400 border-blue-500";
            default: return "bg-yellow-500/20 text-yellow-400 border-yellow-500";
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case "hard": return "bg-red-500/20 text-red-400 border-red-500";
            case "medium": return "bg-orange-500/20 text-orange-400 border-orange-500";
            default: return "bg-green-500/20 text-green-400 border-green-500";
        }
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-8 sm:p-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg md:text-xl font-bold flex gap-2 items-center text-white">
                    <span className="text-white p-2 rounded-lg bg-gradient-to-tr from-purple-400 to-pink-500">
                        <FaTasks />
                    </span>
                    My Tasks
                </h2>
                <button
                    onClick={() => setShowTaskForm(!showTaskForm)}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white p-2 rounded-lg transition-all"
                >
                    {showTaskForm ? <MdClose size={20} /> : <MdAdd size={20} />}
                </button>
            </div>

            {/* Create Task Form */}
            {showTaskForm && (
                <form onSubmit={handleCreateTask} className="mb-6 space-y-3 bg-slate-700/30 p-4 rounded-lg border border-slate-600 text-xs sm:text-sm">
                    <input
                        type="text"
                        name="title"
                        value={newTask.title}
                        onChange={handleTaskChange}
                        placeholder="Task title"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                    <textarea
                        name="description"
                        value={newTask.description}
                        onChange={handleTaskChange}
                        placeholder="Task description"
                        rows="2"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <select
                            name="status"
                            value={newTask.status}
                            onChange={handleTaskChange}
                            className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <select
                            name="type"
                            value={newTask.type}
                            onChange={handleTaskChange}
                            className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-2 rounded-lg transition-all text-xs sm:text-sm"
                    >
                        Create Task
                    </button>
                </form>
            )}

            {/* Task List */}
            <div className="space-y-3 max-h-140 overflow-y-auto">
                {tasks.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        <BiTask size={48} className="mx-auto mb-2 opacity-50" />
                        <p>No tasks yet. Create your first task!</p>
                    </div>
                ) : (
                    tasks.map(task => (
                        <div key={task._id} className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
                            {editingTask && editingTask._id === task._id ? (
                                <form onSubmit={handleUpdateTask} className="space-y-3">
                                    <input
                                        type="text"
                                        name="title"
                                        value={editingTask.title}
                                        onChange={handleTaskChange}
                                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500"
                                        required
                                    />
                                    <textarea
                                        name="description"
                                        value={editingTask.description}
                                        onChange={handleTaskChange}
                                        rows="2"
                                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500"
                                    />
                                    <div className="grid grid-cols-2 gap-2">
                                        <select
                                            name="status"
                                            value={editingTask.status}
                                            onChange={handleTaskChange}
                                            className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                        <select
                                            name="type"
                                            value={editingTask.type}
                                            onChange={handleTaskChange}
                                            className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none"
                                        >
                                            <option value="easy">Easy</option>
                                            <option value="medium">Medium</option>
                                            <option value="hard">Hard</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-2">
                                        <button type="submit" className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">Save</button>
                                        <button type="button" onClick={() => setEditingTask(null)} className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg">Cancel</button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-white font-semibold">{task.title}</h3>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditingTask(task)}
                                                className="text-cyan-400 hover:text-cyan-300 transition-colors"
                                            >
                                                <MdEdit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTask(task._id)}
                                                className="text-red-400 hover:text-red-300 transition-colors"
                                            >
                                                <MdDelete size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    {task.description && (
                                        <p className="text-gray-400 text-sm mb-3">{task.description}</p>
                                    )}
                                    <div className="flex gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(task.status)}`}>
                                            {task.status}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs border ${getTypeColor(task.type)}`}>
                                            {task.type}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}

                <div className="absolute bottom-2 left-2/4 text-white/20 animate-bounce">
                    <LuCircleArrowDown size={24}/>
                </div>
            </div>
        </div>
    )
}
