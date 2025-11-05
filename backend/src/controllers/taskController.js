import Task from "../models/Task.models.js";

const createTask = async (req, res) => {
  try {
    const { task, description, status, startingTime, deadline, priority } =
      req.body;

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Please provide a Task Name",
      });
    }

    if (!priority) {
      return res.status(400).json({
        success: false,
        message: "Please provide the Priority of the task",
      });
    }

    const newTask = await Task.create({
      task,
      description,
      status,
      startingTime,
      deadline,
      priority,
      user: req.user.id, // req.user is set by protect middleware
    });

    res.status(201).json({
      success: true,
      message: "Task created Successfully",
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "Notes retrieved Successfully",
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // check if the note exits
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Check if note belongs to logged-in user
    if (task.user.toString() != req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this note",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note retrived successfully",
      data: task,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error : Error in the get task by ID",
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    // find Note
    let taskToUpdate = await Task.findById(req.params.id);

    const { task, description, status, startingTime, deadline, priority } =
      req.body;

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Please Enter the Task Name",
      });
    }

    if (!priority) {
      return res.status(404).json({
        success: false,
        message: "Please Enter the priority of the task",
      });
    }

    // Checking Authorization
    if (taskToUpdate.user.toString() !== req.user.id) {
      return status(403).json({
        success: false,
        message: "Not authorized to update this note",
      });
    }

    // Update note
    // Syntax-: Note.findByIdAndUpdate(id, updateData, options)

    taskToUpdate = await Task.findById(
      req.params.id,
      {
        task,
        description,
        status,
        startingTime,
        deadline,
        priority,
      },
      {
        new: true, // When you update a document, by default mongoose returns the old(pre-update) document.
        // so this new tells mongoose to return the updated document

        // By default, Mongoose does not validate updates done via findByIdAndUpdate() or updateOne().
        // That means if you have validation rules in your schema (like required, minlength, enum, etc.),
        // they will not run unless you explicitly set runValidators: true.
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Task successfully Updated",
      data: taskToUpdate,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found in the delete function",
      });
    }

    // Check Authorization
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this note",
      });
    }

    // Delete task
    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted Successfully",
      data: {},
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Task Not found",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export { createTask, getTasks, getTaskById, updateTask, deleteTask };
