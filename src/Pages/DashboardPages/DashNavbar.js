import React from 'react'
import { useLocation, Link } from 'react-router-dom'
// import "../../Pages/Homepages/NB.css" no need as same classes as NB in homepage
import logo from "../../Pages/Homepages/spsu.png"
import GrainIcon from '@mui/icons-material/Grain';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CollectionsIcon from '@mui/icons-material/Collections';
import CallIcon from '@mui/icons-material/Call';
import LogoutIcon from '@mui/icons-material/Logout';

const DashNavbar = () => {
    const location = useLocation();
    if(localStorage.getItem('loggedin')==="true"){
        return (
  <>
  
  <div className="ctop-container container-xxl">
    <p className="cp d-block fw-bold">CSE Admin Dashboard</p>
  </div>
      <nav className="p-0 shadow-lg navbar navbar-expand-sm navbar-light">
          <div className="cnavbar-div container-fluid ">
              <Link className="navbar-brand" to="/"><img className="cheader-logo"src={logo} alt="logo"/></Link>
              <button className="me-2 cnavbar-toggler navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarID"
                  aria-controls="navbarID " aria-expanded="false" aria-label="Toggle navigation">
                 <span><GrainIcon/></span>
              </button>
              <div className="collapse navbar-collapse text-center " id="navbarID">
                  
                  <div className="cnavitem-div navbar-nav ">
                      <Link className={`cnav-link nav-link ${location.pathname==="/admin/dashboard"?"active":""}`}  aria-current="page" to="/admin/dashboard"><HomeIcon/> Dashboard</Link>
                  </div>
        
                  <div  className="cnavitem-div navbar-nav">
                      <Link className={`cnav-link nav-link ${location.pathname==="/admin/dashboard/announcement"?"active":""}`} aria-current="page" to="/admin/dashboard/announcement"><NotificationsActiveIcon/>  Announcements</Link>
                  </div>

                  <div className=" cnavitem-div navbar-nav">
                      <Link className={`cnav-link nav-link ${location.pathname==="/admin/dashboard/carousels"?"active":""}`} aria-current="page" to="/admin/dashboard/carousels"><CollectionsIcon/>  Carousels</Link>
                  </div>

                  <div className="cnavitem-div navbar-nav">
                      <Link className={`cnav-link nav-link ${location.pathname==="/admin/dashboard/faculty"?"active":""}`} aria-current="page" to="/admin/dashboard/faculty"><CallIcon/>Faculty</Link>
                  </div>
                  <div className="cnavitem-div navbar-nav">
                    <Link className="btn btn-transperent" to="/" role="button"><LogoutIcon/> Logout</Link>
                    </div>
              </div>
          </div>
      </nav>
  
  
        
  </>
    )}}
    
    export default DashNavbar
    