import { TaskModel } from "../models/taskModel.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, priority, status, user } = req.body;
  const task = new TaskModel({
    title,
    description,
    dueDate,
    priority,
    status,
    user,
  });
  await task.save();
  res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
});

export const getTasks = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);
  const skip = (pageNumber - 1) * pageSize;
  console.log("kkkkkkk", req.params.id);
  const tasks = await TaskModel.find({ user: req.params.id })
    .skip(skip)
    .limit(pageSize);
  const totalTasks = await TaskModel.countDocuments({ user: req.params.id });
  const totalPages = Math.ceil(totalTasks / pageSize);
  res
    .status(200)
    .json(
      new ApiResponse(200, { tasks, totalPages }, "Tasks fetched successfully")
    );
});

export const getSingleTask = asyncHandler(async (req, res) => {
  const task = await TaskModel.findById(req.params.id);
  if (task) {
    res
      .status(200)
      .json(new ApiResponse(200, task, "Task fetched successfully"));
  } else {
    res.status(404).json(new ApiResponse(404, null, "Task not found"));
  }
});

export const deleteTask = asyncHandler(async (req, res) => {
  await TaskModel.findByIdAndDelete(req.params.id);
  res.status(200).json(new ApiResponse(200, null, "Task deleted successfully"));
});

export const updateTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;
  const task = await TaskModel.findById(req.params.id);
  task.title = title;
  task.description = description;
  task.dueDate = dueDate;
  task.priority = priority;
  task.status = status;
  await task.save();
  res.status(200).json(new ApiResponse(200, null, "Task updated successfully"));
});
