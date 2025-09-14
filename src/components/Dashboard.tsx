'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  DocumentTextIcon,
  UsersIcon,
  TagIcon,
  ChartBarIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '@/providers/AuthProvider'
import { mockBlogPosts, mockUsers, mockCategories, mockStats } from '@/data/mockData'

/* ---------------- Sidebar ---------------- */
interface DashboardSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

function DashboardSidebar({ activeTab, setActiveTab }: DashboardSidebarProps) {
  const menuItems = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'posts', name: 'Posts', icon: DocumentTextIcon },
    { id: 'users', name: 'Users', icon: UsersIcon },
    { id: 'categories', name: 'Categories', icon: TagIcon },
  ]

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Dashboard
        </h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-300 ${
                activeTab === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </motion.button>
          ))}
        </nav>
      </div>
    </div>
  )
}

/* ---------------- Stats Card ---------------- */
function StatsCard({ title, value, icon: Icon, color, change }: {
  title: string
  value: string | number
  icon: any
  color: string
  change?: string
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {change && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  )
}

/* ---------------- Tabs ---------------- */
function OverviewTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Posts" value={mockStats.totalPosts} icon={DocumentTextIcon} color="bg-blue-500" change="+12%" />
        <StatsCard title="Total Users" value={mockStats.totalUsers} icon={UsersIcon} color="bg-green-500" change="+8%" />
        <StatsCard title="Total Views" value={`${mockStats.totalViews}+`} icon={EyeIcon} color="bg-purple-500" change="+23%" />
        <StatsCard title="Total Likes" value={mockStats.totalLikes} icon={HeartIcon} color="bg-red-500" change="+15%" />
      </div>
    </div>
  )
}

function PostsTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Posts</h1>
      <p className="text-gray-600 dark:text-gray-400">Posts table goes here...</p>
    </div>
  )
}

function UsersTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Users</h1>
      <p className="text-gray-600 dark:text-gray-400">Users list goes here...</p>
    </div>
  )
}

function CategoriesTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Categories</h1>
      <p className="text-gray-600 dark:text-gray-400">Categories grid goes here...</p>
    </div>
  )
}

/* ---------------- Main Page ---------------- */
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const { user } = useAuth()

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />
      case 'posts': return <PostsTab />
      case 'users': return <UsersTab />
      case 'categories': return <CategoriesTab />
      default: return <OverviewTab />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* If user logged in → show welcome */}
          {user ? (
            <h2 className="text-lg font-semibold mb-4 text-green-600">
              Welcome back, {user.name}! 🎉
            </h2>
          ) : (
            <h2 className="text-lg font-semibold mb-4 text-blue-500">
              Guest Mode: Limited access
            </h2>
          )}

          {renderContent()}
        </motion.div>
      </div>
    </div>
  )
}
