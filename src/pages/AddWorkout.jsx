import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFitness } from '../context/FitnessContext'

const AddWorkout = () => {
  const [formData, setFormData] = useState({
    activityType: '',
    duration: '',
    intensity: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    caloriesBurned: ''
  })
  
  const { addWorkout } = useFitness()
  const navigate = useNavigate()

  const activityTypes = ['Running', 'Weightlifting', 'Yoga', 'Cycling']
  const intensityLevels = ['Low', 'Medium', 'High']

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.activityType && formData.duration && formData.intensity) {
      addWorkout({
        ...formData,
        duration: parseInt(formData.duration),
        caloriesBurned: formData.caloriesBurned ? parseInt(formData.caloriesBurned) : null
      })
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="px-4 sm:px-6 lg:px-8 py-8 animate-slideInUp">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 text-6xl">🏋️‍♂️</div>
                <div className="absolute top-8 right-8 text-4xl">💪</div>
                <div className="absolute bottom-4 left-1/4 text-5xl">🏃‍♂️</div>
                <div className="absolute bottom-8 right-1/3 text-3xl">⚡</div>
              </div>
              <div className="relative flex items-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-6 backdrop-blur-sm">
                  <span className="text-4xl">🏋️‍♂️</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">Add Workout</h1>
                  <p className="text-blue-100 text-lg">Log your workout activity and track your progress</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-3">
              <div className="form-container">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="activityType" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Activity Type *
                      </label>
                      <select
                        id="activityType"
                        name="activityType"
                        required
                        className="form-input"
                        value={formData.activityType}
                        onChange={handleChange}
                      >
                        <option value="">Select activity</option>
                        {activityTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Duration (minutes) *
                      </label>
                      <input
                        type="number"
                        id="duration"
                        name="duration"
                        required
                        min="1"
                        className="form-input"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="e.g., 30"
                      />
                    </div>

                    <div>
                      <label htmlFor="intensity" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Intensity Level *
                      </label>
                      <select
                        id="intensity"
                        name="intensity"
                        required
                        className="form-input"
                        value={formData.intensity}
                        onChange={handleChange}
                      >
                        <option value="">Select intensity</option>
                        {intensityLevels.map((level) => (
                          <option key={level} value={level.toLowerCase()}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="date" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        className="form-input"
                        value={formData.date}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="caloriesBurned" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Calories Burned (optional)
                      </label>
                      <input
                        type="number"
                        id="caloriesBurned"
                        name="caloriesBurned"
                        min="0"
                        className="form-input"
                        value={formData.caloriesBurned}
                        onChange={handleChange}
                        placeholder="e.g., 300"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Notes (optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      className="form-input resize-none"
                      placeholder="Any additional notes about your workout..."
                      value={formData.notes}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={() => navigate('/')}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      <span className="mr-2">🏋️‍♂️</span>
                      Add Workout
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar with Tips */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Workout Tips */}
                <div className="card card-hover">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-3">
                        <span className="text-2xl">💡</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Workout Tips</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <p className="text-sm text-green-800 dark:text-green-300 font-medium">
                          🎯 Track consistently to see patterns in your fitness journey
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                          📈 Include intensity levels to monitor progress over time
                        </p>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-sm text-purple-800 dark:text-purple-300 font-medium">
                          📝 Add notes about how you felt or what worked well
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="card card-hover">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-3">
                        <span className="text-2xl">🔥</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Calorie Guide</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Running (30 min)</span>
                        <span className="text-sm font-bold text-orange-600 dark:text-orange-400">~300 cal</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Weightlifting (30 min)</span>
                        <span className="text-sm font-bold text-orange-600 dark:text-orange-400">~180 cal</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Yoga (30 min)</span>
                        <span className="text-sm font-bold text-orange-600 dark:text-orange-400">~120 cal</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Cycling (30 min)</span>
                        <span className="text-sm font-bold text-orange-600 dark:text-orange-400">~250 cal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddWorkout