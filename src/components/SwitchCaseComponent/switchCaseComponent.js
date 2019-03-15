import React from "react";
import { Text, View, Switch } from "react-native";

export const SwitchCaseComponent = ({
  formikKey,
  formikProps,
  label,
  styles,
  ...rest
}) => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.lableStyle}>{label}</Text>
      <Switch
        value={formikProps.values[formikKey]}
        onValueChange={value => {
          formikProps.setFieldValue(formikKey, value);
        }}
        {...rest}
      />
      <Text style={{ color: "red" }}>
        {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
      </Text>
    </View>
  );
};
