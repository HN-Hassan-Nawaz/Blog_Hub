import { Metadata } from 'next'
import { SettingsPage } from '@/components/SettingsPage'

export const metadata: Metadata = {
  title: 'Settings - BlogHub',
  description: 'Manage your BlogHub account settings and preferences.',
}

export default function Settings() {
  return <SettingsPage />
}
