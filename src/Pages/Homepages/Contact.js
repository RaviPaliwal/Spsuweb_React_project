import React, { useState,useContext } from "react";
import Navbar from "./Navbar";
import Typography from "@mui/material/Typography";
import BottomNavbar from "./BottomNavbar";
import AlertContext from "../../Contexts/Alert/alertContext";
import Notification from "../Notification";



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

    let response = await fetch("http://localhost:5000/api/contactus/addreq", { 
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  };


  return (
    <>
      <Notification/>
      <Navbar />
      <div className="p-0 h-auto cuscontainer d-flex justify-content-between align-content-lg-stretch w-75">
        <iframe
          title="Spsumap"
          className="col-5 col-md-5 col-sm-5"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.1689253540117!2d73.98915224974307!3d24.617862060924633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967dab8684f4033%3A0x9e4dcab2363862c!2sSir%20Padampat%20Singhania%20University!5e0!3m2!1sen!2sin!4v1680434570783!5m2!1sen!2sin"
          style={{ borderRadius: "10px 0px 0px 10px " }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

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
            <input
              onKeyDown={handleKeyDown}
              className="cip"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              onKeyDown={handleKeyDown}
              className="cip"
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              onKeyDown={handleKeyDown}
              className="cip"
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            <textarea
              className="cip"
              name="message"
              rows="5"
              value={formData.message}
              placeholder="Message"
              onChange={handleChange}
            />
            <button type="submit" onSubmit={handleSubmit} className="cusbtn mb-3 mt-3 col-5 btn">
              Send
            </button>
          </form>
        </div>
      </div>
      <BottomNavbar /></>
  );
};

export default Contact;
