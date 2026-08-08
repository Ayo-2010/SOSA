export interface GalleryImage {
  id: number
  title: string
  year: string
  category: string
  color: string
}

export const galleryImages: GalleryImage[] = [
  { id: 1, title: 'School Main Gate', year: '2024', category: 'Campus', color: 'bg-green-100' },
  { id: 2, title: 'Homecoming 2023', year: '2023', category: 'Events', color: 'bg-blue-100' },
  { id: 3, title: 'Sports Day 2022', year: '2022', category: 'Events', color: 'bg-orange-100' },
  { id: 4, title: 'Science Lab Donation', year: '2026', category: 'Milestones', color: 'bg-purple-100' },
  { id: 5, title: 'Graduation Ceremony', year: '2025', category: 'Events', color: 'bg-yellow-100' },
  { id: 6, title: 'Old Students Reunion', year: '2024', category: 'Events', color: 'bg-pink-100' },
  { id: 7, title: 'Library Wing', year: '2026', category: 'Campus', color: 'bg-indigo-100' },
  { id: 8, title: 'Alumni Awards Night', year: '2025', category: 'Events', color: 'bg-red-100' },
  { id: 9, title: 'Historic Group Photo', year: '1995', category: 'Archive', color: 'bg-gray-100' }
]

export const galleryCategories = ['All', 'Campus', 'Events', 'Milestones', 'Archive']
