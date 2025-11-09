import './App.css'
import { useAuth } from './context/AuthContext'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  const { user, loading } = useAuth();

  // Show loading while checking auth
  if(loading) {
    return (
      <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
        <div className='text-xl text-gray-600'>Loading ...</div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route  path='/login' element={user ? <Navigate to='/dashboard' /> : <Login /> }
        />
        <Route path='/register' element={user ? <Navigate to="/dashboard" />: <Register /> }
        />

        {/* Temporary dashboard route */}
        <Route
          path='/dashboard'
            element={
              user ? (
                <div className='min-h-screen bg-gray-100 p-8'>
                  <h1 className='text-3xl font-bold'>
                    Dashboard
                  </h1>
                  <p className='mt-2'>Welcome, {user.name}</p>
                    <button onClick={ () => {
                        localStorage.clear();
                        window.location.reload();
                      }}
                    className='mt-4 bg-red-600 text-white px-4 py-2 rounded'>
                      Logout
                  </button>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          { /* DEfault redirect */}
          <Route path='/' element={<Navigate to={user ? "/dashboard" : "/login"} />} />

      </Routes>
    </Router>
  )
}

export default App;
