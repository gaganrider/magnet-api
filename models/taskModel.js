import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const TaskModel = mongoose.model('Task', TaskSchema);
