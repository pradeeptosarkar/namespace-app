import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, LogOut, BarChart3, Moon, Sun, ChevronDown, Menu, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme, isForcedLightMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [partnersOpen, setPartnersOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-b-lg shadow-soft">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src={theme === 'dark' ? "/Logo-dark.png" : "/Logo.png"}
            alt="NAMESPACE LOGO" 
            className="h-8 w-auto object-contain max-h-8"
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link 
                  to="/about-us" 
                  className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:outline-none"
                >
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link 
                  to="/events" 
                  className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:outline-none"
                >
                  Events
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent hover:text-primary">
                Partners
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-3 p-4 bg-white dark:bg-gray-800">
                  <li>
                    <button 
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground w-full text-left"
                      disabled
                    >
                      <div className="text-sm font-medium leading-none">Companies</div>
                      <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                        Coming soon
                      </p>
                    </button>
                  </li>
                  <li>
                    <button 
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground w-full text-left"
                      disabled
                    >
                      <div className="text-sm font-medium leading-none">Institutions</div>
                      <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                        Coming soon
                      </p>
                    </button>
                  </li>
                  <li>
                    <button 
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground w-full text-left"
                      disabled
                    >
                      <div className="text-sm font-medium leading-none">Communities</div>
                      <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                        Coming soon
                      </p>
                    </button>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link 
                  to="/team" 
                  className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:outline-none"
                >
                  Team
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-2 md:space-x-4">
          <Button 
            onClick={toggleTheme} 
            variant="ghost" 
            size="icon"
            disabled={isForcedLightMode}
            className="text-muted-foreground hover:bg-muted hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-muted transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium font-heading">{user.user_metadata?.full_name || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={() => {
                localStorage.setItem('authRedirectUrl', location.pathname);
                navigate('/auth');
              }}
              className="bg-primary hover:bg-primary/90 transition-colors"
            >
              Sign In
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link 
                  to="/about-us" 
                  className="text-lg font-medium hover:text-primary transition-colors px-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/events" 
                  className="text-lg font-medium hover:text-primary transition-colors px-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Events
                </Link>
                <Collapsible open={partnersOpen} onOpenChange={setPartnersOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium hover:text-primary transition-colors px-2 py-2">
                    Partners
                    <ChevronRight className={`h-4 w-4 transition-transform ${partnersOpen ? 'rotate-90' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="flex flex-col space-y-2 pl-6 pt-2">
                    <button className="text-sm text-muted-foreground text-left py-1" disabled>
                      Companies (Coming soon)
                    </button>
                    <button className="text-sm text-muted-foreground text-left py-1" disabled>
                      Institutions (Coming soon)
                    </button>
                    <button className="text-sm text-muted-foreground text-left py-1" disabled>
                      Communities (Coming soon)
                    </button>
                  </CollapsibleContent>
                </Collapsible>
                <Link 
                  to="/team" 
                  className="text-lg font-medium hover:text-primary transition-colors px-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Team
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
