'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { mockCategories, mockBlogPosts } from '@/data/mockData'
import { 
  ComputerDesktopIcon,
  PaintBrushIcon,
  BriefcaseIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const categoryIcons = {
  'technology': ComputerDesktopIcon,
  'design': PaintBrushIcon,
  'business': BriefcaseIcon,
  'lifestyle': HeartIcon
}

export function CategoriesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Browse <span className="gradient-text">Categories</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover content organized by topics that interest you most.
            </p>
          </motion.div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockCategories.map((category) => {
              const IconComponent = categoryIcons[category.slug as keyof typeof categoryIcons]
              const categoryPosts = mockBlogPosts.filter(post => post.category.id === category.id)
              
              return (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                >
                  <Link href={`/categories/${category.slug}`}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden relative"
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                        <div className={`w-full h-full ${category.color} transform rotate-12 scale-150`} />
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon */}
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${category.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          {IconComponent && <IconComponent className="w-8 h-8" />}
                        </div>

                        {/* Category Info */}
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {category.name}
                        </h2>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                          {category.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {category.postCount} articles
                          </span>
                          
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.div>
                        </div>

                        {/* Recent Posts Preview */}
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                            Recent Posts
                          </h3>
                          <div className="space-y-2">
                            {categoryPosts.slice(0, 3).map((post) => (
                              <div key={post.id} className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 truncate">
                                • {post.title}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
