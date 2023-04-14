import React from "react";
import logo from "../../Assets/spsulogo.png";
import { Email, Phone, Facebook, Instagram, LinkedIn, WhatsApp, YouTube } from '@mui/icons-material';

const BottomNavbar = () => {
  return (
    <section id="ContactUs" className="mainbottomnavbardiv shadow-sm" >
      <div className="mt-5 position-sticky">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-4 d-flex justify-content-center">
              <div className="text-center">
                <a href="https://spsu.ac.in/"><img style={{ width: "10rem" }} src={logo} alt="bottom logo" /></a>
                <div className="d-flex flex-row justify-content-center  mt-2 ">
                  <div className="iicon facebook">
                    <a href="https://www.facebook.com/spsuofficial"><Facebook className="icon facebook" /></a>
                  </div>
                  <div className="iicon ">
                    <a href="https://api.whatsapp.com/send?phone=919509627697&text=I+would+like+to+know+more+&utm_source=website&utm_medium=whatsapp"><WhatsApp className="icon whatsapp" /></a>
                  </div>
                  <div className="iicon ">
                    <a href="https://www.linkedin.com/school/spsuofficial/"><LinkedIn className="icon linkedin" /></a>
                  </div>
                  <div className="iicon">
                    <a href="https://www.instagram.com/spsuofficial/"><Instagram className="icon  instagram" /></a>
                  </div>
                  <div className="iicon">
                    <a href="https://www.youtube.com/channel/UC8obPl4D4BCLGEmu9ynvw0Q/featured"><YouTube className="icon  youtube" /></a>
                  </div>
                </div>
                <p className="clgaddress">
                  Udaipur-Chittorgarh Rd, Bhatewar, Rajasthan 313601
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4 col-lg-4 d-flex justify-content-center">
              <div className="pt-2 ps-4 text-center">
                <h5 className="text-primary">Contact Us</h5>
                <ul className="list">
                  <li className="mb-2">
                    <Email className="icon" />
                    <a className="text-decoration-none" href="https://mail.google.com/mail/compose=registrar@spsu.ac.in"><span>registrar@spsu.ac.in</span></a>
                  </li>
                  <li className="">
                    <Phone className="icon" />
                    <span>02957-226095</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4 d-flex justify-content-center">
              <div className="d-flex row text-center ms-2">
                <h5 className="text-primary">Quick Links</h5>
                <p className="text-center col-12 col-sm-12 mb-0 col-md-12 col-lg-12">
                  Academic
                </p>
                <p className=" text-center col-12 col-sm-12 mb-0 col-md-12 col-lg-12">News</p>
                <p className="text-center col-12 col-sm-12 mb-0 col-md-12 col-lg-12">
                  <a className="Research_position text-decoration-none text-dark" href="/">
                    Research
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomNavbar;
