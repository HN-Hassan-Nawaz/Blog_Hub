'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
// import { Footer } from './Footer'
import {
  DocumentTextIcon,
  UsersIcon,
  TagIcon,
  ChartBarIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '@/providers/AuthProvider'
import { mockBlogPosts, mockUsers, mockCategories, mockStats } from '@/data/mockData'

/* ---------------- Sidebar (Desktop only) ---------------- */
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
    <div className="hidden sm:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen pt-6">
      <nav className="p-4 space-y-2">
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
  )
}

/* ---------------- Mobile Buttons ---------------- */
function MobileTabButtons({ activeTab, setActiveTab }: DashboardSidebarProps) {
  const menuItems = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'posts', name: 'Posts', icon: DocumentTextIcon },
    { id: 'users', name: 'Users', icon: UsersIcon },
    { id: 'categories', name: 'Categories', icon: TagIcon },
  ]

  return (
    <div className="sm:hidden sticky top-0 z-30 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex justify-around py-2">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center text-xs ${
            activeTab === item.id
              ? 'text-blue-600 dark:text-blue-400 font-semibold'
              : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          <item.icon className="w-5 h-5 mb-1" />
          {item.name}
        </button>
      ))}
    </div>
  )
}



/* ---------------- Tabs ---------------- */
function OverviewTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border">
          <p className="text-gray-500">Total Posts</p>
          <p className="text-2xl font-bold">{mockStats.totalPosts}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border">
          <p className="text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">{mockStats.totalUsers}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border">
          <p className="text-gray-500">Total Views</p>
          <p className="text-2xl font-bold">{mockStats.totalViews}+</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border">
          <p className="text-gray-500">Total Likes</p>
          <p className="text-2xl font-bold">{mockStats.totalLikes}</p>
        </div>
      </div>
    </div>
  )
}

function PostsTab() {
  return (
    <div className="space-y-6">
      {/* Header with search + action button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Manage Posts
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search posts..."
            className="px-3 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-800 text-sm flex-1"
          />
          <button className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
            <PlusIcon className="w-4 h-4 mr-1" /> Add Post
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow border">
        <table className="w-full text-xs sm:text-sm min-w-[250px]">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-2 py-2 text-left">Title</th>
              <th className="px-2 py-2 text-left">Author</th>
              <th className="px-2 py-2 text-left">Category</th>
              <th className="px-2 py-2 text-left">Stats</th>
            </tr>
          </thead>
          <tbody>
            {mockBlogPosts.map((post) => (
              <tr
                key={post.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-2 py-2">{post.title}</td>
                <td className="px-2 py-2">{post.author.name}</td>
                <td className="px-2 py-2">{post.category.name}</td>
                <td className="px-2 py-2">
                  {/* Responsive stats: row on desktop, column on mobile */}
                  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-1 sm:space-y-0">
                    <div className="flex items-center">
                      <EyeIcon className="w-3 h-3 mr-1" /> {post.views}
                    </div>
                    <div className="flex items-center">
                      <HeartIcon className="w-3 h-3 mr-1" /> {post.likes}
                    </div>
                    <div className="flex items-center">
                      <ChatBubbleLeftIcon className="w-3 h-3 mr-1" />{" "}
                      {post.comments.length}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}



function UsersTab() {
  return (
    <div className="space-y-6">
      {/* Header with search + action button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Manage Users
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search users..."
            className="px-3 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-800 text-sm flex-1"
          />
          <button className="flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
            <PlusIcon className="w-4 h-4 mr-1" /> Add User
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow border">
        <table className="w-full text-sm min-w-[280px] sm:min-w-[380px]">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-3 py-2 text-left">User</th>
              <th className="px-3 py-2 text-left">Role</th>
              <th className="px-3 py-2 text-left">Join Date</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-3 py-2">{user.name}</td>
                <td className="px-3 py-2">{user.role}</td>
                <td className="px-3 py-2 text-xs sm:text-sm">
                  {new Date(user.joinDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


function CategoriesTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border"
          >
            <h3 className="text-lg font-semibold">{category.name}</h3>
            <p className="text-gray-500 text-sm">{category.description}</p>
            <p className="text-gray-400 text-xs mt-2">{category.postCount} posts</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Main Dashboard ---------------- */
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const { user } = useAuth()

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />
      case 'posts':
        return <PostsTab />
      case 'users':
        return <UsersTab />
      case 'categories':
        return <CategoriesTab />
      default:
        return <OverviewTab />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar (Desktop) */}
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          {/* Mobile Tab Buttons */}
          <MobileTabButtons activeTab={activeTab} setActiveTab={setActiveTab} />

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
        </main>
      </div>

     
    </div>
  )
}
