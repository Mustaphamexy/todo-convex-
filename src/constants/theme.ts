// src/constants/theme.ts
export const lightTheme = {
  // Background images
  headerBackground: require('../../assets/images/bg-light.jpg'),
  
  // Background colors
  background: '#FAFAFA',
  
  // Card/Surface colors
  cardBackground: '#FFFFFF',
  inputBackground: '#FFFFFF',
  
  // Text colors - Updated to match Figma
  textPrimary: '#393A4B',
  textSecondary: '#9495A5', 
  textPlaceholder: '#9495A5',
  textCompleted: '#D1D2DA',
  
  // Border colors
  borderColor: '#E3E4F1',
  inputBorder: '#E3E4F1',
  
  // Interactive elements
  checkboxEmpty: '#E3E4F1',
  checkboxChecked: 'linear-gradient(135deg, #55DDFF 0%, #C058F3 100%)',
  deleteButton: '#C4C4C4',
  deleteButtonHover: '#FF6B6B',
  
  // Filter/Tab colors
  filterActive: '#3A7CFD',
  filterInactive: '#9495A5',
  filterHover: '#393A4B',
  
  // Button colors
  clearButton: '#9495A5',
  clearButtonHover: '#393A4B',
  
  // Icon colors
  themeToggleIcon: '#FFFFFF',
  checkmarkIcon: '#FFFFFF',
  closeIcon: '#C4C4C4',
  
  // Shadow
  shadow: '0px 35px 50px -15px rgba(194, 195, 214, 0.5)',
};

export const darkTheme = {
  // Background images
  headerBackground: require('../../assets/images/bg-dark.jpg'),
  
  // Background colors
  background: '#171823',
  
  // Card/Surface colors
  cardBackground: '#25273D',
  inputBackground: '#25273D',
  
  // Text colors - Updated to match Figma dark
  textPrimary: '#C8CBE7',
  textSecondary: '#5B5E7E',
  textPlaceholder: '#767992',
  textCompleted: '#4D5067',
  
  // Border colors
  borderColor: '#393A4B',
  inputBorder: '#393A4B',
  
  // Interactive elements
  checkboxEmpty: '#393A4B',
  checkboxChecked: 'linear-gradient(135deg, #55DDFF 0%, #C058F3 100%)',
  deleteButton: '#5B5E7E',
  deleteButtonHover: '#E6E6E6',
  
  // Filter/Tab colors
  filterActive: '#3A7CFD',
  filterInactive: '#5B5E7E',
  filterHover: '#E6E6E6',
  
  // Button colors
  clearButton: '#5B5E7E',
  clearButtonHover: '#E6E6E6',
  
  // Icon colors
  themeToggleIcon: '#FFFFFF',
  checkmarkIcon: '#FFFFFF',
  closeIcon: '#5B5E7E',
  
  // Shadow
  shadow: '0px 35px 50px -15px rgba(0, 0, 0, 0.5)',
};

export type Theme = typeof lightTheme;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const fontSize = {
  small: 12,
  medium: 14,
  large: 18,
  xlarge: 24,
  title: 40,
};

export const borderRadius = {
  small: 4,
  medium: 5,
  large: 12,
};