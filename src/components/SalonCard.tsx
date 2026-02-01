import { motion } from 'framer-motion';
import { Star, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Salon } from '@/types';
import { Badge } from '@/components/ui/badge';

interface SalonCardProps {
  salon: Salon;
  index?: number;
}

export const SalonCard = ({ salon, index = 0 }: SalonCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link to={`/salon/${salon.id}`}>
        <div className="glass-card group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-glow-rose hover:border-primary/30">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={salon.cover_image || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800'}
              alt={salon.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            
            {/* Rating Badge */}
            <div className="absolute top-3 right-3">
              <Badge className="glass-card backdrop-blur-md border-none gap-1">
                <Star className="h-3 w-3 fill-accent text-accent" />
                {salon.rating.toFixed(1)}
              </Badge>
            </div>

            {/* Distance Badge */}
            {salon.distance !== undefined && (
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="glass-card backdrop-blur-md border-none gap-1">
                  <MapPin className="h-3 w-3" />
                  {salon.distance.toFixed(1)} mi
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {salon.name}
                </h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  {salon.city}
                </p>
              </div>
              {salon.logo && (
                <div className="w-10 h-10 rounded-lg overflow-hidden ring-2 ring-primary/20">
                  <img
                    src={salon.logo}
                    alt={`${salon.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {salon.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                Open Now
              </div>
              <span className="text-sm text-primary font-medium">
                {salon.review_count} reviews
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default SalonCard;
