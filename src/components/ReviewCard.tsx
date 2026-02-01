import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Review } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4"
    >
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={review.customer?.avatar_url || undefined} />
          <AvatarFallback className="bg-primary/10 text-primary text-sm">
            {review.customer?.full_name?.split(' ').map((n) => n[0]).join('') || 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">
                {review.customer?.full_name || 'Anonymous'}
              </h4>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating
                      ? 'fill-accent text-accent'
                      : 'text-muted'
                  }`}
                />
              ))}
            </div>
          </div>
          {review.comment && (
            <p className="text-sm text-muted-foreground mt-2">{review.comment}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
