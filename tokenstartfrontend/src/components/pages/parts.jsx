import React, { useState, useContext } from 'react';
import AuthOptions from '../auth/authOptions.js';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import ProjectSearch from "../../components/misc/ProjectSearch";

// export function NavBar() {
//   const [searchInput, setSearchInput] = useState();

//   return (
//     <div>
//       <div className="alert alert-warning" role="alert">
//         Currently under construction
//       </div>
//       <nav className="navbar bg-light .justify-content-center">
//         <a href="/"><p><span>T</span>oken<span>S</span>tart</p></a>
//       </nav>

//       <nav className="navbar navbar-expand navbar-light bg-light">

//         <div className="collapse navbar-collapse" id="navbarNavDropdown">
//           <ul className="navbar-nav w-100">
//             <li className="nav-item active">
//             <Link to="/projects"><button className="btn btn-primary"> Go to projects overview</button></Link> 
//             <Link to="/projects/new"><button className="btn btn-primary">Start project</button></Link>  
//             </li>
//             {/* <li className="nav-item ml-auto">
//                 <a className="nav-link" href="#" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">🔍</a>
//             </li> */}
//             <input placeholder="Search for tokens" onChange={e => setSearchInput(e.target.value)} />
//             <li className="nav-item">
//               <AuthOptions />
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </div>
//   )
// }

export function NavBar() {
  const [searchInput, setSearchInput] = useState();

  return (
    <div>
      <div className="alert alert-warning" role="alert">
        Currently under construction
        </div>
      <nav className="navbar bg-light .justify-content-center">
        <a href="/"><p><span>T</span>oken<span>S</span>tart</p></a>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="d-block d-sm-none">
          <AuthOptions />
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {/* Mobile Navigation */}
          <div className="d-block d-sm-none">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/projects/new" className="nav-link text-dark">Start project</Link>
              </li>
              <li className="nav-item">
                <Link to="/projects" className="nav-link text-dark">Projects overview</Link>
              </li>
            </ul>
          </div>

          {/* Desktop Navigation */}
          <div id="desktopNavigationBar" className="col-12 d-none d-sm-block">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/projects/new" className="nav-link text-dark"><button className="btn btn-outline-dark">Start project</button></Link>
              </li>
              <li className="nav-item">
                <Link to="/projects" className="nav-link text-dark"><button className="btn btn-outline-dark">Projects overview</button></Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <li style={{ listStyle: "none" }} className="nav-item">
                <AuthOptions />
              </li>
            </form>
          </div>

          <form className="form-inline my-2 my-lg-0">
              <li style={{ listStyle: "none" }} className="nav-item">
                <ProjectSearch />
              </li>
            </form>


        </div>
      </nav>

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