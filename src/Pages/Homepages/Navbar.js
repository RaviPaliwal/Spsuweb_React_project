import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./NB.css";
import logo from "../../Assets/spsulogo.png";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CallIcon from "@mui/icons-material/Call";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GrainIcon from "@mui/icons-material/Grain";
import { CloudDownloadSharp, Person, Watch } from "@mui/icons-material";
import { CalendarMonth } from "@mui/icons-material";
const Navbar = () => {
  const location = useLocation();
  return (
    <>
      <nav className=" container-fluid p-0 shadow-lg navbar navbar-expand-sm navbar-light sticky-top">
        <div className="shadow-lg cnavbar-div container-fluid ">
          <Link className="navbar-brand " to="/">
            <img className="cheader-logo" src={logo} alt="logo" />
            <div className="ctop-container">
              <p className="cp d-block fw-bold">Department of CSE</p>
            </div>
          </Link>
          <button
            className="me-2 navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarID"
            aria-controls="navbarID"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <GrainIcon />
            </span>
          </button>
          <div className="collapse navbar-collapse text-center" id="navbarID">
            <div className="cnavitem-div navbar-nav ">
              <Link
                className={`cnav-link nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                <HomeIcon /> Home
              </Link>
            </div>

            <div className="cnavitem-div navbar-nav">
              <Link
                className={`cnav-link nav-link ${
                  location.pathname === "/announcements" ? "active" : ""
                }`}
                aria-current="page"
                to="/announcements"
              >
                <NotificationsActiveIcon />
                News
              </Link>
            </div>

            <div className="cnavitem-div navbar-nav">
              <Link
                className={`cnav-link nav-link ${
                  location.pathname === "/contact" ? "active" : ""
                }`}
                aria-current="page"
                to="/contact"
              >
                <CallIcon />
                Contact
              </Link>
            </div>

            <div className="cnavitem-div navbar-nav dropdown">
              <button
                type="button"
                className="cnav-link nav-link  cnavdropbtn"
                id="navbarDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <CloudDownloadSharp />
                Downloads
              </button>
              <div
                style={{ marginTop: "5rem", overflow:"clip" }}
                className="dropdown-menu"
                aria-labelledby="navbarDropdown"
              >
                <div className="cnavitem-div navbar-nav">
                  <Link
                    target="_blank"
                    className={`cnav-link nav-link text-center`}
                    aria-current="page"
                    to="http://34.125.182.92/pdfs/TimeTable.pdf"
                  >
                    <Watch className="me-2" />
                    Time Table
                  </Link>
                </div>

                <div className="cnavitem-div navbar-nav">
                  <Link
                    target="_blank"
                    style={{fontSize:"10px"}}
                    className={`cnav-link nav-link text-center `}
                    aria-current="page"
                    to="http://34.125.182.92/pdfs/AcademicCalendar.pdf"
                  >
                    <CalendarMonth className="me-1 row ps-1" />
                    Academic Calendar
                  </Link>
                </div>
              </div>
            </div>

            <div className="cnavitem-div navbar-nav dropdown">
              <button
                type="button"
                className="cnav-link nav-link  cnavdropbtn "
                id="navbarDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                More
              </button>
              <div
                style={{ marginTop: "4.3rem" }}
                className="dropdown-menu "
                aria-labelledby="navbarDropdown"
              >
                <div className="cnavitem-div navbar-nav">
                  <Link
                    className={`cnav-link nav-link text-center ${
                      location.pathname === "/faculty" ? "active" : ""
                    }`}
                    aria-current="page"
                    to="/faculty"
                  >
                    <Person />
                    Faculty
                  </Link>
                </div>
                <div className="cnavitem-div navbar-nav">
                  <Link
                    className={`cnav-link nav-link text-center ${
                      location.pathname === "/about" ? "active" : ""
                    }`}
                    aria-current="page"
                    to="/about"
                  >
                    <InfoIcon /> About
                  </Link>
                </div>
              </div>
            </div>

            <div className="cnavitem-div navbar-nav ms-auto">
              <Link
                className=" cnav-link nav-link btn-transperent"
                to="/admin/login"
                role="button"
              >
                <AdminPanelSettingsIcon className="text-primary" />
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
