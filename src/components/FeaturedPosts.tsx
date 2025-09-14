'use client'

import { motion } from 'framer-motion'
import { BlogCard } from './BlogCard'
import { mockBlogPosts } from '@/data/mockData'

export function FeaturedPosts() {
  const featuredPosts = mockBlogPosts.filter(post => post.isFeatured)
  const recentPosts = mockBlogPosts.filter(post => !post.isFeatured).slice(0, 4)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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
    <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
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
              Featured <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our most popular and trending articles, handpicked by our editorial team.
            </p>
          </motion.div>

          {/* Featured Posts Grid */}
          {featuredPosts.length > 0 && (
            <motion.div variants={itemVariants} className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    variants={itemVariants}
                    className={index === 0 ? "lg:col-span-2" : ""}
                  >
                    <BlogCard post={post} featured={index === 0} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Recent Posts */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Recent Articles
              </h3>
              <motion.a
                href="/blog"
                whileHover={{ x: 4 }}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center space-x-1"
              >
                <span>View all</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentPosts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
