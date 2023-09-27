import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  disabled?: boolean;
}

const CustomButton = ({
  title,
  onPress,
  style,
  disabled,
}: CustomButtonProps) => {
  const buttonStyles = [
    styles.buttonContainer,
    style,
    disabled ? styles.disabledButton : null,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#000", // Default background color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: "#FFF", // Default text color
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#A9A9A9", // Background color for disabled state
  },
});

export default CustomButton;
