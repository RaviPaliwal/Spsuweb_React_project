import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Grid, IconButton, Link, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const FacultyPage = () => {
  const [faculty, setFaculty] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const numCards = 3; // Number of cards to display at once
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/faculty/getfaculty")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFaculty(data);
          console.log(data);
        } else {
          console.log("Error: response data is not an array");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + numCards < faculty.length ? prevIndex + numCards : 0
    );
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - numCards >= 0 ? prevIndex - numCards : faculty.length - numCards
    );
  };

  return (<>
    <h4 className="mb-3"><center>Our Faculty</center></h4>
    <Grid className="mb-5" container justifyContent="center" alignItems="center">
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
                    <Card sx={{ maxWidth: 345, mx: 2 ,my:2 }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={"http://localhost:5000"+facultyMember.image.path}
                        alt={facultyMember.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {facultyMember.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          {facultyMember.post}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {facultyMember.description}
                        </Typography>
                        {/* <Typography sx={{ mt: 1 }}>
                          {facultyMember.socialLinks.map((link) => (
                            <Link href="/" target="_blank" key={link.id} color="inherit">
                              <IconButton>{link.icon}</IconButton>
                            </Link>
                          ))}
                        </Typography> */}
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
        </>
      )}
    </Grid></>
  );
};

export default FacultyPage;

