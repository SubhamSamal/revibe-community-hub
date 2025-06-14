
import { Calendar, MapPin, Users, ExternalLink, Heart, UserCheck } from 'lucide-react';
import { useState } from 'react';
import LazyImage from './LazyImage';

interface EventCardProps {
  title: string;
  image: string;
  date: string;
  venue: string;
  price: string;
  source: string;
  category: string;
  attendees?: number;
}

const EventCard = ({ title, image, date, venue, price, source, category, attendees }: EventCardProps) => {
  const [rsvpStatus, setRsvpStatus] = useState<'none' | 'interested' | 'going'>('none');

  // Clean up title by removing "Event X -" pattern
  const cleanTitle = title.replace(/Event \d+ - /, '');

  const handleRSVP = (status: 'interested' | 'going') => {
    setRsvpStatus(rsvpStatus === status ? 'none' : status);
  };

  const handleGetTickets = () => {
    // In a real app, this would redirect to the respective ticketing platform
    console.log(`Redirecting to ${source} for tickets`);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 animate-fade-in">
      <div className="relative">
        <LazyImage 
          src={image} 
          alt={cleanTitle}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
            {category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs font-medium">
            {source}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-poppins font-semibold text-lg mb-2 line-clamp-2">{cleanTitle}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-muted-foreground text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="truncate">{venue}</span>
          </div>
          
          {attendees && (
            <div className="flex items-center text-muted-foreground text-sm">
              <Users className="h-4 w-4 mr-2" />
              <span>{attendees} going</span>
            </div>
          )}
        </div>

        {/* RSVP Buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => handleRSVP('interested')}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
              rsvpStatus === 'interested'
                ? 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300'
                : 'bg-muted text-muted-foreground hover:bg-pink-50 hover:text-pink-600 dark:hover:bg-pink-900/50'
            }`}
          >
            <Heart className={`h-3 w-3 ${rsvpStatus === 'interested' ? 'fill-current' : ''}`} />
            Interested
          </button>
          
          <button
            onClick={() => handleRSVP('going')}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
              rsvpStatus === 'going'
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : 'bg-muted text-muted-foreground hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/50'
            }`}
          >
            <UserCheck className={`h-3 w-3 ${rsvpStatus === 'going' ? 'fill-current' : ''}`} />
            Going
          </button>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-semibold text-foreground">{price}</span>
          </div>
          
          <button 
            onClick={handleGetTickets}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
          >
            Get Tickets
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
