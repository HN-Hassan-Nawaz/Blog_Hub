'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  HeartIcon, 
  EyeIcon, 
  ClockIcon, 
  ChatBubbleLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { BlogPost } from '@/data/mockData'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [likes, setLikes] = useState(post.likes)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const cardVariants = {
    hover: {
      y: -8,
      rotateX: 5,
      rotateY: 5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.article
      variants={cardVariants}
      whileHover="hover"
      className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 ${
        featured ? 'lg:col-span-2' : ''
      }`}
      style={{ perspective: '1000px' }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Featured Badge */}
        {post.isFeatured && (
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
              ⭐ Featured
            </span>
          </div>
        )}

        {/* Image */}
        <div className="relative h-48 sm:h-64 overflow-hidden">
          <motion.div variants={imageVariants} className="w-full h-full">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
            />
          </motion.div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${post.category.color}`}>
              {post.category.name}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-white ${tag.color}`}
              >
                {tag.name}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className={`font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 ${
            featured ? 'text-xl sm:text-2xl' : 'text-lg'
          }`}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Author & Meta */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {post.author.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
              <ClockIcon className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <EyeIcon className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ChatBubbleLeftIcon className="w-4 h-4" />
                <span>{post.comments.length}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Like Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
              >
                {isLiked ? (
                  <HeartSolidIcon className="w-4 h-4 text-red-500" />
                ) : (
                  <HeartIcon className="w-4 h-4" />
                )}
                <span>{likes}</span>
              </motion.button>

              {/* Read More Arrow */}
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ArrowRightIcon className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
