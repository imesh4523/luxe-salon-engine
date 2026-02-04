import { motion } from 'framer-motion';
import { User, Settings, Bell, CreditCard, HelpCircle, LogOut, ChevronRight, Download, Store, Shield, Sparkles, Crown, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { MobileNav } from '@/components/MobileNav';
import { FloatingSalonIcons } from '@/components/FloatingSalonIcons';
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
    { icon: User, label: 'Edit Profile', path: '/profile/edit', color: 'from-violet-500 to-purple-600' },
    { icon: Bell, label: 'Notifications', path: '/profile/notifications', color: 'from-pink-500 to-rose-600' },
    { icon: CreditCard, label: 'Payment Methods', path: '/profile/payments', color: 'from-emerald-500 to-teal-600' },
    { icon: Download, label: 'Install App', path: '/install', color: 'from-blue-500 to-cyan-600' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help', color: 'from-amber-500 to-orange-600' },
    { icon: Settings, label: 'Settings', path: '/settings', color: 'from-slate-500 to-gray-600' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      
      {/* Floating Salon Icons - Behind Content */}
      <FloatingSalonIcons />

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-40 left-0 w-[250px] h-[250px] bg-gradient-to-br from-orange-300/15 to-amber-300/15 rounded-full blur-[60px]" />
      </div>

      <div className="pt-20 pb-24 px-4 relative z-10">
        <div className="container max-w-md mx-auto">
          {/* Profile Header - Premium 3D Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative mb-6"
          >
            {/* Card with 3D depth effect */}
            <div 
              className="relative rounded-3xl p-6 text-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 50%, rgba(250,245,255,0.8) 100%)',
                boxShadow: `
                  0 8px 0 rgba(200,180,220,0.5),
                  0 12px 20px rgba(0,0,0,0.1),
                  0 20px 40px rgba(139,92,246,0.15),
                  inset 0 2px 4px rgba(255,255,255,1),
                  inset 0 -2px 4px rgba(0,0,0,0.03)
                `,
              }}
            >
              {/* Shine effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
              
              {/* Premium badge for logged in users */}
              {user && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute top-4 right-4"
                >
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold shadow-lg">
                    <Crown className="h-3 w-3" />
                    <span>Member</span>
                  </div>
                </motion.div>
              )}

              {/* Avatar with 3D ring */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative w-28 h-28 mx-auto"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-pink-500 to-orange-400 animate-spin-slow opacity-60 blur-sm" style={{ animationDuration: '8s' }} />
                <Avatar className="w-full h-full relative ring-4 ring-white shadow-xl">
                  <AvatarImage src={profile?.avatar_url || undefined} />
                  <AvatarFallback className="text-3xl font-serif bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                    {profile?.full_name?.[0] || user?.email?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                
                {/* Sparkle decorations */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="h-5 w-5 text-amber-400" />
                </motion.div>
              </motion.div>
              
              {user ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="font-serif text-2xl font-bold mt-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                    {profile?.full_name || 'User'}
                  </h2>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    {roles.map((role) => (
                      <Badge 
                        key={role} 
                        className="capitalize bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 shadow-sm"
                      >
                        <Star className="h-3 w-3 mr-1 fill-primary" />
                        {role}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="font-serif text-2xl font-bold mt-4 text-foreground">Guest User</h2>
                  <p className="text-muted-foreground text-sm">Sign in to access your profile</p>
                  <Link to="/auth">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98, y: 2 }}
                      className="mt-4 px-6 py-2.5 rounded-xl font-semibold text-white flex items-center gap-2 mx-auto"
                      style={{
                        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)',
                        boxShadow: '0 4px 0 #9a3412, 0 6px 12px rgba(249,115,22,0.3)',
                      }}
                    >
                      <User className="h-4 w-4" />
                      Sign In
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Menu Items - 3D Glass Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex items-center gap-4 p-4 rounded-2xl overflow-hidden group cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.7) 100%)',
                      boxShadow: `
                        0 4px 0 rgba(200,200,210,0.5),
                        0 6px 12px rgba(0,0,0,0.06),
                        inset 0 1px 2px rgba(255,255,255,1)
                      `,
                    }}
                  >
                    {/* Icon with gradient background */}
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}>
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="flex-1 font-medium text-foreground">{item.label}</span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    
                    {/* Hover shine */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Vendor / Admin Links */}
          {(isVendor || isAdmin) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 space-y-3"
            >
              <p className="text-xs text-muted-foreground text-center mb-2 font-medium">
                Business Access
              </p>
              {isVendor && (
                <Link to="/vendor">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98, y: 2 }}
                    className="w-full relative flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
                      boxShadow: '0 4px 0 #5b21b6, 0 6px 12px rgba(139,92,246,0.3)',
                      color: 'white',
                    }}
                  >
                    <Store className="h-4 w-4" />
                    Vendor Dashboard
                  </motion.button>
                </Link>
              )}
              {isAdmin && (
                <Link to="/admin">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98, y: 2 }}
                    className="w-full relative flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)',
                      boxShadow: '0 4px 0 #075985, 0 6px 12px rgba(14,165,233,0.3)',
                      color: 'white',
                    }}
                  >
                    <Shield className="h-4 w-4" />
                    Admin Dashboard
                  </motion.button>
                </Link>
              )}
            </motion.div>
          )}

          {/* Demo Access for Non-Logged Users */}
          {!user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 space-y-3"
            >
              <p className="text-xs text-muted-foreground text-center mb-2 font-medium">
                Demo Access (for testing)
              </p>
              <Link to="/vendor">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium border-2 border-primary/20 bg-white/50 text-foreground hover:bg-primary/5 transition-colors"
                >
                  <Store className="h-4 w-4" />
                  Vendor Dashboard
                </motion.button>
              </Link>
              <Link to="/admin">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium border-2 border-primary/20 bg-white/50 text-foreground hover:bg-primary/5 transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  Admin Dashboard
                </motion.button>
              </Link>
            </motion.div>
          )}

          {/* Sign Out */}
          {user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-destructive bg-destructive/5 border border-destructive/20 hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

export default Profile;
