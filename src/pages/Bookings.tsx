import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { MobileNav } from '@/components/MobileNav';
import { BookingCard } from '@/components/BookingCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useMyBookings, useUpdateBookingStatus } from '@/hooks/useData';
import { mockBookings } from '@/lib/mock-data';

const Bookings = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: bookings, isLoading: bookingsLoading } = useMyBookings(user?.id);
  const updateStatus = useUpdateBookingStatus();

  // Use mock data if no real data
  const displayBookings = bookings && bookings.length > 0 ? bookings : (user ? [] : mockBookings);

  const upcomingBookings = displayBookings.filter(
    (b: any) => b.status === 'pending' || b.status === 'confirmed' || b.status === 'in_progress'
  );
  const pastBookings = displayBookings.filter(
    (b: any) => b.status === 'completed' || b.status === 'cancelled'
  );

  const handleCancelBooking = (bookingId: string) => {
    updateStatus.mutate({ id: bookingId, status: 'cancelled' });
  };

  const isLoading = authLoading || bookingsLoading;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-24 px-3 sm:px-4">
        <div className="container max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 sm:mb-6"
          >
            <h1 className="font-serif text-2xl sm:text-3xl font-bold">
              My <span className="gradient-text">Bookings</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Manage your appointments
            </p>
          </motion.div>

          {!user && !authLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-6 text-center mb-6"
            >
              <p className="text-muted-foreground mb-4">
                Sign in to view and manage your bookings
              </p>
              <Link to="/auth">
                <Button className="shadow-glow-rose">Sign In</Button>
              </Link>
            </motion.div>
          )}

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="glass-card w-full justify-start p-1 mb-4 sm:mb-6">
              <TabsTrigger value="upcoming" className="flex-1 text-xs sm:text-sm">
                Upcoming ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="flex-1 text-xs sm:text-sm">
                Past ({pastBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                  ))}
                </div>
              ) : upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking: any) => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking}
                    showActions
                    onCancel={handleCancelBooking}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-8 text-center"
                >
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-serif text-xl font-semibold mb-2">
                    No Upcoming Bookings
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any upcoming appointments. Book now!
                  </p>
                  <Link
                    to="/explore"
                    className="text-primary hover:underline font-medium"
                  >
                    Explore Salons →
                  </Link>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                  ))}
                </div>
              ) : pastBookings.length > 0 ? (
                pastBookings.map((booking: any) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-8 text-center"
                >
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-serif text-xl font-semibold mb-2">
                    No Past Bookings
                  </h3>
                  <p className="text-muted-foreground">
                    Your completed appointments will appear here.
                  </p>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

export default Bookings;
