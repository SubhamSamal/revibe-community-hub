
export interface Community {
  id: string;
  name: string;
  description?: string;
  image?: string;
  members: number;
  isJoined: boolean;
  createdBy: string;
  createdAt: string;
  lastActivity?: string;
}

export interface CommunityMessage {
  id: string;
  communityId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  type: 'text' | 'event';
  eventId?: string;
  timestamp: string;
}

export interface CreateCommunityData {
  name: string;
  description?: string;
}
