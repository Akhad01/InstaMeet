import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import Users from './layout/users'
import Main from './layout/main'
import Login from './layout/login'
import NavBar from './components/ui/navBar'
import { AuthProvider } from './hooks/useAuth'
import ProtectedRoute from './components/ui/protectedRoute'
import LogOut from './layout/logOut'
import { loadProfessionsList } from './store/professions'
import { loadQualitiesList } from './store/qualities'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadProfessionsList())
    dispatch(loadQualitiesList())
  }, [dispatch])

  return (
    <div className="App">
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="login/:type?" element={<Login />} />
          <Route
            path="/users/:userId?/:edit?"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </AuthProvider>
      <ToastContainer />
    </div>
  )
}

export default App
