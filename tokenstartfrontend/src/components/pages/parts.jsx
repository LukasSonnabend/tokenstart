import React, { useState, useContext } from 'react';
import AuthOptions from '../auth/authOptions.js';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import ProjectSearch from "../../components/misc/ProjectSearch";

export function NavBar() {
  const [searchInput, setSearchInput] = useState();

  return (<div className="">
    <Navbar expand="xl">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-0 w-100 d-flex spaceBetween">
          <Nav.Link className="text-dark 	d-lg-none" href="/">Home</Nav.Link>
          <Nav.Link className="text-dark" href="/category/technology">Technology</Nav.Link>
          <Nav.Link className="text-dark" href="/category/games">Games</Nav.Link>
          <Nav.Link className="text-dark" href="/category/music">Music</Nav.Link>
          <Nav.Link className="text-dark" href="/category/journalism">Journalism</Nav.Link>
          <Nav.Link className="text-dark" href="/category/design">Design</Nav.Link>
          <Nav.Link className="text-dark" href="/category/film_video">Film</Nav.Link>
          <Nav.Link className="text-dark" href="/category/fashion">Fashion</Nav.Link>
          <Nav.Link class="text-dark" id="equity-heading" href="/category/equity">Equity Token</Nav.Link>
          {/* Mobile Options */}
          <div className="mobile-traders-section 	d-lg-none">
          <label>Traders Section</label>
          <Nav.Link className="text-dark" href="/leaderboard">Leaderboard</Nav.Link>
          <Nav.Link className="text-dark" href="/exchange">Exchange</Nav.Link>
          <Nav.Link className="text-dark" href="/projects-overview">Project List</Nav.Link>
          <Nav.Link className="text-dark" href="/project/new">Start Project</Nav.Link>
          </div>
          {/* Mobile Options End */}

          <Form inline>
          {/* <li className="nav-item desktopSearch d-none d-xl-block"> */}
          <li>
                 <ProjectSearch />
               </li>
            {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
            
          </Form>
          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown> */}
          <li className="nav-item"> <AuthOptions /> </li>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  </div>
  )
}

export function Sidebar() {
  let userImage = "https://i.ibb.co/12s6djB/iconfinder-00-ELASTOFONT-STORE-READY-user-circle-2703062.webp";

  return <div className="sidebar d-none d-lg-block">

    <Nav.Link className="text-dark" href="/"><h3>TokenStart</h3></Nav.Link>
    <div className="sidebarUserImage" style={{backgroundImage: "url(" + userImage + ")"}}></div>
    <ul className="sidebar-menu mt-2">
          <Nav.Link className="text-dark" href="/leaderboard">Leaderboard</Nav.Link>
          <Nav.Link className="text-dark" href="/exchange">Exchange</Nav.Link>
          <Nav.Link className="text-dark" href="/projects-overview">Project List</Nav.Link>
          <Nav.Link className="text-dark" href="/project/new">Create Project</Nav.Link>
    </ul>




  </div>
}



export function Footer() {

  const history = useHistory();


  return <div className="footer">

    <footer className="page-footer font-small">


      <div className="container text-center text-md-left  mb-2">


        <div className="row">


          <div className="col-md-3 mx-auto">


            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">ABOUT US</h5>

            <ul className="list-unstyled">
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li>
                <Link to="/howitworks_investors">How it works! -Investors</Link>
              </li>
              <li>
              <Link to="/howitworks_creators">How it works! -Creators</Link>
              </li>
              <li>
                <a href="#!">Press</a>
              </li>
            </ul>

          </div>


          <hr className="clearfix w-100 d-md-none" />


          <div className="col-md-3 mx-auto">


            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">Support</h5>

            <ul className="list-unstyled">
              <li>
                <Link to="/FAQs">FAQs</Link>
              </li>
              <li>
                <Link to="/projectownerhelp">Help for project owners</Link>
              </li>
              <li>
                <a href="#!">Help for donators</a>
              </li>
            </ul>

          </div>


          <hr className="clearfix w-100 d-md-none" />

          <div className="col-md-3 mx-auto">


            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">More from TokenStart</h5>

            <ul className="list-unstyled">
              <li>
                <a href="#!">Newsletter</a>
              </li>
              <li>
                <a href="#!">Social Media</a>
              </li>
            </ul>

          </div>

          <hr className="clearfix w-100 d-md-none" />


        </div>


      </div>

      <div className="footer-copyright text-center">© 2020 Copyright:
    <a href="https://tokenstart.io/"> tokenstart.io</a>
      </div>


    </footer>
  </div>
}