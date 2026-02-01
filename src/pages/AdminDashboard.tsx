import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Store, Users, DollarSign, AlertTriangle,
  TrendingUp, CheckCircle, XCircle, Clock, Settings, LogOut,
  ChevronRight, MoreVertical, Search, Filter
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
import { mockSalons } from '@/lib/mock-data';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

type SalonWithStatus = typeof mockSalons[0] & { status: 'pending' | 'approved' | 'rejected' };

const AdminDashboard = () => {
  const [pendingSalons, setPendingSalons] = useState<SalonWithStatus[]>(
    mockSalons.map((s) => ({ ...s, status: 'pending' as const }))
  );

  const handleApproveSalon = (salonId: string) => {
    setPendingSalons((prev) =>
      prev.map((s) => (s.id === salonId ? { ...s, status: 'approved' as const } : s))
    );
    toast.success('Salon approved successfully');
  };

  const handleRejectSalon = (salonId: string) => {
    setPendingSalons((prev) =>
      prev.map((s) => (s.id === salonId ? { ...s, status: 'rejected' as const } : s))
    );
    toast.error('Salon rejected');
  };

  const platformStats = [
    {
      title: 'Total Revenue',
      value: '$148,250',
      change: '+22%',
      icon: DollarSign,
      color: 'text-success',
    },
    {
      title: 'Active Salons',
      value: '127',
      change: '+8',
      icon: Store,
      color: 'text-info',
    },
    {
      title: 'Total Users',
      value: '12,450',
      change: '+1,240',
      icon: Users,
      color: 'text-primary',
    },
    {
      title: 'Pending Approvals',
      value: '14',
      change: 'Urgent',
      icon: Clock,
      color: 'text-warning',
    },
  ];

  const recentDisputes = [
    { id: 1, customer: 'John Doe', salon: 'Luxe Beauty', issue: 'Refund request', status: 'open' },
    { id: 2, customer: 'Jane Smith', salon: 'Serenity Spa', issue: 'Late cancellation', status: 'resolved' },
    { id: 3, customer: 'Mike Johnson', salon: 'Cutting Edge', issue: 'Service complaint', status: 'open' },
  ];

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
            { icon: AlertTriangle, label: 'Disputes' },
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
              {item.label === 'Disputes' && (
                <Badge className="ml-auto bg-destructive text-destructive-foreground text-xs">
                  2
                </Badge>
              )}
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">Super Admin</p>
              <p className="text-sm text-muted-foreground">Platform Owner</p>
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
              Platform <span className="gradient-text">Overview</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage your marketplace
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-64 bg-muted/50" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {platformStats.map((stat, i) => (
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
          {/* Pending Salon Approvals */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-serif">Pending Salon Approvals</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50">
                      <TableHead>Salon</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingSalons.map((salon) => (
                      <TableRow key={salon.id} className="border-border/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={salon.logo || undefined} />
                              <AvatarFallback>{salon.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{salon.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {salon.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Sarah Johnson
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {salon.city}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              salon.status === 'approved'
                                ? 'bg-success/20 text-success'
                                : salon.status === 'rejected'
                                ? 'bg-destructive/20 text-destructive'
                                : 'bg-warning/20 text-warning'
                            }
                          >
                            {salon.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {salon.status === 'pending' && (
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-success hover:text-success hover:bg-success/10"
                                onClick={() => handleApproveSalon(salon.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => handleRejectSalon(salon.id)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
                    <span className="text-2xl font-bold text-primary">$22,237</span>
                  </div>
                  <p className="text-xs text-muted-foreground">15% avg commission rate</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Vendor Payouts</span>
                    <span className="text-2xl font-bold">$126,013</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Pending: $8,450</p>
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
                        dispute.status === 'open' ? 'bg-destructive' : 'bg-success'
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
