import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Phone, Mail, Star, Clock, 
  ChevronRight, Check
} from 'lucide-react';
import { format, addDays, addMinutes, parse } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/Navbar';
import { ServiceCard } from '@/components/ServiceCard';
import { StaffCard } from '@/components/StaffCard';
import { ReviewCard } from '@/components/ReviewCard';
import { BookingSteps } from '@/components/BookingSteps';
import { TimeSlotButton } from '@/components/TimeSlotButton';
import { Skeleton } from '@/components/ui/skeleton';
import { useSalon, useServices, useStaff, useReviews, useCreateBooking } from '@/hooks/useData';
import { useAuth } from '@/hooks/useAuth';
import { mockSalons, mockServices, mockStaff, mockReviews, generateTimeSlots } from '@/lib/mock-data';
import { Service, Staff, BookingStep } from '@/types';
import { toast } from 'sonner';

const bookingSteps: BookingStep[] = [
  { step: 'service', label: 'Service' },
  { step: 'staff', label: 'Stylist' },
  { step: 'date', label: 'Date' },
  { step: 'time', label: 'Time' },
  { step: 'confirm', label: 'Confirm' },
];

const SalonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  
  // Fetch real data
  const { data: salonData, isLoading: salonLoading } = useSalon(id || '');
  const { data: servicesData, isLoading: servicesLoading } = useServices(id);
  const { data: staffData, isLoading: staffLoading } = useStaff(id);
  const { data: reviewsData, isLoading: reviewsLoading } = useReviews(id || '');
  const createBooking = useCreateBooking();

  // Fallback to mock data if no real data
  const salon = salonData || mockSalons.find((s) => s.id === id) || mockSalons[0];
  const services = servicesData && servicesData.length > 0 ? servicesData : mockServices;
  const staff = staffData && staffData.length > 0 ? staffData : mockStaff;
  const reviews = reviewsData && reviewsData.length > 0 ? reviewsData : mockReviews;

  const [currentStep, setCurrentStep] = useState<BookingStep['step']>('service');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const timeSlots = generateTimeSlots();

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };

  const handleStaffSelect = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
  };

  const handleNextStep = () => {
    const stepOrder: BookingStep['step'][] = ['service', 'staff', 'date', 'time', 'confirm'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handlePrevStep = () => {
    const stepOrder: BookingStep['step'][] = ['service', 'staff', 'date', 'time', 'confirm'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'service':
        return selectedService !== null;
      case 'staff':
        return selectedStaff !== null;
      case 'date':
        return selectedDate !== undefined;
      case 'time':
        return selectedTime !== null;
      default:
        return true;
    }
  };

  const handleConfirmBooking = async () => {
    if (!user) {
      toast.error('Please sign in to book an appointment');
      navigate('/auth');
      return;
    }

    if (!selectedService || !selectedStaff || !selectedDate || !selectedTime) {
      toast.error('Please complete all booking steps');
      return;
    }

    setIsBooking(true);

    try {
      // Calculate end time
      const startTime = parse(selectedTime, 'HH:mm', new Date());
      const endTime = addMinutes(startTime, selectedService.duration_minutes);
      const endTimeStr = format(endTime, 'HH:mm');

      // Calculate commission (15%)
      const commissionRate = 0.15;
      const platformCommission = selectedService.price * commissionRate;
      const vendorPayout = selectedService.price - platformCommission;

      await createBooking.mutateAsync({
        customer_id: user.id,
        salon_id: salon.id,
        staff_id: selectedStaff.id,
        service_id: selectedService.id,
        booking_date: format(selectedDate, 'yyyy-MM-dd'),
        start_time: selectedTime,
        end_time: endTimeStr,
        total_amount: selectedService.price,
        platform_commission: platformCommission,
        vendor_payout: vendorPayout,
      });

      toast.success('Booking confirmed! Check your email for details.');
      
      // Reset and navigate to bookings
      setCurrentStep('service');
      setSelectedService(null);
      setSelectedStaff(null);
      setSelectedDate(undefined);
      setSelectedTime(null);
      navigate('/bookings');
    } catch (error) {
      // Error handled in mutation
    } finally {
      setIsBooking(false);
    }
  };

  const isLoading = salonLoading || servicesLoading || staffLoading;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] pt-16">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <>
            <img
              src={salon.cover_image || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200'}
              alt={salon.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </>
        )}

        <Link
          to="/"
          className="absolute top-20 left-4 md:left-8 glass-button p-2 rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-end gap-4"
            >
              {salon.logo && (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden ring-4 ring-background shadow-glass">
                  <img
                    src={salon.logo}
                    alt={`${salon.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  {salon.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-medium text-foreground">{salon.rating}</span>
                    <span>({salon.review_count} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {salon.address}, {salon.city}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Open Now
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="glass-card w-full justify-start p-1">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="services" className="mt-6 space-y-4">
                {servicesLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-24 w-full" />
                    ))}
                  </div>
                ) : (
                  services.map((service: any) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      isSelected={selectedService?.id === service.id}
                      onSelect={handleServiceSelect}
                    />
                  ))
                )}
              </TabsContent>

              <TabsContent value="about" className="mt-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-6"
                >
                  <h3 className="font-serif text-xl font-semibold mb-4">About Us</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {salon.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{salon.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{salon.email}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="team" className="mt-6 space-y-4">
                {staffLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-20 w-full" />
                    ))}
                  </div>
                ) : (
                  staff.map((staffMember: any) => (
                    <StaffCard
                      key={staffMember.id}
                      staff={staffMember}
                      isSelected={selectedStaff?.id === staffMember.id}
                      onSelect={handleStaffSelect}
                    />
                  ))
                )}
              </TabsContent>

              <TabsContent value="reviews" className="mt-6 space-y-4">
                {reviewsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-24 w-full" />
                    ))}
                  </div>
                ) : (
                  reviews.map((review: any) => (
                    <ReviewCard key={review.id} review={review} />
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card-elevated p-6 sticky top-24"
            >
              <h3 className="font-serif text-xl font-semibold mb-6">Book Appointment</h3>

              <BookingSteps steps={bookingSteps} currentStep={currentStep} />

              <div className="mt-6 min-h-[300px]">
                {currentStep === 'service' && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-4">
                      Select a service to continue
                    </p>
                    {services.slice(0, 4).map((service: any) => (
                      <div
                        key={service.id}
                        onClick={() => handleServiceSelect(service)}
                        className={`p-3 rounded-xl cursor-pointer transition-all ${
                          selectedService?.id === service.id
                            ? 'bg-primary/20 border border-primary'
                            : 'bg-muted/30 hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{service.name}</span>
                          <span className="text-primary">${service.price}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {service.duration_minutes} min
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {currentStep === 'staff' && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-4">
                      Choose your preferred stylist
                    </p>
                    {staff.map((staffMember: any) => (
                      <StaffCard
                        key={staffMember.id}
                        staff={staffMember}
                        isSelected={selectedStaff?.id === staffMember.id}
                        onSelect={handleStaffSelect}
                      />
                    ))}
                  </div>
                )}

                {currentStep === 'date' && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select your preferred date
                    </p>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
                      className="rounded-xl border border-border/50"
                    />
                  </div>
                )}

                {currentStep === 'time' && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Available time slots for {selectedDate && format(selectedDate, 'MMM d')}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <TimeSlotButton
                          key={time}
                          time={time}
                          available={Math.random() > 0.3}
                          isSelected={selectedTime === time}
                          onSelect={setSelectedTime}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 'confirm' && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Review your booking details
                    </p>
                    {!user && (
                      <div className="p-3 bg-accent/10 rounded-xl border border-accent/30 mb-4">
                        <p className="text-sm text-accent">
                          Please <Link to="/auth" className="underline font-medium">sign in</Link> to complete your booking
                        </p>
                      </div>
                    )}
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-muted/30 rounded-xl">
                        <span className="text-muted-foreground">Service</span>
                        <span className="font-medium">{selectedService?.name}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted/30 rounded-xl">
                        <span className="text-muted-foreground">Stylist</span>
                        <span className="font-medium">{selectedStaff?.name}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted/30 rounded-xl">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium">
                          {selectedDate && format(selectedDate, 'MMM d, yyyy')}
                        </span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted/30 rounded-xl">
                        <span className="text-muted-foreground">Time</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-primary/10 rounded-xl border border-primary/30">
                        <span className="font-medium">Total</span>
                        <span className="text-lg font-bold text-primary">
                          ${selectedService?.price}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                {currentStep !== 'service' && (
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    className="flex-1"
                  >
                    Back
                  </Button>
                )}
                {currentStep !== 'confirm' ? (
                  <Button
                    onClick={handleNextStep}
                    disabled={!canProceed()}
                    className="flex-1 gap-2"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleConfirmBooking}
                    disabled={isBooking || !user}
                    className="flex-1 gap-2 shadow-glow-rose"
                  >
                    {isBooking ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Confirm Booking
                      </>
                    )}
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonDetail;
