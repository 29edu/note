import api from "./api";

const createNote = async (noteData) => {
    try {
        const response = await api.post('/note', noteData);
        return {
            success: true,
            data: response.data.data
        }
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to create the Notes'
        }
    }
}

const getNote = async () => {
    try {
        const response = await api.get('/notes');

        return {
            success: true,
            data: response.data.data
        };
    } catch(error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch Notes'
        }
    }
}

// Get Note by id

const getNoteById = async (id) => {
    try {
        const response = await api.get(`/notes/${id}`)

        return {
            success: true,
            data: response.data.data
        }        
    } catch(error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch Notes by ID'
        }
    }
}

// Update Note
const updateNote = async(id, newNote) => {
    try {
        const response = await api.put(`/notes/${id}`, newNote);
        return {
            success: true,
            data: response.data.data
        }
    } catch (error)  {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to Update the Note'
        }
    }
}

const deleteNote = async (id) => {
    try {
        await api.delete(`/notes/${id}`);
        return {
            success: true
        } 
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message ||'Faled to delete the Note'
        }
    }
}

export {
    createNote,
    getNote,
    getNoteById,
    updateNote,
    deleteNote
}