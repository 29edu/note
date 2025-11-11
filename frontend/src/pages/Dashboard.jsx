import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import { getTasks, deleteNote } from "../services/taskService";
import { set } from "mongoose";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, [])

    // Filter notes when search term changes
    useEffect(() => {
        if (searchTerm) {
            const filtered = tasks.filter((task) => {
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.content.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setFilteredTasks(filtered);
        } else {
            setFilteredTasks(tasks);
        }
    }, [searchTerm, tasks])

    const fetchTasks = async () => {
        setLoading(true);
        const result = await getTasks();

        if(result.success) {
            setTasks(result.data);
            setFilteredTasks(tasks);
        } else {
            setError(result.message);
        }

        setLoading(false);
    }

    const handleDelete = async (id) => {
        if(!window.confirm('Are you sure you want to delete this note')) {
            return;
        }

        const result = await deleteNote();

        if(result.success) {
            setTasks(tasks.filter((task) => task._id !== id));
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="mb-8">
                {/* Header with search */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold text-gray-900">
                            My task
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} total
                        </p>
                    </div>

                    <Link to='/create' className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="rouned" strokeLinejoin="rouned" strokeWidth={2} d="M12 4v16m8-8H4" />      
                        </svg>
                        Create New Task
                    </Link>
                </div>


                {/* Search bar */}
                <div className="mt-6">
                    <input  type="text" placeholder="Search task ..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/*Error Message  */}
            {error && (
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}

            {/* Loading Message */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="text-xl text-gray-600">Loading Tasks ... </div>
                </div>
            ) : {
                <>
                    {/* Empty State */}
                    
                </>
            }}
        </div>
    )
}

