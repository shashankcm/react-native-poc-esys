import React from "react";
import { TextInput, Text, Button, View } from "react-native";
import { FiledWrapper } from "../FieldWrapper/FieldWrapper";

export const TextInputComponent = ({
  label,
  formikProps,
  formikKey,
  styles,
  ...rest
}) => {
  const inputStyles = {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 3
  };
  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = "red";
  }
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.lableStyle}>{label}</Text>
      <TextInput
        style={inputStyles}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
      <Text style={{ color: "red" }}>
        {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
      </Text>
    </View>
  );
};
