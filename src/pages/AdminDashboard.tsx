import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Store, Users, DollarSign, AlertTriangle,
  TrendingUp, CheckCircle, XCircle, Clock, Settings, LogOut,
  ChevronRight, Search, Filter, ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useSalons, useUpdateSalonStatus, usePlatformStats } from '@/hooks/useData';
import { Skeleton } from '@/components/ui/skeleton';

const AdminDashboard = () => {
  const { user, profile, signOut, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const { data: salons, isLoading: salonsLoading } = useSalons();
  const { data: stats, isLoading: statsLoading } = usePlatformStats();
  const updateStatus = useUpdateSalonStatus();

  const handleApproveSalon = (salonId: string) => {
    updateStatus.mutate({ id: salonId, status: 'approved' });
  };

  const handleRejectSalon = (salonId: string) => {
    updateStatus.mutate({ id: salonId, status: 'rejected' });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const platformStats = [
    {
      title: 'Total Revenue',
      value: stats ? `$${stats.totalRevenue.toLocaleString()}` : '$0',
      change: '+22%',
      icon: DollarSign,
      color: 'text-primary',
    },
    {
      title: 'Active Salons',
      value: stats?.approvedSalons?.toString() || '0',
      change: `+${stats?.pendingSalons || 0} pending`,
      icon: Store,
      color: 'text-primary',
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers?.toLocaleString() || '0',
      change: 'All time',
      icon: Users,
      color: 'text-primary',
    },
    {
      title: 'Pending Approvals',
      value: stats?.pendingSalons?.toString() || '0',
      change: 'Urgent',
      icon: Clock,
      color: 'text-accent',
    },
  ];

  const recentDisputes = [
    { id: 1, customer: 'John Doe', salon: 'Luxe Beauty', issue: 'Refund request', status: 'open' },
    { id: 2, customer: 'Jane Smith', salon: 'Serenity Spa', issue: 'Late cancellation', status: 'resolved' },
    { id: 3, customer: 'Mike Johnson', salon: 'Cutting Edge', issue: 'Service complaint', status: 'open' },
  ];

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
          <div>
            <span className="font-serif text-xl font-semibold gradient-text">Glamour</span>
            <Badge variant="secondary" className="ml-2 text-xs">Admin</Badge>
          </div>
        </Link>

        <nav className="flex-1 space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Overview', active: true },
            { icon: Store, label: 'Salons' },
            { icon: Users, label: 'Users' },
            { icon: DollarSign, label: 'Financials' },
            { icon: AlertTriangle, label: 'Disputes', badge: 2 },
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
              {item.badge && (
                <Badge className="ml-auto bg-destructive text-destructive-foreground text-xs">
                  {item.badge}
                </Badge>
              )}
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback>{profile?.full_name?.[0] || 'A'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{profile?.full_name || 'Admin'}</p>
              <p className="text-sm text-muted-foreground">Platform Admin</p>
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
          <h1 className="font-serif text-xl font-semibold">Admin Dashboard</h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold">
              Platform <span className="gradient-text">Overview</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Monitor and manage your marketplace
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-64 bg-muted/50" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {platformStats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card border-border/50">
                <CardContent className="p-3 sm:p-6">
                  {statsLoading ? (
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
          {/* Pending Salon Approvals */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-border/50 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
                <CardTitle className="font-serif text-lg sm:text-xl">Salon Management</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1 text-xs sm:text-sm">
                  <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
                  Filter
                </Button>
              </CardHeader>
              <CardContent className="p-0 sm:p-6 sm:pt-0">
                {salonsLoading ? (
                  <div className="p-4 space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : salons && salons.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border/50">
                          <TableHead className="text-xs sm:text-sm">Salon</TableHead>
                          <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Location</TableHead>
                          <TableHead className="text-xs sm:text-sm">Status</TableHead>
                          <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {salons.map((salon) => (
                          <TableRow key={salon.id} className="border-border/50">
                            <TableCell className="py-2 sm:py-4">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 shrink-0">
                                  <AvatarImage src={salon.logo || undefined} />
                                  <AvatarFallback className="text-xs sm:text-sm">{salon.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                  <p className="font-medium text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">{salon.name}</p>
                                  <p className="text-xs text-muted-foreground truncate sm:hidden">
                                    {salon.city}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground hidden sm:table-cell text-sm">
                              {salon.city}
                            </TableCell>
                            <TableCell className="py-2 sm:py-4">
                              <Badge
                                className={`text-xs ${
                                  salon.status === 'approved'
                                    ? 'bg-primary/20 text-primary'
                                    : salon.status === 'rejected'
                                    ? 'bg-destructive/20 text-destructive'
                                    : 'bg-accent/20 text-accent'
                                }`}
                              >
                                {salon.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right py-2 sm:py-4">
                              {salon.status === 'pending' && (
                                <div className="flex items-center justify-end gap-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-primary hover:text-primary hover:bg-primary/10 h-7 w-7 sm:h-8 sm:w-8 p-0"
                                    onClick={() => handleApproveSalon(salon.id)}
                                    disabled={updateStatus.isPending}
                                  >
                                    <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7 w-7 sm:h-8 sm:w-8 p-0"
                                    onClick={() => handleRejectSalon(salon.id)}
                                    disabled={updateStatus.isPending}
                                  >
                                    <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Store className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No salons found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Financial Overview & Disputes */}
          <div className="space-y-6">
            {/* Commission Breakdown */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="font-serif">Commission Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-xl border border-primary/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Platform Earnings</span>
                    <span className="text-2xl font-bold text-primary">
                      ${stats?.platformEarnings?.toLocaleString() || '0'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">15% avg commission rate</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Total Bookings</span>
                    <span className="text-2xl font-bold">{stats?.totalBookings || 0}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">All time</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Disputes */}
            <Card className="glass-card border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-serif">Recent Disputes</CardTitle>
                <Badge variant="destructive">2 Open</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentDisputes.map((dispute) => (
                  <div
                    key={dispute.id}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        dispute.status === 'open' ? 'bg-destructive' : 'bg-primary'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{dispute.issue}</p>
                      <p className="text-xs text-muted-foreground">
                        {dispute.customer} • {dispute.salon}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
