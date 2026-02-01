import { motion } from 'framer-motion';
import { User, Settings, Bell, CreditCard, HelpCircle, LogOut, ChevronRight, Download, Store, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { MobileNav } from '@/components/MobileNav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

const Profile = () => {
  const { user, profile, roles, isVendor, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const menuItems = [
    { icon: User, label: 'Edit Profile', path: '/profile/edit' },
    { icon: Bell, label: 'Notifications', path: '/profile/notifications' },
    { icon: CreditCard, label: 'Payment Methods', path: '/profile/payments' },
    { icon: Download, label: 'Install App', path: '/install' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-24 px-4">
        <div className="container max-w-md mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card-elevated p-6 text-center mb-6"
          >
            <Avatar className="w-24 h-24 mx-auto ring-4 ring-primary/20">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="text-2xl font-serif">
                {profile?.full_name?.[0] || user?.email?.[0] || 'U'}
              </AvatarFallback>
            </Avatar>
            
            {user ? (
              <>
                <h2 className="font-serif text-2xl font-bold mt-4">
                  {profile?.full_name || 'User'}
                </h2>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  {roles.map((role) => (
                    <Badge key={role} variant="secondary" className="capitalize">
                      {role}
                    </Badge>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="font-serif text-2xl font-bold mt-4">Guest User</h2>
                <p className="text-muted-foreground">Sign in to access your profile</p>
                <Link to="/auth">
                  <Button className="mt-4 gap-2 shadow-glow-rose">
                    <User className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </motion.div>

          {/* Menu Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card divide-y divide-border/50"
          >
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="flex-1 font-medium">{item.label}</span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            ))}
          </motion.div>

          {/* Vendor / Admin Links */}
          {(isVendor || isAdmin) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 space-y-3"
            >
              {isVendor && (
                <Link to="/vendor">
                  <Button variant="outline" className="w-full glass-button gap-2">
                    <Store className="h-4 w-4" />
                    Vendor Dashboard
                  </Button>
                </Link>
              )}
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="outline" className="w-full glass-button gap-2">
                    <Shield className="h-4 w-4" />
                    Admin Dashboard
                  </Button>
                </Link>
              )}
            </motion.div>
          )}

          {/* Demo Access for Non-Logged Users */}
          {!user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 space-y-3"
            >
              <p className="text-sm text-muted-foreground text-center mb-2">
                Demo Access (for testing)
              </p>
              <Link to="/vendor">
                <Button variant="outline" className="w-full glass-button gap-2">
                  <Store className="h-4 w-4" />
                  Vendor Dashboard
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="outline" className="w-full glass-button gap-2">
                  <Shield className="h-4 w-4" />
                  Admin Dashboard
                </Button>
              </Link>
            </motion.div>
          )}

          {/* Sign Out */}
          {user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <Button 
                variant="ghost" 
                className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

export default Profile;
