
import { useState, useEffect, useMemo } from 'react';
import { Search, Users, TrendingUp, Hash, Loader2 } from 'lucide-react';
import EventCard from './EventCard';
import { Skeleton } from './ui/skeleton';
import { fetchEvents, Event } from '../services/eventService';
import { fetchCommunities, joinCommunity, leaveCommunity } from '../services/communityService';
import { Community } from '../types/community';

const DiscoveryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState<Event[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [isLoadingCommunities, setIsLoadingCommunities] = useState(false);

  // Debounced search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Load content when search term or tab changes
  useEffect(() => {
    if (activeTab === 'events') {
      loadEvents();
    } else if (activeTab === 'communities') {
      loadCommunities();
    }
  }, [debouncedSearchTerm, activeTab]);

  const loadEvents = async () => {
    setIsLoadingEvents(true);
    
    try {
      const response = await fetchEvents(1, 12, 'All', debouncedSearchTerm);
      setEvents(response.events);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const loadCommunities = async () => {
    setIsLoadingCommunities(true);
    
    try {
      const allCommunities = await fetchCommunities(debouncedSearchTerm);
      setCommunities(allCommunities);
    } catch (error) {
      console.error('Error loading communities:', error);
    } finally {
      setIsLoadingCommunities(false);
    }
  };

  const handleCommunityAction = async (communityId: string, isJoined: boolean) => {
    try {
      if (isJoined) {
        await leaveCommunity(communityId);
      } else {
        await joinCommunity(communityId);
      }
      // Reload communities to reflect changes
      loadCommunities();
    } catch (error) {
      console.error('Error updating community membership:', error);
    }
  };

  const trendingSearches = [
    "Martin Garrix Delhi",
    "Christmas parties",
    "New Year events",
    "Stand-up comedy",
    "Food festivals",
    "Tech meetups"
  ];

  const skeletonCards = useMemo(() => (
    Array.from({ length: 6 }, (_, index) => (
      <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
        <Skeleton className="w-full h-48" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    ))
  ), []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-poppins font-bold mb-2">Discovery</h1>
        <p className="text-muted-foreground">Find events and communities that match your vibe</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search events, communities, or interests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6 border-b border-border">
        <button
          onClick={() => setActiveTab('events')}
          className={`pb-2 px-1 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'events'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Events
        </button>
        <button
          onClick={() => setActiveTab('communities')}
          className={`pb-2 px-1 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'communities'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Communities
        </button>
      </div>

      {/* Trending Searches */}
      {!searchTerm && (
        <div className="mb-6">
          <h2 className="text-lg font-poppins font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Trending Searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => setSearchTerm(search)}
                className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-200 flex items-center gap-1"
              >
                <Hash className="h-3 w-3" />
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content Based on Active Tab */}
      {activeTab === 'events' ? (
        <div>
          <h2 className="text-lg font-poppins font-semibold mb-4">Events</h2>
          
          {isLoadingEvents ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skeletonCards}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          )}

          {!isLoadingEvents && events.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No events found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-poppins font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Communities
          </h2>
          
          {isLoadingCommunities ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }, (_, i) => (
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
          ) : (
            <div className="space-y-4">
              {communities.map((community) => (
                <div key={community.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
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
                    
                    <button
                      onClick={() => handleCommunityAction(community.id, community.isJoined)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        community.isJoined
                          ? 'bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                    >
                      {community.isJoined ? 'Leave' : 'Join'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoadingCommunities && communities.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No communities found matching "{searchTerm}"</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try searching with different keywords or check out the Communities tab to create a new one
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiscoveryPage;
