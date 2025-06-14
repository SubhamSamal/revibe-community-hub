
import { EventTemplate, EventPost } from '../types/posts';

// Mock templates data
const mockTemplates: EventTemplate[] = [
  {
    id: 'minimal-1',
    name: 'Clean & Simple',
    category: 'All',
    previewImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=200&fit=crop',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    layout: 'minimal'
  },
  {
    id: 'bold-1',
    name: 'Bold Party',
    category: 'Music',
    previewImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&h=200&fit=crop',
    backgroundColor: '#8b5cf6',
    textColor: '#ffffff',
    layout: 'bold'
  },
  {
    id: 'elegant-1',
    name: 'Elegant Event',
    category: 'Art',
    previewImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
    backgroundColor: '#1f2937',
    textColor: '#f9fafb',
    layout: 'elegant'
  },
  {
    id: 'fun-1',
    name: 'Fun & Colorful',
    category: 'Comedy',
    previewImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=200&fit=crop',
    backgroundColor: '#f59e0b',
    textColor: '#ffffff',
    layout: 'fun'
  }
];

export const getTemplatesByCategory = async (category: string): Promise<EventTemplate[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (category === 'All') {
    return mockTemplates;
  }
  
  return mockTemplates.filter(template => 
    template.category === category || template.category === 'All'
  );
};

export const createEventPost = async (eventData: Omit<EventPost, 'id' | 'createdAt' | 'rsvpResponses' | 'spotsLeft'>): Promise<EventPost> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newEvent: EventPost = {
    ...eventData,
    id: `event-${Date.now()}`,
    createdAt: new Date().toISOString(),
    spotsLeft: eventData.spots,
    rsvpResponses: {
      going: [],
      maybe: [],
      notGoing: []
    }
  };
  
  return newEvent;
};

export const getUserPosts = async (userId: string): Promise<EventPost[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock user posts
  return [];
};
