import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
        }
    }
)

export const Task = mongoose.model('toDos', taskSchema);