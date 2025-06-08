
import { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import EventCard from './EventCard';

const EventFeed = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Music', 'Tech', 'Sports', 'Food', 'Art', 'Comedy'];
  
  const mockEvents = [
    {
      title: "Sunburn Arena ft. Martin Garrix",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop",
      date: "Dec 15, 2024 • 8:00 PM",
      venue: "JLN Stadium, Delhi",
      price: "₹2,999",
      source: "BookMyShow",
      category: "Music",
      attendees: 1200
    },
    {
      title: "Delhi Food & Wine Festival",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      date: "Dec 20-22, 2024",
      venue: "Kingdom of Dreams, Gurgaon",
      price: "₹799",
      source: "District",
      category: "Food",
      attendees: 850
    },
    {
      title: "Stand-up Comedy Night",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
      date: "Dec 18, 2024 • 7:30 PM",
      venue: "Canvas Laugh Club, Noida",
      price: "₹599",
      source: "BookMyShow",
      category: "Comedy",
      attendees: 120
    },
    {
      title: "Tech Startup Meetup",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      date: "Dec 16, 2024 • 6:00 PM",
      venue: "91 Springboard, Gurgaon",
      price: "Free",
      source: "Meetup",
      category: "Tech",
      attendees: 95
    }
  ];

  const filteredEvents = mockEvents.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-poppins font-bold mb-2">Discover Events</h1>
        <p className="text-muted-foreground">Find amazing events happening in Delhi-NCR</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search events, artists, venues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

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
        {filteredEvents.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No events found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default EventFeed;
