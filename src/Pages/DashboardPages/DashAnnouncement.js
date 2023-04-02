import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../Contexts/Alert/alertContext";
import Loader from "../Homepages/Loader";
import DashNavbar from "./DashNavbar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
const DashAnnouncement = () => {
  const [loaderprop, setloaderprop] = useState(false);
  const Ac = useContext(AlertContext);
  const { update } = Ac;
  const [title, settitle] = useState("");
  const [info, setinfo] = useState("");
  const [Ann, setAnn] = useState([]);
  const [callit, setit] = useState(null);
  const [selected, setselected] = useState([]);

  const getAnn = async () => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let response = await fetch(
      "http://127.0.0.1:5000/api/announcement/getall",
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
      let response = await fetch("http://localhost:5000/api/announcement/add", {
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

  const handleDelete = async (e) => {
    e.preventDefault();
    setloaderprop(true);
    selected.map(async (dtitle) => {
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      };
      let bodycontent = JSON.stringify({
        title: dtitle,
      });
      let response = await fetch(
        "http://localhost:5000/api/announcement/deletebytitle",
        {
          method: "POST",
          headers: headersList,
          body: bodycontent,
        }
      );
      let data = await response.text();
      setit(Date.now());
      update(data);
    });
    setloaderprop(false);
  };

  //   const  handleDeletebyMonthYear =async (e)=>{
  //     e.preventDefault();
  //     let headersList = {
  //         "Accept": "*/*",
  //         "Content-Type": "application/json",
  //         "auth-token": localStorage.getItem("auth-token")
  //     }

  //        let response = await fetch("http://localhost:5000/api/announcement/deletebymonth-year/"+month, {
  //          method: "POST",
  //          headers: headersList,
  //        });

  //        let data = await response.text();
  //        update(data);
  //       setit(Date.now());

  // }

  const handleselected = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      let data = selected;
      data.push(value);
      setselected(data);
    } else if (!checked) {
      let data = selected;
      for (let index = 0; index < data.length; index++) {
        if (data[index] === value) {
          data.splice(index, 1);
          index--;
        }
      }
      setselected(data);
    }
    //console.log(selected);
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
        <div className="row">
          <div className="col-md-6">
            <form
              style={{
                width: "350px",
                height: "400px",
                backgroundColor: "#E8F0FE",
              }}
              className=" shadow-lg container py-5 px-3 rounded-3 mt-5"
            >
              <div className="mb-3">
                <h5 className="text-center" style={{ color: "#DC4157" }}>
                  Add Announcement
                </h5>
                <label className="form-label">Title</label>
                <input
                  onChange={(e) => {
                    settitle(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputText"
                  aria-describedby="textHelp"
                />
                <div id="emailHelp" className="form-text">
                  Dont Use Duplicate Which Already Exists on Website
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Announcement</label>
                <input
                  onChange={(e) => {
                    setinfo(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputText"
                  aria-describedby="textHelp"
                />
              </div>
              <div className="col d-flex justify-content-center">
                <button
                  onClick={handleAdd}
                  type="submit"
                  className="row btn btn-primary btn"
                >
                  Add
                </button>
              </div>
            </form>
          </div>

          <div className="col-md-6">
            <form
              style={{
                width: "350px",
                height: "400px",
                backgroundColor: "#E8F0FE",
              }}
              className=" shadow-lg container py-5 px-3 rounded-3 mt-5"
            >
              <div className="mb-3">
                <h5 className="text-center" style={{ color: "#DC4157" }}>
                  Delete Announcement
                </h5>
                <hr className="mb-3" />

                <div
                  className="d-flex flex-column overflow-scroll"
                  style={{ height: "15rem", overflowX: "hidden" }}
                >
                  {Ann.map((e) => {
                    return (
                      <>
                        <div key={e._id} className="col-12 form-check">
                          <input
                            onChange={handleselected}
                            className=" ps-1 form-check-input"
                            type="checkbox"
                            value={e.title}
                            id="flexCheckDefault"
                          />
                          <p className="overflowcut">{e.title}</p>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="col d-flex justify-content-center">
                <button
                  onClick={handleDelete}
                  type="submit"
                  className="row btn btn-primary btn"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
};
export default DashAnnouncement;
