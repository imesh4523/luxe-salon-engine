
# Comprehensive System Upgrade Plan

## ගැටළු විශ්ලේෂණය (Issues Identified)

### 1. Explore Page Text Issue
- "smhrk text show venne ne" - User mentions some text not showing on Explore page
- Need to identify and fix the specific text display issue

### 2. Vendor Dashboard - Missing Salon Edit Settings
**Current State:** VendorDashboard has a Settings tab in navigation, but NO implementation for it!
- Salon owners cannot edit their salon details
- Missing functionality:
  - Edit salon name, description
  - Upload/change cover image & logo
  - Edit address & location (latitude/longitude)
  - Manage phone & email
  - Add/remove staff count indicator

### 3. Admin Financial Dashboard - Confusing Payment Tracking
**Current State:** Main Admin sees "Pending Payouts" but lacks:
- Clear visibility of WHERE payments come FROM (which bookings)
- WHERE payments GO (which salon's bank account)
- Complete transaction history with filters
- Booking-level payment status (paid, pending, cash)
- Visual payment flow diagram

---

## Proposed Solutions

### Part 1: Explore Page Fix
**Investigation:** Check if there's a text truncation issue or missing content
- Review `SalonCard.tsx` for any display bugs
- Ensure all salon data displays correctly

### Part 2: Vendor Salon Settings Page (Major Feature)

**New "Edit My Salon" Interface:**

```
+------------------------------------------+
|  Edit My Salon                    [Save] |
+------------------------------------------+
|                                          |
|  Cover Image [Upload/Change]             |
|  +------------------------------------+  |
|  |        [Cover Image Preview]       |  |
|  +------------------------------------+  |
|                                          |
|  Logo [Upload/Change]                    |
|  +------+                                |
|  | Logo |                                |
|  +------+                                |
|                                          |
|  Salon Name: [________________]          |
|  Description: [________________]         |
|                                          |
|  --- Contact Info ---                    |
|  Phone: [________________]               |
|  Email: [________________]               |
|                                          |
|  --- Location ---                        |
|  Address: [________________]             |
|  City: [________________]                |
|  [Pick Location on Map] or               |
|  [Use Current Location]                  |
|                                          |
|  Staff Members: 5 active                 |
|  Services: 12 active                     |
|                                          |
+------------------------------------------+
```

**Files to Create/Modify:**
1. `src/hooks/useVendorData.ts` - Add `useUpdateSalon` mutation
2. `src/pages/VendorDashboard.tsx` - Implement Settings tab content

### Part 3: Admin Financial Dashboard Redesign (Major Feature)

**New "Comprehensive Financial Control" Interface:**

```
+--------------------------------------------------+
|  Financial Control                               |
+--------------------------------------------------+
|                                                  |
|  [Stats Cards: Revenue, Platform Earnings, etc.] |
|                                                  |
|  +----------------------------------------------+|
|  | PAYMENT FLOW DIAGRAM                         ||
|  |                                              ||
|  | Customer -> Booking -> Commission -> Vendor  ||
|  |    |                     |            |      ||
|  |  [Pay]              [Platform]    [Payout]   ||
|  +----------------------------------------------+|
|                                                  |
|  === All Transactions ===                        |
|  [Filter: Date | Salon | Type | Status]          |
|                                                  |
|  +----------------------------------------------+|
|  | Booking #1234 | Salon A | Rs 2,000           ||
|  | Customer: John | Service: Hair Cut           ||
|  | Payment: ONLINE (PAID) | Commission: Rs 300  ||
|  | Vendor Payout: Rs 1,700 | Status: Pending    ||
|  +----------------------------------------------+|
|  | Booking #1235 | Salon B | Rs 1,500           ||
|  | Customer: Jane | Service: Facial             ||
|  | Payment: CASH (Pending) | Commission: Rs 225 ||
|  | Vendor Payout: Rs 1,275 | Status: --         ||
|  +----------------------------------------------+|
|                                                  |
|  === Payout Requests ===                         |
|  [Pending (3)] [Approved] [Rejected]             |
|                                                  |
|  +----------------------------------------------+|
|  | Salon A requesting Rs 10,000                 ||
|  | Bank: BOC | Account: ***1234                 ||
|  | Available Balance: Rs 12,500                 ||
|  | Requested: Feb 4, 2025                       ||
|  | [Approve] [Reject] [View History]            ||
|  +----------------------------------------------+|
|                                                  |
+--------------------------------------------------+
```

**Key Features:**
1. **Transaction History Table**
   - Shows ALL bookings with payment breakdown
   - Columns: Date, Salon, Customer, Service, Total, Payment Method, Payment Status, Commission, Vendor Payout
   - Filter by salon, date range, payment status

2. **Visual Payment Flow**
   - Diagram showing money flow: Customer -> Platform -> Vendor
   - Clear indicators of where money is at each stage

3. **Payout Request Details**
   - Show which salon
   - Show wallet balance
   - Show bank account details
   - Transaction history for that salon

4. **Salon Financial Summary**
   - Per-salon breakdown
   - Total earnings, pending payouts, completed payouts

---

## Technical Implementation

### Files to Modify

#### 1. `src/hooks/useVendorData.ts`
Add new hook:
```typescript
export const useUpdateSalon = () => {
  // Update salon details including:
  // name, description, cover_image, logo, address, city, phone, email, latitude, longitude
};
```

#### 2. `src/pages/VendorDashboard.tsx`
Implement Settings tab with:
- Form fields for all salon details
- Image upload functionality (using Supabase Storage)
- Location picker with map integration
- Real-time validation

#### 3. `src/components/admin/FinancialDashboard.tsx`
Complete redesign with:
- Transaction history table with full booking details
- Filter and search functionality
- Visual payment flow diagram
- Enhanced payout request cards with bank details
- Salon-wise financial summary

#### 4. `src/hooks/useAdminData.ts`
Add new hooks:
```typescript
// Fetch all transactions (bookings with payment info)
export const useAllTransactions = (filters?: {
  salonId?: string;
  dateFrom?: string;
  dateTo?: string;
  paymentStatus?: string;
}) => { ... };

// Get salon financial summary
export const useSalonFinancials = (salonId: string) => { ... };
```

---

## Database Requirements

**No new tables needed** - All required data exists:
- `bookings` - Has payment_method, payment_status, platform_commission, vendor_payout
- `payout_requests` - Has salon_id, amount, bank_details, status
- `wallets` - Has user balances
- `wallet_transactions` - Has full transaction history

---

## Implementation Order

1. **Phase 1: Vendor Settings** (Priority High)
   - Add useUpdateSalon hook
   - Implement Settings tab UI
   - Add image upload for cover/logo
   - Add location picker

2. **Phase 2: Admin Financial Dashboard** (Priority High)
   - Add useAllTransactions hook
   - Create transaction history table
   - Add filters and search
   - Enhance payout request cards
   - Add payment flow visualization

3. **Phase 3: Explore Page Fix** (Priority Medium)
   - Investigate and fix text display issue

---

## Expected Benefits

1. **Vendor Experience**
   - Complete control over salon profile
   - Easy image management
   - Location accuracy with map picker

2. **Admin Experience**
   - Clear understanding of money flow
   - Easy payout management
   - Detailed transaction history
   - Better financial oversight

3. **Platform Transparency**
   - Every rupee tracked from booking to payout
   - Clear audit trail for all transactions
