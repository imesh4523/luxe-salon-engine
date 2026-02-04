import { motion } from 'framer-motion';
import { Banknote, CreditCard, Lock, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PaymentMethod = 'cash' | 'online';

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const paymentOptions = [
  {
    id: 'cash' as PaymentMethod,
    title: 'Cash at Salon',
    description: 'Pay when you arrive',
    icon: Banknote,
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-600',
  },
  {
    id: 'online' as PaymentMethod,
    title: 'Pay Now',
    description: 'Secure online payment',
    icon: CreditCard,
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-600',
    badge: { icon: Lock, text: 'Secure' },
  },
];

export const PaymentMethodSelector = ({ value, onChange }: PaymentMethodSelectorProps) => {
  return (
    <div className="space-y-3">
      <p className="text-xs sm:text-sm text-muted-foreground mb-4">
        Select payment method
      </p>
      
      {paymentOptions.map((option) => {
        const isSelected = value === option.id;
        const Icon = option.icon;
        
        return (
          <motion.div
            key={option.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(option.id)}
            className={cn(
              'relative flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200',
              'border-2',
              isSelected
                ? 'bg-primary/10 border-primary shadow-glow-rose'
                : 'bg-muted/30 border-transparent hover:bg-muted/50'
            )}
          >
            {/* Selection indicator */}
            <div
              className={cn(
                'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all',
                isSelected
                  ? 'border-primary bg-primary'
                  : 'border-muted-foreground/30'
              )}
            >
              {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
            </div>
            
            {/* Icon */}
            <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', option.iconBg)}>
              <Icon className={cn('h-6 w-6', option.iconColor)} />
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className={cn(
                  'font-semibold',
                  isSelected ? 'text-foreground' : 'text-foreground/80'
                )}>
                  {option.title}
                </p>
                {option.badge && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-medium">
                    <option.badge.icon className="h-3 w-3" />
                    {option.badge.text}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                {option.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PaymentMethodSelector;
