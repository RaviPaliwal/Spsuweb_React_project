import React from "react";
import Navbar from "./Navbar";
import Typography from "@mui/material/Typography";
import BottomNavbar from "./BottomNavbar";
const Contact = () => {
  return (
    <>
      <Navbar />
      <div class="p-0  h-auto cuscontainer d-flex justify-content-between align-content-lg-stretch w-75">
        <iframe
          title="Spsumap"
          className=" col-5 col-md-5 col-sm-5 "
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.1689253540117!2d73.98915224974307!3d24.617862060924633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967dab8684f4033%3A0x9e4dcab2363862c!2sSir%20Padampat%20Singhania%20University!5e0!3m2!1sen!2sin!4v1680434570783!5m2!1sen!2sin"
          style={{ borderRadius: "10px 0px 0px 10px " }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>

        <div class="contact-form col-7 col-md-7 col-sm-7">
          <Typography
            className="text-center mb-3 mt-4 text-success"
            variant="h5"
          >
            Contact Us
          </Typography>
          <form className="d-flex flex-wrap justify-content-center">
            <input className="cip" type="text" name="name" placeholder="Name" />
            <input
              className="cip"
              type="email"
              name="e-mail"
              placeholder="E-mail"
            />
            <input
              className="cip"
              type="tel"
              name="phone"
              placeholder="Phone Number"
            />
            <textarea
              className="cip"
              name="text"
              id=""
              rows="5"
              placeholder="Message"
            ></textarea>
            <button type="submit" className="cusbtn mb-3 mt-3 col-5 btn">
              Send{" "}
            </button>
          </form>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default Contact;
