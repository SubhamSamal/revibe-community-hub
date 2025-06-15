import { useState, useEffect } from 'react';
import { Calendar, Search, User, Plus, Menu, X, Users, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import EventFeed from '../components/EventFeed';
import DiscoveryPage from '../components/DiscoveryPage';
import ProfilePage from '../components/ProfilePage';
import PostsPage from '../components/PostsPage';
import CommunitiesPage from '../components/CommunitiesPage';
import logoWhite from '../assets/Revibe-logo-main.svg';
import logoDark from '../assets/Revibe-logo-main.svg';

const Index = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { signOut } = useAuth();

  // Initialize theme on component mount - default to dark theme
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    // Default to dark theme if no preference is set, or use stored preference
    const isDarkMode = theme === 'dark' || (!theme && true); // Changed to default to true (dark)
    setIsDarkTheme(isDarkMode);
    
    // Apply theme to document
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  const tabs = [
    { id: 'feed', label: 'Feed', icon: Calendar },
    { id: 'posts', label: 'Posts', icon: Plus },
    { id: 'communities', label: 'Communities', icon: Users },
    { id: 'discovery', label: 'Discover', icon: Search },
  ];

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'contact', label: 'Contact Us', icon: HelpCircle },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'feed':
        return <EventFeed />;
      case 'posts':
        return <PostsPage />;
      case 'communities':
        return <CommunitiesPage />;
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

  const handleMenuItemClick = (itemId: string) => {
    if (itemId === 'profile') {
      setActiveTab('profile');
    } else if (itemId === 'settings') {
      console.log('Settings clicked');
    } else if (itemId === 'contact') {
      console.log('Contact us clicked');
    } else if (itemId === 'logout') {
      signOut();
    }
    setIsMobileMenuOpen(false);
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

            {/* Hamburger Menu Button */}
            <div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Hamburger Menu Content */}
          {isMobileMenuOpen && (
            <div className="border-t border-border bg-background">
              <nav className="py-4 space-y-2">
                {/* Menu Items */}
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMenuItemClick(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                        (item.id === 'profile' && activeTab === 'profile')
                          ? 'bg-primary text-primary-foreground rounded-md mx-4'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  );
                })}

                {/* Theme Toggle */}
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm font-medium text-muted-foreground">Theme</span>
                  <ThemeToggle onThemeChange={handleThemeChange} />
                </div>

                {/* Separator */}
                <div className="my-3 border-t border-border mx-4"></div>

                {/* Logout Button */}
                <button
                  onClick={() => handleMenuItemClick('logout')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
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
