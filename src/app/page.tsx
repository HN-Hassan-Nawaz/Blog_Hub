import { Hero } from '@/components/Hero'
import { FeaturedPosts } from '@/components/FeaturedPosts'
import { CategoriesSection } from '@/components/CategoriesSection'
import { StatsSection } from '@/components/StatsSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPosts />
      <CategoriesSection />
      <StatsSection />
    </>
  )
}
