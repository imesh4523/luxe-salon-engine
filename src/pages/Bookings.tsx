import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { MobileNav } from '@/components/MobileNav';
import { BookingCard } from '@/components/BookingCard';
import { mockBookings } from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Bookings = () => {
  const upcomingBookings = mockBookings.filter(
    (b) => b.status === 'pending' || b.status === 'confirmed'
  );
  const pastBookings = mockBookings.filter(
    (b) => b.status === 'completed' || b.status === 'cancelled'
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-24 px-4">
        <div className="container max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="font-serif text-3xl font-bold">
              My <span className="gradient-text">Bookings</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              ඔබගේ appointments manage කරන්න
            </p>
          </motion.div>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="glass-card w-full justify-start p-1 mb-6">
              <TabsTrigger value="upcoming" className="flex-1">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="past" className="flex-1">
                Past
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
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
                    ඔබට upcoming appointments නැහැ. දැන් book කරන්න!
                  </p>
                  <Link
                    to="/"
                    className="text-primary hover:underline font-medium"
                  >
                    Explore Salons →
                  </Link>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastBookings.length > 0 ? (
                pastBookings.map((booking) => (
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
                    ඔබගේ completed appointments මෙහි පෙන්වයි.
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
