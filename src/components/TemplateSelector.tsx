
import { useState, useEffect } from 'react';
import { EventTemplate } from '../types/posts';
import { getTemplatesByCategory } from '../services/postsService';
import { Skeleton } from './ui/skeleton';

interface TemplateSelectorProps {
  selectedCategory: string;
  onTemplateSelect: (template: EventTemplate) => void;
  selectedTemplate?: EventTemplate;
}

const TemplateSelector = ({ selectedCategory, onTemplateSelect, selectedTemplate }: TemplateSelectorProps) => {
  const [templates, setTemplates] = useState<EventTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, [selectedCategory]);

  const loadTemplates = async () => {
    setIsLoading(true);
    try {
      const categoryTemplates = await getTemplatesByCategory(selectedCategory);
      setTemplates(categoryTemplates);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-32 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onTemplateSelect(template)}
          className={`relative h-32 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
            selectedTemplate?.id === template.id
              ? 'border-primary ring-2 ring-primary/20'
              : 'border-border hover:border-primary/50'
          }`}
          style={{ backgroundColor: template.backgroundColor }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div 
            className="absolute bottom-2 left-2 font-medium text-sm"
            style={{ color: template.textColor }}
          >
            {template.name}
          </div>
          <div className="absolute top-2 right-2">
            <span className="bg-black/50 text-white px-2 py-1 rounded text-xs">
              {template.layout}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
