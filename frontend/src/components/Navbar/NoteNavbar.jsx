import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function NoteNavbar() {

    const { user, logout} = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href='/login'
    }

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl max-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    { /* Left side - logo and links */}
                    <div className="flex items-center">
                        <Link to="/dashboard" className="flex-shrink-0 flex items-center">
                            <h1 className="text-2xl font-bold text-blue-600">Note App</h1>
                        </Link>
                        <div className="hidden md:ml-6 md:flex md:space-x-8">
                            <Link to="/dashboard" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600">
                                My Notes
                            </Link>
                            <Link to="/create"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600">
                                    Create Note
                            </Link>
                        </div>
                    </div>

                    {/* Right side - User info and logout */}
                    <div className="flex items-center">
                        <span className="text-gray-700 mr-4">
                            Welcome , <span className="font-semibold">{user?.name}</span>
                        </span>
                        <button onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NoteNavbar;