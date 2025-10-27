import { useState } from 'react'
import { ArrowUpRight, ArrowDownLeft, TrendingUp, TrendingDown } from 'lucide-react'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import AIInsights from '../components/AIInsights'

export default function Dashboard() {
  const [userName] = useState(localStorage.getItem('userName') || 'User')
  const [userIncome] = useState(Number(localStorage.getItem('monthlyIncome')) || 0)

  const [expenses] = useState([
    { category: 'Food', amount: 450 },
    { category: 'Transport', amount: 120 },
    { category: 'Entertainment', amount: 200 },
    { category: 'Shopping', amount: 350 },
    { category: 'Bills', amount: 180 },
  ])

  const [monthlyData] = useState([
    { month: 'Jan', savings: 1200 },
    { month: 'Feb', savings: 1500 },
    { month: 'Mar', savings: 1100 },
    { month: 'Apr', savings: 1800 },
    { month: 'May', savings: 1600 },
    { month: 'Jun', savings: 1400 },
  ])

  const [recentTransactions] = useState([
    { id: 1, name: 'Coffee Shop', amount: -8.50, category: 'Food', date: '2024-03-15', type: 'expense' },
    { id: 2, name: 'Freelance Work', amount: +500, category: 'Income', date: '2024-03-14', type: 'income' },
    { id: 3, name: 'Uber Ride', amount: -15.00, category: 'Transport', date: '2024-03-14', type: 'expense' },
    { id: 4, name: 'Grocery Shopping', amount: -85.50, category: 'Food', date: '2024-03-13', type: 'expense' },
  ])

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const totalSavings = userIncome - totalExpenses
  const savingsPercentage: string = userIncome > 0 ? ((totalSavings / userIncome) * 100).toFixed(1) : '0'

  const COLORS = ['#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899']

  const expenseData = expenses.map((expense) => ({
    name: expense.category,
    value: expense.amount,
  }))

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-6 text-white shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-2">Hey {userName}! 👋</h1>
        <p className="text-white/90">Here's your financial overview</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-gradient-to-br from-green-500 to-green-600 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 text-sm">Income</span>
            <ArrowUpRight className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold">${userIncome}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card bg-gradient-to-br from-red-500 to-red-600 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 text-sm">Expenses</span>
            <ArrowDownLeft className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold">${totalExpenses}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Savings</span>
            {parseFloat(savingsPercentage) >= 20 ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500" />
            )}
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">${totalSavings}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{savingsPercentage}% of income</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Remaining Days</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">16</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Until month end</p>
        </motion.div>
      </div>

      {/* AI Insights Widget */}
      <AIInsights savingsPercentage={parseFloat(savingsPercentage)} />

      {/* Expense Breakdown Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Expense Breakdown</h2>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={expenseData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={70}
              fill="#8884d8"
              dataKey="value"
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value}`} />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Monthly Savings Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Monthly Savings Trend</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              formatter={(value) => [`$${value}`, 'Savings']}
            />
            <Line
              type="monotone"
              dataKey="savings"
              stroke="#0ea5e9"
              strokeWidth={3}
              dot={{ fill: '#0ea5e9', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Transactions</h2>
          <button className="text-primary-600 dark:text-primary-400 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {recentTransactions.slice(0, 3).map((transaction) => (
            <motion.div
              key={transaction.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'income'
                    ? 'bg-green-100 dark:bg-green-900'
                    : 'bg-red-100 dark:bg-red-900'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowDownLeft className="w-5 h-5 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{transaction.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.category}</p>
                </div>
              </div>
              <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                ${Math.abs(transaction.amount)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

