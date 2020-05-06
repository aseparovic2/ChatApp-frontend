import React from 'react';
import LoginPage from './pages/login/login';
import HomePage from './pages/home/home';
import SignUpPage from './pages/signup/signup'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useHistory } from "react-router-dom";


const App = (props) => {
  
  let history = useHistory(); 
  const onLogin = () => {
    
    history.push("/home");
    window.location.reload(false);
    alert("login");
  }
  
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={LoginPage}>
            <LoginPage onLogin = {onLogin} {...props}/>
         </Route>
         <Route exact path="/home"  component={HomePage}>
            <HomePage/>
         </Route>
         <Route exact path="/signup">
            <SignUpPage/>
         </Route>
      </Switch>
    </Router>
  );
}

export default App;