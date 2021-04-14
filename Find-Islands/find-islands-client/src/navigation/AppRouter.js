import React from "react";
import { Switch, Route } from "react-router-dom";
import { SCREEN_URLS } from "../constants";
import {Home, Menu, NotFound} from '../screens';

const AppRouter = () => {

    return (
       <Switch>
           <Route path={SCREEN_URLS.MENU} exact={true} component={Menu} />
           <Route path={SCREEN_URLS.HOME} exact={true} component={Home} />
           <Route component={NotFound} />
       </Switch>
    )
}

export default AppRouter;