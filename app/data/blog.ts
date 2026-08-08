export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  category: string
  image?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'new-science-laboratory-donation',
    title: 'New Science Laboratory Donated by Pioneer Alumni',
    excerpt: 'The newly upgraded science facility was officially commissioned last week, thanks to generous contributions from alumni.',
    content: 'The newly upgraded science facility was officially commissioned last week, thanks to generous contributions from alumni. The project, which cost over 15 million naira, includes modern laboratory equipment, interactive smart boards, and a dedicated research area for final-year students.',
    date: 'October 12, 2026',
    author: 'SOSA Communications',
    category: 'School Milestone'
  },
  {
    id: 2,
    slug: 'alumni-mentorship-program-launch',
    title: 'Alumni Mentorship Program Launch',
    excerpt: 'Sign up to guide final-year students in their career paths and higher education choices.',
    content: 'Sign up to guide final-year students in their career paths and higher education choices. The mentorship program pairs experienced professionals with students in their final year of secondary education, providing guidance on university applications, career planning, and personal development.',
    date: 'September 28, 2026',
    author: 'Program Coordinator',
    category: 'Program Update'
  },
  {
    id: 3,
    slug: 'class-of-2010-reunion-fundraiser',
    title: 'Class of 2021 Reunion Fundraiser Hits Target',
    excerpt: 'The graduating set successfully raised funds for the new library wing renovation project.',
    content: 'The graduating set successfully raised funds for the new library wing renovation project. The fundraiser, which ran for three months, exceeded its target by 25%, allowing the school to purchase additional books and install air conditioning units in the new wing.',
    date: 'September 15, 2026',
    author: 'Class of 2021 Rep',
    category: 'Alumni Spotlight'
  }
]

export const blogCategories = ['All', 'School Milestone', 'Program Update', 'Alumni Spotlight']
