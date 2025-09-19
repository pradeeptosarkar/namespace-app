import { CTAButton } from './CTAButton';
import { cn } from '@/lib/utils';

interface HackHazardsCTAButtonsProps {
  size?: 'default' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  buttonClassName?: string;
}

export const HackHazardsCTAButtons = ({ 
  size = 'default', 
  orientation = 'horizontal',
  className,
  buttonClassName
}: HackHazardsCTAButtonsProps) => {
  return (
    <div className={cn(
      "flex gap-4 justify-center items-center",
      orientation === 'vertical' ? "flex-col" : "flex-col sm:flex-row",
      className
    )}>
      <CTAButton 
        variant="primary" 
        size={size}
        className={buttonClassName}
      >
        Applications Opening Soon
      </CTAButton>
      <CTAButton
        variant="secondary"
        size={size}
        href="mailto:contact@namespacecomm.in"
        className={buttonClassName}
      >
        Partner with Us
      </CTAButton>
    </div>
  );
};