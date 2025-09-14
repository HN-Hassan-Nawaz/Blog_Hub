'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { mockCategories } from '@/data/mockData'
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

export function CategoriesSection() {
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

  const cardVariants = {
    hover: {
      y: -8,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore <span className="gradient-text">Categories</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Dive into our diverse collection of topics and find content that matches your interests.
            </p>
          </motion.div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCategories.map((category) => {
              const IconComponent = categoryIcons[category.slug as keyof typeof categoryIcons]
              
              return (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                >
                  <Link href={`/categories/${category.slug}`}>
                    <motion.div
                      variants={cardVariants}
                      whileHover="hover"
                      className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                        <div className={`w-full h-full ${category.color} transform rotate-12 scale-150`} />
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon */}
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${category.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          {IconComponent && <IconComponent className="w-6 h-6" />}
                        </div>

                        {/* Category Info */}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {category.name}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                          {category.description}
                        </p>

                        {/* Post Count */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {category.postCount} articles
                          </span>
                          
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <Link href="/categories">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                View All Categories
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
