'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
          className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ExclamationTriangleIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
        </motion.div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Something went wrong!
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>
        
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="btn-primary w-full"
          >
            Try Again
          </motion.button>
          
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary w-full inline-block"
          >
            Go Home
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}
