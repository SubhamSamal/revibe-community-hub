
import { useState, useEffect, useMemo } from 'react';
import { Loader2, Heart, Calendar, Users } from 'lucide-react';
import EventCard from './EventCard';
import { Skeleton } from './ui/skeleton';
import { fetchEvents, Event } from '../services/eventService';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const EventFeed = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const categories = ['All', 'Music', 'Tech', 'Sports', 'Food', 'Art', 'Comedy'];

  // Load initial events
  useEffect(() => {
    loadInitialEvents();
  }, [selectedCategory]);

  const loadInitialEvents = async () => {
    setIsInitialLoading(true);
    setEvents([]);
    setPage(1);
    
    try {
      const response = await fetchEvents(1, 10, selectedCategory, '');
      setEvents(response.events);
      setHasNextPage(response.hasNextPage);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setIsInitialLoading(false);
    }
  };

  const fetchNextPage = async () => {
    if (isFetchingNextPage || !hasNextPage) return;
    
    setIsFetchingNextPage(true);
    const nextPage = page + 1;
    
    try {
      const response = await fetchEvents(nextPage, 10, selectedCategory, '');
      setEvents(prev => [...prev, ...response.events]);
      setPage(nextPage);
      setHasNextPage(response.hasNextPage);
    } catch (error) {
      console.error('Error fetching next page:', error);
    } finally {
      setIsFetchingNextPage(false);
    }
  };

  // Use infinite scroll hook
  useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  });

  // Memoize skeleton cards to prevent re-renders
  const skeletonCards = useMemo(() => (
    Array.from({ length: 6 }, (_, index) => (
      <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
        <Skeleton className="w-full h-48" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </div>
    ))
  ), []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Category Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isInitialLoading ? (
          skeletonCards
        ) : (
          events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))
        )}
      </div>

      {/* Loading More Indicator */}
      {isFetchingNextPage && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span className="text-muted-foreground">Loading more events...</span>
        </div>
      )}

      {/* No Events Message */}
      {!isInitialLoading && events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No events found for this category</p>
        </div>
      )}

      {/* End of Results */}
      {!hasNextPage && events.length > 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">You've reached the end of events!</p>
        </div>
      )}
    </div>
  );
};

export default EventFeed;
