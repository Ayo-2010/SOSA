export interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  featured: boolean
  past: boolean
}

export const events: Event[] = [
  {
    id: '1',
    title: 'SOSA Monthly General Meeting',
    date: 'September 15, 2026',
    time: '4:00 PM WAT',
    location: 'Virtual Zoom Meeting',
    description: 'Join us for our monthly general meeting to discuss upcoming programs, Ramadan Iftar planning, and mentorship initiatives. All members are encouraged to attend.',
    featured: true,
    past: false
  },
  {
    id: '2',
    title: 'Annual Homecoming & Gala 2026',
    date: 'November 15, 2026',
    time: '4:00 PM WAT',
    location: 'School Main Hall & Auditorium',
    description: 'Join us for our biggest yearly gathering featuring dinner, awards, and networking with old friends and mentors.',
    featured: false,
    past: false
  },
  {
    id: '3',
    title: 'Class of 2021 First Reunion',
    date: 'December 20, 2026',
    time: '6:00 PM WAT',
    location: 'Virtual Zoom Meeting',
    description: 'A special online catch-up session for our pioneering graduates from 2021. Reconnect with your graduating set and celebrate how far we\'ve come.',
    featured: false,
    past: false
  },
  {
    id: '4',
    title: 'Alumni Career Fair 2027',
    date: 'January 22, 2027',
    time: '10:00 AM WAT',
    location: 'School Sports Complex',
    description: 'Network with alumni across various industries. Bring your CV and connect with potential employers.',
    featured: false,
    past: false
  },
  {
    id: '5',
    title: 'Old Students Basketball Tournament',
    date: 'February 14, 2027',
    time: '2:00 PM WAT',
    location: 'School Basketball Court',
    description: 'Friendly inter-set basketball tournament. Form your team and represent your graduating year!',
    featured: false,
    past: false
  },
  {
    id: '101',
    title: 'SOSA Founding Ceremony',
    date: 'July 30, 2023',
    time: '10:00 AM WAT',
    location: 'Start-Well Huffadh College',
    description: 'The official founding ceremony of the Startwell Old Student Association (SOSA) by Master Abdulmalik Sanni. The association name was revealed by Fariidat Bawa-Allah.',
    featured: false,
    past: true
  },
  {
    id: '102',
    title: 'First Ramadan Iftar Program',
    date: 'April 15, 2024',
    time: '6:00 PM WAT',
    location: 'Community Center, Ikorodu',
    description: 'The inaugural Ramadan Iftar program organized by SOSA. Members gathered for food, prayers, and community bonding.',
    featured: false,
    past: true
  },
  {
    id: '103',
    title: 'Class of 25 Graduation Support',
    date: 'July 27, 2025',
    time: '9:00 AM WAT',
    location: 'Start-Well Huffadh College',
    description: 'SOSA provided graduation gifts and support for the Class of 25 during their graduation ceremony. Celebrated the induction of new alumni into the network.',
    featured: false,
    past: true
  },
  {
    id: '104',
    title: 'SOSA Mentorship Program Kickoff',
    date: 'March 10, 2025',
    time: '2:00 PM WAT',
    location: 'Virtual Zoom Meeting',
    description: 'Launch of the SOSA mentorship program pairing experienced alumni with current students and recent graduates for career guidance.',
    featured: false,
    past: true
  }
]
