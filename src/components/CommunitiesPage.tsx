
import { useState, useEffect } from 'react';
import { Plus, Users, MessageCircle, Search } from 'lucide-react';
import { Community } from '../types/community';
import { fetchJoinedCommunities, createCommunity } from '../services/communityService';
import CreateCommunityDialog from './CreateCommunityDialog';
import CommunityChat from './CommunityChat';

const CommunitiesPage = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCommunities();
  }, []);

  const loadCommunities = async () => {
    try {
      const joinedCommunities = await fetchJoinedCommunities();
      setCommunities(joinedCommunities);
    } catch (error) {
      console.error('Error loading communities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCommunity = async (communityData: { name: string; description?: string }) => {
    try {
      const newCommunity = await createCommunity(communityData);
      setCommunities(prev => [newCommunity, ...prev]);
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error('Error creating community:', error);
    }
  };

  if (selectedCommunity) {
    return (
      <CommunityChat
        community={selectedCommunity}
        onBack={() => setSelectedCommunity(null)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-poppins font-bold mb-2">My Communities</h1>
          <p className="text-muted-foreground">Chat with your communities and share events</p>
        </div>
        <button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          Create Community
        </button>
      </div>

      {/* Communities List */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : communities.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Communities Yet</h3>
          <p className="text-muted-foreground mb-4">Create your first community to start chatting and sharing events</p>
          <button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg"
          >
            Create Community
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {communities.map((community) => (
            <div
              key={community.id}
              onClick={() => setSelectedCommunity(community)}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {community.image ? (
                    <img
                      src={community.image}
                      alt={community.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-foreground">{community.name}</h3>
                    {community.description && (
                      <p className="text-sm text-muted-foreground">{community.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {community.members.toLocaleString()} members
                    </p>
                  </div>
                </div>
                <MessageCircle className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateCommunityDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreateCommunity={handleCreateCommunity}
      />
    </div>
  );
};

export default CommunitiesPage;
