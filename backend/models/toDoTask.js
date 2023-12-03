import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    }
)

export const Task = mongoose.model('toDos', taskSchema);