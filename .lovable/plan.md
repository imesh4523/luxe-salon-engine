
# Security & UX Upgrade Plan - Access Control & Navigation

## ගැටළු විශ්ලේෂණය (Problem Analysis)

### 1. Vendor Dashboard Permission Issue
**Current State:**
- Route `/vendor` is correctly protected with `ProtectedRoute requiredRole="vendor"`
- BUT "List Your Salon" button in Index.tsx redirects everyone to `/vendor`
- Users without vendor role get redirected to auth page - confusing UX

**Proposed Fix:**
- Change "List Your Salon" to lead to a **Business Registration Flow** instead of directly to vendor dashboard
- Create new route `/business` for business onboarding (apply to become a vendor)

### 2. Admin Dashboard Visibility - SECURITY RISK
**Current State:**
- Profile.tsx shows "Admin Dashboard" button to users with admin role
- Demo Access section shows Admin Dashboard to non-logged users
- `/main-admin` portal exists but is not being used as primary entry

**Proposed Fix:**
- **REMOVE** all Admin Dashboard buttons from Profile.tsx
- Admin access ONLY through `/main-admin` (standalone secure login)
- This prevents discovery of admin panel through normal UI

### 3. Vendor Button Naming
**Current State:**
- "List Your Salon" - confusing
- "Vendor Dashboard" - too technical

**Proposed Fix:**
- Home page: "For Business" or "Partner with Us"
- Profile page: "Business Dashboard" or "Manage My Business"

---

## Implementation Plan

### File 1: `src/pages/Index.tsx`

**Changes:**
1. Replace "List Your Salon" button with "For Business" / "Partner with Us"
2. Link to `/business` (new registration page) instead of `/vendor`

```
Before:
[List Your Salon] → /vendor

After:
[For Business] → /business (registration/apply page)
```

### File 2: `src/pages/Profile.tsx`

**Changes:**
1. **REMOVE** the entire "Demo Access (for testing)" section (lines 262-294)
2. **REMOVE** Admin Dashboard button from "Business Access" section
3. Rename "Vendor Dashboard" to "Business Dashboard"
4. Only show "Business Dashboard" to users with vendor role

```
Before:
{isVendor && <Vendor Dashboard Button>}
{isAdmin && <Admin Dashboard Button>}  ← REMOVE
{!user && <Demo Access Section>}       ← REMOVE

After:
{isVendor && <Business Dashboard Button>}
(No admin button, No demo access)
```

### File 3: `src/components/Navbar.tsx`

**Changes:**
1. Add user auth state awareness
2. Show different navigation for logged-in users vs guests

### File 4: NEW - `src/pages/Business.tsx`

**New Page for Business Registration:**
- Landing page for businesses wanting to join
- "Apply to Become a Partner" form
- Benefits showcase
- Redirect to vendor dashboard if already a vendor

```
+----------------------------------------+
|  Partner with Glamour                  |
+----------------------------------------+
|                                        |
|  Why Join Us?                          |
|  ✓ 50,000+ Active Customers            |
|  ✓ Easy Booking Management             |
|  ✓ Secure Payments                     |
|                                        |
|  [Apply Now] → Auth or Application     |
|                                        |
|  Already a partner?                    |
|  [Go to Dashboard] → /vendor           |
|                                        |
+----------------------------------------+
```

---

## Security Improvements

| Issue | Before | After |
|-------|--------|-------|
| Admin Discovery | Button in Profile | Hidden, only /main-admin |
| Demo Access | Shows admin/vendor to all | Removed completely |
| Vendor Access | Direct link to dashboard | Through business registration |

---

## Route Changes

| Route | Purpose | Access |
|-------|---------|--------|
| `/business` | NEW - Business registration/partner page | Public |
| `/vendor` | Vendor Dashboard | Protected (vendor role) |
| `/main-admin` | Admin Login Portal | Public (login required) |
| `/admin/*` | Admin Dashboard | Protected (admin role) |

---

## Files to Modify

1. **`src/pages/Index.tsx`**
   - Change "List Your Salon" → "For Business"
   - Link to `/business` instead of `/vendor`

2. **`src/pages/Profile.tsx`**
   - Remove "Demo Access" section completely
   - Remove Admin Dashboard button
   - Rename Vendor Dashboard → Business Dashboard

3. **`src/App.tsx`**
   - Add new route `/business` → Business.tsx

4. **NEW: `src/pages/Business.tsx`**
   - Business partner landing/registration page
   - Benefits showcase
   - Apply form or redirect to auth

---

## Summary

| Change | Security Impact | UX Impact |
|--------|-----------------|-----------|
| Remove Admin button | HIGH - Hides admin portal | Better - Less confusing |
| Remove Demo Access | MEDIUM - No unauthorized testing | Better - Professional |
| Business landing page | LOW | Better - Clear onboarding |
| Rename to "Business" | LOW | Better - Professional naming |
