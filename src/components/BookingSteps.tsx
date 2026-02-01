import { motion } from 'framer-motion';
import { Check, Clock, User, Calendar as CalendarIcon, CreditCard } from 'lucide-react';
import { BookingStep } from '@/types';
import { cn } from '@/lib/utils';

interface BookingStepsProps {
  steps: BookingStep[];
  currentStep: BookingStep['step'];
}

const stepIcons: Record<BookingStep['step'], React.ReactNode> = {
  service: <CreditCard className="h-4 w-4" />,
  staff: <User className="h-4 w-4" />,
  date: <CalendarIcon className="h-4 w-4" />,
  time: <Clock className="h-4 w-4" />,
  confirm: <Check className="h-4 w-4" />,
};

export const BookingSteps = ({ steps, currentStep }: BookingStepsProps) => {
  const currentIndex = steps.findIndex((s) => s.step === currentStep);

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = step.step === currentStep;

        return (
          <div key={step.step} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                  isCompleted
                    ? 'bg-primary text-primary-foreground'
                    : isCurrent
                    ? 'bg-primary/20 text-primary ring-2 ring-primary'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  stepIcons[step.step]
                )}
              </motion.div>
              <span
                className={cn(
                  'text-xs mt-2 font-medium',
                  isCurrent ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-[2px] w-12 md:w-20 mx-2',
                  index < currentIndex ? 'bg-primary' : 'bg-muted'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BookingSteps;
