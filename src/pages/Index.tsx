
import { useState } from 'react';
import { Calendar, Search, User, Plus, Menu, X } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import EventFeed from '../components/EventFeed';
import DiscoveryPage from '../components/DiscoveryPage';
import ProfilePage from '../components/ProfilePage';
import PostsPage from '../components/PostsPage';
import logoWhite from '../assets/Revibe-logo-main.svg';
import logoDark from '../assets/Revibe-logo-main.svg';

const Index = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const tabs = [
    { id: 'feed', label: 'Events', icon: Calendar },
    { id: 'posts', label: 'Posts', icon: Plus },
    { id: 'discovery', label: 'Discover', icon: Search },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'feed':
        return <EventFeed />;
      case 'posts':
        return <PostsPage />;
      case 'discovery':
        return <DiscoveryPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <EventFeed />;
    }
  };

  const handleThemeChange = (isDark: boolean) => {
    setIsDarkTheme(isDark);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <img 
                  src={isDarkTheme ? logoWhite : logoDark} 
                  alt="Revibe Logo" 
                  className="h-14 w-auto"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <ThemeToggle onThemeChange={handleThemeChange} />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border bg-background">
              <nav className="py-4 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground rounded-md mx-4'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 md:pb-8">
        {renderTabContent()}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border">
        <nav className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Index;
