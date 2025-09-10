import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FitnessProvider } from './context/FitnessContext'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import AddWorkout from './pages/AddWorkout'
import AddMeal from './pages/AddMeal'
import Progress from './pages/Progress'
import Profile from './pages/Profile'
import Achievements from './pages/Achievements'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { Suspense, lazy } from 'react'
import './App.css'

// Lazy load DevHelper only in development
const DevHelper = import.meta.env.DEV 
  ? lazy(() => import('./components/DevHelper'))
  : null

function App() {
  return (
    <AuthProvider>
      <FitnessProvider>
        <Router>
          <div className="min-h-screen bg-gray-900">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/add-workout" element={
                <ProtectedRoute>
                  <Layout>
                    <AddWorkout />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/add-meal" element={
                <ProtectedRoute>
                  <Layout>
                    <AddMeal />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/progress" element={
                <ProtectedRoute>
                  <Layout>
                    <Progress />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/achievements" element={
                <ProtectedRoute>
                  <Layout>
                    <Achievements />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              } />
            </Routes>
            
            {/* Only render DevHelper in development */}
            {import.meta.env.DEV && DevHelper && (
              <Suspense fallback={null}>
                <DevHelper />
              </Suspense>
            )}
          </div>
        </Router>
      </FitnessProvider>
    </AuthProvider>
  )
}

export default App