'use client'

import { motion } from 'framer-motion'
import { BlogPost } from '@/data/mockData'
import { TwitterIcon, FacebookIcon, LinkedInIcon } from './SocialIcons'
import { LinkIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

interface SocialShareProps {
  post: BlogPost
}

export function SocialShare({ post }: SocialShareProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `Check out this article: ${post.title}`

  const shareLinks = [
    {
      name: 'Twitter',
      icon: TwitterIcon,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: LinkedInIcon,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
    },
    {
      name: 'Email',
      icon: EnvelopeIcon,
      url: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
      color: 'hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-400'
    }
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      // In a real app, you'd show a toast notification here
      console.log('Link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Share Article
      </h3>
      
      <div className="space-y-3">
        {shareLinks.map((social) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center space-x-3 px-4 py-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 ${social.color}`}
          >
            <social.icon className="w-5 h-5" />
            <span className="text-sm font-medium">Share on {social.name}</span>
          </motion.a>
        ))}
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={copyToClipboard}
          className="w-full flex items-center space-x-3 px-4 py-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300"
        >
          <LinkIcon className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Copy Link</span>
        </motion.button>
      </div>
    </div>
  )
}
