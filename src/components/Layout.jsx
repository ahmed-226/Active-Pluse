import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  PlusIcon,
  ChartBarIcon,
  UserIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Add Workout', href: '/add-workout', icon: PlusIcon },
    { name: 'Add Meal', href: '/add-meal', icon: PlusIcon },
    { name: 'Progress', href: '/progress', icon: ChartBarIcon },
    { name: 'Achievements', href: '/achievements', icon: TrophyIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex flex-col max-w-xs w-full bg-gray-800 shadow-xl">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ActivePulse
                </h1>
              </div>
            </div>
            <nav className="mt-8 px-2 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } group flex items-center px-3 py-3 text-base font-medium rounded-xl transition-all duration-200`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-4 h-6 w-6" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-84">
          <div className="flex flex-col h-0 flex-1 bg-gray-800 shadow-xl border-r border-gray-700">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4 mb-8">
                <div className="flex items-center">
                  <div className=" h-10 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                    <img src="/logo.png" alt="Logo" className="w-16 h-18" />
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    ActivePulse
                  </h1>
                </div>
              </div>
              <nav className="flex-1 px-2 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200`}
                  >
                    <item.icon className="mr-4 h-6 w-6" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 border-t border-gray-700 p-4">
              <div className="flex items-center w-full">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-300">Fitness Enthusiast</p>
                  <p className="text-xs text-gray-400">Keep crushing your goals! 💪</p>
                </div>
                <div className="ml-3 text-2xl">🏆</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="lg:hidden">
          <div className="flex items-center justify-between bg-gray-800 shadow-sm px-4 py-3 border-b border-gray-700">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ActivePulse
              </h1>
            </div>
          </div>
        </div>
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout