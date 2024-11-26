import React from 'react';
import {
  Text,
  TextStyle,
  ViewStyle,
  Dimensions,
  StyleProp,
} from 'react-native';

// Get the device's screen width
const { width } = Dimensions.get('window');

// Define the scaling function
const scaleFontSize = (
  baseSize: number,
  referenceWidth: number = 412
): number => {
  const scale = width / referenceWidth;
  return baseSize * scale;
};

// Define the types for the component props
interface ResponsiveTextProps {
  fontSize: number; // The font size to scale
  referenceWidth?: number; // The reference width to scale based on (default is 412)
  style?: StyleProp<TextStyle | ViewStyle>; // Additional styles (can be for Text or View)
  children: React.ReactNode; // The content to display inside the Text component
}

// Define the ResponsiveText component
const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  fontSize,
  children,
  style,
  referenceWidth = 412,
}) => {
  // Calculate the scaled font size
  const scaledFontSize = scaleFontSize(fontSize, referenceWidth);

  // Merge the calculated font size with any passed in style
  const combinedStyle = [{ fontSize: scaledFontSize }, style];

  return <Text style={combinedStyle}>{children}</Text>;
};

export default ResponsiveText;
