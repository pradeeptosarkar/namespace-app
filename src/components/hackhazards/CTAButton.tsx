import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'lg';
  className?: string;
}

export const CTAButton = ({ 
  children, 
  onClick, 
  href, 
  variant = 'primary', 
  size = 'default',
  className 
}: CTAButtonProps) => {
  const baseClasses = cn(
    "font-sora font-semibold transition-all duration-300 transform hover:scale-105",
    size === 'lg' && "h-12 px-8 text-lg",
    className
  );

  if (href) {
    return (
      <a 
        href={href}
        className={cn(
          baseClasses,
          variant === 'primary' 
            ? "bg-gradient-to-r from-namespace-purple to-namespace-blue text-white hover:shadow-lg hover:shadow-namespace-purple/20" 
            : "border-2 border-namespace-purple text-namespace-purple hover:bg-namespace-purple hover:text-white",
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          size === 'lg' ? "h-12 px-8" : "h-10 px-4 py-2"
        )}
      >
        {children}
      </a>
    );
  }

  return (
    <Button
      onClick={onClick}
      className={cn(
        baseClasses,
        variant === 'primary' 
          ? "bg-gradient-to-r from-namespace-purple to-namespace-blue text-white hover:shadow-lg hover:shadow-namespace-purple/20" 
          : "border-2 border-namespace-purple text-namespace-purple hover:bg-namespace-purple hover:text-white"
      )}
      size={size}
      variant="ghost"
    >
      {children}
    </Button>
  );
};