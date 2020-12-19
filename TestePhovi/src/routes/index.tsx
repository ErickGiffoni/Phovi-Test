import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Route";

import SignIn from "../pages/sign/signIn";

import TriviaMaker from "../pages/TriviaMaker";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/triviaMaker" component={TriviaMaker} isPrivate />
    </Switch>
  );
};

export default Routes;
