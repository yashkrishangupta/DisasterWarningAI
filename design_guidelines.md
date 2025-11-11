# Design Guidelines: Uttarakhand Disaster Early Warning System

## Design Approach
**System Selected**: Material Design 3 with adaptations for emergency/government services
**Rationale**: Information-dense emergency application requiring clear data hierarchy, strong visual feedback, and mobile-first accessibility for field workers and rural communities.

## Core Design Principles
1. **Clarity Over Aesthetics**: Information readability and quick comprehension are paramount
2. **Mobile-First Critical**: Optimize for 360px-414px viewports where field access occurs
3. **High Contrast**: Ensure visibility in outdoor/bright conditions
4. **Instant Recognition**: Use universal iconography and color-coded risk levels

---

## Typography

**Primary Font**: Inter (Google Fonts)
- Headlines: 600 weight, 24-32px
- Subheadings: 500 weight, 18-20px  
- Body: 400 weight, 16px
- Alerts/Critical Info: 600 weight, 18px
- Data Labels: 400 weight, 14px

**Secondary Font**: Noto Sans Devanagari (for Hindi/Garhwali)
- Maintain same size hierarchy as primary font

---

## Layout System

**Spacing Units**: Tailwind scale of 2, 4, 6, 8, 12, 16
- Component padding: p-4 or p-6
- Section spacing: py-8 or py-12
- Card gaps: gap-4
- Dense data sections: gap-2

**Grid System**:
- Mobile: Single column, full-width cards
- Tablet: 2-column grid for metrics/districts
- Desktop: 3-column layout for dashboard widgets

**Container**: max-w-7xl with px-4 padding

---

## Component Library

### Navigation
**Top Bar**: Fixed position, h-16, shadow-md
- Left: Logo + "Uttarakhand Disaster Alert"
- Center: District selector dropdown
- Right: Language toggle (EN/HI), Alert bell icon

**Mobile Nav**: Bottom navigation bar with 4 primary actions
- Dashboard, Alerts, Map, Report

### Hero Section
**Dashboard Hero**: Compact header (h-48 on mobile, h-64 on desktop)
- Current overall risk level indicator (large, centered)
- Live weather summary strip below
- No decorative images - focus on data

### Alert Components
**Alert Cards**: Elevated cards with left border indicator
- Critical: 4px red left border
- High: 4px orange left border  
- Medium: 4px yellow left border
- Low: 4px green left border

Card structure:
- Icon + Alert type (top row)
- Location + Time (second row)
- Description (body)
- Action buttons (footer)

### Risk Level Indicators
**Visual System**:
- Circular progress rings for probability percentages
- Size: 80px diameter on mobile, 120px on desktop
- Color-coded: Green (0-25%), Yellow (26-50%), Orange (51-75%), Red (76-100%)
- Center: Large percentage number

### Map Integration
**Interactive Map**: Full-width container, h-96 on desktop, h-64 on mobile
- District polygons with color-coded fills
- Click to zoom district view
- Legend overlay (bottom-right)
- Current location marker

### Data Cards
**District Risk Cards**: Grid layout
- Header: District name + current risk badge
- Metrics row: Rainfall, Soil moisture, Slope risk (3 columns)
- Footer: Last updated timestamp

**Prediction Cards**: Timeline layout
- 24-hour, 48-hour, 72-hour forecast
- Visual timeline with risk indicators
- Expandable details

### Community Report Form
**Input Fields**: Material Design outlined style
- Consistent 56px height
- Labels: 12px, positioned above
- Validation: Inline error messages in red

### Pilgrimage Route Tracker
**Route Cards**: Horizontal scrollable list
- Route name + current status badge
- Weather conditions strip
- "View Details" CTA button

---

## Images

**Hero Section**: NO large hero image - use data visualization instead
**Map Background**: Topographic map of Uttarakhand as subtle background for dashboard
**District Cards**: Small 60x60px district landmark thumbnails (optional, low priority)
**Community Reports**: User-submitted photos displayed as 120x120px thumbnails in grid

---

## Critical UI Patterns

**Alert Banner**: Fixed top position when active alerts exist
- Full-width, dismissible
- Animated pulse for critical alerts
- Clear "View Details" action

**Loading States**: Skeleton screens for data loading
- Shimmer effect on cards
- Preserve layout structure

**Empty States**: Centered illustrations with actionable text
- "No active alerts - System monitoring"
- Encourage community reporting when no data

**Buttons**:
- Primary: Elevated, 48px height on mobile
- Secondary: Outlined
- Icon buttons: 40x40px touch targets
- Floating Action Button: Bottom-right for "Report Incident" (56x56px)

---

## Accessibility Requirements

- WCAG AA contrast ratios minimum
- Touch targets: Minimum 44x44px
- Focus indicators: 2px solid outline
- Screen reader labels for all data visualizations
- Bilingual labels throughout (English/Hindi)

---

## Animation Guidelines

**Minimal Use** - Only for:
- Alert notification slide-in (300ms ease)
- Risk level indicator fill animation (500ms on load)
- Map zoom transitions (200ms)
- NO hover effects, scroll animations, or decorative motion