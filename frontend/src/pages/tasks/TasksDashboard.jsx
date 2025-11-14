import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import TaskCard from "../../components/TaskCard";
import { getTasks, deleteTask, updateTask } from "../../services/taskService";

function TasksDashboard() {
  const [tasks, setTasks] = useState([]);
  const [filteredTask, setFilteredTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch task on component mount (Runs once)
  useEffect(() => {
    fetchTasks();
  }, []);

  //Filter tasks when filters change
  useEffect(() => {
    let filtered = tasks;

    if (searchTerm) {
      filtered = tasks.filter(
        (task) =>
          task.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (task.description &&
            task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    // priority filter
    if (priorityFilter != "all") {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }

    setFilteredTasks(filtered);
  }, [searchTerm, statusFilter, priorityFilter, tasks]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const result = await getTasks();
      if (result.success) {
        setTasks(result.data);
        setFilteredTasks(result.data);
      }
    } catch (error) {
      console.error(`Error coming in the Task DashboardL: `, error.message);
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    const result = await deleteTask(id);

    if (result.success) {
      setTasks(tasks.filter((task) => task._id !== id));
    } else {
      alert(result.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const task = tasks.find((task) => task._id === id);
    if (!task) return;

    const result = await updateTask(id, {
      ...task,
      status: newStatus,
    });

    if (result.success) {
      setTasks(tasks.map((t) => (t._id === id ? result.data : t)));
    } else {
      alert(result.message);
    }
  };

  // Stats Calculation
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    pending: tasks.filter((t) => t.status === "pending").length,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
              <p className="text-gray-600 mt-1">
                Manage your tasks Efficiently
              </p>
            </div>

            <Link
              to="/tasks/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create New Task
            </Link>
          </div>

          {/* Stats Changes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-lg lg-shadow p-4">
              <p className="text-gray-500 text-sm">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.completed}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-500 text-sm">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.inProgress}
              </p>
            </div>

            <div className="bg-white rouned-lg shadow p-4">
              <p className="text-gray-500 text-sm">Pending</p>
              <p className="text-2xl font-bold text-gray-600">
                {stats.pending}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 space-y-4">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Filter dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all"> Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              {/* Loading State */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="text-xl text-gray-600">Loading tasks ...</div>
                </div>
              ) : (
                /* Empty State*/
                <>
                  {filteredTask.length === 0 ? (
                    <div className="text-center py-12">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <h3 className="mt-2 text-xl font-medium text-gray-900">
                        {searchTerm ||
                        statusFilter !== "all" ||
                        priorityFilter !== "all"
                          ? "No task found"
                          : "No task yet"}
                      </h3>
                      <p className="mt-1 text-gray-500">
                        {searchTerm ||
                        statusFilter !== "all" ||
                        priorityFilter !== "all"
                          ? "Try adjusting your filters"
                          : "Get started by creating a new task"}
                      </p>
                    </div>
                  ) : (
                    /* Task Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredTask.map((task) => (
                        <TaskCard
                          key={task._id}
                          task={task}
                          onDelete={handleDelete}
                          onStatusChange={handleStatusChange}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TasksDashboard;

// Fetch task on component mount meaning when the component first loads on the screen,  immediately call the backend to get the task data
