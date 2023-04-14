import React from "react";
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "./Navbar";
import BottomNavbar from "./BottomNavbar"
import image from "../../Assets/softwareengineer.svg"
const Jumbotron = styled("div")({
  backgroundColor: "inherit",
  padding: "2rem",
  marginBottom: "2rem",
});

const About = () => {
  return (
    <>
      <Navbar />
      <Container className="mt-3" maxWidth="lg" >
        <Jumbotron style={{ color: "#5f6178" }}> 
        <div className="text-center">
            <img src={image} alt="Computer" className="w-50" />
        </div>
          <Typography variant="h5" gutterBottom className="text-success">
            <b><center>About Us</center></b>
          </Typography>
          <Typography variant="body1" >
            Welcome to the Department of Computer Science and Engineering at
            SPSU! Our department is a premier destination for students who
            aspire to pursue their careers in the field of computer science and
            engineering. We offer a rigorous and challenging curriculum that is
            designed to equip our students with the knowledge and skills needed
            to succeed in the dynamic and ever-evolving world of technology. One
            of our key strengths is our strong industry collaborations with
            leading companies such as Xebia, Intel, TCS ION, IBM, and many more.
            These collaborations provide our students with the opportunity to
            work on real-world projects, gain practical experience, and develop
            a deep understanding of industry practices and standards.
          </Typography>

          <Typography variant="body1" style={{ marginTop: "1rem" }}>
            Our dedicated faculty members are experts in their respective fields
            and are committed to providing our students with a supportive and
            intellectually stimulating environment. They work tirelessly to
            ensure that our students receive a world-class education that
            prepares them for a wide range of career paths, including software
            development, data analysis, cybersecurity, artificial intelligence,
            and more.
          </Typography>

          <Typography variant="body1" style={{ marginTop: "1rem" }}>
            At the Department of Computer Science and Engineering, we are
            passionate about fostering a culture of innovation, creativity, and
            excellence. We strive to provide our students with a transformative
            learning experience that empowers them to become leaders in their
            field and make a positive impact on society. We invite you to join
            us on this exciting journey of discovery and growth.
          </Typography>
        </Jumbotron>
      </Container>
      <BottomNavbar/>
    </>
  );
};

export default About;
