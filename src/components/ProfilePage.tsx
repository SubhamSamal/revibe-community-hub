
import { useState } from 'react';
import { Edit3, Calendar, Users, Heart, Settings, Plus, Edit } from 'lucide-react';
import { Button } from './ui/button';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const userProfile = {
    name: "Alex Kumar",
    username: "@alexkumar",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop",
    bio: "Music lover • Tech enthusiast • Weekend explorer",
    followers: 234,
    following: 189,
    eventsAttended: 47
  };

  const interests = ["Music", "Tech", "Food", "Comedy", "Art", "Sports"];

  const upcomingEvents = [
    {
      title: "Sunburn Arena ft. Martin Garrix",
      date: "Dec 15, 8:00 PM",
      venue: "JLN Stadium",
      status: "Going"
    },
    {
      title: "Delhi Food Festival", 
      date: "Dec 20, 11:00 AM",
      venue: "Kingdom of Dreams",
      status: "Interested"
    }
  ];

  const pastEvents = [
    {
      title: "TechCrunch Meetup",
      date: "Nov 28, 6:00 PM",
      venue: "91 Springboard",
      rating: 5
    },
    {
      title: "Stand-up Comedy Night",
      date: "Nov 15, 7:30 PM", 
      venue: "Canvas Laugh Club",
      rating: 4
    }
  ];

  const myEvents = [
    {
      id: "1",
      title: "Tech Meetup Delhi",
      date: "Dec 22, 7:00 PM",
      venue: "Cyber Hub",
      attendees: 45,
      spots: 50,
      status: "Active"
    },
    {
      id: "2",
      title: "Weekend House Party",
      date: "Dec 18, 8:00 PM",
      venue: "My Place",
      attendees: 12,
      spots: 15,
      status: "Active"
    }
  ];

  const handleEditEvent = (eventId: string) => {
    console.log('Edit event:', eventId);
    // In real app, navigate to edit form
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Profile Header */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-poppins font-bold">{userProfile.name}</h1>
                <p className="text-muted-foreground">{userProfile.username}</p>
                <p className="text-sm text-muted-foreground mt-1">{userProfile.bio}</p>
              </div>
              
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center gap-2 self-start sm:self-auto">
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </button>
            </div>
            
            <div className="flex gap-6 mt-4">
              <div className="text-center">
                <p className="font-semibold">{userProfile.followers}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{userProfile.following}</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{userProfile.eventsAttended}</p>
                <p className="text-sm text-muted-foreground">Events</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interests */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-lg font-poppins font-semibold mb-3">Interests</h2>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <span
              key={index}
              className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Events Tabs */}
      <div className="bg-card border border-border rounded-lg">
        <div className="border-b border-border">
          <div className="flex">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'upcoming'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                Upcoming
              </div>
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'past'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Heart className="h-4 w-4" />
                Past Events
              </div>
            </button>
            <button
              onClick={() => setActiveTab('myEvents')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'myEvents'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Plus className="h-4 w-4" />
                My Events
              </div>
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                    <p className="text-sm text-muted-foreground">{event.venue}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === 'Going' 
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'past' && (
            <div className="space-y-4">
              {pastEvents.map((event, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                    <p className="text-sm text-muted-foreground">{event.venue}</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Heart
                        key={i}
                        className={`h-4 w-4 ${
                          i < event.rating ? 'fill-primary text-primary' : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'myEvents' && (
            <div className="space-y-4">
              {myEvents.map((event) => (
                <div key={event.id} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                    <p className="text-sm text-muted-foreground">{event.venue}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.attendees}/{event.spots} attendees
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === 'Active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {event.status}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditEvent(event.id)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
