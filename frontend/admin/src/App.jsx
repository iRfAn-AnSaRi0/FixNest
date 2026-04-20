import React from 'react'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './context/ProtectedRoute'
import AuthModal from './components/auth/AuthModel';
import Users from './pages/User'
import Technicians from './pages/Technician'
import { adminAuth } from './context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './components/layout/Layout';

function App() {
  const { openAuth, setOpenAuth } = adminAuth();

  return (
    <>
      <AuthModal
        open={openAuth}
        onClose={() => setOpenAuth(false)}
      />

      <ProtectedRoute>
        <Routes>

          {/* 🔥 Layout wrapper */}
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/technicians" element={<Technicians />} />
          </Route>

        </Routes>
      </ProtectedRoute>
    </>
  )
}

export default App;