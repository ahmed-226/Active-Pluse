import { createContext, useContext, useState, useEffect } from 'react'

const FitnessContext = createContext()

export const useFitness = () => {
  const context = useContext(FitnessContext)
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider')
  }
  return context
}

export const FitnessProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([])
  const [meals, setMeals] = useState([])
  const [profile, setProfile] = useState({})
  const [achievements, setAchievements] = useState([])

  useEffect(() => {
    const savedWorkouts = localStorage.getItem('fitnessWorkouts')
    const savedMeals = localStorage.getItem('fitnessMeals')
    const savedProfile = localStorage.getItem('fitnessProfile')
    const savedAchievements = localStorage.getItem('fitnessAchievements')
    
    if (savedWorkouts) setWorkouts(JSON.parse(savedWorkouts))
    if (savedMeals) setMeals(JSON.parse(savedMeals))
    if (savedProfile) setProfile(JSON.parse(savedProfile))
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements))
  }, [])

  const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
  }

  const addWorkout = (workout) => {
    const newWorkout = {
      ...workout,
      id: Date.now(),
      date: workout.date || new Date().toISOString().split('T')[0]
    }
    const updatedWorkouts = [...workouts, newWorkout]
    setWorkouts(updatedWorkouts)
    saveToStorage('fitnessWorkouts', updatedWorkouts)
  }

  const addMeal = (meal) => {
    const newMeal = {
      ...meal,
      id: Date.now(),
      date: meal.date || new Date().toISOString().split('T')[0]
    }
    const updatedMeals = [...meals, newMeal]
    setMeals(updatedMeals)
    saveToStorage('fitnessMeals', updatedMeals)
  }

  const updateProfile = (newProfile) => {
    setProfile(newProfile)
    saveToStorage('fitnessProfile', newProfile)
  }

  const calculateGoalProgress = (goal) => {
    const { goalType, currentValue, targetValue, startingValue } = goal
    
    if (!targetValue || currentValue === undefined) return 0

    switch (goalType) {
      case 'weight_loss':
        // For weight loss: progress = (starting - current) / (starting - target) * 100
        if (!startingValue || startingValue <= targetValue) return 0
        const weightLossProgress = ((startingValue - currentValue) / (startingValue - targetValue)) * 100
        return Math.max(0, Math.min(100, Math.round(weightLossProgress)))
      
      case 'weight_gain':
        // For weight gain: progress = (current - starting) / (target - starting) * 100
        if (!startingValue || startingValue >= targetValue) return 0
        const weightGainProgress = ((currentValue - startingValue) / (targetValue - startingValue)) * 100
        return Math.max(0, Math.min(100, Math.round(weightGainProgress)))
      
      case 'distance':
      case 'workouts':
      case 'time':
      case 'increase':
      default:
        // For increase goals: progress = (current / target) * 100
        const increaseProgress = (currentValue / targetValue) * 100
        return Math.max(0, Math.min(100, Math.round(increaseProgress)))
    }
  }

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      currentValue: parseFloat(goal.currentValue) || 0,
      targetValue: parseFloat(goal.targetValue) || 1,
      startingValue: parseFloat(goal.startingValue) || parseFloat(goal.currentValue) || 0,
      goalType: goal.goalType || 'increase'
    }
    
    // Calculate initial progress
    newGoal.progress = calculateGoalProgress(newGoal)
    
    const updatedProfile = {
      ...profile,
      goals: [...(profile.goals || []), newGoal]
    }
    updateProfile(updatedProfile)
  }

  const updateGoalProgress = (goalId, newCurrentValue) => {
    const updatedProfile = {
      ...profile,
      goals: (profile.goals || []).map(goal => {
        if (goal.id === goalId) {
          const updatedGoal = { 
            ...goal, 
            currentValue: parseFloat(newCurrentValue)
          }
          updatedGoal.progress = calculateGoalProgress(updatedGoal)
          
          // Check if goal is completed (100% progress)
          if (updatedGoal.progress >= 100) {
            // Move to achievements
            moveGoalToAchievements(updatedGoal)
            return null // Mark for removal from goals
          }
          
          return updatedGoal
        }
        return goal
      }).filter(Boolean) // Remove null values (completed goals)
    }
    updateProfile(updatedProfile)
  }

  const moveGoalToAchievements = (completedGoal) => {
    const achievement = {
      ...completedGoal,
      completedAt: new Date().toISOString(),
      progress: 100
    }
    
    const updatedAchievements = [...achievements, achievement]
    setAchievements(updatedAchievements)
    saveToStorage('fitnessAchievements', updatedAchievements)
  }

  const removeGoal = (goalId) => {
    const updatedProfile = {
      ...profile,
      goals: (profile.goals || []).filter(goal => goal.id !== goalId)
    }
    updateProfile(updatedProfile)
  }

  const removeAchievement = (achievementId) => {
    const updatedAchievements = achievements.filter(achievement => achievement.id !== achievementId)
    setAchievements(updatedAchievements)
    saveToStorage('fitnessAchievements', updatedAchievements)
  }

  const clearAllAchievements = () => {
    setAchievements([])
    saveToStorage('fitnessAchievements', [])
  }

  const value = {
    workouts,
    meals,
    profile,
    achievements,
    addWorkout,
    addMeal,
    updateProfile,
    addGoal,
    updateGoalProgress,
    removeGoal,
    removeAchievement,
    clearAllAchievements,
    calculateGoalProgress
  }

  return (
    <FitnessContext.Provider value={value}>
      {children}
    </FitnessContext.Provider>
  )
}