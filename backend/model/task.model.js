import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        description: { type: String, default: "" },
        status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
        type: { type: String, enum: ["medium", "easy", "hard"], default: "medium" },
    },
    { timestamps: true }
)

const Task = mongoose.model("Task", TaskSchema);
export default Task;