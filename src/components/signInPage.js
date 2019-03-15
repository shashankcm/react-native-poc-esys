import React from "react";
import {
  SafeAreaView,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Text
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import { TextInputComponent } from "./TextInputComponent/textInput";
import { SwitchCaseComponent } from "./SwitchCaseComponent/switchCaseComponent";

const initialValues = {
  email: "",
  password: "",
  agreeToTerms: false
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .label("Email")
    .email(),
  password: Yup.string()
    .required()
    .label("Password")
    .min(5, "Password should contain minimum of 5 characters ")
    .max(20, "Password should not contain more than 20 character in length"),
  agreeToTerms: Yup.boolean().test(
    "is-true",
    "Must agree to terms and conditions",
    value => value === true
  )
});

const signUp = ({ email }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "shashank@gmail.com") {
        resolve(true);
      }
      reject(new Error("Please Enter valid credentials!"));
    }, 1000);
  });

const SignIn = ({ history }) => (
  <SafeAreaView style={styles.safeAreaView}>
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        signUp({ email: values.email })
          .then(() => {
            history.push("/home");
            //alert(JSON.stringify(values));
          })
          .catch(error => {
            actions.setFieldError("general", error.message);
          })
          .finally(() => {
            actions.setSubmitting(false);
          });
      }}
      validationSchema={validationSchema}
    >
      {formikProps => (
        <React.Fragment>
          <Text style={styles.TitileStyle}>Login Page</Text>
          <TextInputComponent
            label="Email"
            formikProps={formikProps}
            formikKey="email"
            placeholder="youremail@example.com"
            styles={styles}
            autoCapitalize="none"
            autoFocus
          />
          <TextInputComponent
            label="Password"
            formikProps={formikProps}
            formikKey="password"
            placeholder="Enter your password"
            styles={styles}
            secureTextEntry
          />
          <SwitchCaseComponent
            label="Agreee to Terms and Conditions"
            formikKey="agreeToTerms"
            formikProps={formikProps}
            styles={styles}
          />
          {formikProps.isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={formikProps.handleSubmit}
              >
                <Text style={styles.buttonTextStyle}>Login</Text>
              </TouchableOpacity>

              <Text
                style={{ color: "red", textAlign: "center", fontWeight: "700" }}
              >
                {formikProps.errors.general}
              </Text>
            </>
          )}
          {/* <Text>{JSON.stringify(values, null, 2)}</Text> */}
        </React.Fragment>
      )}
    </Formik>
  </SafeAreaView>
);
export default SignIn;

const styles = StyleSheet.create({
  safeAreaView: {
    marginTop: 40
  },
  viewStyle: {
    marginHorizontal: 20,
    marginVertical: 5
  },
  lableStyle: {
    marginBottom: 3
  },
  TitileStyle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "700"
  },
  buttonStyle: {
    //justifyContent: "center",
    //alignItems: "center",
    width: 300,
    backgroundColor: "#212121",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 16,
    marginHorizontal: 35
  },
  buttonTextStyle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center"
  }
});
