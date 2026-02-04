
# Time Slot Optimization & Booked Slots Visual Indicator Plan

## ගැටළු විශ්ලේෂණය (Problem Analysis)

### 1. Time Slots Render Slow (Lag Issue)
- **Root Cause**: `TimeSlotButton` uses `framer-motion` for every single button (18 buttons total)
- Each button has `whileHover` and `whileTap` animations creating performance overhead
- `glass-card` CSS class adds additional GPU-heavy effects

### 2. Booked Time Slots Not Clearly Visible
- Currently booked slots are grayed out (`bg-muted/50 text-muted-foreground`)
- User cannot clearly see "BOOKED" status
- No visual distinction between "unavailable" and "booked by someone"

---

## Proposed Solution

### Part 1: Performance Optimization

**Remove Framer Motion from TimeSlotButton**
- Replace `motion.button` with regular `button`
- Use CSS transforms for hover effects (GPU-optimized)
- Add `memo` to prevent unnecessary re-renders

### Part 2: Enhanced Booked Indicator

**Clear "BOOKED" Badge Design**
- Show "BOOKED" text inside unavailable slots
- Red/gray strikethrough styling
- Lock icon for extra clarity

---

## Implementation

### File 1: `src/components/TimeSlotButton.tsx`

Changes:
1. Remove `framer-motion` import and `motion.button`
2. Add CSS-only hover transitions
3. Use `React.memo` for performance
4. Enhanced styling for booked slots with "BOOKED" text

```
Before:
+------------------+
|   09:00 (grayed) |
+------------------+

After:
+------------------+
| BOOKED  09:00    |
|   (red striped)  |
+------------------+
```

**Styling for different states:**
- **Available**: Normal glass-card style
- **Selected**: Primary color with glow
- **Booked**: Red/gray background with "BOOKED" badge, strike-through time

### File 2: `src/pages/SalonDetail.tsx` (TimeSlotSection)

Changes:
1. Memoize the TimeSlotSection component
2. Add a legend showing what the colors mean
3. Optimize the rendering loop

---

## UI Preview

```
+----------------------------------------+
|  Time slots for Feb 4                  |
|                                        |
|  [09:00]  [09:30]  [BOOKED 10:00]       |
|  [10:30]  [BOOKED 11:00]  [11:30]       |
|  [12:00]  [12:30]  [13:00]              |
|  ...                                   |
|                                        |
|  Legend:                               |
|  [Green] Available                     |
|  [Red/Gray] Already Booked             |
+----------------------------------------+
```

---

## Technical Details

### TimeSlotButton.tsx Changes

```tsx
// Remove framer-motion
// Use CSS-only approach

interface TimeSlotButtonProps {
  time: string;
  available?: boolean;
  isSelected?: boolean;
  onSelect?: (time: string) => void;
}

const TimeSlotButton = memo(({ time, available, isSelected, onSelect }) => {
  return (
    <button
      onClick={() => available && onSelect?.(time)}
      disabled={!available}
      className={cn(
        // Base styles with CSS transitions
        'relative px-3 py-2 rounded-lg text-sm font-medium',
        'transition-all duration-200 transform-gpu',
        'active:scale-95 hover:scale-[1.02]',
        
        isSelected
          ? 'bg-primary text-primary-foreground shadow-glow-rose'
          : available
          ? 'bg-card/80 border border-border/50 hover:border-primary/50 hover:bg-card'
          : 'bg-red-500/10 border border-red-500/30 cursor-not-allowed'
      )}
    >
      {!available && (
        <span className="text-[10px] text-red-400 font-semibold">BOOKED</span>
      )}
      <span className={cn(!available && 'line-through text-muted-foreground text-xs')}>
        {time}
      </span>
    </button>
  );
});
```

---

## Performance Benefits

| Before | After |
|--------|-------|
| 18 Framer Motion instances | 0 Framer Motion instances |
| Heavy GPU animations | Lightweight CSS transforms |
| No memoization | React.memo on button |
| Glass-card hover effects | Simple color transitions |

---

## Files to Modify

1. **`src/components/TimeSlotButton.tsx`**
   - Remove framer-motion
   - Add memo wrapper
   - Enhanced booked state UI with "BOOKED" badge
   - CSS-only hover effects

2. **`src/pages/SalonDetail.tsx`**
   - Memoize TimeSlotSection
   - Add legend for slot colors
   - Optimize props passing

---

## Summary

1. **Bug Fix**: Time slots will load instantly without lag
2. **UX Enhancement**: Booked slots clearly show "BOOKED" badge with strikethrough
3. **Performance**: CSS-only animations, memoization, no heavy libraries
4. **Clarity**: Legend explains what colors mean to users
