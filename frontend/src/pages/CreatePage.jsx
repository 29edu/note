import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { createTask } from '../services/taskService'

function CreateTask() {
    const [taskName, setTask] = useState('');
    const [description, setDesciption] = useState('');
    const [status, setStatus] = useState('Pending');
    const [startingTime, setStartingTime] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if(!taskName.trim()) {
            setError('Please Enter the Task Name');
            return;
        }

        if(!priority) {
            setError('Please Enter the priority of this task');
            return;
        }
        
        setLoading(true);

        const taskData = await createTask({
            taskName,
            description,
            status,
            startingTime: startingTime || null,
            deadline: deadline || null,
            priority,

        })

        const result = await createTask(taskData);
        setLoading(false);

        if(result.success) {
            navigate('/dashboard')
        } else {
            setError(result.message || "Failed to create Task, Please try again.");
        }
    };

    return (
        <div className='max-w-2xl max-auto '>

        </div>
    )
}