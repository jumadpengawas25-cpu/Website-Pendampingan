---
name: Academic Oversight Excellence
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#444651'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#00312c'
  on-tertiary: '#ffffff'
  tertiary-container: '#004942'
  on-tertiary-container: '#4ebdb0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#89f5e7'
  tertiary-fixed-dim: '#6bd8cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max-width: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

This design system is engineered for the high-stakes environment of educational supervision. The brand personality is **authoritative, analytical, and supportive**, bridging the gap between traditional governance and modern technological efficiency. 

The aesthetic follows a **Corporate / Modern** style characterized by high-density information layouts that remain legible through generous whitespace. It emphasizes clarity of status and data integrity, using a structured visual hierarchy to instill confidence in supervisors managing critical academic data. The UI should feel like a premium professional tool—unobtrusive but highly functional.

## Colors

The color palette is anchored by **Deep Navy Blue**, used for core navigation and primary actions to establish a sense of institutional stability. **Education Gold** is reserved for high-impact highlights and indicators of excellence or urgent attention. **Modern Teal** is utilized exclusively for innovation-focused features, such as AI insights and automated reporting tools.

The background system uses a tiered grayscale. The primary surface is `White (#FFFFFF)`, while the base application background is `Light Gray (#F8FAFC)` to provide a subtle contrast for card-based layouts.

## Typography

The typography system relies on **Inter** to deliver a neutral, systematic, and highly legible experience. 

- **Headlines:** Use semi-bold weights with slight negative letter-spacing to create a compact, professional appearance.
- **Body Text:** Standardized at 16px for optimal readability in long-form reports. 
- **Data Labels:** Small, medium-weight labels are used for status badges and metadata, ensuring secondary information is clear without competing with primary content.
- **AI Elements:** Italicized or teal-tinted variations of `body-md` are used for AI-generated suggestions.

## Layout & Spacing

This design system utilizes a **12-column fixed grid** for desktop, centered within the viewport. On mobile devices, the layout transitions to a single-column fluid stack with 16px side margins.

- **Vertical Rhythm:** Follows a 4px base unit. Component spacing should favor `16px (stack-md)` for internal card padding and `24px (stack-lg)` for section separation.
- **Data Density:** In tables and lists, a "comfortable" density is preferred, with row heights of at least 48px to accommodate touch targets and clear status badges.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layers** and **Ambient Shadows**. 

1. **Base:** `Light Gray (#F8FAFC)` serves as the canvas.
2. **Surface:** Cards and main content containers use `White (#FFFFFF)` with a very subtle, diffused shadow (`0 1px 3px rgba(0,0,0,0.05)`) to create a lift without feeling "heavy."
3. **Elevated:** Interactive elements like hover states on school cards or dropdown menus use a more pronounced shadow (`0 10px 15px -3px rgba(0,0,0,0.1)`) to indicate depth.
4. **AI Overlay:** Elements powered by AI use a **Glassmorphism** effect—a semi-transparent teal background with a backdrop-blur of 8px—to differentiate automated insights from static administrative data.

## Shapes

The shape language is **Soft**, utilizing a 0.25rem (4px) base radius. This creates a professional and precise look that feels contemporary without being overly "playful" or "consumer-grade." 

- **Small Components:** Checkboxes and small badges use the base 4px radius.
- **Standard Components:** Buttons and Input fields use `rounded-lg` (8px).
- **Major Components:** School profile cards and AI sidebars use `rounded-xl` (12px) to softly frame larger blocks of content.

## Components

### Navigation & CTAs
The top navigation uses the **Primary Deep Navy** background with white text. Primary CTAs (e.g., "New Report") utilize the **Secondary Gold** to stand out, while secondary actions use "Ghost" buttons with teal outlines.

### Document Status Badges
Badges are pill-shaped and use a low-saturation background with a high-saturation text of the same hue:
- **Draft:** Gray background, Dark Gray text.
- **Pending:** Soft Amber background, Gold text.
- **Verified:** Pale Green background, Emerald text.
- **Revision:** Soft Red background, Crimson text.

### Dynamic Data Counters
Large numerical displays used for "Total Schools" or "Pending Verifications." These use `headline-lg` weight in the Primary color, paired with a small `label-sm` description in neutral gray.

### School Profile Cards
Structured containers featuring a small icon/avatar of the institution, the school name in `title-md`, and a footer containing quick-action icons (View, Edit, Message).

### AI-Assistant UI
The AI interface is signaled by a Teal gradient border and a subtle backdrop-blur. Input fields for the AI assistant should have a distinctive "sparkle" icon and use `Modern Teal` for the focus state.

### Input Fields
Inputs use a 1px border (`#E2E8F0`). On focus, the border transitions to `Primary Deep Navy` with a 2px offset ring to ensure accessibility.