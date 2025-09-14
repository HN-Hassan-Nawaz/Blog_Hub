import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogDetail } from '@/components/BlogDetail'
import { mockBlogPosts } from '@/data/mockData'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = mockBlogPosts.find(p => p.slug === params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags.map(tag => tag.name),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  }
}

export async function generateStaticParams() {
  return mockBlogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = mockBlogPosts.find(p => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return <BlogDetail post={post} />
}
