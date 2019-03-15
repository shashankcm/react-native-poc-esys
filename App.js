import React, { Component } from "react";
import SignIn from "./src/components/signInPage";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Platform
} from "react-native";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar backgroundColor="#64dd17" barStyle="light-content" />
        <View style={styles.appBar}>
          <Image
            style={styles.imageStyle}
            source={require("./src/images/ARWorks.png")}
          />
        </View>
        {this.props.children}
      </View>
    );
  }
}

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 37 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 60 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /* justifyContent: "center",
    alignItems: "center",*/

    backgroundColor: "#F5FCFF"
  },
  statusBar: {
    height: STATUSBAR_HEIGHT
  },
  appBar: {
    backgroundColor: "#fafafa",
    height: APPBAR_HEIGHT
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    marginTop: "20%"
  },
  imageStyle: {
    //resizeMode: "contain",
    //marginTop: "20%",
    width: 100,
    height: 50,
    marginVertical: 5,
    marginHorizontal: 10
  }
});
