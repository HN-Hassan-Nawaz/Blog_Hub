'use client'

import { motion } from 'framer-motion'
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline'
import { Hero3D } from './Hero3D'

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20">
      {/* 3D Background */}
      <Hero3D />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/5 dark:to-purple-600/5" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Welcome to the Future of Blogging
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block">Discover</span>
              <span className="block gradient-text">Amazing Stories</span>
              <span className="block">& Insights</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants}>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join our community of writers and readers. Explore cutting-edge technology, 
              stunning design, innovative business strategies, and inspiring lifestyle content.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants}>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>1000+ Articles</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>50+ Writers</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>10K+ Readers</span>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="group btn-primary flex items-center space-x-2 text-lg px-8 py-4"
              >
                <span>Start Reading</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRightIcon className="w-5 h-5" />
                </motion.div>
              </motion.button>
              
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="group btn-secondary flex items-center space-x-2 text-lg px-8 py-4"
              >
                <PlayIcon className="w-5 h-5" />
                <span>Watch Demo</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center space-y-2 text-gray-400 dark:text-gray-500"
            >
              <span className="text-sm">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  )
}
