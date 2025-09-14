'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bars3Icon, 
  XMarkIcon, 
  MagnifyingGlassIcon,
  HomeIcon,
  DocumentTextIcon,
  TagIcon,
  ChartBarIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'
import { ThemeToggle } from './ThemeToggle'
import { useAuth } from '@/providers/AuthProvider'

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Blog', href: '/blog', icon: DocumentTextIcon },
  { name: 'Categories', href: '/categories', icon: TagIcon },
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
    router.push('/')
  }

  const logoVariants = {
    hover: {
      scale: 1.05,
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.3 }
    }
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  const menuItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            whileHover="hover"
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-white font-bold text-lg">B</span>
              </motion.div>
              <span className="text-xl font-bold gradient-text">BlogHub</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <motion.div
                    key={item.name}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <Link
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-1 ${
                        isActive
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </motion.button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Authentication */}
            {user ? (
              <div className="relative hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
                    >
                      <Link
                        href="/dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <ChartBarIcon className="w-4 h-4 mr-3" />
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <UserIcon className="w-4 h-4 mr-3" />
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <Cog6ToothIcon className="w-4 h-4 mr-3" />
                        Settings
                      </Link>
                      <hr className="my-1 border-gray-200 dark:border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                      >
                        <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Bars3Icon className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg mt-2 border border-gray-200 dark:border-gray-700">
                {navigation.map((item, i) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.name}
                      custom={i}
                      variants={menuItemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 flex items-center space-x-2 ${
                          isActive
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  )
                })}
                
                {/* Mobile Authentication */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  {user ? (
                    <>
                      <div className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-300">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-medium">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm font-medium">{user.name}</span>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                      >
                        <UserIcon className="w-5 h-5 mr-2" />
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                      >
                        <Cog6ToothIcon className="w-5 h-5 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsOpen(false)
                        }}
                        className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                      >
                        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
