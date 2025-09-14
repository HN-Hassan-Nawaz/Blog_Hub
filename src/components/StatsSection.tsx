'use client'

import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { mockStats } from '@/data/mockData'
import { 
  DocumentTextIcon,
  UsersIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
  HeartIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
}

function Counter({ end, duration = 2, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        
        setCount(Math.floor(progress * end))
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      
      return () => cancelAnimationFrame(animationFrame)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

const stats = [
  {
    id: 1,
    name: 'Total Posts',
    value: mockStats.totalPosts,
    icon: DocumentTextIcon,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20'
  },
  {
    id: 2,
    name: 'Active Writers',
    value: mockStats.totalUsers,
    icon: UsersIcon,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/20'
  },
  {
    id: 3,
    name: 'Comments',
    value: mockStats.totalComments,
    icon: ChatBubbleLeftIcon,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20'
  },
  {
    id: 4,
    name: 'Total Views',
    value: mockStats.totalViews,
    suffix: '+',
    icon: EyeIcon,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20'
  },
  {
    id: 5,
    name: 'Likes',
    value: mockStats.totalLikes,
    icon: HeartIcon,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/20'
  },
  {
    id: 6,
    name: 'Growth Rate',
    value: 25,
    suffix: '%',
    icon: ArrowTrendingUpIcon,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/20'
  }
]

export function StatsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hover: {
      y: -4,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our <span className="gradient-text">Impact</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of readers and writers who are part of our growing community.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
              >
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
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
                      className={stat.color}
                    >
                      <ArrowTrendingUpIcon className="w-5 h-5" />
                    </motion.div>
                  </div>
                  
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                    {stat.name}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Monthly Views Chart */}
          <motion.div variants={itemVariants}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Monthly Views Growth
              </h3>
              
              <div className="flex items-end justify-between h-32 space-x-2">
                {mockStats.monthlyViews.map((data, index) => (
                  <motion.div
                    key={data.month}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(data.views / 3200) * 100}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex-1 bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg min-h-[20px] relative group cursor-pointer"
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {data.views.toLocaleString()} views
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
                {mockStats.monthlyViews.map((data) => (
                  <span key={data.month} className="text-center flex-1">
                    {data.month}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Ready to Join Our Community?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Start your writing journey or discover amazing content today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Start Writing
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  Browse Articles
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
