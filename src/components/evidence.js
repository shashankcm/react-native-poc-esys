import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Text,
  ScrollView
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import { TextInputComponent } from "./TextInputComponent/textInput";
import { SwitchCaseComponent } from "./SwitchCaseComponent/switchCaseComponent";

const initialValues = {
  firstName: "",
  lastName: "",
  hours: "",
  representativeName: "",
  representativeAddress: "",
  representativePhoneNumber: ""
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required()
    .label("First Name"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required()
    .label("Last Name"),
  representativePhoneNumber: Yup.string()
    .matches(phoneRegExp, {
      message: "Please enter valid phone number.",
      excludeEmptyString: false
    })
    .required()
    .label("Representative Phone number"),
  hours: Yup.number()
    .required()
    .label("Hours")
    .positive()
    .integer(),
  representativeName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required()
    .label("Representative Name"),
  representativeAddress: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required()
    .label("Representative Address")
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

const Evidence = ({ history }) => (
  <SafeAreaView style={styles.safeAreaView}>
    <ScrollView>
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
            <Text style={styles.TitileStyle}>Report Evidence</Text>
            <TextInputComponent
              label="First Name"
              formikProps={formikProps}
              formikKey="firstName"
              placeholder="Enter your first name"
              styles={styles}
              autoFocus
            />
            <TextInputComponent
              label="LastName"
              formikProps={formikProps}
              formikKey="lastName"
              placeholder="Enter your last name"
              styles={styles}
            />
            <TextInputComponent
              label="Hours"
              formikProps={formikProps}
              formikKey="hours"
              placeholder="Enter hours"
              styles={styles}
            />
            <TextInputComponent
              label="Representative Name"
              formikProps={formikProps}
              formikKey="representativeName"
              placeholder="Enter Representative Name"
              styles={styles}
            />
            <TextInputComponent
              label="Representative Address"
              formikProps={formikProps}
              formikKey="representativeAddress"
              placeholder="Enter Representative Address"
              styles={styles}
            />
            <TextInputComponent
              label="Representative Phone Number"
              formikProps={formikProps}
              formikKey="representativePhoneNumber"
              placeholder="Enter Representative phone number"
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
                  <Text style={styles.buttonTextStyle}>Submit</Text>
                </TouchableOpacity>

                <Text
                  style={{
                    color: "red",
                    textAlign: "center",
                    fontWeight: "700"
                  }}
                >
                  {formikProps.errors.general}
                </Text>
              </>
            )}
            {/* <Text>{JSON.stringify(formikProps.values, null, 2)}</Text> */}
          </React.Fragment>
        )}
      </Formik>
    </ScrollView>
  </SafeAreaView>
);
export default Evidence;

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
