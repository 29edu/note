import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Please add the Task Name"],
      trim: true,
      // maxlength: [200, 'Task Name cannot be']
    },

    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description cannot be more than 200 characters"],
    },

    status: {
      type: String,
      enum: ["Pending", "In-Progress", "Completed"],
      default: "Pending",
    },

    startingTime: {
      type: Date,
    },

    deadline: {
      type: Date,
    },

    priority: {
      type: String,
      enum: ["low", "Medium", "High"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
