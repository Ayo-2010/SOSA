export interface Profile {
  id: string
  full_name: string
  graduation_set: string
  profession: string | null
  city: string | null
  whatsapp_number: string | null
  bio: string | null
  created_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  event_date: string
  location: string
  banner_url: string | null
  featured: boolean
  created_at: string
}

export interface Post {
  id: string
  title: string
  content: string
  category: string
  author: string | null
  created_at: string
}

export interface GalleryItem {
  id: string
  title: string
  image_url: string
  caption: string | null
  event_year: string | null
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  role: string
  created_at: string
}

export interface DirectoryAlumnus {
  id: string
  name: string
  set: string
  profession: string
  location: string
}

export interface AppEvent {
  id: string
  title: string
  description: string
  event_date: string
  location: string
  banner_url: string | null
  featured: boolean
  created_at: string
  date: string
  time: string
  past: boolean
}

export interface Contribution {
  id: string
  user_id: string
  amount: number
  period: string
  status: string
  receipt_url: string | null
  verified_by: string | null
  verified_at: string | null
  created_at: string
}

export interface MemberOption {
  label: string
  value: string
}
