import { motion } from 'framer-motion'
import Link from 'next/link'
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="btn-primary w-full inline-flex items-center justify-center space-x-2"
          >
            <HomeIcon className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          
          <Link
            href="/blog"
            className="btn-secondary w-full inline-flex items-center justify-center space-x-2"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
            <span>Browse Articles</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
