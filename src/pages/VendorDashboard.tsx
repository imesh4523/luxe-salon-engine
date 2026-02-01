import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, DollarSign, Users, Scissors, TrendingUp, Clock,
  Plus, Settings, LogOut, Bell, ChevronRight, MoreVertical
} from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockBookings, mockStaff, mockServices } from '@/lib/mock-data';
import { BookingCard } from '@/components/BookingCard';
import { Link } from 'react-router-dom';

const VendorDashboard = () => {
  const [selectedDate] = useState(new Date());

  const todaysBookings = mockBookings.filter(
    (b) => b.booking_date === format(selectedDate, 'yyyy-MM-dd')
  );

  const stats = [
    {
      title: "Today's Revenue",
      value: '$1,245',
      change: '+12%',
      icon: DollarSign,
      color: 'text-success',
    },
    {
      title: "Today's Appointments",
      value: '8',
      change: '+3',
      icon: Calendar,
      color: 'text-info',
    },
    {
      title: 'Active Staff',
      value: '5',
      change: 'Online',
      icon: Users,
      color: 'text-primary',
    },
    {
      title: 'Pending Requests',
      value: '3',
      change: 'New',
      icon: Bell,
      color: 'text-warning',
    },
  ];

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
            { icon: Scissors, label: 'Services' },
            { icon: Users, label: 'Staff' },
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
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" />
              <AvatarFallback>LS</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">Luxe Beauty Studio</p>
              <p className="text-sm text-muted-foreground">Vendor Admin</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold">
              Good morning, <span className="gradient-text">Sarah</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening at your salon today
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center">
                3
              </span>
            </Button>
            <Button className="gap-2 shadow-glow-rose">
              <Plus className="h-4 w-4" />
              New Booking
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                      <Badge variant="secondary" className={`mt-2 ${stat.color}`}>
                        {stat.change}
                      </Badge>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Appointments */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-serif">Today's Appointments</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
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
                {mockStaff.map((staff) => (
                  <div
                    key={staff.id}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl"
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={staff.avatar_url || undefined} />
                        <AvatarFallback>{staff.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full ring-2 ring-background" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{staff.name}</p>
                      <p className="text-sm text-muted-foreground">{staff.title}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
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
                      <p className="font-semibold">$24,580</p>
                    </div>
                  </div>
                  <Badge className="bg-success/20 text-success">+18%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-info/20 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-info" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bookings</p>
                      <p className="font-semibold">186</p>
                    </div>
                  </div>
                  <Badge className="bg-info/20 text-info">+12%</Badge>
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
