import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, DollarSign, Users, Scissors, TrendingUp, Clock,
  Plus, Settings, LogOut, Bell, ChevronRight, MoreVertical, ArrowLeft
} from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useMySalon, useSalonBookings, useStaff, useServices, useUpdateBookingStatus } from '@/hooks/useData';
import { mockBookings, mockStaff } from '@/lib/mock-data';
import { BookingCard } from '@/components/BookingCard';

const VendorDashboard = () => {
  const { user, profile, signOut, isVendor, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [selectedDate] = useState(new Date());

  const { data: salon, isLoading: salonLoading } = useMySalon(user?.id);
  const { data: bookings, isLoading: bookingsLoading } = useSalonBookings(salon?.id);
  const { data: staff, isLoading: staffLoading } = useStaff(salon?.id);
  const { data: services, isLoading: servicesLoading } = useServices(salon?.id);
  const updateBookingStatus = useUpdateBookingStatus();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Calculate stats from real data or use defaults
  const todaysBookings = bookings?.filter(
    (b) => b.booking_date === format(selectedDate, 'yyyy-MM-dd')
  ) || [];

  const completedBookings = bookings?.filter(b => b.status === 'completed') || [];
  const todayRevenue = todaysBookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + Number(b.total_amount), 0);

  const stats = [
    {
      title: "Today's Revenue",
      value: `$${todayRevenue.toLocaleString()}`,
      change: '+12%',
      icon: DollarSign,
      color: 'text-primary',
    },
    {
      title: "Today's Appointments",
      value: todaysBookings.length.toString(),
      change: 'scheduled',
      icon: Calendar,
      color: 'text-primary',
    },
    {
      title: 'Active Staff',
      value: staff?.length?.toString() || '0',
      change: 'Online',
      icon: Users,
      color: 'text-primary',
    },
    {
      title: 'Pending Requests',
      value: bookings?.filter(b => b.status === 'pending').length.toString() || '0',
      change: 'New',
      icon: Bell,
      color: 'text-accent',
    },
  ];

  // Use mock data if no real data exists
  const displayBookings = bookings && bookings.length > 0 ? bookings : mockBookings;
  const displayStaff = staff && staff.length > 0 ? staff : mockStaff;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 glass-card border-r border-border/50 p-6 hidden lg:flex flex-col">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-xl font-serif font-bold text-primary-foreground">G</span>
          </div>
          <span className="font-serif text-xl font-semibold gradient-text">Glamour</span>
        </Link>

        <nav className="flex-1 space-y-2">
          {[
            { icon: Calendar, label: 'Dashboard', active: true },
            { icon: Scissors, label: 'Services', count: services?.length },
            { icon: Users, label: 'Staff', count: staff?.length },
            { icon: DollarSign, label: 'Earnings' },
            { icon: TrendingUp, label: 'Analytics' },
            { icon: Settings, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.active
                  ? 'bg-primary/20 text-primary'
                  : 'text-muted-foreground hover:bg-muted/50'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
              {item.count !== undefined && (
                <Badge variant="secondary" className="ml-auto">
                  {item.count}
                </Badge>
              )}
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarImage src={salon?.logo || profile?.avatar_url || undefined} />
              <AvatarFallback>{salon?.name?.[0] || profile?.full_name?.[0] || 'V'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{salon?.name || 'My Salon'}</p>
              <p className="text-sm text-muted-foreground">Vendor Admin</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-muted-foreground"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 glass-card border-b border-border/50 p-4">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-serif text-xl font-semibold">Vendor Dashboard</h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold">
              Hello, <span className="gradient-text">{profile?.full_name?.split(' ')[0] || 'Vendor'}</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 truncate">
              {salon ? `Managing ${salon.name}` : "Here's what's happening today"}
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="outline" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              {(bookings?.filter(b => b.status === 'pending').length || 0) > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center">
                  {bookings?.filter(b => b.status === 'pending').length}
                </span>
              )}
            </Button>
            <Button className="gap-2 shadow-glow-rose text-sm sm:text-base" size="sm">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Booking</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card border-border/50">
                <CardContent className="p-3 sm:p-6">
                  {salonLoading || bookingsLoading ? (
                    <Skeleton className="h-16 sm:h-20 w-full" />
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{stat.title}</p>
                        <p className="text-xl sm:text-3xl font-bold mt-0.5 sm:mt-1">{stat.value}</p>
                        <Badge variant="secondary" className={`mt-1 sm:mt-2 text-xs ${stat.color}`}>
                          {stat.change}
                        </Badge>
                      </div>
                      <div className={`hidden sm:flex w-12 h-12 rounded-xl bg-muted/50 items-center justify-center ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Today's Appointments */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-border/50">
              <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
                <CardTitle className="font-serif text-lg sm:text-xl">Today's Bookings</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1 text-xs sm:text-sm">
                  View All <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0 space-y-3 sm:space-y-4">
                {bookingsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-20 w-full" />
                    ))}
                  </div>
                ) : displayBookings.length > 0 ? (
                  displayBookings.slice(0, 5).map((booking) => (
                    <BookingCard key={booking.id} booking={booking} showActions />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No appointments today</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Staff & Quick Actions */}
          <div className="space-y-6">
            {/* Staff Status */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="font-serif">Staff on Duty</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {staffLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : displayStaff.length > 0 ? (
                  displayStaff.map((staffMember) => (
                    <div
                      key={staffMember.id}
                      className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl"
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={staffMember.avatar_url || undefined} />
                          <AvatarFallback>{staffMember.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full ring-2 ring-background" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{staffMember.name}</p>
                        <p className="text-sm text-muted-foreground">{staffMember.title}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No staff added yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="font-serif">This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="font-semibold">
                        ${completedBookings.reduce((sum, b) => sum + Number(b.total_amount), 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-primary/20 text-primary">+18%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bookings</p>
                      <p className="font-semibold">{bookings?.length || 0}</p>
                    </div>
                  </div>
                  <Badge className="bg-primary/20 text-primary">+12%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Duration</p>
                      <p className="font-semibold">52 min</p>
                    </div>
                  </div>
                  <Badge className="bg-accent/20 text-accent">-5 min</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
