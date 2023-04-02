import React, { useContext, useState, useEffect } from "react";
import AlertContext from "../../Contexts/Alert/alertContext";
import { TextField, Button, Grid, Box, Typography, AppBar, Toolbar } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Loader from "../Homepages/Loader";
import DashNavbar from "./DashNavbar";

const useStyles = createTheme((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const DashCarousel = () => {
  const [slideselected, setslideselected] = useState([]);
  const [refresh, setrefresh] = useState(null);
  const [images, setImages] = useState([]);
  const Ac = useContext(AlertContext);
  const { update } = Ac;
  const classes = useStyles;
  const [formData, setFormData] = useState({
    title: "",
    info: "",
    image: null,
  });
  const [loaderprop, setloaderprop] = useState(false);

  function handleImageSelect(e) {
    const { value, checked } = e.target;
    if (checked) {
      let data = slideselected;
      data.push(value);
      setslideselected(data);
    } else if (!checked) {
      let data = slideselected;
      for (let index = 0; index < data.length; index++) {
        if (data[index] === value) {
          data.splice(index, 1);
          index--;
        }
      }
      setslideselected(data);
    }
    //console.log(slideselected);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let headersList = {
      Accept: "*/*",
      "auth-token": localStorage.getItem("auth-token"),
    };

    let bodyContent = new FormData();
    bodyContent.append("title", formData.title);
    bodyContent.append("info", formData.info);
    bodyContent.append("image", formData.image);

    let response = await fetch("http://localhost:5000/api/carousel/addslide", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    let data = await response.json();
    //console.log(data);
    update(data.responce);
    setrefresh(Date.now());
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileInputChange = (event) => {
    const f = event.target.files[0];
    //console.log(f);
    setFormData((prevState) => ({
      ...prevState,
      image: f,
    }));
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setloaderprop(true);
    slideselected.map(async (dtitle) => {
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      };
      let bodycontent = JSON.stringify({
        title: dtitle,
      });
      setloaderprop(true);
      let response = await fetch(
        "http://localhost:5000/api/carousel/deleteslidebytitle",
        {
          method: "POST",
          headers: headersList,
          body: bodycontent,
        }
      );
      let data = await response.json();
      setrefresh(Date.now());
      setloaderprop(false);
      update(data.responce);
      let slidearr = slideselected;
      setslideselected(slidearr.pop(dtitle));
    });
    setloaderprop(false);
  };

  useEffect(() => {
    // Fetch image URLs from API
    fetch("http://localhost:5000/api/carousel/getslides")
      .then((response) => response.json())
      .then((data) => setImages(data));
  }, [refresh]);

  if (localStorage.getItem("loggedin") === "true") {
    return (
      <>
        <DashNavbar/>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Carousel Management
            </Typography>
          </Toolbar>
        </AppBar>
        <Loader open={loaderprop} />
        
        <div className="row justify-content-center">
          {/* Add Form */}
          <form
            className={`${classes.root} col-md-6`}
            onSubmit={handleFormSubmit}
          >
            <Box
              sx={{
                backgroundColor: "#E8F0FE",
                mt: 5,
                mx: "auto",
                px: 3,
                py: 2,
                border: "1px solid #ccc",
                borderRadius: 4,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                width: 350,
                height: 500,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" align="center" mb={2}>
                    Add Slide
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mb-2 w-75"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Info"
                    name="info"
                    value={formData.info}
                    onChange={handleInputChange}
                    className="mb-2 w-75"
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    className="border w-75"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                    accept="image/*"
                    id="image-file-upload"
                    required
                    name="image"
                    type="file"
                    onChange={handleFileInputChange}
                  />
                </Grid>

                <Grid item xs={12}></Grid>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={`${classes.submitButton}`}
                sx={{ marginTop: "9rem" }}
              >
                Add Slide
              </Button>
            </Box>
          </form>

          {/* Delete form */}
          <form
            className={`${classes.root} col-md-6`}
            onSubmit={handleFormSubmit}
          >
            <Box
              sx={{
                backgroundColor: "#E8F0FE",
                mt: 5,
                mx: "auto",
                px: 1,
                py: 2,
                mb: 5,
                border: "1px solid #ccc",
                borderRadius: 4,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: 350,
                height: 500,
              }}
            >
              <Typography
                variant="h5"
                align="center"
                mb={2}
                className="mt-1 position-sticky-top"
              >
                Delete Slides
              </Typography>

              <div className="py-3 container overflow-scroll">
                <div className=" row justify-content-center">
                  {images.map((e) => (
                    <div key={e._id} className=" col-md-12  mb-3">
                      <img
                        src={"http://localhost:5000" + e.image.path}
                        alt={`${e.title}`}
                        className="img-fluid w-75 rounded-4 overflow-scroll h-auto"
                      />
                      <div key={e._id} className=" form-check">
                        <input
                          onChange={handleImageSelect}
                          className=" ps-1 form-check-input"
                          type="checkbox"
                          value={e.title}
                          id="flexCheckDefault"
                        />
                        <p className="overflowcut">{e.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={`${classes.submitButton} mt-2 mb-2`}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Box>
          </form>
        </div>
      </>
    );
  }
};

export default DashCarousel;
