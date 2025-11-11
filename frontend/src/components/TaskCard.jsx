import { Link } from 'react-router-dom'

function TaskCard( {task, onDelete}) {
    const formatData = (dateString) => {
        const date = new Date(dateString);
        return date.toLocalDateString('en-US',{
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    };

    return (
        <div  className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow'>

            {/* Title */}
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                {task.title}
            </h3>

            { /* Content Preview */}
            <p className='text-gray-600 mb-4 line-clamp-3'>
                {task.content || 'No content'}
            </p>

            { /* Data */}
            <p className='text-sm text-gray-500 mb-4'>
                Created: {formatData(task.createdAt)}
            </p>

            {/* Actions */}
            <div className='flex space-x-2'>
                <Link to={`/edit/${task._id}`} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium text-center ">
                    Edit
                </Link>
                <button onClick={ () => onDelete(task._id)} className='flex-1 bg-red-600 hover:bg-red-700 text-white px-4  py-2 rounded-md text-sm font-medium text-center transition-colors'>
                Delete
            </button>
            </div>
        </div>
    )
}

export default TaskCard;