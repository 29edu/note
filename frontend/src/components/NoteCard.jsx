import { Link } from "react-router-dom";

function NoteCard( {note, onDelete}) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocalDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {note.title}
            </h3>

            {/* Content Preview */}
            <p className="text-gray-500 text-sm mb-4">
                Created: {formatDate(note.createdAt)}
            </p>

            { /* Date */}
            <p className="text-sm text-gray-500 mb-4">
                Created: {formatDate(note.createdAt)}
            </p>

            { /* Actions */}
            <div className="flex space-x-2">
                <Link to={`edit/${note._id}`} 
                    className="flex-1 bg-blue hover:bg-blue-700 text-white px-4 py-2 rounded-md tetx-sm font-medium text-center transition-colors"
                    >
                        Edit
                    </Link>

                <button onClick={() => onDelete(note._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        Delete
                </button>
            </div>
        </div>
    )
}

export default NoteCard;