
import { useState } from 'react';
import { Plus, Upload } from 'lucide-react';
import { EventTemplate, EventPost } from '../types/posts';
import { Button } from './ui/button';
import TemplateSelector from './TemplateSelector';
import EventCreationForm from './EventCreationForm';

const PostsPage = () => {
  const [currentStep, setCurrentStep] = useState<'form' | 'template' | 'success'>('form');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<EventTemplate>({
    id: 'default-1',
    name: 'Simple & Clean',
    category: 'All',
    previewImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=200&fit=crop',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    layout: 'minimal'
  });
  const [createdEvent, setCreatedEvent] = useState<EventPost | null>(null);

  const handleTemplateSelect = (template: EventTemplate) => {
    setSelectedTemplate(template);
    setCurrentStep('form');
  };

  const handleEventCreated = (event: EventPost) => {
    setCreatedEvent(event);
    setCurrentStep('success');
  };

  const resetFlow = () => {
    setCurrentStep('form');
    setSelectedCategory('All');
    setSelectedTemplate({
      id: 'default-1',
      name: 'Simple & Clean',
      category: 'All',
      previewImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=200&fit=crop',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      layout: 'minimal'
    });
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
          <Button variant="outline" onClick={() => setCurrentStep('form')} className="w-full">
            Back to Posts
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 'template') {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => setCurrentStep('form')} className="mb-4">
            ← Back to Event Details
          </Button>
          <h2 className="text-2xl font-bold mb-2">Choose a Different Template</h2>
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
    <EventCreationForm
      template={selectedTemplate}
      onEventCreated={handleEventCreated}
      onTemplateChange={() => setCurrentStep('template')}
      onCategoryChange={setSelectedCategory}
      selectedCategory={selectedCategory}
    />
  );
};

export default PostsPage;
