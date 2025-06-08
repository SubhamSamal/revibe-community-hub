
import { useState } from 'react';
import { Search, Users, Trending, Hash } from 'lucide-react';

const DiscoveryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('communities');

  const communities = [
    {
      name: "Delhi Concert Goers",
      members: 2400,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop",
      description: "Live music enthusiasts in Delhi-NCR",
      isJoined: true
    },
    {
      name: "Startup Events Delhi",
      members: 1800,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=60&h=60&fit=crop",
      description: "Tech meetups, pitch events & networking",
      isJoined: false
    },
    {
      name: "Foodie Adventures",
      members: 3200,
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=60&h=60&fit=crop",
      description: "Food festivals & culinary experiences",
      isJoined: true
    },
    {
      name: "Comedy Club Delhi",
      members: 950,
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=60&h=60&fit=crop",
      description: "Stand-up shows & comedy events",
      isJoined: false
    }
  ];

  const trendingSearches = [
    "Martin Garrix Delhi",
    "Christmas parties",
    "New Year events",
    "Stand-up comedy",
    "Food festivals",
    "Tech meetups"
  ];

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-poppins font-bold mb-2">Discovery</h1>
        <p className="text-muted-foreground">Find communities and events that match your vibe</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search communities, events, or interests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Trending Searches */}
      {!searchTerm && (
        <div className="mb-6">
          <h2 className="text-lg font-poppins font-semibold mb-3 flex items-center gap-2">
            <Trending className="h-5 w-5" />
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

      {/* Communities Section */}
      <div className="mb-6">
        <h2 className="text-lg font-poppins font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Communities
        </h2>
        
        <div className="space-y-4">
          {filteredCommunities.map((community, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{community.name}</h3>
                    <p className="text-sm text-muted-foreground">{community.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {community.members.toLocaleString()} members
                    </p>
                  </div>
                </div>
                
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    community.isJoined
                      ? 'bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {community.isJoined ? 'Joined' : 'Join'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCommunities.length === 0 && searchTerm && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No communities found matching "{searchTerm}"</p>
            <button className="mt-2 text-primary hover:text-primary/80 text-sm">
              Create a new community
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoveryPage;
