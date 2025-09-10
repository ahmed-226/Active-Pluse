import { useState, useEffect } from 'react'
import { useFitness } from '../context/FitnessContext'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { profile, updateProfile, addGoal, updateGoalProgress, removeGoal, calculateGoalProgress } = useFitness()
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [showGoalForm, setShowGoalForm] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  
  const [profileData, setProfileData] = useState({
    name: user?.name || profile.name || '',
    age: profile.age || '',
    weight: profile.weight || '',
    height: profile.height || '',
    targetWeight: profile.targetWeight || '',
    dailySteps: profile.dailySteps || 10000
  })

  useEffect(() => {
    setProfileData({
      name: user?.name || profile.name || '',
      age: profile.age || '',
      weight: profile.weight || '',
      height: profile.height || '',
      targetWeight: profile.targetWeight || '',
      dailySteps: profile.dailySteps || 10000
    })
  }, [user, profile])

  const [goalData, setGoalData] = useState({
    title: '',
    description: '',
    goalType: 'increase',
    targetValue: '',
    currentValue: '',
    startingValue: '',
    targetDate: '',
    unit: ''
  })

  const goalTypes = [
    { value: 'weight_loss', label: 'Weight Loss', unit: 'kg', requiresStarting: true },
    { value: 'weight_gain', label: 'Weight Gain', unit: 'kg', requiresStarting: true },
    { value: 'workouts', label: 'Workout Count', unit: 'workouts', requiresStarting: false },
    { value: 'distance', label: 'Distance Goal', unit: 'km', requiresStarting: false },
    { value: 'time', label: 'Exercise Time', unit: 'hours', requiresStarting: false },
    { value: 'increase', label: 'Custom Goal (Increase)', unit: '', requiresStarting: false }
  ]

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }

  const handleGoalChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'goalType') {
      const selectedType = goalTypes.find(type => type.value === value)
      setGoalData({
        ...goalData,
        [name]: value,
        unit: selectedType ? selectedType.unit : '',
        currentValue: '',
        startingValue: '',
        targetValue: ''
      })
    } else {
      setGoalData({
        ...goalData,
        [name]: value
      })
    }
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    updateProfile({
      ...profile,
      ...profileData,
      name: profileData.name,
      age: profileData.age ? parseInt(profileData.age) : '',
      weight: profileData.weight ? parseFloat(profileData.weight) : '',
      height: profileData.height ? parseFloat(profileData.height) : '',
      targetWeight: profileData.targetWeight ? parseFloat(profileData.targetWeight) : '',
      dailySteps: parseInt(profileData.dailySteps)
    })
    setIsEditing(false)
  }

  const handleGoalSubmit = (e) => {
    e.preventDefault()
    const selectedType = goalTypes.find(type => type.value === goalData.goalType)
    
    if (goalData.title && goalData.description && goalData.targetValue) {
      if (selectedType?.requiresStarting && !goalData.startingValue) {
        alert('Starting value is required for this goal type')
        return
      }

      addGoal({
        ...goalData,
        targetValue: parseFloat(goalData.targetValue),
        currentValue: parseFloat(goalData.currentValue) || (selectedType?.requiresStarting ? parseFloat(goalData.startingValue) : 0),
        startingValue: selectedType?.requiresStarting ? parseFloat(goalData.startingValue) : parseFloat(goalData.currentValue) || 0
      })
      
      setGoalData({
        title: '',
        description: '',
        goalType: 'increase',
        targetValue: '',
        currentValue: '',
        startingValue: '',
        targetDate: '',
        unit: ''
      })
      setShowGoalForm(false)
    }
  }

  const handleProgressUpdate = (goalId, newValue) => {
    updateGoalProgress(goalId, parseFloat(newValue))
    setEditingGoal(null)
  }

  const handleRemoveGoal = (goalId) => {
    if (window.confirm('Are you sure you want to remove this goal?')) {
      removeGoal(goalId)
    }
  }

  const calculateBMI = () => {
    if (profileData.weight && profileData.height) {
      const heightInMeters = profileData.height / 100
      return (profileData.weight / (heightInMeters * heightInMeters)).toFixed(1)
    }
    return null
  }

  const getGoalProgress = (goal) => {
    return calculateGoalProgress(goal)
  }

  const getProgressDescription = (goal) => {
    switch (goal.goalType) {
      case 'weight_loss':
        return `Current: ${goal.currentValue}${goal.unit} → Target: ${goal.targetValue}${goal.unit} (Started: ${goal.startingValue}${goal.unit})`
      case 'weight_gain':
        return `Current: ${goal.currentValue}${goal.unit} → Target: ${goal.targetValue}${goal.unit} (Started: ${goal.startingValue}${goal.unit})`
      default:
        return `Progress: ${goal.currentValue || 0} / ${goal.targetValue} ${goal.unit}`
    }
  }

  const selectedGoalType = goalTypes.find(type => type.value === goalData.goalType)

  return (
    <div className="px-4 sm:px-6 lg:px-8 animate-slideInUp">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-8 mt-8">
          <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-6">
                <span className="text-4xl">👤</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
                <p className="text-purple-100 text-lg">Manage your personal information and fitness goals</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="xl:col-span-1">
            <div className="card card-hover">
              <div className="px-6 py-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-2xl">ℹ️</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h3>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-2 rounded-lg transition-colors duration-200"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        className="form-input"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Age</label>
                        <input
                          type="number"
                          name="age"
                          value={profileData.age}
                          onChange={handleProfileChange}
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Height (cm)</label>
                        <input
                          type="number"
                          name="height"
                          value={profileData.height}
                          onChange={handleProfileChange}
                          className="form-input"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Current Weight (kg)</label>
                        <input
                          type="number"
                          name="weight"
                          step="0.1"
                          value={profileData.weight}
                          onChange={handleProfileChange}
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Target Weight (kg)</label>
                        <input
                          type="number"
                          name="targetWeight"
                          step="0.1"
                          value={profileData.targetWeight}
                          onChange={handleProfileChange}
                          className="form-input"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Daily Steps Goal</label>
                      <input
                        type="number"
                        name="dailySteps"
                        value={profileData.dailySteps}
                        onChange={handleProfileChange}
                        className="form-input"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button type="submit" className="btn-primary">
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Name:</span>
                        <p className="font-bold text-gray-900 dark:text-white text-lg">{profileData.name || 'Not set'}</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Age:</span>
                        <p className="font-bold text-gray-900 dark:text-white text-lg">{profileData.age || 'Not set'}</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Height:</span>
                        <p className="font-bold text-gray-900 dark:text-white text-lg">{profileData.height ? `${profileData.height} cm` : 'Not set'}</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Weight:</span>
                        <p className="font-bold text-gray-900 dark:text-white text-lg">{profileData.weight ? `${profileData.weight} kg` : 'Not set'}</p>
                      </div>
                      {calculateBMI() && (
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">BMI:</span>
                          <p className="font-bold text-blue-600 dark:text-blue-400 text-xl">{calculateBMI()}</p>
                        </div>
                      )}
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Target Weight:</span>
                        <p className="font-bold text-gray-900 dark:text-white text-lg">{profileData.targetWeight ? `${profileData.targetWeight} kg` : 'Not set'}</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Daily Steps Goal:</span>
                        <p className="font-bold text-gray-900 dark:text-white text-lg">{profileData.dailySteps.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-b-2xl"></div>
            </div>
          </div>

          {/* Fitness Goals - Now takes up 2/3 of the space */}
          <div className="xl:col-span-2">
            <div className="card card-hover">
              <div className="px-6 py-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Fitness Goals</h3>
                  </div>
                  <button
                    onClick={() => setShowGoalForm(!showGoalForm)}
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 text-sm font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    {showGoalForm ? 'Cancel' : '+ Add Goal'}
                  </button>
                </div>

                {showGoalForm && (
                  <div className="mb-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200 dark:border-purple-700">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Create New Goal</h4>
                    <form onSubmit={handleGoalSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Goal Type *</label>
                          <select
                            name="goalType"
                            required
                            value={goalData.goalType}
                            onChange={handleGoalChange}
                            className="form-input"
                          >
                            {goalTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Target Date (optional)</label>
                          <input
                            type="date"
                            name="targetDate"
                            value={goalData.targetDate}
                            onChange={handleGoalChange}
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Goal Title *</label>
                        <input
                          type="text"
                          name="title"
                          required
                          value={goalData.title}
                          onChange={handleGoalChange}
                          className="form-input"
                          placeholder="e.g., Lose 10kg in 3 months"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description *</label>
                        <textarea
                          name="description"
                          required
                          value={goalData.description}
                          onChange={handleGoalChange}
                          rows={3}
                          className="form-input resize-none"
                          placeholder="Describe your goal..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {selectedGoalType?.requiresStarting && (
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Starting Value * ({selectedGoalType.unit})
                            </label>
                            <input
                              type="number"
                              name="startingValue"
                              required
                              min="0"
                              step="0.1"
                              value={goalData.startingValue}
                              onChange={handleGoalChange}
                              className="form-input"
                              placeholder="Your starting point"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Current Value ({selectedGoalType?.unit || goalData.unit})
                          </label>
                          <input
                            type="number"
                            name="currentValue"
                            min="0"
                            step="0.1"
                            value={goalData.currentValue}
                            onChange={handleGoalChange}
                            className="form-input"
                            placeholder="Where you are now"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Target Value * ({selectedGoalType?.unit || goalData.unit})
                          </label>
                          <input
                            type="number"
                            name="targetValue"
                            required
                            min="0.1"
                            step="0.1"
                            value={goalData.targetValue}
                            onChange={handleGoalChange}
                            className="form-input"
                            placeholder="Your goal"
                          />
                        </div>

                        {!selectedGoalType?.unit && (
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Unit</label>
                            <input
                              type="text"
                              name="unit"
                              value={goalData.unit}
                              onChange={handleGoalChange}
                              className="form-input"
                              placeholder="kg, km, hours, etc."
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowGoalForm(false)}
                          className="btn-secondary"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn-primary"
                        >
                          <span className="mr-2">🎯</span>
                          Create Goal
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {profile.goals && profile.goals.length > 0 ? (
                    profile.goals.map((goal) => {
                      const progress = getGoalProgress(goal)
                      return (
                        <div key={goal.id} className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{goal.title}</h4>
                              <span className="text-xs px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium">
                                {goalTypes.find(type => type.value === goal.goalType)?.label || 'Custom'}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">{progress}%</div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => setEditingGoal(editingGoal === goal.id ? null : goal.id)}
                                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                                >
                                  Update
                                </button>
                                <button
                                  onClick={() => handleRemoveGoal(goal.id)}
                                  className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          {editingGoal === goal.id && (
                            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Update Progress
                              </label>
                              <div className="flex items-center space-x-3">
                                <input
                                  type="number"
                                  step="0.1"
                                  defaultValue={goal.currentValue}
                                  placeholder="New current value"
                                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      handleProgressUpdate(goal.id, e.target.value)
                                    }
                                  }}
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{goal.unit}</span>
                                <button
                                  onClick={(e) => {
                                    const input = e.target.parentElement.querySelector('input')
                                    handleProgressUpdate(goal.id, input.value)
                                  }}
                                  className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 font-medium"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          )}
                          
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-4 overflow-hidden">
                            <div
                              className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                                progress >= 80 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 
                                progress >= 50 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 
                                'bg-gradient-to-r from-red-400 to-red-500'
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 font-medium">{goal.description}</p>
                          
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                            {getProgressDescription(goal)}
                            {goal.targetDate && (
                              <div className="mt-1">Target: {new Date(goal.targetDate).toLocaleDateString()}</div>
                            )}
                          </div>
                          
                          {progress >= 100 ? (
                            <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl text-green-800 dark:text-green-300 text-sm font-bold">
                              🏆 Congratulations! Goal achieved!
                            </div>
                          ) : progress >= 80 ? (
                            <div className="p-3 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl text-yellow-800 dark:text-yellow-300 text-sm font-bold">
                              🎉 Almost there! You're {progress}% complete!
                            </div>
                          ) : null}
                        </div>
                      )
                    })
                  ) : (
                    <div className="col-span-2 text-center py-12">
                      <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">🎯</span>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-xl font-medium mb-2">No goals set yet</p>
                      <p className="text-gray-400 dark:text-gray-500 text-sm">Create your first fitness goal to start tracking your progress!</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-b-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile