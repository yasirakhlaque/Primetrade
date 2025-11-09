import Task from "../model/task.model.js";

export const createTask = async (req, res) => {
    const { title, description, status, type } = req.body;
    const userId = req.user.id;
    try {
        const newTask = new Task({ userId, title, description, status, type });
        await newTask.save();
        res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        console.error("Error in createTask:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getTasks = async (req, res) => {
    const userId = req.user.id; // Get userId from authenticated token
    try {
        const tasks = await Task.find({ userId }); // Only get tasks for this user
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error in getTasks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, type } = req.body;
    const userId = req.user.id; // Get userId from authenticated token
    try {
        // Only update if task belongs to this user
        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, userId }, // Match both task ID and user ID
            { title, description, status, type }, 
            { new: true }
        );
        if (!updatedTask) return res.status(404).json({ message: "Task not found or unauthorized" });
        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        console.error("Error in updateTask:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Get userId from authenticated token
    try {
        // Only delete if task belongs to this user
        const deletedTask = await Task.findOneAndDelete({ _id: id, userId });
        if (!deletedTask) return res.status(404).json({ message: "Task not found or unauthorized" });
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error in deleteTask:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}