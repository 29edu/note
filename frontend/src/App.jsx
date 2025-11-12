import './App.css'
import { useAuth } from './context/AuthContext'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function App() {

  // if the user is not logged in , user becomes null
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
        {/* If the user is already logged in redirect to the dashboard otherwise redirect to login*/}
        <Route  path='/login' element={user ? <Navigate to='/dashboard' /> : <Login /> }
        />

        <Route path='/register' element={user ? <Navigate to="/dashboard" />: <Register /> }
        />

        {/*Takes to the dashboard */}
        {/* If the user is logged in then it will return some value , and that means the user is logged in, and will take to the dashboard otherwise login*/}
        <Route path='/dashboard' element={user  ? <Dashboard/>: <Navigate to="/login" /> } />

        { /* Default redirect */}
        <Route path='/' element={<Navigate to={user ? "/dashboard" : "/login"} />} />

      </Routes>
    </Router>
  )
}

export default App;


// Router creates an environment that allows navigation and route matching to work
// Routes is like a switch - it looks the current url and renders the first <Route> that matches
