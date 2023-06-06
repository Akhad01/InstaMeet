import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Users from './layout/users'
import Main from './layout/main'
import Login from './layout/login'
import NavBar from './components/ui/navBar'
import { ProfessionProvider } from '../hooks/useProfession'

import 'react-toastify/dist/ReactToastify.css'
import QualitiesProvider from '../hooks/useQualities'
import { AuthProvider } from '../hooks/useAuth'
import ProtectedRoute from './components/ui/protectedRoute'
import LogOut from './layout/logOut'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
          <QualitiesProvider>
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
          </QualitiesProvider>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer />
    </div>
  )
}

export default App
