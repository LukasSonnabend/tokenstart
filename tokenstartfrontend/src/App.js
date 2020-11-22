import React, { useState, useEffect } from 'react';
import Axios from "axios";
import './App.scss';
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import About from "./components/pages/About";
import Account from "./components/pages/Account";
import Project from "./components/pages/project";
import Exchange from "./components/pages/Exchange";
import EditProject from "./components/pages/EditProject";
import ViewUser from "./components/pages/ViewUser";
import Goals from "./components/pages/Goals";
import {Route, Link, BrowserRouter, Switch} from 'react-router-dom';
import {NavBar, Footer, Sidebar} from './components/pages/parts';
import UserContext from "./context/UserContext";
import CreateProject from './components/pages/createProject';
import FourOFour from './components/pages/FourOFour';
import ProjectsOverview from './components/pages/ProjectsOverview';
import FAQs from './components/pages/FAQs';
import Payment from './components/pages/payment';
import ScrollTop from './components/misc/ScrollTop';
import projectowner from './components/pages/projectOwnerHelp';


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
        "https://tokenstart.herokuapp.com/users/refreshtokenisvalid",
        null,
        { headers: { "refresh-token": localStorage.getItem("refresh-token") }}
        );

    if ( tokenRes.data != "Token not in DB") {
      const userRes = await Axios.get("https://tokenstart.herokuapp.com/users/",{
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
      <ScrollTop/>
      <UserContext.Provider value={{ userData, setUserData }}>
      <Sidebar className="sidebside"/>
      <NavBar className="sidebside"/>
      <Switch>
        <div className="main-view">
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/about" component={About}/>
        <Route path="/ourgoal" component={Goals}/>
        <Route path="/projects/new" component={CreateProject}/>
        <Route path="/projects" component={ProjectsOverview}/>
        <Route path="/exchange" component={Exchange}/>
        <Route path="/project/:projectId" component={Project}/>
        <Route path="/user/:userId" component={ViewUser}/>
        <Route path="/edit/project/:projectId" component={EditProject}/>
        <Route path="/account" component={Account}/>
        <Route path="/checkout" component={Payment}/>
        <Route path="/404" component={FourOFour}/>
        <Route path="/FAQs" component={FAQs}/>
        <Route path="/projectownerhelp" component={projectowner}/>
        </div>
      </Switch>
    <Footer/>
    </UserContext.Provider>
    </BrowserRouter>
    </div>
  );
}

export default App;
