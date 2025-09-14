import { Metadata } from 'next'
import { ProfilePage } from '@/components/ProfilePage'

export const metadata: Metadata = {
  title: 'Profile - BlogHub',
  description: 'Manage your BlogHub profile and account settings.',
}

export default function Profile() {
  return <ProfilePage />
}
