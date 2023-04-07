import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import "./NB.css"
import logo from "../../Assets/spsu_logo_2.png"
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CallIcon from '@mui/icons-material/Call';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GrainIcon from '@mui/icons-material/Grain';

const Navbar = () => {
const location = useLocation();
return (
      <>

    <nav className=" container-fluid p-0 shadow-lg navbar navbar-expand-sm navbar-light sticky-top">
        <div className="shadow-lg cnavbar-div container-fluid ">
        
            <Link className="navbar-brand " to="/"><img className="cheader-logo"src={logo} alt="logo"/><div className="ctop-container">
            <p className="cp d-block fw-bold">Department of CSE</p>
        </div></Link>
            <button className="me-2 navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarID"
                aria-controls="navbarID" aria-expanded="false" aria-label="Toggle navigation">
               <span><GrainIcon/></span>
            </button>
            <div className="collapse navbar-collapse text-center" id="navbarID">

                <div className="cnavitem-div navbar-nav ">
                    <Link className={`cnav-link nav-link ${location.pathname==="/"?"active":""}`}  aria-current="page" to="/"><HomeIcon/>  Home</Link>
                </div>

                <div  className="cnavitem-div navbar-nav">
                    <Link className={`cnav-link nav-link ${location.pathname==="/about"?"active":""}`} aria-current="page" to="/about"><InfoIcon/>  About</Link>
                </div>

                <div  className="cnavitem-div navbar-nav">
                    <Link className={`cnav-link nav-link ${location.pathname==="/announcements"?"active":""}`} aria-current="page" to="/announcements"><NotificationsActiveIcon/>  Announcements</Link>
                </div>


                <div className=" cnavitem-div navbar-nav">
                    <Link className={`cnav-link nav-link ${location.pathname==="/curriculum"?"active":""}`} aria-current="page" to="/curriculum"><CalendarTodayIcon/>  Curriculam</Link>
                </div>


                <div className="cnavitem-div navbar-nav">
                    <Link className={`cnav-link nav-link ${location.pathname==="/contact"?"active":""}`} aria-current="page" to="/contact"><CallIcon/>  Contact us</Link>
                </div>

                <div className="cnavitem-div navbar-nav ms-auto">
                  <Link className=" cnav-link nav-link btn-transperent" to="/admin/login" role="button"><AdminPanelSettingsIcon className='text-primary' />Login</Link>
                </div>
            </div>
        </div>
    </nav>


      
</>
  )}
  
  export default Navbar
  