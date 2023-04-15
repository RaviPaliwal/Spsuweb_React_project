import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../Contexts/Alert/alertContext";
import Loader from "../Homepages/Loader";
import DashNavbar from "./DashNavbar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DeleteAnnouncement from "./DeleteAnnouncement";
import NewsManagement from "./NewsManagement";
import { Box, Button, Container, TextField } from "@mui/material";
import AccessDenied from "./AccessDenied";

const DashAnnouncement = () => {
  const [loaderprop, setloaderprop] = useState(false);
  const Ac = useContext(AlertContext);
  const { update } = Ac;
  const [title, settitle] = useState("");
  const [info, setinfo] = useState("");
  const [Ann, setAnn] = useState([]);
  const [callit, setit] = useState(null);
  const getAnn = async () => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let response = await fetch(
      "http://34.125.182.92/api/announcement/getall",
      {
        method: "GET",
        headers: headersList,
      }
    );
    let data = await response.json();
    //console.log(data);
    setAnn(data);
  };
  useEffect(() => {
    getAnn();
  }, [callit]);

  const handleAdd = async (e) => {
    try {
      e.preventDefault();
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      };

      let bodyContent = JSON.stringify({
        title: title.trim(),
        info: info,
      });
      setloaderprop(true);
      let response = await fetch("http://34.125.182.92/api/announcement/add", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });
      //close Loader and Show Message
      setloaderprop(false);
      const data = await response.json();
      if (data["responce"] === undefined) {
        update("Some Error Occurd....");
      } else {
        update(data["responce"]);
      }
      if (data["responce"] === "Announcement Added Successfully") {
        setit(Date.now());
      }
    } catch (e) {
      update(e.msg);
    }
  };

  if (localStorage.getItem("loggedin") === "true") {
    return (
      <>
        <Loader open={loaderprop} />
        <DashNavbar />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              News And Announcement Management
            </Typography>
          </Toolbar>
        </AppBar>

      <Container maxWidth="sm">
      <Box
          component="form"
          onSubmit={handleAdd}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 4,
          }}
        >
          <div className="mt-2 text-center">
            <h3>Add Announcement</h3>
            <p>Add The Announcements Here</p>
          </div>
          <TextField
            label="Title"
            required
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
          <TextField
            required
            label="Announcement"
            variant="outlined"
            fullWidth
            margin="normal"
            value={info}
            onChange={(e) => setinfo(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ alignSelf: "center", mt: 3 }}
          >
            Add Announcement
          </Button>
          
        </Box>
      </Container>
        

        <DeleteAnnouncement Ann={Ann} setAnn={setAnn} />
        <NewsManagement/>
      </>
    );
  }
  else{
    return(
      <AccessDenied/>
    )
  }
};
export default DashAnnouncement;
