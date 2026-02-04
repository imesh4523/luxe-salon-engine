
# Salon Detail Page UX Redesign - Shop Interface First

## Overview
දැන් salon එකක් click කළාම කෙළින්ම booking sidebar එක පෙන්නනවා, ඒක user ට confusing. User ට පළමුවෙන්ම shop එක browse කරන්න opportunity එකක් දෙන්න ඕන - Services, About, Team, Reviews බලන්න. Book Appointment button එක accessible කර floating bottom bar එකකින් පෙන්නනවා.

---

## Current Problem
- Salon click කළ ගමන්ම booking panel එක fixed bottom එකේ visible වෙනවා (60vh height!)
- User ට salon එක properly browse කරන්න බැහැ
- Services tab එකේ service select කළොත් booking panel එකටත් add වෙනවා - confusion!
- Mobile view එකේ booking panel එක content hide කරනවා

---

## Proposed Solution

### Two-Mode Experience

**Mode 1: Browse Mode (Default)**
- User salon එක freely browse කරනවා - Services, About, Team, Reviews tabs
- Floating "Book Appointment" button bottom එකේ (compact, not intrusive)
- Clean shop-like interface

**Mode 2: Booking Mode (After clicking Book button)**
- Full booking flow activate වෙනවා
- Step-by-step wizard: Service -> Stylist -> Date -> Time -> Payment -> Confirm
- Can go back to browse mode anytime

---

## Technical Implementation

### File: `src/pages/SalonDetail.tsx`

**1. Add Browse/Booking Mode State**
```typescript
const [isBookingMode, setIsBookingMode] = useState(false);
```

**2. Floating Book Button (Browse Mode)**
- Fixed bottom bar with gradient
- "Book Appointment" button with price indicator
- Compact height (~60px)
- Tap to enter booking mode

**3. Hide Booking Sidebar Until Active**
- Booking panel only shows when `isBookingMode === true`
- Browse mode shows only tabs content

**4. Remove Service Selection from Tabs**
- Services tab only displays services (no selection highlighting)
- Team tab only displays team (no selection)
- Selection happens only in booking mode

---

## UI Design

### Browse Mode (Default)

```
+----------------------------------------+
|  <- [Salon Hero Image + Logo + Info]   |
|      Rating | Location | Distance      |
|      [Get Directions Button]           |
+----------------------------------------+
|  [Services] [About] [Team] [Reviews]   |
+----------------------------------------+
|                                        |
|  Service 1 - Hair Cut      Rs 1,500    |
|  Service 2 - Hair Color    Rs 3,000    |
|  Service 3 - Facial        Rs 2,500    |
|                                        |
+----------------------------------------+
|  [==== Book Appointment Button ====]   |
|         Starting from Rs 1,500         |
+----------------------------------------+
```

### Booking Mode (After tapping Book)

```
+----------------------------------------+
|  <- Book Appointment    [X Close]      |
+----------------------------------------+
|  Step: [1]--[2]--[3]--[4]--[5]--[6]    |
+----------------------------------------+
|                                        |
|  Select Service:                       |
|  [x] Hair Cut - Rs 1,500               |
|  [ ] Hair Color - Rs 3,000             |
|  [ ] Facial - Rs 2,500                 |
|                                        |
+----------------------------------------+
|        [Back]  [Continue ->]           |
+----------------------------------------+
```

---

## Changes Summary

| Component | Change |
|-----------|--------|
| `SalonDetail.tsx` | Add `isBookingMode` state, separate browse & booking views |
| Tabs Section | Remove service/staff selection highlighting in browse mode |
| Booking Sidebar | Only render when `isBookingMode === true` |
| New Component | `BookNowBar.tsx` - Floating bottom action bar |
| Mobile UX | Full-screen booking modal on mobile |

---

## Files to Modify

### 1. `src/pages/SalonDetail.tsx`
- Add `isBookingMode` state
- Wrap booking sidebar in conditional render
- Add floating "Book Now" bar in browse mode
- Create full-screen booking modal for mobile
- Remove selection states from tab content

### 2. New: `src/components/BookNowBar.tsx`
- Floating bottom bar component
- Shows salon starting price
- "Book Appointment" button
- Glass morphism styling

---

## Implementation Steps

1. **Create BookNowBar Component**
   - Floating action bar at bottom
   - Starting price display
   - CTA button

2. **Update SalonDetail.tsx**
   - Add booking mode state
   - Conditional rendering for sidebar
   - Remove selection from tabs
   - Add BookNowBar in browse mode
   - Add close button to exit booking mode

3. **Mobile Optimization**
   - Full-screen booking sheet on mobile
   - Smooth transitions between modes

4. **Testing**
   - Verify browse mode works smoothly
   - Test booking flow transitions
   - Check mobile responsiveness

---

## Benefits

1. **Better UX** - User can explore shop before committing to book
2. **Cleaner Interface** - No confusing dual-selection in tabs
3. **Mobile Friendly** - Not blocking content with huge sidebar
4. **Industry Standard** - Similar to Airbnb, Uber, other booking apps
5. **Accessibility** - Clear call-to-action always visible
