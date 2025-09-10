import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for saved user and auth status on app startup
    const savedUser = localStorage.getItem('fitnessUser')
    const savedAuthStatus = localStorage.getItem('fitnessAuthStatus')
    
    if (savedUser && savedAuthStatus === 'true') {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsAuthenticated(true)
        console.log('✅ User restored from localStorage:', userData.name)
      } catch (error) {
        console.error('❌ Error parsing saved user data:', error)
        // Clear corrupted data
        localStorage.removeItem('fitnessUser')
        localStorage.removeItem('fitnessAuthStatus')
      }
    }
    
    // Always apply dark mode
    document.documentElement.classList.add('dark')
    setLoading(false)
  }, [])

  const login = (userData) => {
    const userToSave = {
      name: userData.name || 'Fitness User',
      email: userData.email || 'user@activepulse.com',
      loginDate: new Date().toISOString()
    }
    
    setUser(userToSave)
    setIsAuthenticated(true)
    
    // Save to localStorage
    localStorage.setItem('fitnessUser', JSON.stringify(userToSave))
    localStorage.setItem('fitnessAuthStatus', 'true')
    
    console.log('✅ User logged in and saved:', userToSave.name)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    
    // Clear from localStorage
    localStorage.removeItem('fitnessUser')
    localStorage.removeItem('fitnessAuthStatus')
    
    console.log('✅ User logged out and data cleared')
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}