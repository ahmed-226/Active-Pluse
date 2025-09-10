import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFitness } from '../context/FitnessContext'

const AddMeal = () => {
  const [formData, setFormData] = useState({
    mealType: '',
    foodItems: [''],
    calories: '',
    date: new Date().toISOString().split('T')[0],
    proteins: '',
    carbs: '',
    fats: ''
  })
  
  const { addMeal } = useFitness()
  const navigate = useNavigate()

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFoodItemChange = (index, value) => {
    const newFoodItems = [...formData.foodItems]
    newFoodItems[index] = value
    setFormData({
      ...formData,
      foodItems: newFoodItems
    })
  }

  const addFoodItem = () => {
    setFormData({
      ...formData,
      foodItems: [...formData.foodItems, '']
    })
  }

  const removeFoodItem = (index) => {
    const newFoodItems = formData.foodItems.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      foodItems: newFoodItems.length === 0 ? [''] : newFoodItems
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.mealType && formData.foodItems.some(item => item.trim()) && formData.calories) {
      const filteredFoodItems = formData.foodItems.filter(item => item.trim())
      addMeal({
        ...formData,
        foodItems: filteredFoodItems,
        calories: parseInt(formData.calories),
        proteins: formData.proteins ? parseFloat(formData.proteins) : null,
        carbs: formData.carbs ? parseFloat(formData.carbs) : null,
        fats: formData.fats ? parseFloat(formData.fats) : null
      })
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900/20 dark:to-teal-900/20">
      <div className="px-4 sm:px-6 lg:px-8 py-8 animate-slideInUp">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 text-6xl">🍽️</div>
                <div className="absolute top-8 right-8 text-4xl">🥗</div>
                <div className="absolute bottom-4 left-1/4 text-5xl">🍎</div>
                <div className="absolute bottom-8 right-1/3 text-3xl">🥑</div>
              </div>
              <div className="relative flex items-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-6 backdrop-blur-sm">
                  <span className="text-4xl">🍽️</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">Add Meal</h1>
                  <p className="text-emerald-100 text-lg">Log your meal and nutrition information</p>
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
                      <label htmlFor="mealType" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Meal Type *
                      </label>
                      <select
                        id="mealType"
                        name="mealType"
                        required
                        className="form-input"
                        value={formData.mealType}
                        onChange={handleChange}
                      >
                        <option value="">Select meal type</option>
                        {mealTypes.map((type) => (
                          <option key={type} value={type.toLowerCase()}>
                            {type}
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
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                      Food Items *
                    </label>
                    <div className="space-y-3">
                      {formData.foodItems.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => handleFoodItemChange(index, e.target.value)}
                              className="form-input"
                              placeholder="Enter food item"
                            />
                          </div>
                          {formData.foodItems.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFoodItem(index)}
                              className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                            >
                              <span className="text-lg">🗑️</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addFoodItem}
                      className="mt-3 text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 text-sm font-medium hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-3 py-2 rounded-lg transition-colors duration-200"
                    >
                      + Add another food item
                    </button>
                  </div>

                  <div>
                    <label htmlFor="calories" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Total Calories *
                    </label>
                    <input
                      type="number"
                      id="calories"
                      name="calories"
                      required
                      min="0"
                      className="form-input"
                      value={formData.calories}
                      onChange={handleChange}
                      placeholder="e.g., 500"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                      Macronutrients (Optional)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="proteins" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Proteins (g)
                        </label>
                        <input
                          type="number"
                          id="proteins"
                          name="proteins"
                          min="0"
                          step="0.1"
                          className="form-input"
                          value={formData.proteins}
                          onChange={handleChange}
                          placeholder="e.g., 25"
                        />
                      </div>

                      <div>
                        <label htmlFor="carbs" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Carbs (g)
                        </label>
                        <input
                          type="number"
                          id="carbs"
                          name="carbs"
                          min="0"
                          step="0.1"
                          className="form-input"
                          value={formData.carbs}
                          onChange={handleChange}
                          placeholder="e.g., 45"
                        />
                      </div>

                      <div>
                        <label htmlFor="fats" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Fats (g)
                        </label>
                        <input
                          type="number"
                          id="fats"
                          name="fats"
                          min="0"
                          step="0.1"
                          className="form-input"
                          value={formData.fats}
                          onChange={handleChange}
                          placeholder="e.g., 15"
                        />
                      </div>
                    </div>
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
                      <span className="mr-2">🍽️</span>
                      Add Meal
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar with Tips and Info */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Nutrition Tips */}
                <div className="card card-hover">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-3">
                        <span className="text-2xl">💡</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Nutrition Tips</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <p className="text-sm text-emerald-800 dark:text-emerald-300 font-medium">
                          🥗 Include a variety of colorful vegetables for maximum nutrients
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                          🍗 Aim for 20-30g of protein per meal for muscle maintenance
                        </p>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-sm text-purple-800 dark:text-purple-300 font-medium">
                          💧 Don't forget to track your water intake throughout the day
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Meal Examples */}
                <div className="card card-hover">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-3">
                        <span className="text-2xl">🍽️</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sample Meals</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                        <h4 className="font-medium text-yellow-800 dark:text-yellow-300 text-sm mb-1">🌅 Healthy Breakfast</h4>
                        <p className="text-xs text-yellow-700 dark:text-yellow-400">Oatmeal + Berries + Nuts (~350 cal)</p>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-700">
                        <h4 className="font-medium text-green-800 dark:text-green-300 text-sm mb-1">🥗 Balanced Lunch</h4>
                        <p className="text-xs text-green-700 dark:text-green-400">Grilled Chicken Salad (~450 cal)</p>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                        <h4 className="font-medium text-blue-800 dark:text-blue-300 text-sm mb-1">🍽️ Light Dinner</h4>
                        <p className="text-xs text-blue-700 dark:text-blue-400">Salmon + Vegetables (~400 cal)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Macros Guide */}
                <div className="card card-hover">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mr-3">
                        <span className="text-2xl">📊</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Macro Guide</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Protein</span>
                        <span className="text-sm font-bold text-pink-600 dark:text-pink-400">4 cal/g</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Carbs</span>
                        <span className="text-sm font-bold text-pink-600 dark:text-pink-400">4 cal/g</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Fats</span>
                        <span className="text-sm font-bold text-pink-600 dark:text-pink-400">9 cal/g</span>
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

export default AddMeal