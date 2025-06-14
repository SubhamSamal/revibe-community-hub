
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
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
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 animate-fade-in">
      <div className="relative">
        <LazyImage 
          src={image} 
          alt={title}
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
        <h3 className="font-poppins font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        
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
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-semibold text-foreground">{price}</span>
          </div>
          
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2">
            Get Tickets
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
