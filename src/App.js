import React, {useContext} from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import './App.sass';
import './config/i18n';
import { ROUTERS_URL } from "./config/routes";
import Headerapp from "./components/Headerapp/Headerapp";
import People from "./components/People/People";
import Awards from "./components/Awards/Awards";
import {NotificationContainer, NotificationManager} from "react-notifications";
import 'react-notifications/lib/notifications.css';
import {ContextApp} from "./config/context";
function App() {
  const context = useContext(ContextApp);
  context.notificationService = NotificationManager;
  return (
    <div className="App">
      <Headerapp></Headerapp>
      <div className="ContentApp">
        <Switch>
          <Route path={ROUTERS_URL.people_path.url}>
            <People />
          </Route>
          <Route path={ROUTERS_URL.awards_path.url}>
            <Awards />
          </Route>
          <Route path="/">
            <People />
          </Route>
        </Switch>
      </div>
      <NotificationContainer/>
    </div>
  );
}

export default App;
