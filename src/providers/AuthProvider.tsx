'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: 'admin' | 'author' | 'user'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    await new Promise(res => setTimeout(res, 1000))

    let mockUser: User | null = null
    if (email === 'admin@bloghub.com' && password === 'password') {
      mockUser = { id: '1', name: 'John Doe', email, avatar: 'https://i.pravatar.cc/150?u=admin', role: 'admin' }
    } else if (email === 'author@bloghub.com' && password === 'password') {
      mockUser = { id: '2', name: 'Jane Smith', email, avatar: 'https://i.pravatar.cc/150?u=author', role: 'author' }
    }

    if (mockUser) {
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    await new Promise(res => setTimeout(res, 1000))

    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=fff`,
      role: 'user'
    }

    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
