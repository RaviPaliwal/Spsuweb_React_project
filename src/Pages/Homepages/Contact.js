import React, { useState, useContext } from "react";
import Navbar from "./Navbar";
import Typography from "@mui/material/Typography";
import BottomNavbar from "./BottomNavbar";
import AlertContext from "../../Contexts/Alert/alertContext";
import Notification from "../Notification";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from "@mui/material";

const Contact = () => {
  const ac = useContext(AlertContext)
  const {update}= ac
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify(formData);

    let response = await fetch("http://34.125.182.92/api/contactus/addreq", { 
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.json();
    update(data.message)

    // Clear form fields after submit
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };




  return (
    <>
      <Notification/>
      <Navbar />
      <div className="d-flex justify-content-center">

        <div className="contact-form col-7 col-md-7 col-sm-7">
          <Typography
            className="text-center mb-3 mt-4 text-success"
            variant="h5"
          >
            Contact Us
          </Typography>
          <form
            className="d-flex flex-wrap justify-content-center"
            onSubmit={handleSubmit}
          >
            <TextField
              style={{maxWidth:"28rem"}}
              label="Name"
              variant="outlined"
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              style={{maxWidth:"28rem"}}
              label="Email"
              variant="outlined"
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              style={{maxWidth:"28rem"}}
              label="Phone"
              variant="outlined"
              margin="normal"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              style={{maxWidth:"28rem"}}
              className="col-12"
              label="Message"
              margin="normal"
              name="message"
              fullWidth
              value={formData.message}
              placeholder="Message"
              onChange={handleChange}
            />
            <Button variant='contained' color='primary' type="submit" onSubmit={handleSubmit} className="mb-3 mt-3 col-5">
              Send
            </Button>
          </form>
        </div>
      </div>

      <div className="container-sm text-center w-75">
      <Box
      component="iframe"
      title="Spsumap"
      sx={{
        borderRadius: '10px 10px 10px 10px',
        width: '100%',
        height: '400px',
        '@media (min-width: 768px)': {
          display: "flex",
          flexDirection:"row",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          width: "100%",
        },
      }}
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.1689253540117!2d73.98915224974307!3d24.617862060924633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967dab8684f4033%3A0x9e4dcab2363862c!2sSir%20Padampat%20Singhania%20University!5e0!3m2!1sen!2sin!4v1680434570783!5m2!1sen!2sin"
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    /></div>

      
      <BottomNavbar /></>
  );
};

export default Contact;
