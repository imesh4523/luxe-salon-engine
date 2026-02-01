import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Json } from '@/integrations/supabase/types';

// Types
export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  currency: string;
  is_frozen: boolean;
  created_at: string;
  updated_at: string;
}

export interface WalletTransaction {
  id: string;
  wallet_id: string;
  type: 'credit' | 'debit' | 'refund' | 'commission' | 'payout' | 'adjustment';
  amount: number;
  balance_before: number;
  balance_after: number;
  description: string | null;
  reference_id: string | null;
  created_by: string | null;
  created_at: string;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  assigned_admin_id: string | null;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  related_booking_id: string | null;
  related_salon_id: string | null;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
  profiles?: { full_name: string | null; avatar_url: string | null };
}

export interface TicketMessage {
  id: string;
  ticket_id: string;
  sender_id: string;
  message: string;
  is_admin: boolean;
  created_at: string;
  profiles?: { full_name: string | null; avatar_url: string | null };
}

export interface ActivityLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
  profiles?: { full_name: string | null };
}

export interface PayoutRequest {
  id: string;
  salon_id: string;
  wallet_id: string;
  amount: number;
  status: string;
  bank_details: Record<string, unknown> | null;
  processed_by: string | null;
  processed_at: string | null;
  notes: string | null;
  created_at: string;
  salons?: { name: string; owner_id: string };
}

// Fetch all users with profiles and roles
export const useAllUsers = () => {
  return useQuery({
    queryKey: ['all_users'],
    queryFn: async () => {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;

      const { data: wallets, error: walletsError } = await supabase
        .from('wallets')
        .select('*');

      if (walletsError) throw walletsError;

      return profiles.map(profile => ({
        ...profile,
        roles: roles.filter(r => r.user_id === profile.user_id).map(r => r.role),
        wallet: wallets.find(w => w.user_id === profile.user_id),
      }));
    },
  });
};

// Fetch user wallet
export const useUserWallet = (userId?: string) => {
  return useQuery({
    queryKey: ['user_wallet', userId],
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;
      return data as Wallet | null;
    },
    enabled: !!userId,
  });
};

// Fetch wallet transactions
export const useWalletTransactions = (walletId?: string) => {
  return useQuery({
    queryKey: ['wallet_transactions', walletId],
    queryFn: async () => {
      if (!walletId) return [];

      const { data, error } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('wallet_id', walletId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as WalletTransaction[];
    },
    enabled: !!walletId,
  });
};

// Create/update wallet and add transaction
export const useWalletAdjustment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      amount,
      type,
      description,
    }: {
      userId: string;
      amount: number;
      type: 'credit' | 'debit' | 'refund' | 'adjustment';
      description: string;
    }) => {
      // First get or create wallet
      let { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (walletError) throw walletError;

      const currentBalance = wallet?.balance || 0;
      const newBalance = type === 'debit' ? currentBalance - amount : currentBalance + amount;

      if (!wallet) {
        // Create wallet
        const { data: newWallet, error: createError } = await supabase
          .from('wallets')
          .insert({ user_id: userId, balance: newBalance, currency: 'LKR' })
          .select()
          .single();

        if (createError) throw createError;
        wallet = newWallet;
      } else {
        // Update wallet balance
        const { error: updateError } = await supabase
          .from('wallets')
          .update({ balance: newBalance, updated_at: new Date().toISOString() })
          .eq('id', wallet.id);

        if (updateError) throw updateError;
      }

      // Create transaction record
      const { error: txError } = await supabase.from('wallet_transactions').insert({
        wallet_id: wallet.id,
        type,
        amount,
        balance_before: currentBalance,
        balance_after: newBalance,
        description,
      });

      if (txError) throw txError;

      return { wallet, newBalance };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all_users'] });
      queryClient.invalidateQueries({ queryKey: ['user_wallet'] });
      queryClient.invalidateQueries({ queryKey: ['wallet_transactions'] });
      toast.success('Wallet adjusted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to adjust wallet');
    },
  });
};

// Freeze/unfreeze wallet
export const useToggleWalletFreeze = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ walletId, freeze }: { walletId: string; freeze: boolean }) => {
      const { error } = await supabase
        .from('wallets')
        .update({ is_frozen: freeze, updated_at: new Date().toISOString() })
        .eq('id', walletId);

      if (error) throw error;
    },
    onSuccess: (_, { freeze }) => {
      queryClient.invalidateQueries({ queryKey: ['all_users'] });
      queryClient.invalidateQueries({ queryKey: ['user_wallet'] });
      toast.success(`Wallet ${freeze ? 'frozen' : 'unfrozen'} successfully!`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update wallet');
    },
  });
};

// Fetch support tickets
export const useSupportTickets = (status?: string) => {
  return useQuery({
    queryKey: ['support_tickets', status],
    queryFn: async () => {
      let query = supabase
        .from('support_tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (status && status !== 'all') {
        query = query.eq('status', status as 'open' | 'in_progress' | 'resolved' | 'closed');
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as SupportTicket[];
    },
  });
};

// Fetch ticket messages
export const useTicketMessages = (ticketId?: string) => {
  return useQuery({
    queryKey: ['ticket_messages', ticketId],
    queryFn: async () => {
      if (!ticketId) return [];

      const { data, error } = await supabase
        .from('ticket_messages')
        .select('*')
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as TicketMessage[];
    },
    enabled: !!ticketId,
  });
};

// Send ticket message
export const useSendTicketMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      ticketId,
      senderId,
      message,
      isAdmin,
    }: {
      ticketId: string;
      senderId: string;
      message: string;
      isAdmin: boolean;
    }) => {
      const { error } = await supabase.from('ticket_messages').insert({
        ticket_id: ticketId,
        sender_id: senderId,
        message,
        is_admin: isAdmin,
      });

      if (error) throw error;
    },
    onSuccess: (_, { ticketId }) => {
      queryClient.invalidateQueries({ queryKey: ['ticket_messages', ticketId] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to send message');
    },
  });
};

// Update ticket status
export const useUpdateTicketStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      ticketId,
      status,
      assignedAdminId,
    }: {
      ticketId: string;
      status: 'open' | 'in_progress' | 'resolved' | 'closed';
      assignedAdminId?: string;
    }) => {
      const updates: Record<string, unknown> = {
        status,
        updated_at: new Date().toISOString(),
      };

      if (assignedAdminId) {
        updates.assigned_admin_id = assignedAdminId;
      }

      if (status === 'resolved') {
        updates.resolved_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('support_tickets')
        .update(updates)
        .eq('id', ticketId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['support_tickets'] });
      toast.success('Ticket updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update ticket');
    },
  });
};

// Fetch activity logs
export const useActivityLogs = (limit = 50) => {
  return useQuery({
    queryKey: ['activity_logs', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as ActivityLog[];
    },
  });
};

// Log activity
export const useLogActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      action,
      entityType,
      entityId,
      details,
    }: {
      userId?: string;
      action: string;
      entityType: string;
      entityId?: string;
      details?: Json;
    }) => {
      const insertData: {
        action: string;
        entity_type: string;
        user_id?: string;
        entity_id?: string;
        details?: Json;
      } = {
        action,
        entity_type: entityType,
      };
      
      if (userId) insertData.user_id = userId;
      if (entityId) insertData.entity_id = entityId;
      if (details) insertData.details = details;

      const { error } = await supabase.from('activity_logs').insert([insertData]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activity_logs'] });
    },
  });
};

// Fetch payout requests
export const usePayoutRequests = (status?: string) => {
  return useQuery({
    queryKey: ['payout_requests', status],
    queryFn: async () => {
      let query = supabase
        .from('payout_requests')
        .select('*, salons(name, owner_id)')
        .order('created_at', { ascending: false });

      if (status && status !== 'all') {
        query = query.eq('status', status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as PayoutRequest[];
    },
  });
};

// Process payout request
export const useProcessPayout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      payoutId,
      status,
      processedBy,
      notes,
    }: {
      payoutId: string;
      status: 'approved' | 'rejected';
      processedBy: string;
      notes?: string;
    }) => {
      const { error } = await supabase
        .from('payout_requests')
        .update({
          status,
          processed_by: processedBy,
          processed_at: new Date().toISOString(),
          notes,
        })
        .eq('id', payoutId);

      if (error) throw error;
    },
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ['payout_requests'] });
      toast.success(`Payout ${status} successfully!`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to process payout');
    },
  });
};

// Update salon commission rate
export const useUpdateSalonCommission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ salonId, rate }: { salonId: string; rate: number }) => {
      const { error } = await supabase
        .from('salons')
        .update({ commission_rate: rate, updated_at: new Date().toISOString() })
        .eq('id', salonId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salons'] });
      toast.success('Commission rate updated!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update commission');
    },
  });
};

// Search users and salons
export const useGlobalSearch = (searchTerm: string) => {
  return useQuery({
    queryKey: ['global_search', searchTerm],
    queryFn: async () => {
      if (!searchTerm || searchTerm.length < 2) return { users: [], salons: [] };

      const [usersResult, salonsResult] = await Promise.all([
        supabase
          .from('profiles')
          .select('*')
          .or(`full_name.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%`)
          .limit(10),
        supabase
          .from('salons')
          .select('*')
          .or(`name.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)
          .limit(10),
      ]);

      return {
        users: usersResult.data || [],
        salons: salonsResult.data || [],
      };
    },
    enabled: searchTerm.length >= 2,
  });
};

// Realtime subscription for tickets
export const useRealtimeTickets = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['realtime_tickets_subscription'],
    queryFn: () => {
      const channel = supabase
        .channel('tickets-changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'support_tickets' },
          () => {
            queryClient.invalidateQueries({ queryKey: ['support_tickets'] });
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'ticket_messages' },
          () => {
            queryClient.invalidateQueries({ queryKey: ['ticket_messages'] });
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    },
    staleTime: Infinity,
  });
};

// Realtime subscription for activity logs
export const useRealtimeActivityLogs = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['realtime_activity_subscription'],
    queryFn: () => {
      const channel = supabase
        .channel('activity-changes')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'activity_logs' },
          () => {
            queryClient.invalidateQueries({ queryKey: ['activity_logs'] });
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    },
    staleTime: Infinity,
  });
};
