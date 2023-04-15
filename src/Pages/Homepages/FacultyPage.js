import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Facebook, Twitter, LinkedIn, Instagram,MailOutline, EmojiObjects } from "@mui/icons-material";

const StyledCard = styled(Card)({
  maxWidth: 345,
  margin: "1rem",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.04)",
    
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
      const response = await fetch("http://34.125.182.92/api/faculty/getfaculty");
      const data = await response.json();
      setFacultyData(data);
    }
    fetchFacultyData();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '10px' , }}>
      <h4 style={{ color:"#595757"}}>Our Faculty</h4>
    </div>
      <div className="card-container d-flex flex-wrap justify-content-center">
        {facultyData.map((faculty) => (
          <StyledCard key={faculty._id} style={{width:"auto"}}>
            <StyledCardMedia
              style={{objectFit:"fill", height:"300px",objectPosition:"center"}}
              component="img"
              image={"http://34.125.182.92" + faculty.image.path}
              alt={faculty.name}
            />
            <Box className="text-center">
              <CardContent>
            <Typography gutterBottom variant="h5" className="text-center" component="div">
              {faculty.name}
              </Typography>
                <Typography variant="subtitle2" className="text-success" component="div">
                  {faculty.post}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="div">
                  {faculty.about}
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", justifyContent: "center" ,pb:1 }}>
                <Box>
                  {faculty.sociallinks[0].linkedin&&<SocialLink link={faculty.sociallinks[0].linkedin} icon={<LinkedIn className="linkedin" />} />}
                  {faculty.sociallinks[0].gmail&&<SocialLink link={`mailto:${faculty.sociallinks[0].gmail}`} icon={<MailOutline className="text-success" />} />}
                  {faculty.sociallinks[0].facebook&&<SocialLink link={faculty.sociallinks[0].facebook} icon={<Facebook className="facebook" />} />}
                  {faculty.sociallinks[0].twitter&&<SocialLink link={faculty.sociallinks[0].twitter} icon={<Twitter className="facebook" />} />}
                  {faculty.sociallinks[0].vidvan&&<SocialLink link={faculty.sociallinks[0].vidvan} icon={<EmojiObjects style={{color:"#0c3e52"}} />} />}
                  {faculty.sociallinks[0].instagram&&<SocialLink link={faculty.sociallinks[0].instagram} icon={<Instagram className="instagram" />} />}
                </Box>
                <Typography variant="body2" color="textSecondary" component="div">
                  {faculty.sociallinks[0].email}
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
