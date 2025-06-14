
// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  venue: string;
  price: string;
  source: string;
  category: string;
  attendees?: number;
}

// Mock event data generator
const generateMockEvent = (id: number): Event => {
  const categories = ['Music', 'Tech', 'Sports', 'Food', 'Art', 'Comedy'];
  const sources = ['BookMyShow', 'District', 'Meetup', 'Eventbrite'];
  const venues = [
    'JLN Stadium, Delhi',
    'Kingdom of Dreams, Gurgaon',
    'Canvas Laugh Club, Noida',
    '91 Springboard, Gurgaon',
    'Phoenix MarketCity, Mumbai',
    'Forum Mall, Bangalore'
  ];
  
  const images = [
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  ];

  const category = categories[Math.floor(Math.random() * categories.length)];
  const source = sources[Math.floor(Math.random() * sources.length)];
  const venue = venues[Math.floor(Math.random() * venues.length)];
  const image = images[Math.floor(Math.random() * images.length)];
  
  return {
    id: `event-${id}`,
    title: `Event ${id} - ${category} Experience`,
    image: `${image}&sig=${id}`, // Add unique signature to prevent caching
    date: `Dec ${15 + (id % 15)}, 2024 • ${6 + (id % 6)}:00 PM`,
    venue,
    price: `₹${Math.floor(Math.random() * 3000) + 500}`,
    source,
    category,
    attendees: Math.floor(Math.random() * 2000) + 50
  };
};

export const fetchEvents = async (page: number = 1, limit: number = 10, category: string = 'All', search: string = ''): Promise<{
  events: Event[];
  hasNextPage: boolean;
  totalCount: number;
}> => {
  // Simulate API delay
  await delay(500);
  
  // Generate events for simulation (in real app, this would be an API call)
  const startId = (page - 1) * limit + 1;
  const allEvents = Array.from({ length: limit }, (_, index) => generateMockEvent(startId + index));
  
  // Filter events based on category and search
  const filteredEvents = allEvents.filter(event => {
    const matchesCategory = category === 'All' || event.category === category;
    const matchesSearch = search === '' || event.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Simulate pagination
  const hasNextPage = page < 50; // Simulate 500 total events (50 pages * 10 events)
  const totalCount = 500;
  
  return {
    events: filteredEvents,
    hasNextPage,
    totalCount
  };
};
