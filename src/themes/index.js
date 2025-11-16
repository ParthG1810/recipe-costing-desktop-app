import { oceanBlueTheme } from './oceanBlue';
import { royalPurpleTheme } from './royalPurple';
import { forestGreenTheme } from './forestGreen';
import { sunsetOrangeTheme } from './sunsetOrange';
import { midnightDarkTheme } from './midnightDark';

export const themes = {
  oceanBlue: oceanBlueTheme,
  royalPurple: royalPurpleTheme,
  forestGreen: forestGreenTheme,
  sunsetOrange: sunsetOrangeTheme,
  midnightDark: midnightDarkTheme,
};

export const themeDescriptions = {
  oceanBlue: {
    name: 'Ocean Blue',
    description: 'Fresh and professional with sky blue and teal accents',
    colors: {
      primary: '#0EA5E9',
      secondary: '#06B6D4',
      background: '#F0F9FF',
    },
  },
  royalPurple: {
    name: 'Royal Purple',
    description: 'Creative and luxurious with purple and magenta tones',
    colors: {
      primary: '#8B5CF6',
      secondary: '#EC4899',
      background: '#FAF5FF',
    },
  },
  forestGreen: {
    name: 'Forest Green',
    description: 'Natural and eco-friendly with emerald and teal shades',
    colors: {
      primary: '#10B981',
      secondary: '#14B8A6',
      background: '#F0FDF4',
    },
  },
  sunsetOrange: {
    name: 'Sunset Orange',
    description: 'Warm and energetic with orange and coral hues',
    colors: {
      primary: '#F97316',
      secondary: '#EC4899',
      background: '#FFF7ED',
    },
  },
  midnightDark: {
    name: 'Midnight Dark',
    description: 'Elegant dark mode with blue and gold highlights',
    colors: {
      primary: '#60A5FA',
      secondary: '#FBBF24',
      background: '#0F172A',
    },
  },
};

// Default theme
export default oceanBlueTheme;
