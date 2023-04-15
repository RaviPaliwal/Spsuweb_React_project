import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  CardMedia,
  CardContent,
  Card,
  CardActions,
} from "@mui/material";
import DashNavbar from "./DashNavbar";
import Notification from "../Notification";
import AlertContext from "../../Contexts/Alert/alertContext";
import Loader from "../Homepages/Loader";
import AccessDenied from "./AccessDenied";


const DashIndustryColab = () => {
  const ac  = useContext(AlertContext)
  const {update} = ac;
  const [industryCollaborations, setIndustryCollaborations] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [getdata, setgetdata] = useState(0);

  useEffect(() => {
    fetch("http://34.125.182.92/api/industry-colaborations")
      .then((response) => response.json())
      .then((data) => setIndustryCollaborations(data))
      .catch((error) => console.error(error));
  }, [getdata]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleAddIndustryCollaboration = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    fetch("http://34.125.182.92/api/industry-colaborations", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        update(data.msg)
        setgetdata(getdata+1);
      })
      .catch((error) => console.error(error));
    setTitle("");
    setDescription("");
    setImage(null);
  };

  const handleDeleteIndustryCollaboration = (title) => {
    fetch("http://34.125.182.92/api/industry-colaborations", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => response.json())
      .then((data) => {
        update(data.msg)
        const updatedIndustryCollaborations = industryCollaborations.filter(
          (industryCollaboration) => industryCollaboration.title !== title
        );
        setIndustryCollaborations(updatedIndustryCollaborations);
      })
      .catch((error) => console.error(error));
  };
if(localStorage.getItem("loggedin") === "true"){
  return (
    <>
      <Notification />
      <Loader open={false} />
      <DashNavbar />
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Industry Collaborations
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={handleTitleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              multiline
              rows={5}
              fullWidth
              label="Description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </Grid>
          <Grid item xs={12}>
            <input className="custom-file-upload" type="file" accept="image/*" onChange={handleImageChange} />
            <p className="formnote">Better if you add image of Ratio 1:1 or 300X300</p>
          
          </Grid>
          <Grid item xs={12}>
            <Button
              sx={{ mb: "2rem" }}
              variant="contained"
              onClick={handleAddIndustryCollaboration}
            >
              Add Industry Collaboration
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={5}>
          {industryCollaborations.map((industryCollaboration) => (
            <Grid item xs={12} md={6} lg={4} key={industryCollaboration._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {industryCollaboration.image && (
                  <CardMedia
                    className="text-center"
                    sx={{ width: "150px", mt: "15px", ml: "10px" }}
                    component="img"
                    image={`http://34.125.182.92${industryCollaboration.image.path}`}
                    alt={industryCollaboration.title}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {industryCollaboration.title}
                  </Typography>
                  <Typography
                    style={{
                      width: "100%",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {industryCollaboration.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="error"
                    onClick={() =>
                      handleDeleteIndustryCollaboration(
                        industryCollaboration.title
                      )
                    }
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );  
}
else{
  return(
    <AccessDenied/>
  )
}
};
export default DashIndustryColab;
