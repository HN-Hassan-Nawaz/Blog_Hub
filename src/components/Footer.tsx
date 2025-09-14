'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  HeartIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'
import {
  TwitterIcon,
  GitHubIcon,
  LinkedInIcon,
  FacebookIcon
} from './SocialIcons'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Help Center', href: '/help' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  categories: [
    { name: 'Technology', href: '/categories/technology' },
    { name: 'Design', href: '/categories/design' },
    { name: 'Business', href: '/categories/business' },
    { name: 'Lifestyle', href: '/categories/lifestyle' },
  ]
}

const socialLinks = [
  { name: 'Twitter', href: '#', icon: TwitterIcon },
  { name: 'GitHub', href: '#', icon: GitHubIcon },
  { name: 'LinkedIn', href: '#', icon: LinkedInIcon },
  { name: 'Facebook', href: '#', icon: FacebookIcon },
]

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold gradient-text">BlogHub</span>
            </motion.div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Discover amazing stories, insights, and knowledge from our community of writers. 
              Join us in exploring the world of technology, design, and innovation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Categories Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Subscribe to our newsletter for the latest articles and updates.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <EnvelopeIcon className="w-4 h-4" />
              <span>contact@bloghub.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <PhoneIcon className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPinIcon className="w-4 h-4" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
            <span>© 2024 BlogHub. Made with</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                color: ['#ef4444', '#f97316', '#ef4444']
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <HeartIcon className="w-4 h-4 text-red-500" />
            </motion.div>
            <span>by our team</span>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/terms"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
