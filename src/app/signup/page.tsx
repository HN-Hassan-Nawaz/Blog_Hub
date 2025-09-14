import { Metadata } from 'next'
import { SignupForm } from '@/components/SignupForm'

export const metadata: Metadata = {
  title: 'Sign Up - BlogHub',
  description: 'Create your BlogHub account to start writing and sharing amazing content.',
}

export default function SignupPage() {
  return <SignupForm />
}
