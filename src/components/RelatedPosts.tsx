'use client'

import { motion } from 'framer-motion'
import { BlogCard } from './BlogCard'
import { BlogPost, mockBlogPosts } from '@/data/mockData'

interface RelatedPostsProps {
  currentPost: BlogPost
}

export function RelatedPosts({ currentPost }: RelatedPostsProps) {
  // Find related posts based on category and tags
  const relatedPosts = mockBlogPosts
    .filter(post => post.id !== currentPost.id)
    .map(post => {
      let score = 0
      
      // Same category gets higher score
      if (post.category.id === currentPost.category.id) {
        score += 3
      }
      
      // Shared tags get points
      const sharedTags = post.tags.filter(tag => 
        currentPost.tags.some(currentTag => currentTag.id === tag.id)
      )
      score += sharedTags.length
      
      return { post, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.post)

  if (relatedPosts.length === 0) {
    return null
  }

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Related <span className="gradient-text">Articles</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Discover more content you might find interesting
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <motion.div
            key={post.id}
            variants={itemVariants}
          >
            <BlogCard post={post} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
