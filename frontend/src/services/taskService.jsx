import api from "./api";

// Get All Task
export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch notes",
    };
  }
};

// Get task by id
export const getTaskById = async (id) => {
  try {
    const response = await api.get(`/tasks/${id}`);
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch note",
    };
  }
};

// Create Task
export const createTask = async (taskData) => {
  try {
    const response = await api.post("/tasks", taskData);
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create Task",
    };
  }
};

// Update task
export const updateTask = async (id, taskData) => {
  try {
    const response = await api.put(`/tasks/${id}`, taskData);
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "FAiled to updated task",
    };
  }
};

// Delete task
export const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete Task",
    };
  }
};

// Concepts
// response.data.data -> There is double data becauase when axios entire data so to retturn the actual need data that is wrapped inside another data, we use data.data

// message: error.response?.data?.message  -> ?. if this symbol is not used and if response is undefined then js will crash so we use ?.
// so that if we get undefined then it will return undefined

// if error.response exists move forward otherwise return undefined.
