import { Metadata } from 'next'
import { LoginForm } from '@/components/LoginForm'

export const metadata: Metadata = {
  title: 'Login - BlogHub',
  description: 'Sign in to your BlogHub account to access exclusive content and features.',
}

export default function LoginPage() {
  return <LoginForm />
}
