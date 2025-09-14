import { Metadata } from 'next'
import { BlogListing } from '@/components/BlogListing'

export const metadata: Metadata = {
  title: 'Blog - All Articles',
  description: 'Explore our collection of articles on technology, design, business, and lifestyle. Discover insights from our community of writers.',
}

export default function BlogPage() {
  return <BlogListing />
}
