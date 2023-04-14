import React from "react";
import { Button, Grid, Typography, createTheme } from "@mui/material";
import { Link } from "react-router-dom";
import img from '../../Assets/404.svg';

const useStyles = createTheme((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: "10rem",
    color: theme.palette.error.main,
  },
  text: {
    fontWeight: "bold",
    fontSize: "2rem",
    margin: "2rem",
    textAlign: "center",
  },
  button: {
    marginTop: "1rem",
  },
}));

const AccessDenied = () => {
  const classes = useStyles;

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center" style={{marginTop:"2rem"}}>
        <Grid item className="text-center mb-3">
        <img className="w-75" src={img} alt="404" />

        </Grid>
        <Grid item>
          <Typography variant="h4" className={classes.text}>
            Oops! Page not found
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" className="text-center mb-3">
            The page you are looking for might have been removed or You haven't logged in as an admin of site.
          </Typography>
        </Grid>
        <Grid item className={classes.button}>
          <Button component={Link} to="/" variant="contained">
            <span className="text-white ps-0" style={{fontWeight:"bold" , fontSize:'1rem'}} > Go to homepage</span>
          </Button>
        </Grid>
        <Grid item className={classes.button+" mt-3"}>
          <Button component={Link} to="/admin/login" variant="contained">
           <span className="text-white ms-0 ps-0" style={{fontWeight:"bold", fontSize:'1rem'}} > Login</span>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AccessDenied;
