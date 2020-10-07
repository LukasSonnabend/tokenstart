import React, { useState, useContext } from 'react';
import AuthOptions from '../auth/authOptions.js';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';


export function NavBar() {
  const [searchInput, setSearchInput] = useState();

  return (
    <div>
      <div class="alert alert-warning" role="alert">
        Currently under construction
      </div>
      <nav className="navbar bg-light .justify-content-center">
        <a href="/"><p><span>T</span>oken<span>S</span>tart</p></a>
      </nav>

      <nav className="navbar navbar-expand navbar-light bg-light">

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav w-100">
            <li className="nav-item active">
            <Link to="/projects"><button className="btn btn-primary"> Go to projects overview</button></Link> 
            <Link to="/projects/new"><button className="btn btn-primary">Start project</button></Link>  
            </li>
            {/* <li className="nav-item ml-auto">
                <a className="nav-link" href="#" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">🔍</a>
            </li> */}

            <li className="nav-item">
              <AuthOptions />
            </li>
          </ul>
        </div>
      </nav>
      <div className="collapse" id="collapseExample">
        <input placeholder="Suche nach Tokens" onChange={e => setSearchInput(e.target.value)} />
      </div>

    </div>
  )
}



export function Footer() {

  const history = useHistory();

  const about = () => history.push("/about")

  return <div className="footer">

    <footer className="page-footer font-small indigo">


      <div className="container text-center text-md-left">


        <div className="row">


          <div className="col-md-3 mx-auto">


            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">ÜBER UNS</h5>

            <ul className="list-unstyled">
              <li>
                <Link to="about">Über uns</Link>
              </li>
              <li>
              <Link to="ourgoal">Unser Ziel</Link>
              </li>
              <li>
                <a href="#!">Statistiken</a>
              </li>
              <li>
                <a href="#!">Presse</a>
              </li>
            </ul>

          </div>


          <hr className="clearfix w-100 d-md-none" />


          <div className="col-md-3 mx-auto">


            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">Support</h5>

            <ul className="list-unstyled">
              <li>
                <a href="#!">FAQs</a>
              </li>
              <li>
                <a href="#!">Hilfe Center</a>
              </li>
              <li>
                <a href="#!">Hilfe für Projektinhaber</a>
              </li>
              <li>
                <a href="#!">Hilfe für Investoren</a>
              </li>
            </ul>

          </div>


          <hr className="clearfix w-100 d-md-none" />

          <div className="col-md-3 mx-auto">


            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">Mehr von Tokenstart</h5>

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

      <div className="footer-copyright text-center py-3">© 2020 Copyright:
    <a href="https://tokenstart.io/"> tokenstart.io</a>
      </div>


    </footer>
  </div>
}