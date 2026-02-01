import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimeSlotButtonProps {
  time: string;
  available?: boolean;
  isSelected?: boolean;
  onSelect?: (time: string) => void;
}

export const TimeSlotButton = ({
  time,
  available = true,
  isSelected,
  onSelect,
}: TimeSlotButtonProps) => {
  return (
    <motion.button
      whileHover={available ? { scale: 1.05 } : undefined}
      whileTap={available ? { scale: 0.95 } : undefined}
      onClick={() => available && onSelect?.(time)}
      disabled={!available}
      className={cn(
        'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
        isSelected
          ? 'bg-primary text-primary-foreground shadow-glow-rose'
          : available
          ? 'glass-card hover:border-primary/50'
          : 'bg-muted/50 text-muted-foreground cursor-not-allowed'
      )}
    >
      {time}
    </motion.button>
  );
};

export default TimeSlotButton;
