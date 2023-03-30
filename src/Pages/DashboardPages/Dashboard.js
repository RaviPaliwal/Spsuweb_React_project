import React from "react";
import AccessDenied from "./AccessDenied";
import DashNavbar from "./DashNavbar";

const Dashboard = () => {
  if (localStorage.getItem("loggedin") === "true") {
    return (
      <>
        <DashNavbar />
      </>
      // main Dashboard Code
    );
  } else {
    return <AccessDenied />;
  }
};
export default Dashboard;
