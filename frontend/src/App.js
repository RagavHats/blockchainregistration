import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Signup from './Components/Signup' // Call the Signup Component
import Login from './Components/Login' // Call the Login Component
import VerifyMail from './Components/VerifyMail' // Call the Login Component
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
      <ToastContainer/>
      <div class="container">
        <div id="login">
          <Router>
            <Switch>
                <Route exact path="/">
                  <Login />
                </Route>
                <Route path="/signup">
                  <Signup />
                </Route>
                <Route path="/verifyEmail/:id">
                  <VerifyMail />
                </Route>
              </Switch>
          </Router>
        </div>  
      </div>
    </div>
  );
}

export default App;
