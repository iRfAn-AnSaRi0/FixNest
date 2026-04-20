import React from 'react'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './context/ProtectedRoute'
import AuthModal from './components/auth/AuthModel'
import { Toaster } from 'react-hot-toast'
import { techAuth } from './context/AuthContext'
import AccessDenied from './components/ui/AccessDenied'

function App() {
  const { openAuth, setOpenAuth } = techAuth();
  const { accessDenied } = techAuth();

  if (accessDenied) return <AccessDenied />;
  // console.log("openAuth:", openAuth);
  return (
    <>

      <Toaster position="top-right" reverseOrder={false} />
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
      {/* <Routes>
        <Route
          path="/technician/dashboard"
          element={
            <ProtectedRoute role="technician">
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes> */}
      <AuthModal
        open={openAuth}
        onClose={() => setOpenAuth(false)}
        initialStep="login"
      />
    </>
  )
}

export default App
