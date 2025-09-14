import { Metadata } from 'next'
import Dashboard from '@/components/Dashboard'

export const metadata: Metadata = {
  title: 'Dashboard - BlogHub',
  description: 'Manage your blog posts, users, and analytics.',
}

export default function DashboardPage() {
  return <Dashboard />
}