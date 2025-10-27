import { useState } from 'react'
import { ArrowUpRight, ArrowDownLeft, Filter, Calendar, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Transactions() {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const [transactions] = useState([
    { id: 1, name: 'Coffee Shop', amount: -8.50, category: 'Food', date: '2024-03-15', type: 'expense' },
    { id: 2, name: 'Freelance Work', amount: +500, category: 'Income', date: '2024-03-14', type: 'income' },
    { id: 3, name: 'Uber Ride', amount: -15.00, category: 'Transport', date: '2024-03-14', type: 'expense' },
    { id: 4, name: 'Grocery Shopping', amount: -85.50, category: 'Food', date: '2024-03-13', type: 'expense' },
    { id: 5, name: 'Netflix Subscription', amount: -15.99, category: 'Bills', date: '2024-03-12', type: 'expense' },
    { id: 6, name: 'Part-time Job', amount: +300, category: 'Income', date: '2024-03-10', type: 'income' },
    { id: 7, name: 'Restaurant', amount: -45.00, category: 'Food', date: '2024-03-10', type: 'expense' },
    { id: 8, name: 'Movie Tickets', amount: -24.00, category: 'Entertainment', date: '2024-03-09', type: 'expense' },
    { id: 9, name: 'Amazon Purchase', amount: -67.99, category: 'Shopping', date: '2024-03-08', type: 'expense' },
    { id: 10, name: 'Tutoring Session', amount: -50.00, category: 'Education', date: '2024-03-07', type: 'expense' },
  ])

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter = filter === 'all' || transaction.type === filter
    const matchesSearch = transaction.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = Math.abs(transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0))

  const groupTransactionsByDate = () => {
    const groups: Record<string, typeof transactions> = {}
    filteredTransactions.forEach((transaction) => {
      const date = new Date(transaction.date).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(transaction)
    })
    return groups
  }

  const groupedTransactions = groupTransactionsByDate()

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card bg-gradient-to-br from-green-500 to-green-600 text-white"
        >
          <p className="text-sm opacity-90 mb-1">Total Income</p>
          <p className="text-3xl font-bold">${totalIncome}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card bg-gradient-to-br from-red-500 to-red-600 text-white"
        >
          <p className="text-sm opacity-90 mb-1">Total Expenses</p>
          <p className="text-3xl font-bold">${totalExpenses.toFixed(2)}</p>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {(['all', 'income', 'expense'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filter === filterType
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        <AnimatePresence>
          {Object.entries(groupedTransactions).map(([date, transactions]) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="sticky top-20 bg-gray-50 dark:bg-gray-900 py-2 px-2 z-10">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">{date}</p>
              </div>
              <div className="space-y-2">
                {transactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="card hover:shadow-xl transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          transaction.type === 'income'
                            ? 'bg-green-100 dark:bg-green-900'
                            : 'bg-red-100 dark:bg-red-900'
                        }`}>
                          {transaction.type === 'income' ? (
                            <ArrowUpRight className="w-6 h-6 text-green-600 dark:text-green-400" />
                          ) : (
                            <ArrowDownLeft className="w-6 h-6 text-red-600 dark:text-red-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{transaction.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${
                          transaction.type === 'income'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {transaction.type === 'expense' ? '-' : '+'}${Math.abs(transaction.amount)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTransactions.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
        </motion.div>
      )}
    </div>
  )
}

