'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'dark' ? 0 : 1,
          rotate: theme === 'dark' ? 180 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <SunIcon className="w-5 h-5 text-yellow-500" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          rotate: theme === 'dark' ? 0 : -180,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <MoonIcon className="w-5 h-5 text-blue-400" />
      </motion.div>
    </motion.button>
  )
}
