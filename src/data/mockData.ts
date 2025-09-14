export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'author' | 'user';
  bio?: string;
  joinDate: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  postCount: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  likes: number;
  replies?: Comment[];
  isLiked?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: User;
  category: Category;
  tags: Tag[];
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  likes: number;
  views: number;
  comments: Comment[];
  isLiked?: boolean;
  isFeatured?: boolean;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'admin',
    bio: 'Full-stack developer and tech enthusiast',
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: 'author',
    bio: 'UI/UX designer passionate about creating beautiful experiences',
    joinDate: '2023-02-20'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'author',
    bio: 'DevOps engineer and cloud architecture specialist',
    joinDate: '2023-03-10'
  }
];

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Technology',
    slug: 'technology',
    description: 'Latest trends in technology and software development',
    color: 'bg-blue-500',
    postCount: 15
  },
  {
    id: '2',
    name: 'Design',
    slug: 'design',
    description: 'UI/UX design principles and creative inspiration',
    color: 'bg-purple-500',
    postCount: 8
  },
  {
    id: '3',
    name: 'Business',
    slug: 'business',
    description: 'Business strategies and entrepreneurship insights',
    color: 'bg-green-500',
    postCount: 12
  },
  {
    id: '4',
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Personal development and lifestyle tips',
    color: 'bg-pink-500',
    postCount: 6
  }
];

// Mock Tags
export const mockTags: Tag[] = [
  { id: '1', name: 'React', slug: 'react', color: 'bg-cyan-500' },
  { id: '2', name: 'Next.js', slug: 'nextjs', color: 'bg-gray-800' },
  { id: '3', name: 'TypeScript', slug: 'typescript', color: 'bg-blue-600' },
  { id: '4', name: 'Tailwind CSS', slug: 'tailwind', color: 'bg-teal-500' },
  { id: '5', name: 'JavaScript', slug: 'javascript', color: 'bg-yellow-500' },
  { id: '6', name: 'Web Development', slug: 'web-dev', color: 'bg-indigo-500' },
  { id: '7', name: 'UI/UX', slug: 'ui-ux', color: 'bg-purple-500' },
  { id: '8', name: 'Performance', slug: 'performance', color: 'bg-red-500' },
  { id: '9', name: 'SEO', slug: 'seo', color: 'bg-green-600' },
  { id: '10', name: 'Mobile', slug: 'mobile', color: 'bg-orange-500' }
];

// Mock Comments
const mockComments: Comment[] = [
  {
    id: '1',
    content: 'Great article! This really helped me understand the concepts better.',
    author: mockUsers[1],
    createdAt: '2024-01-15T10:30:00Z',
    likes: 5,
    isLiked: false,
    replies: [
      {
        id: '2',
        content: 'I agree! The examples were particularly helpful.',
        author: mockUsers[2],
        createdAt: '2024-01-15T11:00:00Z',
        likes: 2,
        isLiked: true
      }
    ]
  },
  {
    id: '3',
    content: 'Thanks for sharing this. Looking forward to more content like this!',
    author: mockUsers[0],
    createdAt: '2024-01-16T09:15:00Z',
    likes: 3,
    isLiked: false
  }
];

// Mock Blog Posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14 and App Router',
    slug: 'getting-started-nextjs-14-app-router',
    excerpt: 'Learn how to build modern web applications with Next.js 14 and the new App Router. This comprehensive guide covers everything from setup to deployment.',
    content: `# Getting Started with Next.js 14 and App Router

Next.js 14 introduces significant improvements to the App Router, making it easier than ever to build performant React applications.

## What's New in Next.js 14

The latest version of Next.js brings several exciting features:

- **Improved Performance**: Faster builds and optimized runtime performance
- **Enhanced Developer Experience**: Better error messages and debugging tools
- **New Caching Strategies**: More granular control over caching behavior

## Setting Up Your First Project

To get started with Next.js 14, run the following command:

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind --eslint --app
\`\`\`

This will create a new Next.js project with TypeScript, Tailwind CSS, and ESLint configured.

## App Router Fundamentals

The App Router uses a file-system based router where folders define routes. Here's the basic structure:

\`\`\`
app/
├── layout.tsx
├── page.tsx
├── loading.tsx
├── error.tsx
└── blog/
    ├── page.tsx
    └── [slug]/
        └── page.tsx
\`\`\`

## Conclusion

Next.js 14 with App Router provides a powerful foundation for building modern web applications. The improved performance and developer experience make it an excellent choice for your next project.`,
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    author: mockUsers[0],
    category: mockCategories[0],
    tags: [mockTags[1], mockTags[2], mockTags[5]],
    publishedAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z',
    readTime: 8,
    likes: 24,
    views: 156,
    comments: mockComments,
    isLiked: false,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Mastering Tailwind CSS: Advanced Techniques',
    slug: 'mastering-tailwind-css-advanced-techniques',
    excerpt: 'Discover advanced Tailwind CSS techniques to create stunning, responsive designs. Learn about custom utilities, component patterns, and optimization strategies.',
    content: `# Mastering Tailwind CSS: Advanced Techniques

Tailwind CSS has revolutionized how we approach styling in modern web development. Let's explore some advanced techniques to take your designs to the next level.

## Custom Utility Classes

Create your own utility classes by extending Tailwind's configuration:

\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      }
    }
  }
}
\`\`\`

## Component Patterns

Use \`@apply\` directive to create reusable component classes:

\`\`\`css
.btn-primary {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
}
\`\`\`

## Dark Mode Implementation

Tailwind makes dark mode implementation straightforward:

\`\`\`html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content that adapts to dark mode
</div>
\`\`\`

## Performance Optimization

- Use PurgeCSS to remove unused styles
- Leverage JIT mode for faster builds
- Optimize your build process with proper configuration

## Conclusion

These advanced techniques will help you create more maintainable and performant stylesheets with Tailwind CSS.`,
    featuredImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    author: mockUsers[1],
    category: mockCategories[1],
    tags: [mockTags[3], mockTags[6], mockTags[5]],
    publishedAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z',
    readTime: 6,
    likes: 18,
    views: 89,
    comments: [],
    isLiked: true,
    isFeatured: false
  },
  {
    id: '3',
    title: 'Building Scalable React Applications',
    slug: 'building-scalable-react-applications',
    excerpt: 'Learn the best practices for building scalable React applications. Explore state management, component architecture, and performance optimization techniques.',
    content: `# Building Scalable React Applications

As your React application grows, maintaining code quality and performance becomes increasingly important. Here are key strategies for building scalable React apps.

## Component Architecture

### Atomic Design Principles

Structure your components using atomic design methodology:

- **Atoms**: Basic building blocks (buttons, inputs)
- **Molecules**: Simple groups of atoms (search form)
- **Organisms**: Complex components (header, product list)
- **Templates**: Page-level layouts
- **Pages**: Specific instances of templates

### Component Composition

Favor composition over inheritance:

\`\`\`jsx
// Good: Composition
function Card({ children, className }) {
  return <div className={\`card \${className}\`}>{children}</div>
}

function ProductCard({ product }) {
  return (
    <Card className="product-card">
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </Card>
  )
}
\`\`\`

## State Management

### Context API vs External Libraries

Choose the right state management solution:

- **React Context**: For simple, localized state
- **Redux Toolkit**: For complex, global state
- **Zustand**: Lightweight alternative to Redux
- **SWR/React Query**: For server state management

### State Colocation

Keep state as close to where it's used as possible:

\`\`\`jsx
// Good: State is colocated
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    fetchUser(userId).then(setUser)
  }, [userId])
  
  return <div>{user?.name}</div>
}
\`\`\`

## Performance Optimization

### Memoization

Use React.memo, useMemo, and useCallback strategically:

\`\`\`jsx
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveOperation(item))
  }, [data])
  
  return <div>{processedData}</div>
})
\`\`\`

### Code Splitting

Implement lazy loading for better performance:

\`\`\`jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  )
}
\`\`\`

## Testing Strategy

- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows

## Conclusion

Building scalable React applications requires careful planning and adherence to best practices. Focus on component architecture, state management, and performance optimization to create maintainable codebases.`,
    featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    author: mockUsers[0],
    category: mockCategories[0],
    tags: [mockTags[0], mockTags[4], mockTags[7]],
    publishedAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    readTime: 12,
    likes: 32,
    views: 203,
    comments: [],
    isLiked: false,
    isFeatured: true
  },
  {
    id: '4',
    title: 'The Future of Web Development: Trends for 2024',
    slug: 'future-web-development-trends-2024',
    excerpt: 'Explore the emerging trends shaping web development in 2024. From AI integration to new frameworks, discover what\'s next in the world of web technology.',
    content: `# The Future of Web Development: Trends for 2024

The web development landscape continues to evolve rapidly. Let's explore the key trends that will shape development in 2024 and beyond.

## AI-Powered Development

### Code Generation

AI tools are becoming increasingly sophisticated:

- **GitHub Copilot**: AI pair programmer
- **ChatGPT**: Code explanation and generation
- **Tabnine**: Intelligent code completion

### Automated Testing

AI is revolutionizing testing:

- Automated test case generation
- Visual regression testing
- Performance optimization suggestions

## Framework Evolution

### Meta-Frameworks

The rise of meta-frameworks continues:

- **Next.js**: Full-stack React framework
- **Nuxt.js**: Vue.js meta-framework
- **SvelteKit**: Svelte application framework
- **Remix**: Full-stack web framework

### Server Components

React Server Components are changing how we think about rendering:

\`\`\`jsx
// Server Component
async function BlogPost({ id }) {
  const post = await fetchPost(id) // Runs on server
  
  return (
    <article>
      <h1>{post.title}</h1>
      <ClientComponent data={post.data} />
    </article>
  )
}
\`\`\`

## Performance Focus

### Core Web Vitals

Google's Core Web Vitals continue to be crucial:

- **LCP**: Largest Contentful Paint
- **FID**: First Input Delay
- **CLS**: Cumulative Layout Shift

### Edge Computing

Moving computation closer to users:

- **Vercel Edge Functions**
- **Cloudflare Workers**
- **AWS Lambda@Edge**

## Developer Experience

### Type Safety

TypeScript adoption continues to grow:

- Better IDE support
- Improved error catching
- Enhanced code documentation

### Development Tools

New tools improving developer productivity:

- **Vite**: Fast build tool
- **esbuild**: Extremely fast bundler
- **SWC**: Rust-based compiler

## Accessibility and Inclusion

### Web Accessibility

Increased focus on inclusive design:

- ARIA best practices
- Keyboard navigation
- Screen reader compatibility
- Color contrast compliance

## Conclusion

The future of web development is exciting, with AI integration, improved frameworks, and a continued focus on performance and accessibility. Stay curious and keep learning!`,
    featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    author: mockUsers[2],
    category: mockCategories[0],
    tags: [mockTags[5], mockTags[7], mockTags[8]],
    publishedAt: '2024-01-08T09:00:00Z',
    updatedAt: '2024-01-08T09:00:00Z',
    readTime: 10,
    likes: 41,
    views: 287,
    comments: [],
    isLiked: true,
    isFeatured: false
  },
  {
    id: '5',
    title: 'Mobile-First Design: Best Practices for 2024',
    slug: 'mobile-first-design-best-practices-2024',
    excerpt: 'Learn how to create exceptional mobile experiences with mobile-first design principles. Discover responsive design techniques and mobile optimization strategies.',
    content: `# Mobile-First Design: Best Practices for 2024

With mobile traffic accounting for over 50% of web usage, mobile-first design is no longer optional—it's essential.

## Mobile-First Principles

### Progressive Enhancement

Start with the mobile experience and enhance for larger screens:

\`\`\`css
/* Mobile first */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}
\`\`\`

### Touch-Friendly Interfaces

Design for touch interactions:

- Minimum 44px touch targets
- Adequate spacing between interactive elements
- Clear visual feedback for touch events

## Performance Optimization

### Image Optimization

Use modern image formats and responsive images:

\`\`\`html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
\`\`\`

### Critical CSS

Inline critical CSS to improve perceived performance:

\`\`\`html
<style>
  /* Critical CSS for above-the-fold content */
  .hero { background: #000; color: #fff; }
</style>
\`\`\`

## Navigation Patterns

### Hamburger Menu

Implement accessible hamburger menus:

\`\`\`jsx
function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <nav>
      <button 
        aria-label="Toggle menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      {isOpen && (
        <ul className="mobile-menu">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      )}
    </nav>
  )
}
\`\`\`

### Bottom Navigation

Consider bottom navigation for better thumb reach:

\`\`\`css
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background: white;
  border-top: 1px solid #e5e5e5;
}
\`\`\`

## Form Design

### Mobile-Optimized Forms

- Use appropriate input types
- Implement proper labels and placeholders
- Minimize form fields
- Use auto-complete attributes

\`\`\`html
<form>
  <input 
    type="email" 
    name="email" 
    placeholder="Enter your email"
    autocomplete="email"
    required
  >
  <input 
    type="tel" 
    name="phone" 
    placeholder="Phone number"
    autocomplete="tel"
  >
</form>
\`\`\`

## Testing and Validation

### Device Testing

Test on real devices when possible:

- Various screen sizes
- Different operating systems
- Multiple browsers
- Different network conditions

### Performance Metrics

Monitor mobile-specific metrics:

- Time to Interactive (TTI)
- First Contentful Paint (FCP)
- Cumulative Layout Shift (CLS)

## Conclusion

Mobile-first design ensures your website provides excellent experiences across all devices. Focus on performance, usability, and accessibility to create truly mobile-optimized experiences.`,
    featuredImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
    author: mockUsers[1],
    category: mockCategories[1],
    tags: [mockTags[6], mockTags[9], mockTags[7]],
    publishedAt: '2024-01-05T11:15:00Z',
    updatedAt: '2024-01-05T11:15:00Z',
    readTime: 9,
    likes: 27,
    views: 134,
    comments: [],
    isLiked: false,
    isFeatured: false
  }
];

// Dashboard Statistics
export const mockStats = {
  totalPosts: mockBlogPosts.length,
  totalUsers: mockUsers.length,
  totalComments: mockBlogPosts.reduce((acc, post) => acc + post.comments.length, 0),
  totalViews: mockBlogPosts.reduce((acc, post) => acc + post.views, 0),
  totalLikes: mockBlogPosts.reduce((acc, post) => acc + post.likes, 0),
  monthlyViews: [
    { month: 'Jan', views: 1200 },
    { month: 'Feb', views: 1800 },
    { month: 'Mar', views: 2400 },
    { month: 'Apr', views: 2100 },
    { month: 'May', views: 2800 },
    { month: 'Jun', views: 3200 }
  ]
};
