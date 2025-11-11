import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Globe, Menu, Moon, Sun } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Header({ onMenuClick }) {
  const [language, setLanguage] = useState('EN');
  const [theme, setTheme] = useState('light');

  const toggleLanguage = () => {
    const newLang = language === 'EN' ? 'HI' : 'EN';
    setLanguage(newLang);
    console.log('Language changed to:', newLang);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    console.log('Theme changed to:', newTheme);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background" data-testid="header">
      <div className="flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onMenuClick}
            data-testid="button-menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold" data-testid="text-title">
              Uttarakhand Disaster Alert
            </h1>
            <p className="text-xs text-muted-foreground" data-testid="text-subtitle">
              AI Early Warning System
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => console.log('Notifications clicked')}
            data-testid="button-notifications"
          >
            <Bell className="w-5 h-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              data-testid="badge-notification-count"
            >
              3
            </Badge>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={toggleLanguage}
            data-testid="button-language"
          >
            <Globe className="w-4 h-4" />
            <span>{language}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
