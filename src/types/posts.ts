
export interface EventTemplate {
  id: string;
  name: string;
  category: string;
  previewImage: string;
  backgroundColor: string;
  textColor: string;
  layout: 'minimal' | 'bold' | 'elegant' | 'fun';
}

export interface EventPost {
  id: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  cost: string;
  spots: number;
  spotsLeft: number;
  description: string;
  category: string;
  template: EventTemplate;
  hostName: string;
  hostId: string;
  coHosts: string[];
  isPublic: boolean;
  createdAt: string;
  rsvpResponses: {
    going: string[];
    maybe: string[];
    notGoing: string[];
  };
  invitedUsers: string[];
}

export interface RSVPResponse {
  userId: string;
  status: 'going' | 'maybe' | 'not-going';
  reminder?: string;
}
