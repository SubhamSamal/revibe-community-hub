
import { useState } from 'react';
import { Calendar, MapPin, DollarSign, Users, FileText, Globe, Lock } from 'lucide-react';
import { EventTemplate, EventPost } from '../types/posts';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { createEventPost } from '../services/postsService';

interface EventCreationFormProps {
  template: EventTemplate;
  onEventCreated: (event: EventPost) => void;
  onBack: () => void;
}

const EventCreationForm = ({ template, onEventCreated, onBack }: EventCreationFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    venue: '',
    date: '',
    time: '',
    cost: '',
    spots: '',
    description: '',
    isPublic: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const eventData = {
        title: formData.title,
        venue: formData.venue,
        date: formData.date,
        time: formData.time,
        cost: formData.cost,
        spots: parseInt(formData.spots),
        description: formData.description,
        category: template.category,
        template,
        hostName: 'You', // In real app, get from user context
        hostId: 'current-user-id',
        coHosts: [],
        isPublic: formData.isPublic,
        invitedUsers: []
      };

      const createdEvent = await createEventPost(eventData);
      onEventCreated(createdEvent);
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          ← Back to Templates
        </Button>
        <h2 className="text-2xl font-bold mb-2">Create Your Event</h2>
        <p className="text-muted-foreground">Fill in the details for your event</p>
      </div>

      {/* Template Preview */}
      <div 
        className="mb-6 p-6 rounded-lg border"
        style={{ backgroundColor: template.backgroundColor, color: template.textColor }}
      >
        <h3 className="font-semibold mb-2">Template: {template.name}</h3>
        <p className="text-sm opacity-80">This is how your invitation will look</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Event Name *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter event name"
              required
            />
          </div>

          <div>
            <Label htmlFor="venue">Venue *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="venue"
                value={formData.venue}
                onChange={(e) => handleInputChange('venue', e.target.value)}
                placeholder="Event venue"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="date">Date *</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="time">Time *</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="cost">Cost per Ticket</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="cost"
                value={formData.cost}
                onChange={(e) => handleInputChange('cost', e.target.value)}
                placeholder="₹500 or Free"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="spots">Number of Spots</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="spots"
                type="number"
                value={formData.spots}
                onChange={(e) => handleInputChange('spots', e.target.value)}
                placeholder="50"
                className="pl-10"
                min="1"
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Tell people about your event..."
              className="pl-10 min-h-[100px]"
            />
          </div>
        </div>

        {/* Privacy Setting */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-3">
            {formData.isPublic ? (
              <Globe className="h-5 w-5 text-green-600" />
            ) : (
              <Lock className="h-5 w-5 text-orange-600" />
            )}
            <div>
              <p className="font-medium">
                {formData.isPublic ? 'Public Event' : 'Private Event'}
              </p>
              <p className="text-sm text-muted-foreground">
                {formData.isPublic 
                  ? 'Anyone can see and join this event'
                  : 'Only invited people can see this event'
                }
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleInputChange('isPublic', !formData.isPublic)}
          >
            Make {formData.isPublic ? 'Private' : 'Public'}
          </Button>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? 'Creating...' : 'Create Event'}
          </Button>
          <Button type="button" variant="outline" onClick={onBack}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EventCreationForm;
