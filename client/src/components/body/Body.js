import React from "react";
import { Route, Switch } from "react-router";
import {useSelector} from "react-redux";
import Login from "./login/Login";
import Register from "./login/Register";
import ForgotPassword from "../body/login/ForgotPassword"
import ResetPassword from "../body/login/ResetPassword";
import ActivationEmail from "./login/ActivationEmail";
import NotFound from "../utils/NotFound/NotFound";

import Anunturi from "./anunturi/Anunturi";
import Profile from "./profile/Profile";
import EditUser from "./profile/EditUser";

function Body() {
  const auth = useSelector( state => state.login)
  const {isLogged, isAdmin} = auth

  return (
    <section>
      <Switch>
        <Route path="/" component={  NotFound && Anunturi} exact />

        <Route path="/login" component={isLogged ? NotFound : Login} exact />
        <Route path="/register" component={isLogged ? NotFound : Register} exact />
        
        <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPassword} exact />
        <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPassword} exact />
        
        <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />

        <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
        <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />

        <Route path="/*" component={ NotFound } exact />
      </Switch>
    </section>
  );
}
export default Body