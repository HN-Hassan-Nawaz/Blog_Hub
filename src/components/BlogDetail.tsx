'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { 
  HeartIcon, 
  EyeIcon, 
  ClockIcon, 
  ShareIcon,
  BookmarkIcon,
  ArrowLeftIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'
import { BlogPost } from '@/data/mockData'
import { RelatedPosts } from './RelatedPosts'
import { CommentSection } from './CommentSection'
import { SocialShare } from './SocialShare'

interface BlogDetailProps {
  post: BlogPost
}

export function BlogDetail({ post }: BlogDetailProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likes, setLikes] = useState(post.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-8 left-8 z-10"
        >
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-colors duration-300"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </motion.div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Category Badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${post.category.color}`}>
                  {post.category.name}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center space-x-3">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-sm text-white/60">{post.author.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <ClockIcon className="w-4 h-4" />
                  <span className="text-sm">{post.readTime} min read</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <EyeIcon className="w-4 h-4" />
                  <span className="text-sm">{post.views} views</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/tags/${tag.slug}`}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${tag.color} hover:opacity-80 transition-opacity duration-300`}
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>

              {/* Article Body */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        {children}
                      </p>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className
                      return isInline ? (
                        <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono text-blue-600 dark:text-blue-400">
                          {children}
                        </code>
                      ) : (
                        <code className={className}>{children}</code>
                      )
                    },
                    pre: ({ children }) => (
                      <pre className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto mb-6">
                        {children}
                      </pre>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg mb-6 italic">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Author Bio */}
              <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <div className="flex items-start space-x-4">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {post.author.name}
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-2 capitalize">
                      {post.author.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {post.author.bio}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky top-24 space-y-6"
            >
              {/* Action Buttons */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Actions
                </h3>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLike}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300"
                  >
                    {isLiked ? (
                      <HeartSolidIcon className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5 text-gray-500" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">
                      {likes} Likes
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBookmark}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300"
                  >
                    {isBookmarked ? (
                      <BookmarkSolidIcon className="w-5 h-5 text-blue-500" />
                    ) : (
                      <BookmarkIcon className="w-5 h-5 text-gray-500" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">
                      Bookmark
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* Social Share */}
              <SocialShare post={post} />

              {/* Table of Contents */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-2 text-sm">
                  <a href="#introduction" className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                    Introduction
                  </a>
                  <a href="#main-content" className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                    Main Content
                  </a>
                  <a href="#conclusion" className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                    Conclusion
                  </a>
                </nav>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <CommentSection comments={post.comments} />
        </div>
      </div>

      {/* Related Posts */}
      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <RelatedPosts currentPost={post} />
        </div>
      </div>
    </div>
  )
}
