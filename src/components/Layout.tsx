import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

const Layout = ({ children, showFooter = true }: LayoutProps) => {
  const location = useLocation();

  // Show sidebar on dashboard page
  const showSidebar = location.pathname === '/dashboard';

  // Hide footer on dashboard page
  const shouldShowFooter = showFooter && location.pathname !== '/dashboard';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow relative pt-16">
        {showSidebar && (
          <div className="fixed left-0 top-16 bottom-0 w-64 z-10 hidden lg:block">
            <Sidebar />
          </div>
        )}
        <main className={`flex-grow overflow-auto ${showSidebar ? 'lg:ml-64' : ''}`}>
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default Layout;
