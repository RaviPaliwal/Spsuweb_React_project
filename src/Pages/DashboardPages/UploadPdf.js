import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import Loader from '../Homepages/Loader'

function UploadPdf({update}) {
  const [load, setload]=useState(false)
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTitleSelect = (event) => {
    setSelectedTitle(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setload(true);
    if (!selectedFile || !selectedTitle) {
      alert("Please select a file and a title to upload");
      return;
    }

    const formData = new FormData();
    formData.append("title", selectedTitle);
    formData.append("pdf", selectedFile);
    setload(true);
    fetch("http://34.125.182.92/api/pdf/add", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        setload(false);
        if (response.ok) {
          update("File uploaded successfully")
        } else {
          update("Error Uploading File")
        }
      })
      .catch((error) => {
        update("Error uploading file");
      });
  };

  return (<>
    <Loader open={load}/>
    <Container
      style={{
        paddingTop: 16,
        paddingBottom: 16,
      }}
    >
      <div className="mt-5 text-center">
        <h2>Upload Files</h2>
        <p>From Here You Can Manage Various Files On Site:</p>
      </div>
      <Paper
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 16,
          borderRadius: 8,
          width: "100%",
          maxWidth: 600,
          margin: "auto",
        }}
      >
        <form
          style={{
            width: "100%",
            marginTop: 16,
          }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Select
                style={{
                  margin: "8px 0",
                  width: "100%",
                }}
                label="Title"
                name="title"
                variant="outlined"
                value={selectedTitle}
                onChange={handleTitleSelect}
                required
              >
                <MenuItem value="">Select a File To Upload</MenuItem>
                <MenuItem value="AcademicCalendar">AcademicCalendar</MenuItem>
                <MenuItem value="TimeTable">TimeTable</MenuItem>
                <MenuItem hidden value="Other">Other</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <input
            style={{
              margin: "8px 0",
              width: "100%",
            }}
            type="file"
            name="file"
            onChange={handleFileSelect}
          />
          <Button
            style={{
              margin: "24px 0 8px",
              width: "100%",
            }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
    </>
  );
}

export default UploadPdf;
