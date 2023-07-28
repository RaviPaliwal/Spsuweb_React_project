import React from "react";
import PropTypes from "prop-types";
import Alert from "./Alert";

export default function Navbar(props) {
  const handleonChange = ()=>{
   props.toggleMode(props.mode)
 }
  return (
    <div className="py-4 mt-4">
      <nav
        className={` mb-5 navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode} py-3 fixed-top`} 
      >
        <div className="container-fluid">
          <a className="navbar-brand text" href="/Textutils-React-1">
            {props.head}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="/Textutils-React-1">
                Home
              </a>
              <a className="nav-link" href="/about">
                About
              </a>
              <a
                className="nav-link"
                href="https://www.linkedin.com/in/ravi-paliwal-233312201"
                tabIndex="-1"
              >
                Linkedin
              </a>
              
            </div>
            <div className="pull-right mx-3 form-check form-switch pt-1">
          <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault " onChange={handleonChange}/>
          <label className= {`form-check-label text-${props.mode==='light'?'dark':'light'} mx-2`} htmlFor="flexSwitchCheckDefault">Darkmode</label>
             </div>
          </div>
        </div>
        
      </nav>
    </div>
  );
}
Navbar.propTypes = {
  head: PropTypes.string,
};
