import { useState } from 'react'
import { Target, Plus, Trophy, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function Goals() {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'Vacation Fund',
      target: 2000,
      current: 1500,
      deadline: '2024-06-01',
      category: 'Travel',
    },
    {
      id: 2,
      name: 'Emergency Fund',
      target: 5000,
      current: 3200,
      deadline: '2024-12-31',
      category: 'Emergency',
    },
    {
      id: 3,
      name: 'New Laptop',
      target: 1500,
      current: 800,
      deadline: '2024-08-15',
      category: 'Gadgets',
    },
  ])

  const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444']

  const getProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const calculateDaysUntil = (deadline: string) => {
    const today = new Date()
    const targetDate = new Date(deadline)
    const diffTime = targetDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const goalData = goals.map((goal) => ({
    name: goal.name,
    percentage: getProgress(goal.current, goal.target),
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Savings Goals</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track and achieve your financial targets</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-xl shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Overall Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-br from-primary-500 to-purple-600 text-white"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-6 h-6" />
            <h2 className="text-xl font-bold">Overall Progress</h2>
          </div>
        </div>
        <div className="space-y-2">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{goal.name}</span>
                <span className="text-sm">{getProgress(goal.current, goal.target).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgress(goal.current, goal.target)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Goals Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Progress Overview</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={goalData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name}: ${percentage.toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="percentage"
            >
              {goalData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Individual Goal Cards */}
      <div className="space-y-4">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="card hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{goal.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{goal.category}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                  {getProgress(goal.current, goal.target).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgress(goal.current, goal.target)}%` }}
                  transition={{ duration: 1, delay: 0.2 * index }}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <TrendingUp className="w-4 h-4" />
                <span>{calculateDaysUntil(goal.deadline)} days remaining</span>
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                ${(goal.target - goal.current).toLocaleString()} to go
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 gap-4"
      >
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <p className="text-sm opacity-90 mb-1">Total Target</p>
          <p className="text-2xl font-bold">${goals.reduce((sum, g) => sum + g.target, 0).toLocaleString()}</p>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <p className="text-sm opacity-90 mb-1">Saved</p>
          <p className="text-2xl font-bold">${goals.reduce((sum, g) => sum + g.current, 0).toLocaleString()}</p>
        </div>
      </motion.div>
    </div>
  )
}

