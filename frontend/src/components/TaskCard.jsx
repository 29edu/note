import { Link } from 'react-router-dom'

function TaskCard( {task, onDelete, onStatusChange}) {
    const formatData = (dateString) => {
        if(!dateString) {
            return 'Not set';
        }
        const date = new Date(dateString);
        return date.toLocalDateString('en-US',{
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            
            case 'in-progress':
                return 'bg-yellow-100 text-yellow-800';

            case 'pending':
                return 'bg-gray-100 text-gray-800';

            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800';

            case 'medium':
                return 'bg-orange-100 text-orange-800';
            case 'low':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800'
        }
    };

    const isOverdue = (deadline) => {
        if(!deadline){
            return false;
        }
        return new Date(deadline) < new Date() && task.status !=='completed';
    };

    return (
        <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${isOverdue(task.deadline) ? 'border-l-4 border-red-500' : ''}`}>
            {/* Header with title and badges */}
            <div className='flex items-start justify-between mb-3'>
                <h3 className='text-xl font-semibold text-gray-900 flex-1'>
                    {task.taskName}
                </h3>
            </div>

            {/* Badges */}
            <div className='flex flex-srwap gap-2 mb-3'>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                </span>
                {isOverdue(task.deadline) &&  (
                    <span className='px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800'>
                        Overdue
                    </span>
                )}
            </div>

            {/* Description */}
            {task.description && (
                <p className='text-gray-600 mb-4 line-clamp-2'>
                    {task.description}
                </p>
            )}

            {/* Dates */}
            <div className='text-sm text-gray-500 mb-4 space-y-1'>
                {task.startingTime && (
                    <p>Start: {formatData(task.startingTime)}</p>
                )}
                {task.deadline && (
                    <p className={isOverdue(task.deadline) ? 'text-red-600 font-medium' : ''}>
                        Deadline: {formatData(task.deadline)}
                    </p>
                )}
            </div>

            {/* Quick status Change */}
            {task.status !=='completed' && (
                <div className='mb-4'>
                    <select
                        value={task.status}
                        onChange={(e) => onStatusChange(task._id.e.target.value)}
                        className="w-full px-3 py-2 border bordep-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value={"pending"}>Pending</option>
                            <option value={"in-progress"}>In Porgress</option>
                            <option value={"completed"}>Completed</option>
                    </select> 
                </div>
            )}

            { /* Actions */}
            <div className='flex space-x-2'>
                <Link to={`/tasks/edit/${task._id}`}
                    className='flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium text-center transition-colors'>
                        Edit
                </Link>
                <button onClick={() => onDelete(task._id)}
                    className='flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors'>
                        Delete
                </button>
            </div>
        </div>
    );
}

export default TaskCard;


// Steps
// 1. Going for formatDate
// 2. Changing colors according to the priority, status