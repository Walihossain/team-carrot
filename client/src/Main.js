import React from "react";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Welcome from "./pages/Pages/Welcome";
import DashBoardApp from "./pages/Pages/Dashboard";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/" render={props => <Welcome {...props} />} />
      <Route
        exact
        path="/dashboard"
        render={props => <DashBoardApp {...props} />}
      />
    </Switch>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default withRouter(connect(mapStateToProps)(Main));