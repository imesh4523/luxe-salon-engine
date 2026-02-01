import { motion } from 'framer-motion';
import { Clock, DollarSign, Check } from 'lucide-react';
import { Service } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  isSelected?: boolean;
  onSelect?: (service: Service) => void;
}

export const ServiceCard = ({ service, isSelected, onSelect }: ServiceCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect?.(service)}
      className={cn(
        'glass-card p-4 cursor-pointer transition-all duration-300',
        isSelected
          ? 'border-primary shadow-glow-rose'
          : 'hover:border-primary/30'
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-foreground">{service.name}</h4>
            {isSelected && (
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {service.description}
          </p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {service.duration_minutes} min
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-lg font-semibold text-primary">
            ${service.price}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
