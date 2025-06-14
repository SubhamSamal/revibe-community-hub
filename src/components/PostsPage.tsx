
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { EventTemplate, EventPost } from '../types/posts';
import { Button } from './ui/button';
import TemplateSelector from './TemplateSelector';
import EventCreationForm from './EventCreationForm';

const PostsPage = () => {
  const [currentStep, setCurrentStep] = useState<'category' | 'template' | 'form' | 'success'>('category');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<EventTemplate | null>(null);
  const [createdEvent, setCreatedEvent] = useState<EventPost | null>(null);

  const categories = ['All', 'Music', 'Tech', 'Sports', 'Food', 'Art', 'Comedy'];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentStep('template');
  };

  const handleTemplateSelect = (template: EventTemplate) => {
    setSelectedTemplate(template);
    setCurrentStep('form');
  };

  const handleEventCreated = (event: EventPost) => {
    setCreatedEvent(event);
    setCurrentStep('success');
  };

  const resetFlow = () => {
    setCurrentStep('category');
    setSelectedCategory('All');
    setSelectedTemplate(null);
    setCreatedEvent(null);
  };

  if (currentStep === 'success' && createdEvent) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Event Created Successfully!</h2>
          <p className="text-muted-foreground">Your event "{createdEvent.title}" has been created</p>
        </div>

        <div className="space-y-4">
          <Button onClick={resetFlow} className="w-full">
            Create Another Event
          </Button>
          <Button variant="outline" onClick={() => setCurrentStep('category')} className="w-full">
            Back to Posts
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 'form' && selectedTemplate) {
    return (
      <EventCreationForm
        template={selectedTemplate}
        onEventCreated={handleEventCreated}
        onBack={() => setCurrentStep('template')}
      />
    );
  }

  if (currentStep === 'template') {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => setCurrentStep('category')} className="mb-4">
            ← Back to Categories
          </Button>
          <h2 className="text-2xl font-bold mb-2">Choose a Template</h2>
          <p className="text-muted-foreground">Select a template for your {selectedCategory} event</p>
        </div>

        <TemplateSelector
          selectedCategory={selectedCategory}
          onTemplateSelect={handleTemplateSelect}
          selectedTemplate={selectedTemplate}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-poppins font-bold mb-2">Create Event</h1>
        <p className="text-muted-foreground">Create and share your custom party invitations</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Choose Event Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className="p-6 border border-border rounded-lg hover:border-primary hover:bg-accent transition-all duration-200 text-center group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium">{category}</h4>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-muted/50 border border-border rounded-lg p-6 text-center">
        <h3 className="font-semibold mb-2">Quick Start</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select a category above to start creating your event invitation
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span>Category</span>
          <span>→</span>
          <span>Template</span>
          <span>→</span>
          <span>Details</span>
          <span>→</span>
          <span>Share</span>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
