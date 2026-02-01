import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign, TrendingUp, TrendingDown, CreditCard, Store,
  PieChart, BarChart3, ArrowUpRight, ArrowDownRight, Percent,
  CheckCircle, XCircle, Clock, Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { usePlatformStats, useSalons, useUpdateSalonStatus } from '@/hooks/useData';
import { usePayoutRequests, useProcessPayout, useUpdateSalonCommission } from '@/hooks/useAdminData';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export const FinancialDashboard = () => {
  const [selectedSalon, setSelectedSalon] = useState<{ id: string; name: string; commission_rate: number } | null>(null);
  const [newCommission, setNewCommission] = useState('');
  const [commissionDialogOpen, setCommissionDialogOpen] = useState(false);

  const { user } = useAuth();
  const { data: stats, isLoading: statsLoading } = usePlatformStats();
  const { data: salons, isLoading: salonsLoading } = useSalons();
  const { data: payouts, isLoading: payoutsLoading } = usePayoutRequests();
  const updateCommission = useUpdateSalonCommission();
  const processPayout = useProcessPayout();

  const pendingPayouts = payouts?.filter(p => p.status === 'pending') || [];
  const totalPendingAmount = pendingPayouts.reduce((sum, p) => sum + Number(p.amount), 0);

  const handleUpdateCommission = async () => {
    if (!selectedSalon || !newCommission) return;
    await updateCommission.mutateAsync({
      salonId: selectedSalon.id,
      rate: parseFloat(newCommission),
    });
    setCommissionDialogOpen(false);
    setNewCommission('');
    setSelectedSalon(null);
  };

  const handleProcessPayout = async (payoutId: string, status: 'approved' | 'rejected') => {
    if (!user) return;
    await processPayout.mutateAsync({
      payoutId,
      status,
      processedBy: user.id,
    });
  };

  const financialStats = [
    {
      title: 'Total Revenue',
      value: `Rs. ${stats?.totalRevenue?.toLocaleString() || '0'}`,
      change: '+22%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-primary',
    },
    {
      title: 'Platform Earnings',
      value: `Rs. ${stats?.platformEarnings?.toLocaleString() || '0'}`,
      change: '+18%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-success',
    },
    {
      title: 'Pending Payouts',
      value: `Rs. ${totalPendingAmount.toLocaleString()}`,
      change: `${pendingPayouts.length} requests`,
      trend: 'neutral',
      icon: CreditCard,
      color: 'text-warning',
    },
    {
      title: 'Active Salons',
      value: stats?.approvedSalons?.toString() || '0',
      change: `${stats?.pendingSalons || 0} pending`,
      trend: 'up',
      icon: Store,
      color: 'text-accent',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-primary" />
          Financial Control
        </h2>
        <p className="text-muted-foreground">
          Manage commissions, payouts, and platform earnings
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {financialStats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass-card border-border/50">
              <CardContent className="p-4">
                {statsLoading ? (
                  <Skeleton className="h-20 w-full" />
                ) : (
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.title}</p>
                      <p className="text-xl font-bold mt-1">{stat.value}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {stat.trend === 'up' && <ArrowUpRight className="h-3 w-3 text-success" />}
                        {stat.trend === 'down' && <ArrowDownRight className="h-3 w-3 text-destructive" />}
                        <span className={cn(
                          "text-xs",
                          stat.trend === 'up' ? 'text-success' : stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                        )}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={cn("w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center", stat.color)}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Payouts */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="font-serif flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-warning" />
                Pending Payouts
              </span>
              <Badge className="bg-warning/20 text-warning">{pendingPayouts.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {payoutsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : pendingPayouts.length > 0 ? (
              <div className="space-y-3">
                {pendingPayouts.map((payout) => (
                  <motion.div
                    key={payout.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-xl"
                  >
                    <div>
                      <p className="font-medium">{payout.salons?.name || 'Unknown Salon'}</p>
                      <p className="text-sm text-muted-foreground">
                        Rs. {Number(payout.amount).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(payout.created_at), 'MMM d, h:mm a')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-success hover:bg-success/10"
                        onClick={() => handleProcessPayout(payout.id, 'approved')}
                        disabled={processPayout.isPending}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleProcessPayout(payout.id, 'rejected')}
                        disabled={processPayout.isPending}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No pending payouts</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Commission Rates */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <Percent className="h-5 w-5 text-primary" />
              Salon Commission Rates
            </CardTitle>
          </CardHeader>
          <CardContent>
            {salonsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : salons && salons.length > 0 ? (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {salons.filter(s => s.status === 'approved').map((salon) => (
                  <div
                    key={salon.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedSalon({ id: salon.id, name: salon.name, commission_rate: salon.commission_rate || 15 });
                      setNewCommission((salon.commission_rate || 15).toString());
                      setCommissionDialogOpen(true);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Store className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{salon.name}</p>
                        <p className="text-xs text-muted-foreground">{salon.city}</p>
                      </div>
                    </div>
                    <Badge className="bg-primary/20 text-primary">
                      {salon.commission_rate || 15}%
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Store className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No approved salons</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Commission Dialog */}
      <Dialog open={commissionDialogOpen} onOpenChange={setCommissionDialogOpen}>
        <DialogContent className="glass-card border-border/50">
          <DialogHeader>
            <DialogTitle className="font-serif flex items-center gap-2">
              <Percent className="h-5 w-5 text-primary" />
              Update Commission Rate
            </DialogTitle>
            <DialogDescription>
              Set commission rate for {selectedSalon?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Current Rate</Label>
              <p className="text-2xl font-bold text-primary">{selectedSalon?.commission_rate || 15}%</p>
            </div>

            <div className="space-y-2">
              <Label>New Commission Rate (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                step="0.5"
                placeholder="Enter new rate"
                value={newCommission}
                onChange={(e) => setNewCommission(e.target.value)}
                className="bg-muted/50"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCommissionDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateCommission}
              disabled={!newCommission || updateCommission.isPending}
            >
              {updateCommission.isPending ? 'Updating...' : 'Update Rate'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
