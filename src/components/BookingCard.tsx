import { motion } from 'framer-motion';
import { Booking } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface BookingCardProps {
  booking: Booking;
  onClick?: () => void;
}

const statusStyles: Record<Booking['status'], string> = {
  pending: 'status-pending',
  confirmed: 'status-confirmed',
  in_progress: 'status-in-progress',
  completed: 'status-completed',
  cancelled: 'status-cancelled',
};

const statusLabels: Record<Booking['status'], string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const BookingCard = ({ booking, onClick }: BookingCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className="glass-card p-4 cursor-pointer transition-all duration-300 hover:shadow-glow-rose hover:border-primary/30"
    >
      <div className="flex items-start gap-4">
        <Avatar className="h-14 w-14 ring-2 ring-primary/20">
          <AvatarImage src={booking.salon?.logo || undefined} />
          <AvatarFallback className="bg-primary/10 text-primary font-serif">
            {booking.salon?.name?.[0] || 'S'}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-serif font-semibold text-foreground truncate">
                {booking.salon?.name || 'Salon'}
              </h3>
              <p className="text-sm text-primary">{booking.service?.name}</p>
            </div>
            <Badge className={cn('shrink-0', statusStyles[booking.status])}>
              {statusLabels[booking.status]}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(booking.booking_date), 'MMM d, yyyy')}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {booking.start_time}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {booking.salon?.city}
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={booking.staff?.avatar_url || undefined} />
                <AvatarFallback className="text-xs">
                  {booking.staff?.name?.[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                {booking.staff?.name}
              </span>
            </div>
            <span className="font-semibold text-foreground">
              ${booking.total_amount}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;
