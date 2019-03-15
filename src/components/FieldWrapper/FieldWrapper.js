import React from "react";
import { TextInput, Text, Button, View } from "react-native";

export const FiledWrapper = (
  children,
  label,
  formikKey,
  formikProps,
  styles
) => (
  <View style={styles.viewStyle}>
    <Text style={styles.lableStyle}>{label}</Text>
    {children}
    <Text style={{ color: "red" }}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);
