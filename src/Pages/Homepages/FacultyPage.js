import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";

const StyledCard = styled(Card)({
  maxWidth: 345,
  margin: "1rem",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
});

const StyledCardMedia = styled(CardMedia)({
  height: 200,
});

const SocialLink = ({ link, icon }) => {
  return (
    <IconButton component={Link} href={link} target="_blank" rel="noopener noreferrer">
      {icon}
    </IconButton>
  );
};

function FacultyPage() {
  const [facultyData, setFacultyData] = useState([]);

  useEffect(() => {
    async function fetchFacultyData() {
      const response = await fetch("http://localhost:5000/api/faculty/getfaculty");
      const data = await response.json();
      setFacultyData(data);
    }
    fetchFacultyData();
  }, []);

  return (
    <>
      <Navbar />
      <p style={{backgroundColor:'#1abc9c'}} className="allann container rounded-pill shadow d-flex row justify-content-center  mt-2  btn ">Our Faculty</p>
      <div className="card-container">
        {facultyData.map((faculty) => (
          <StyledCard key={faculty._id}>
            <StyledCardMedia
              component="img"
              image={"http://localhost:5000" + faculty.image.path}
              alt={faculty.name}
            />
            <Box sx={{ p: 2 }}>
              <CardHeader title={faculty.name} />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {faculty.about}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {faculty.post}
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <SocialLink link={faculty.sociallinks[0].facebook} icon={<Facebook />} />
                  <SocialLink link={faculty.sociallinks[0].twitter} icon={<Twitter />} />
                  <SocialLink link={faculty.sociallinks[0].linkedin} icon={<LinkedIn />} />
                  <SocialLink link={faculty.sociallinks[0].instagram} icon={<Instagram />} />
                </Box>
                <Typography variant="body2" color="textSecondary" component="p">
                  {faculty.email}
                </Typography>
              </Box>
            </Box>
          </StyledCard>
        ))}
      </div>
    </>
  );
}

export default FacultyPage;
