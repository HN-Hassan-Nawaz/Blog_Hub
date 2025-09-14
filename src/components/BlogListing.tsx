'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { BlogCard } from './BlogCard'
import { mockBlogPosts, mockCategories, mockTags } from '@/data/mockData'

export function BlogListing() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = mockBlogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = !selectedCategory || post.category.slug === selectedCategory
      const matchesTag = !selectedTag || post.tags.some(tag => tag.slug === selectedTag)
      
      return matchesSearch && matchesCategory && matchesTag
    })

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        case 'popular':
          return b.views - a.views
        case 'likes':
          return b.likes - a.likes
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, selectedTag, sortBy])

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
              All <span className="gradient-text">Articles</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our complete collection of articles covering technology, design, business, and lifestyle.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                >
                  <option value="">All Categories</option>
                  {mockCategories.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>

                {/* Tag Filter */}
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                >
                  <option value="">All Tags</option>
                  {mockTags.map((tag) => (
                    <option key={tag.id} value={tag.slug}>
                      {tag.name}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="likes">Most Liked</option>
                </select>
              </div>

              {/* Active Filters */}
              {(searchQuery || selectedCategory || selectedTag) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {searchQuery && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                      Search: "{searchQuery}"
                      <button
                        onClick={() => setSearchQuery('')}
                        className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedCategory && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                      Category: {mockCategories.find(c => c.slug === selectedCategory)?.name}
                      <button
                        onClick={() => setSelectedCategory('')}
                        className="ml-2 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedTag && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">
                      Tag: {mockTags.find(t => t.slug === selectedTag)?.name}
                      <button
                        onClick={() => setSelectedTag('')}
                        className="ml-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div variants={itemVariants} className="mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              Showing {filteredAndSortedPosts.length} of {mockBlogPosts.length} articles
            </p>
          </motion.div>

          {/* Posts Grid */}
          <AnimatePresence mode="wait">
            {filteredAndSortedPosts.length > 0 ? (
              <motion.div
                key="posts-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredAndSortedPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    variants={itemVariants}
                    layout
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <FunnelIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Try adjusting your search criteria or filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('')
                    setSelectedTag('')
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
