import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import SignIn from "./pages/sign/signIn";

import AppProvider from "./hooks";
import Routes from "./routes";

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>
  </Router>
);

export default App;
