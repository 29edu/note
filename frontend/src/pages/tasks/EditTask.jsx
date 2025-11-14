import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getTaskById, updateTask } from "../../services/taskService";

function EditTask() {
  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    status: "pending",
    startingTime: "",
    deadline: "",
    priority: "medium",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetchLoading, setFetchLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch task data on mount
  useEffect(() => {
    fetchTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchTask = async () => {
    const result = await getTaskById(id);

    if (result.success) {
      const task = result.data;

      //Format dates for input fields
      // Need of formatDateforInput - check below

      const formatDateForInput = (dateString) => {
        if (!dateString) {
          return "";
        }
        return new Date(dateString).toISOString().split("T")[0];
      };

      setFormData({
        taskName: task.taskName,
        description: task.description || "",
        status: task.status,
        startingTime: formatDateForInput(task.startingTime),
        deadline: formatDateForInput(task.deadline),
        priority: task.priority,
      });
    } else {
      setError(result.message);
    }

    setFetchLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // validation
    if (!formData.taskName.trim()) {
      setError("Please enter a task name");
      return;
    }

    if (!formData.priority) {
      setError("Please select a priority");
      return;
    }

    setLoading(true);

    //Prepare Data
    const taskData = {
      taskName: formData.taskName.trim(),
      description: formData.description.trim(),
      status: formData.status,
      priority: formData.priority,
    };

    if (formData.startingTime) {
      taskData.startingTime = formData.startingTime;
    }

    if (formData.deadline) {
      taskData.deadline = formData.deadline;
    }

    const result = await updateTask(id, taskData);

    if (result.success) {
      navigator("/tasks");
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/task");
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-xl text-gray-600">Loading task ...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Task</h1>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Task Name*/}
            <div className="mb-6">
              <label
                htmlFor="taskName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Task Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="taskName"
                name="taskName"
                value={formData.taskName}
                onChange={handleChange}
                className="w-full px-4py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task Name"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                maxLength={200}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Enter task Description (optional) "
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.description.length} /200 characters
              </p>
            </div>

            {/* Priority and status in a row */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
              {/* Priority */}
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium  text-gray-700 mb-2"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Starting Date and Deadline in a row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* starting Time */}
              <div>
                <label
                  htmlFor="startingTime"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  name="startingTime"
                  id="startingTime"
                  value={formData.startingTime}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Deadline */}
              <div>
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Deadline
                </label>
                <input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating ..." : "Update Task"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTask;

