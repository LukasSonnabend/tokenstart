import React, { useState, useEffect } from 'react';
import Axios from "axios";
import './App.css';
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import About from "./components/pages/About";
import Account from "./components/pages/Account";
import Project from "./components/pages/project";
import EditProject from "./components/pages/EditProject";
import Goals from "./components/pages/Goals";
import {Route, Link, BrowserRouter, Switch} from 'react-router-dom';
import {NavBar, Footer} from './components/pages/parts';
import UserContext from "./context/UserContext";
import CreateProject from './components/pages/createProject';
import FourOFour from './components/pages/FourOFour';
import ProjectsOverview from './components/pages/ProjectsOverview';
import Payment from './components/pages/payment';


function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token  = localStorage.getItem("refresh-token");
      console.log(token);

      if (token === null) {
        localStorage.setItem("auth-token", "");
        localStorage.setItem("refresh-token", "");
        token = "";
      }
      
      const tokenRes = await Axios.post(
        "http://localhost:1234/users/refreshtokenisvalid",
        null,
        { headers: { "refresh-token": localStorage.getItem("refresh-token") }}
        );

    if ( tokenRes.data != "Token not in DB") {
      const userRes = await Axios.get("http://localhost:1234/users/",{
        headers: {"refresh-token": token }, 
      });
        setUserData({
          token,
          user: userRes.data,
        });
  }
}
    checkLoggedIn();

    //hier Weiter https://www.youtube.com/watch?v=sWfD20ortB4
    //state to check for in array Empty runs on start
}, [])

  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/about" component={About}/>
        <Route path="/ourgoal" component={Goals}/>
        <Route path="/projects/new" component={CreateProject}/>
        <Route path="/projects" component={ProjectsOverview}/>
        <Route path="/project/:projectId" component={Project}/>
        <Route path="/edit/project/:projectId" component={EditProject}/>
        <Route path="/account" component={Account}/>
        <Route path="/checkout" component={Payment}/>
        <Route path="/404" component={FourOFour}/>
      </Switch>
    <Footer/>
    </UserContext.Provider>
    </BrowserRouter>
    </div>
  );
}

export default App;
