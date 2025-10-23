import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';


interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  adminLogin: (username: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin is already logged in
    const adminToken = localStorage.getItem('admin_token');
    if (adminToken) {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const adminLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      // Call the admin-login edge function
      const { data, error } = await supabase.functions.invoke('admin-login', {
        body: { username, password }
      });

      if (error) {
        toast({
          title: "Error",
          description: "Login failed. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      if (data.success) {
        localStorage.setItem('admin_token', 'admin_authenticated');
        setIsAdminAuthenticated(true);
        toast({
          title: "Success",
          description: "Admin login successful",
        });
        return true;
      } else {
        toast({
          title: "Error",
          description: data.error || "Invalid admin credentials",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Login failed. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const adminLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAdminAuthenticated(false);
    toast({
      title: "Success",
      description: "Logged out successfully",
    });
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminAuthenticated, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
