import React, { useContext, useState} from 'react';
import { createTheme } from "@mui/material/styles";
import { Card, CardContent, Typography } from '@mui/material';
import  AlertContext from "../../Contexts/Alert/alertContext"
import Notification from '../Notification';
import {IconButton } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import Loader from '../Homepages/Loader';
const useStyles = createTheme({
    card: {
      width: '90vw',
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      backgroundColor: '#f2f2f2',
      color: '#333333',
      padding: '20px',
      borderRadius: '10px',
    },
    name: {
      fontWeight: 'bold',
      marginBottom: '15px',
    },
    info: {
      fontSize: '14px',
      marginBottom: '5px',
    },
  });

const DeleteAnnouncement = ({Ann,setAnn}) => {
    const [loaderprop,setloaderprop] = useState(false)
      const classes = useStyles;
      const ac= useContext(AlertContext)
      const {update}=ac;
      const handleDelete = async (stitle) => {
        try {
          const headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          };
          let bodyContent = JSON.stringify({
            title: stitle,
          });
          setloaderprop(true)
          const response = await fetch("http://34.125.182.92/api/announcement/deletebytitle", { 
            method: "POST",
            headers: headersList,
            body:bodyContent
          });
          
          const data = await response.text();
          setloaderprop(false)
          update(data);
          setAnn(Ann.filter((request) => request.title !== stitle));
        } catch (error) {
          console.error(error);
        }
      };
      return (
        <>
        <Notification/>
        <Loader open={loaderprop}/>
          <div className="mt-5 text-center">
            <h3>All Announcements</h3>
            <p>Here You can manage all Announcenents:</p>
          </div>
          <div className="container mt-5">
            <div className="row justify-content-center">
              {Ann.map((request) => (
                <div className="col-12 col-md-6 col-lg-4 mb-4" key={request._id}>
                  <Card className={classes.card + " shadow-lg"}>
                    <CardContent>
                      <Typography style={{fontWeight:"bold",color:"#54D787",fontSize:"1.1rem"}} sx={classes.name}>{request.title}</Typography>
                      <Typography sx={classes.info}> {request.info}</Typography>
                      <IconButton color="error" aria-label="delete" onClick={() => handleDelete(request.title)}>
                        <Delete />
                      </IconButton>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    };


export default DeleteAnnouncement
