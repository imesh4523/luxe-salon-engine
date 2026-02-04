
# Payment Option & Verification System - Uber/PickMe Style

## Overview
මේ feature එකෙන් customers ට booking එකක් place කරද්දී **Cash on Hand** හෝ **Pay Now** කියන options දෙක select කරන්න පුළුවන් වෙනවා. Salon owner ට verified/paid indicators සහ completion rate එකක් පෙන්නනවා - exactly like Uber/PickMe!

---

## Feature Summary

### 1. Customer Side (Booking Flow)
- Service -> Stylist -> Date -> Time -> **Payment Method** -> Confirm කියන step එකක් add වෙනවා
- Payment options:
  - **Cash at Salon** - Salon එකේදී cash pay කරනවා
  - **Pay Now** - Online payment (PayHere integration already available)

### 2. Salon Owner Side (Vendor Dashboard)
- Booking card එකේ:
  - **Paid** customers ට green verified icon + "PAID" badge
  - **Cash** customers ට orange "CASH" badge
- Salon **Completion Rate** percentage එක display වෙනවා (completed bookings / total bookings)

### 3. Bookings Page (Customer)
- Booking card එකේ payment method indicator එක show වෙනවා
- Paid bookings වලට verified checkmark icon එකක්

---

## Technical Implementation

### Database Changes

```sql
-- Add payment columns to bookings table
ALTER TABLE public.bookings 
ADD COLUMN payment_method text NOT NULL DEFAULT 'cash',
ADD COLUMN payment_status text NOT NULL DEFAULT 'pending',
ADD COLUMN paid_at timestamp with time zone;

-- Add constraint for valid values
ALTER TABLE public.bookings 
ADD CONSTRAINT bookings_payment_method_check 
CHECK (payment_method IN ('cash', 'online'));

ALTER TABLE public.bookings 
ADD CONSTRAINT bookings_payment_status_check 
CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded'));
```

### New Payment Type Definitions

```typescript
// src/types/index.ts
export type PaymentMethod = 'cash' | 'online';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Booking {
  // ... existing fields
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  paid_at: string | null;
}
```

### Booking Flow Changes

**File: `src/pages/SalonDetail.tsx`**

1. Add new "payment" step to booking flow:
```typescript
const bookingSteps: BookingStep[] = [
  { step: 'service', label: 'Service' },
  { step: 'staff', label: 'Stylist' },
  { step: 'date', label: 'Date' },
  { step: 'time', label: 'Time' },
  { step: 'payment', label: 'Payment' },  // NEW STEP
  { step: 'confirm', label: 'Confirm' },
];
```

2. Add payment method selection UI:
   - iOS-style radio buttons with icons
   - "Cash at Salon" option with Cash icon
   - "Pay Now" option with CreditCard icon + secure payment badge

### BookingCard Enhancement

**File: `src/components/BookingCard.tsx`**

Add payment indicators:
- **Green verified icon** + "PAID" badge for `payment_status === 'paid'`
- **Orange "CASH"** badge for `payment_method === 'cash'`
- Position next to status badge

### Salon Completion Rate

**File: `src/hooks/useVendorData.ts`**

```typescript
export const useSalonCompletionRate = (salonId?: string) => {
  return useQuery({
    queryKey: ['salon_completion_rate', salonId],
    queryFn: async () => {
      const { data } = await supabase
        .from('bookings')
        .select('status')
        .eq('salon_id', salonId)
        .in('status', ['completed', 'cancelled', 'confirmed']);
      
      const completed = data?.filter(b => b.status === 'completed').length || 0;
      const total = data?.length || 0;
      const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      return { completed, total, rate };
    },
  });
};
```

**File: `src/pages/VendorDashboard.tsx`**

Add completion rate card to stats grid:
- Circular progress indicator (like Uber rating)
- Percentage display (e.g., "94%")
- "Completion Rate" label

---

## UI/UX Design

### Payment Selection Step (Customer)
```text
+--------------------------------+
|  Select Payment Method         |
+--------------------------------+
|                                |
|  [x] Cash at Salon             |
|      Pay when you arrive       |
|      [Cash Icon]               |
|                                |
|  [ ] Pay Now                   |
|      Secure online payment     |
|      [Card Icon + Lock]        |
|                                |
+--------------------------------+
```

### Booking Card (Vendor View)
```text
+------------------------------------------+
|  [Avatar] Customer Name                  |
|  Hair Cut & Styling         [PAID] [✓]   |
|  -------------------------               |
|  📅 Feb 5  ⏰ 2:30 PM   Rs 2,500        |
+------------------------------------------+
```

### Completion Rate Display
```text
+------------------+
|   [94%]          |
|  Completion      |
|    Rate          |
|  ▲ +3% vs last   |
+------------------+
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/types/index.ts` | Add PaymentMethod, PaymentStatus types |
| `src/pages/SalonDetail.tsx` | Add payment step to booking flow |
| `src/components/BookingCard.tsx` | Add payment status indicators |
| `src/components/BookingSteps.tsx` | Add payment step icon |
| `src/hooks/useData.ts` | Update createBooking mutation |
| `src/hooks/useVendorData.ts` | Add completion rate hook |
| `src/pages/VendorDashboard.tsx` | Add completion rate stat card |
| `src/pages/Bookings.tsx` | Show payment indicators |

---

## New Components

### PaymentMethodSelector
```typescript
// src/components/PaymentMethodSelector.tsx
// iOS-style radio selection for payment method
```

### PaymentBadge
```typescript
// src/components/PaymentBadge.tsx  
// Reusable badge showing PAID/CASH with appropriate styling
```

### CompletionRateCard
```typescript
// src/components/CompletionRateCard.tsx
// Circular progress indicator for completion rate
```

---

## Implementation Order

1. **Database Migration** - Add payment columns to bookings table
2. **Type Updates** - Add TypeScript types
3. **Payment Selection UI** - Create PaymentMethodSelector component
4. **Booking Flow Integration** - Add payment step to SalonDetail.tsx
5. **Payment Indicators** - Update BookingCard with badges
6. **Completion Rate** - Add hook and display in VendorDashboard
7. **Testing** - End-to-end flow verification

---

## Future Enhancements (Pay Now Flow)
- PayHere integration already configured
- When "Pay Now" selected, redirect to PayHere payment gateway
- On success: Update `payment_status` to 'paid' and set `paid_at`
- On failure: Keep booking as pending, show retry option
