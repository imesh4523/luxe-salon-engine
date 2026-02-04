import { motion } from 'framer-motion';
import { MapPin, Star, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { MobileNav } from '@/components/MobileNav';
import { SalonCard } from '@/components/SalonCard';
import { SearchFilters } from '@/components/SearchFilters';
import { mockSalons, mockCategories } from '@/lib/mock-data';
import heroImage from '@/assets/hero-salon.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Dreamy Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-800/30 to-orange-600/20" />
        
        {/* Ambient Blur Orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[120px] animate-float" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-pink-500/25 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-orange-400/20 rounded-full blur-[80px] animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-violet-400/20 rounded-full blur-[60px] animate-float" style={{ animationDelay: '1s' }} />
        
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        
        {/* Bottom Fade to Background */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

        {/* Content */}
        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Premium Beauty Marketplace</span>
            </motion.div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight px-2">
              Discover{' '}
              <span className="gradient-text text-shadow-glow">Luxury</span>
              <br />
              Beauty Near You
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
              Book appointments at the finest salons and spas. Experience world-class 
              beauty treatments from expert stylists.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 sm:mt-10 px-4"
            >
              <Link to="/explore">
                <Button size="lg" className="gap-2 text-sm sm:text-lg px-6 sm:px-8 shadow-glow-rose w-full sm:w-auto">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  Find Salons Near Me
                </Button>
              </Link>
              <Link to="/vendor" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="gap-2 text-sm sm:text-lg px-6 sm:px-8 glass-button w-full">
                  List Your Salon
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-4 sm:gap-8 mt-10 sm:mt-16 px-4"
            >
              {[
                { value: '500+', label: 'Salons' },
                { value: '50K+', label: 'Customers' },
                { value: '4.9', label: 'Rating', icon: Star },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-xl sm:text-3xl md:text-4xl font-bold gradient-text-gold">
                      {stat.value}
                    </span>
                    {stat.icon && <stat.icon className="h-4 w-4 sm:h-6 sm:w-6 fill-accent text-accent" />}
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-16 relative">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Explore <span className="gradient-text">Categories</span>
            </h2>
            <p className="text-muted-foreground mt-2">
              Find the perfect service for your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockCategories.map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-6 text-center cursor-pointer hover:border-primary/50 hover:shadow-glow-rose transition-all"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <span className="font-medium text-foreground">{category.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Listings */}
      <section className="py-10 sm:py-16 relative">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8"
          >
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold">
                <span className="gradient-text">Nearby</span> Salons
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-1 flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="truncate">Sorted by distance</span>
              </p>
            </div>
            <Link to="/explore">
              <Button variant="ghost" className="gap-2 text-sm">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <SearchFilters />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {mockSalons.map((salon, index) => (
              <SalonCard key={salon.id} salon={salon} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="hero-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="container px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-elevated p-8 md:p-12 text-center max-w-3xl mx-auto"
          >
            <TrendingUp className="h-12 w-12 mx-auto text-primary mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Grow Your <span className="gradient-text">Salon Business</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Join hundreds of successful salons on our platform. Increase your bookings, 
              manage your schedule, and grow your revenue with our powerful tools.
            </p>
            <Link to="/vendor">
              <Button size="lg" className="mt-8 gap-2 shadow-glow-rose">
                Become a Partner
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 border-t border-border/50 mb-20 md:mb-0">
        <div className="container px-4">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-lg font-serif font-bold text-primary-foreground">G</span>
              </div>
              <span className="font-serif text-lg font-semibold gradient-text">Glamour</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              © 2026 Glamour. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <MobileNav />
    </div>
  );
};

export default Index;
