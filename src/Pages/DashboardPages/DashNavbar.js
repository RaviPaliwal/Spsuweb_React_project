import React from "react";
import { useLocation, Link } from "react-router-dom";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import logo from "../../Assets/spsulogo.png";
import GrainIcon from "@mui/icons-material/Grain";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CollectionsIcon from "@mui/icons-material/Collections";
import CallIcon from "@mui/icons-material/Call";
import LogoutIcon from "@mui/icons-material/Logout";

const DashNavbar = () => {
  const location = useLocation();
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  if (localStorage.getItem("loggedin") === "true") {
    return (
      <>
        <nav className="p-0 shadow-lg navbar navbar-expand-sm navbar-light">
          <div className="cnavbar-div container-fluid ">
            <Link className="navbar-brand " onClick={handleLogout}
                  role="button">
              <img className="cheader-logo" src={logo} alt="logo" />
              <div className="ctop-container">
                <p className="cp d-block fw-bold">Department of CSE</p>
              </div>
            </Link>
            <button
              className="me-2 cnavbar-toggler navbar-toggler mx-2"
              type="button"
              data-toggle="collapse"
              data-target="#navbarID"
              aria-controls="navbarID "
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span>
                <GrainIcon />
              </span>
            </button>
            <div
              className="collapse navbar-collapse text-center "
              id="navbarID"
            >
              <div className="cnavitem-div navbar-nav ">
                <Link
                  className={`cnav-link nav-link ${
                    location.pathname === "/admin/dashboard" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/admin/dashboard"
                >
                  <HomeIcon /> Dashboard
                </Link>
              </div>

              <div className="cnavitem-div navbar-nav">
                <Link
                  className={`cnav-link nav-link ${
                    location.pathname === "/admin/dashboard/announcement"
                      ? "active"
                      : ""
                  }`}
                  aria-current="page"
                  to="/admin/dashboard/announcement"
                >
                  <NotificationsActiveIcon /> Announcements
                </Link>
              </div>

              <div className=" cnavitem-div navbar-nav">
                <Link
                  className={`cnav-link nav-link ${
                    location.pathname === "/admin/dashboard/carousels"
                      ? "active"
                      : ""
                  }`}
                  aria-current="page"
                  to="/admin/dashboard/carousels"
                >
                  <CollectionsIcon /> Carousels
                </Link>
              </div>

              <div className="cnavitem-div navbar-nav dropdown">
                <button
                  className="cnav-link nav-link dropdown-toggle btn btn-transparent"
                  id="navbarDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  More
                </button>
                <div
                  className="dropdown-menu mt-5"
                  aria-labelledby="navbarDropdown"
                >
                  <div className="cnavitem-div navbar-nav">
                    <Link
                      className={`cnav-link nav-link ${
                        location.pathname === "/admin/dashboard/industrycolab"
                          ? "active"
                          : ""
                      }`}
                      aria-current="page"
                      to="/admin/dashboard/industrycolab"
                    >
                      <BusinessCenterIcon /> Industry Colab
                    </Link>
                  </div>
                  <div className="cnavitem-div navbar-nav">
                    <Link
                      className={`cnav-link nav-link ${
                        location.pathname === "/admin/dashboard/faculty"
                          ? "active"
                          : ""
                      }`}
                      aria-current="page"
                      to="/admin/dashboard/faculty"
                    >
                      <CallIcon />
                      Faculty
                    </Link>
                  </div>
                </div>
              </div>
              <div className="cnavitem-div navbar-nav ms-auto">
                <Link
                  className="text-danger cnav-link btn btn-transperent"
                  onClick={handleLogout}
                  role="button"
                >
                  <LogoutIcon /> Logout
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
};

export default DashNavbar;
