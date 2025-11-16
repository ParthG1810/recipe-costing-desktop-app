# 🎨 Theme Options for Recipe Costing App

Choose from 5 beautifully crafted themes! Each theme has been designed with modern UI principles and user-friendliness in mind.

---

## **Option 1: Ocean Blue** 🌊
**Style:** Fresh, Professional, Clean
**Perfect for:** Modern businesses, tech companies

**Colors:**
- Primary: Sky Blue (#0EA5E9)
- Secondary: Teal (#06B6D4)
- Background: Light Blue (#F0F9FF)

**Best for:** A crisp, professional look that's easy on the eyes

---

## **Option 2: Royal Purple** 👑
**Style:** Creative, Luxurious, Bold
**Perfect for:** Creative industries, premium brands

**Colors:**
- Primary: Vibrant Purple (#8B5CF6)
- Secondary: Magenta (#EC4899)
- Background: Light Lavender (#FAF5FF)

**Best for:** Standing out with elegance and creativity

---

## **Option 3: Forest Green** 🌲
**Style:** Natural, Eco-Friendly, Calm
**Perfect for:** Organic businesses, sustainability-focused companies

**Colors:**
- Primary: Emerald Green (#10B981)
- Secondary: Teal (#14B8A6)
- Background: Mint (#F0FDF4)

**Best for:** A fresh, natural, calming experience

---

## **Option 4: Sunset Orange** 🌅
**Style:** Warm, Energetic, Inviting
**Perfect for:** Food & beverage, hospitality industries

**Colors:**
- Primary: Vibrant Orange (#F97316)
- Secondary: Coral Pink (#EC4899)
- Background: Warm Cream (#FFF7ED)

**Best for:** Creating an appetizing, warm atmosphere

---

## **Option 5: Midnight Dark** 🌙
**Style:** Elegant, Professional, Eye-Friendly
**Perfect for:** Night work, modern tech companies

**Colors:**
- Primary: Sky Blue (#60A5FA)
- Secondary: Gold (#FBBF24)
- Background: Dark Navy (#0F172A)
- Mode: **Dark Mode**

**Best for:** Reducing eye strain and looking sophisticated

---

## How to Apply a Theme

1. Open `src/theme.js`
2. Replace the import at the top:
   ```javascript
   // Current:
   import { createTheme } from '@mui/material/styles';

   // Replace with one of:
   import theme from './themes/oceanBlue';
   import theme from './themes/royalPurple';
   import theme from './themes/forestGreen';
   import theme from './themes/sunsetOrange';
   import theme from './themes/midnightDark';

   export default theme;
   ```

3. Or use the themes index:
   ```javascript
   import { themes } from './themes';

   // Choose your theme
   export default themes.oceanBlue;     // or
   export default themes.royalPurple;   // or
   export default themes.forestGreen;   // or
   export default themes.sunsetOrange;  // or
   export default themes.midnightDark;
   ```

---

## Visual Comparison

| Theme | Vibe | Energy Level | Formality |
|-------|------|--------------|-----------|
| Ocean Blue | Cool & Professional | Medium | High |
| Royal Purple | Creative & Bold | High | Medium-High |
| Forest Green | Natural & Calm | Low-Medium | Medium |
| Sunset Orange | Warm & Energetic | High | Low-Medium |
| Midnight Dark | Elegant & Modern | Low | High |

---

**Current Theme:** Ocean Blue is currently applied
**Recommendation:** For a recipe costing app, **Sunset Orange** or **Forest Green** would be perfect!
