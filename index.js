import React from "react";
import { AppRegistry } from "react-native";
import { NativeRouter, Route, Switch } from "react-router-native";

import App from "./App";
import SignIn from "./src/components/signInPage";
import Homepage from "./src/components/homePage";
import Evidence from "./src/components/evidence";
import { name as appName } from "./app.json";

const completedApp = () => (
  <NativeRouter>
    <App>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/home" component={Homepage} />
        <Route path="/evidence" component={Evidence} />
      </Switch>
    </App>
  </NativeRouter>
);

AppRegistry.registerComponent(appName, () => completedApp);
