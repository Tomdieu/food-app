import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  View,
  ReactNode, // Import ReactNode
} from "react-native";

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  disabled?: boolean;
  leftIcon?: ReactNode; // Use ReactNode type for left icon
  rightIcon?: ReactNode; // Use ReactNode type for right icon
}

const CustomButton = ({
  title,
  onPress,
  style,
  disabled,
  leftIcon,
  rightIcon,
}: CustomButtonProps) => {
  const buttonStyles = [
    styles.buttonContainer,
    style,
    disabled ? styles.disabledButton : null,
  ];

  const buttonContentStyle = [styles.buttonContent, style];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={buttonContentStyle}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <Text style={styles.buttonText}>{title}</Text>
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#000", // Default background color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 2,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF", // Default text color
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8, // Spacing between text and icons
    marginRight: 8, // Spacing between text and icons
  },
  iconContainer: {
    marginLeft: 4, // Spacing between icons and text
    marginRight: 4, // Spacing between icons and text
  },
  disabledButton: {
    backgroundColor: "#A9A9A9", // Background color for disabled state
  },
});

export default CustomButton;
