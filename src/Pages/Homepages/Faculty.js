import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  IconButton,
  Typography,
  Link,
} from "@mui/material";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Instagram,
  Facebook,
  Twitter,
  LinkedIn,
  MailOutline,
  EmojiObjects,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const FacultyPage = () => {
  const [faculty, setFaculty] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const numCards = 3; // Number of cards to display at once
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch("http://34.125.182.92/api/faculty/getfaculty")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFaculty(data);
          //console.log(data);
        } else {
          //console.log("Error: response data is not an array");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        //console.log(error);
        setIsLoading(false);
      });
  }, []);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + numCards < faculty.length ? prevIndex + numCards : 0
    );
  };
  const SocialLink = ({ link, icon }) => {
    return (
      <IconButton
        component={Link}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {icon}
      </IconButton>
    );
  };

  const navigate = useNavigate();
  const readmore = () => {
    navigate("/faculty");
  };
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - numCards >= 0
        ? prevIndex - numCards
        : faculty.length - numCards
    );
  };

  return (
    <>
      <h2 className="text-center mb-4" style={{ color: "#52616b" }}>
        Our Faculty
      </h2>
      <Grid
        className="mb-5"
        container
        justifyContent="center"
        alignItems="center"
      >
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Grid item xs={1}>
              <IconButton onClick={handlePrevClick}>
                <ChevronLeft />
              </IconButton>
            </Grid>
            <Grid item xs={10}>
              <Grid container justifyContent="center" alignItems="center">
                {faculty
                  .slice(currentIndex, currentIndex + numCards)
                  .map((facultyMember) => (
                    <Grid item key={facultyMember._id}>
                      <Card sx={{ width: 300, maxWidth: 480, mx: 2, my: 2 }}>
                        <CardMedia
                          component="img"
                          height="350"
                          className=" align-content-center w-100"
                          image={
                            "http://34.125.182.92" + facultyMember.image.path
                          }
                          alt={facultyMember.name + " Image"}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            className="text-center"
                          >
                            {facultyMember.name}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            className="text-success text-center"
                          >
                            {facultyMember.post}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className="text-center"
                          >
                            {facultyMember.about}
                          </Typography>
                          <Box sx={{ mt: 1 }} className="text-center" display="flex" justifyContent="center">
  <Box>
    {facultyMember.sociallinks[0].linkedin && (
      <SocialLink
        link={facultyMember.sociallinks[0].linkedin}
        icon={<LinkedIn className="linkedin" />}
      />
    )}
    {facultyMember.sociallinks[0].gmail && (
      <SocialLink
        link={`mailto:${facultyMember.sociallinks[0].gmail}`}
        icon={<MailOutline className="text-success" />}
      />
    )}
    {facultyMember.sociallinks[0].facebook && (
      <SocialLink
        link={facultyMember.sociallinks[0].facebook}
        icon={<Facebook className="facebook" />}
      />
    )}
    {facultyMember.sociallinks[0].twitter && (
      <SocialLink
        link={facultyMember.sociallinks[0].twitter}
        icon={<Twitter className="facebook" />}
      />
    )}
    {facultyMember.sociallinks[0].vidvan && (
      <SocialLink
        link={facultyMember.sociallinks[0].vidvan}
        icon={<EmojiObjects style={{ color: "#0c3e52" }} />}
      />
    )}
    {facultyMember.sociallinks[0].instagram && (
      <SocialLink
        link={facultyMember.sociallinks[0].instagram}
        icon={<Instagram className="instagram" />}
      />
    )}
  </Box>
  <Typography
    variant="body2"
    color="textSecondary"
    component="div"
  >
    {facultyMember.sociallinks[0].email}
  </Typography>
</Box>

                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={handleNextClick}>
                <ChevronRight />
              </IconButton>
            </Grid>
            <div className=" d-flex justify-content-center">
              <Button
                onClick={readmore}
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
              >
                Read More
              </Button>
            </div>
          </>
        )}
      </Grid>
    </>
  );
};

export default FacultyPage;
