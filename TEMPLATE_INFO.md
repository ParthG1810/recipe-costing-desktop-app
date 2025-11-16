# Minimal UI Template Integration

This application is built using the **Minimal UI v4.1.0 JavaScript Template** from the `Minimal_JavaScript_v4.1.0.zip` file included in the repository.

## Template Details

- **Template Name:** Minimal UI v4.1.0 (JavaScript Version)
- **Source File:** `Minimal_JavaScript_v4.1.0.zip`
- **Version Used:** CRA (Create React App) variant, adapted for Vite

## What Was Integrated

### 1. Theme System
- **Location:** `src/themes/`
- Complete Material-UI theme configuration including:
  - Color palette with light/dark mode support
  - Typography system
  - Custom shadows and component overrides
  - Global styles

### 2. Core Components
- **Iconify Component** (`src/components/iconify/`) - Icon wrapper using @iconify/react
- **Logo Component** (`src/components/logo/`) - Custom application logo
- **Scrollbar Component** (`src/components/scrollbar/`) - Custom scrollbar using SimpleBar
- **Nav Section Component** (`src/components/nav-section/`) - Navigation menu system

### 3. Layout System
- **Dashboard Layout** (`src/layouts/dashboard/`)
  - Main layout wrapper with header and sidebar
  - Responsive navigation (vertical sidebar for desktop, drawer for mobile)
  - Professional header with branding

### 4. Utilities
- **CSS Utilities** (`src/utils/cssStyles.js`) - Background blur, gradients, and text effects
- **Responsive Hook** (`src/hooks/useResponsive.js`) - Media query helper

## Design Philosophy

The Minimal UI template provides:

- **Clean, Professional Design** - Modern Material Design with custom refinements
- **Responsive Layout** - Mobile-first approach with breakpoint management
- **Consistent Components** - All UI elements follow the same design language
- **Smooth Animations** - Subtle transitions and hover effects
- **Icon System** - Eva Icons via Iconify for a comprehensive icon set

## Dependencies Added

The following packages were added from the template:

```json
{
  "@iconify/react": "^4.0.0",
  "@mui/lab": "^5.0.0-alpha.170",
  "framer-motion": "^10.16.16",
  "notistack": "^3.0.1",
  "prop-types": "^15.8.1",
  "simplebar-react": "^3.2.4"
}
```

## Application Pages Using Minimal UI

All application pages have been styled with the Minimal UI design system:

1. **Dashboard** (`src/pages/Dashboard.jsx`)
   - Welcome banner with gradient
   - Statistics cards with icons
   - Quick action cards with hover effects

2. **Product Entry** (`src/pages/ProductEntry.jsx`)
   - Form layout with card design
   - Vendor management interface
   - Gradient accents for primary actions

3. **Product Management** (`src/pages/ProductManagement.jsx`)
   - Data table with custom styling
   - Search and filter interface
   - Action buttons with icons

4. **Recipe Creation** (`src/pages/RecipeCreation.jsx`)
   - Multi-step form interface
   - Real-time cost calculation sidebar
   - Ingredient management cards

5. **Recipe Management** (`src/pages/RecipeManagement.jsx`)
   - Recipe listing with search
   - Detail view dialog
   - Edit and delete actions

## Customizations Made

While maintaining the core Minimal UI design system, the following customizations were applied:

- **Logo:** Custom "RC" (Recipe Costing) logo replacing template logo
- **Navigation:** Custom menu items for products and recipes
- **Color Scheme:** Using template's default green primary color
- **Theme Mode:** Fixed to light mode (can be extended to support dark mode)
- **Layout:** Simplified to single dashboard layout (removed other layout variants)

## File Structure

```
src/
├── components/
│   ├── iconify/         # From template
│   ├── logo/           # Customized for this app
│   ├── nav-section/    # From template
│   └── scrollbar/      # From template
├── hooks/
│   └── useResponsive.js # From template
├── layouts/
│   └── dashboard/       # Adapted from template
│       ├── header/
│       ├── nav/
│       ├── DashboardLayout.jsx
│       └── Main.jsx
├── pages/              # Custom pages using Minimal UI components
│   ├── Dashboard.jsx
│   ├── ProductEntry.jsx
│   ├── ProductManagement.jsx
│   ├── RecipeCreation.jsx
│   └── RecipeManagement.jsx
├── themes/             # Complete theme system from template
│   ├── overrides/
│   ├── customShadows.js
│   ├── globalStyles.jsx
│   ├── index.js
│   ├── palette.js
│   ├── shadows.js
│   ├── typography.js
│   └── ThemeProvider.jsx
└── utils/
    └── cssStyles.js    # From template
```

## Benefits of Using Minimal UI

1. **Professional Appearance** - Enterprise-grade UI out of the box
2. **Consistency** - All components follow the same design language
3. **Maintainability** - Well-structured codebase with clear patterns
4. **Responsiveness** - Mobile-friendly by default
5. **Extensibility** - Easy to add new features following existing patterns
6. **Performance** - Optimized components and efficient rendering
7. **Accessibility** - Material-UI's built-in accessibility features

## License

The Minimal UI template is used in accordance with its license terms. Please refer to `LICENSE.md` from the template for details.

## Further Reading

- [Material-UI Documentation](https://mui.com/)
- [Iconify React Documentation](https://iconify.design/docs/icon-components/react/)
- [Vite Documentation](https://vitejs.dev/)
