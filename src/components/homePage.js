import React from "react";
import {
  SafeAreaView,
  TextInput,
  Text,
  Button,
  ActivityIndicator
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: ""
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .label("Name")
    .min(2, "Name should contain minimum of 3 characters ")
    .max(30, "Name should not contain more than 30 character in length")
});

const goToEvidencePage = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
      //reject();
    }, 1000);
  });

const HomPage = ({ history }) => (
  <SafeAreaView>
    <Formik
      initialValues={initialValues}
      onSubmit={() => {
        goToEvidencePage().then(() => {
          history.push("/evidence");
        });
      }}
      validationSchema={validationSchema}
    >
      {({ values, errors, isSubmitting, handleChange, handleSubmit, name }) => (
        <React.Fragment>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              padding: 10,
              marginBottom: 3
            }}
            value={values.name}
            onChangeText={handleChange("name")}
          />
          <Text style={{ color: "red" }}>{errors.name}</Text>
          {isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <Button title="Go to Evidence" onPress={handleSubmit} />
          )}
          <Text>{JSON.stringify(values, null, 2)}</Text>
        </React.Fragment>
      )}
    </Formik>
  </SafeAreaView>
);
export default HomPage;
