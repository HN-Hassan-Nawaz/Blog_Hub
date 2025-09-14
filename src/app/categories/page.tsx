import { Metadata } from 'next'
import { CategoriesPage } from '@/components/CategoriesPage'

export const metadata: Metadata = {
  title: 'Categories - BlogHub',
  description: 'Explore our blog categories including technology, design, business, and lifestyle content.',
}

export default function Categories() {
  return <CategoriesPage />
}
