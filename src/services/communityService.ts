
import { Community, CommunityMessage, CreateCommunityData } from '../types/community';

// Mock data for communities
const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'Delhi Concert Goers',
    description: 'Live music enthusiasts in Delhi-NCR',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop',
    members: 2400,
    isJoined: true,
    createdBy: 'user1',
    createdAt: '2024-01-15T10:30:00Z',
    lastActivity: '2024-06-14T08:30:00Z'
  },
  {
    id: '2',
    name: 'Startup Events Delhi',
    description: 'Tech meetups, pitch events & networking',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=60&h=60&fit=crop',
    members: 1800,
    isJoined: false,
    createdBy: 'user2',
    createdAt: '2024-02-20T14:15:00Z',
    lastActivity: '2024-06-13T16:45:00Z'
  },
  {
    id: '3',
    name: 'Foodie Adventures',
    description: 'Food festivals & culinary experiences',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=60&h=60&fit=crop',
    members: 3200,
    isJoined: true,
    createdBy: 'user3',
    createdAt: '2024-03-10T09:00:00Z',
    lastActivity: '2024-06-14T12:20:00Z'
  }
];

const mockMessages: CommunityMessage[] = [
  {
    id: '1',
    communityId: '1',
    userId: 'user1',
    userName: 'Alex Johnson',
    message: 'Hey everyone! Martin Garrix concert is happening next week. Who\'s going?',
    type: 'text',
    timestamp: '2024-06-14T10:30:00Z'
  },
  {
    id: '2',
    communityId: '1',
    userId: 'user2',
    userName: 'Sarah Miller',
    message: 'I already got my tickets! Can\'t wait 🎵',
    type: 'text',
    timestamp: '2024-06-14T10:35:00Z'
  },
  {
    id: '3',
    communityId: '1',
    userId: 'user3',
    userName: 'Mike Chen',
    message: 'Check out this event I found:',
    type: 'event',
    eventId: 'event1',
    timestamp: '2024-06-14T11:00:00Z'
  }
];

export const fetchCommunities = async (searchTerm: string = ''): Promise<Community[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockCommunities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (community.description && community.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
};

export const fetchJoinedCommunities = async (): Promise<Community[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockCommunities.filter(community => community.isJoined);
};

export const createCommunity = async (communityData: CreateCommunityData): Promise<Community> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newCommunity: Community = {
    id: `community_${Date.now()}`,
    name: communityData.name,
    description: communityData.description,
    members: 1,
    isJoined: true,
    createdBy: 'current_user',
    createdAt: new Date().toISOString(),
    lastActivity: new Date().toISOString()
  };
  
  mockCommunities.push(newCommunity);
  return newCommunity;
};

export const joinCommunity = async (communityId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const community = mockCommunities.find(c => c.id === communityId);
  if (community) {
    community.isJoined = true;
    community.members += 1;
  }
};

export const leaveCommunity = async (communityId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const community = mockCommunities.find(c => c.id === communityId);
  if (community && community.members > 1) {
    community.isJoined = false;
    community.members -= 1;
  }
};

export const fetchCommunityMessages = async (communityId: string): Promise<CommunityMessage[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockMessages.filter(message => message.communityId === communityId);
};

export const sendMessage = async (communityId: string, message: string): Promise<CommunityMessage> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const newMessage: CommunityMessage = {
    id: `msg_${Date.now()}`,
    communityId,
    userId: 'current_user',
    userName: 'You',
    message,
    type: 'text',
    timestamp: new Date().toISOString()
  };
  
  mockMessages.push(newMessage);
  return newMessage;
};
