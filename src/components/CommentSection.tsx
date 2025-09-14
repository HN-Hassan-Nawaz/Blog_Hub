'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HeartIcon, 
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { Comment } from '@/data/mockData'

interface CommentSectionProps {
  comments: Comment[]
}

interface CommentItemProps {
  comment: Comment
  level?: number
}

function CommentItem({ comment, level = 0 }: CommentItemProps) {
  const [isLiked, setIsLiked] = useState(comment.isLiked || false)
  const [likes, setLikes] = useState(comment.likes)
  const [showReplies, setShowReplies] = useState(true)
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState('')

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleReply = () => {
    if (replyText.trim()) {
      // In a real app, this would submit to an API
      console.log('Reply:', replyText)
      setReplyText('')
      setIsReplying(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${level > 0 ? 'ml-8 pl-4 border-l-2 border-gray-200 dark:border-gray-700' : ''}`}
    >
      <div className="flex space-x-3">
        <Image
          src={comment.author.avatar}
          alt={comment.author.name}
          width={40}
          height={40}
          className="rounded-full flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {comment.author.name}
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <EllipsisHorizontalIcon className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {comment.content}
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4 mt-2 ml-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
            >
              {isLiked ? (
                <HeartSolidIcon className="w-4 h-4 text-red-500" />
              ) : (
                <HeartIcon className="w-4 h-4" />
              )}
              <span>{likes}</span>
            </motion.button>
            
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
            >
              <ChatBubbleLeftIcon className="w-4 h-4" />
              <span>Reply</span>
            </button>
          </div>
          
          {/* Reply Form */}
          <AnimatePresence>
            {isReplying && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 ml-4"
              >
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                      <button
                        onClick={() => setIsReplying(false)}
                        className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleReply}
                        disabled={!replyText.trim()}
                        className="px-4 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Nested Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4">
              {showReplies && (
                <div className="space-y-4">
                  {comment.replies.map((reply) => (
                    <CommentItem key={reply.id} comment={reply} level={level + 1} />
                  ))}
                </div>
              )}
              
              {comment.replies.length > 0 && (
                <button
                  onClick={() => setShowReplies(!showReplies)}
                  className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  {showReplies ? 'Hide' : 'Show'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function CommentSection({ comments }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!newComment.trim()) return
    
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('New comment:', newComment)
    setNewComment('')
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Comments ({comments.length})
        </h2>
      </div>

      {/* Add Comment Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Join the Discussion
        </h3>
        
        <div className="flex space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">You</span>
          </div>
          
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
            
            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Be respectful and constructive in your comments.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!newComment.trim() || isSubmitting}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <PlusIcon className="w-4 h-4" />
                    <span>Post Comment</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <div className="text-center py-12">
            <ChatBubbleLeftIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No comments yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Be the first to share your thoughts on this article.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
