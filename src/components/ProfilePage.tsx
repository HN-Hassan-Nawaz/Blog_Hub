'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  UserIcon,
  EnvelopeIcon,
  CalendarIcon,
  MapPinIcon,
  LinkIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  CameraIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '@/providers/AuthProvider'
import { ProtectedRoute } from './ProtectedRoute'

export function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate writer and tech enthusiast. Love sharing insights about web development, design, and digital innovation.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    twitter: '@johndoe',
    github: 'johndoe'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: 'Passionate writer and tech enthusiast. Love sharing insights about web development, design, and digital innovation.',
      location: 'San Francisco, CA',
      website: 'https://johndoe.dev',
      twitter: '@johndoe',
      github: 'johndoe'
    })
    setIsEditing(false)
  }

  const stats = [
    { label: 'Posts Published', value: '24', icon: '📝' },
    { label: 'Total Views', value: '12.5K', icon: '👀' },
    { label: 'Followers', value: '342', icon: '👥' },
    { label: 'Following', value: '89', icon: '🔗' }
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Cover Photo */}
            <div className="h-48 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
              >
                <CameraIcon className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Profile Info */}
            <div className="relative px-6 pb-6">
              {/* Avatar */}
              <div className="flex items-end justify-between -mt-16 mb-4">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white dark:border-gray-800">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-2 right-2 p-2 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors"
                  >
                    <CameraIcon className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Edit Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                >
                  <PencilIcon className="w-4 h-4" />
                  <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                </motion.button>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        rows={3}
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Website
                        </label>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                      >
                        <CheckIcon className="w-4 h-4" />
                        <span>Save Changes</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                      >
                        <XMarkIcon className="w-4 h-4" />
                        <span>Cancel</span>
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {formData.name}
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {formData.bio}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <EnvelopeIcon className="w-4 h-4" />
                        <span>{formData.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{formData.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <LinkIcon className="w-4 h-4" />
                        <a href={formData.website} className="text-purple-600 hover:text-purple-700 dark:text-purple-400">
                          {formData.website}
                        </a>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>Joined March 2024</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[
                { action: 'Published', item: 'Getting Started with Next.js 14', time: '2 hours ago' },
                { action: 'Updated', item: 'React Best Practices Guide', time: '1 day ago' },
                { action: 'Liked', item: 'The Future of Web Development', time: '3 days ago' },
                { action: 'Commented on', item: 'CSS Grid vs Flexbox', time: '1 week ago' }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {activity.action}
                    </span>
                    <span className="text-purple-600 dark:text-purple-400 ml-1">
                      {activity.item}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
